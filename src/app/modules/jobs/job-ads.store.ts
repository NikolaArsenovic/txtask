import { Injectable, inject } from "@angular/core";
import { JobAd, JobAdStatus } from "src/app/core/models/job-ad.model";
import { Observable, exhaustMap, take, tap } from "rxjs";

import { ComponentStore } from "@ngrx/component-store"
import { HttpErrorResponse } from "@angular/common/http";
import { InvoiceStore } from "../invoices/invoices.store";
import { JobAdDto } from "src/app/core/models/job-add-dto.model";
import { JobService } from "src/app/core/services/job.service";
import { LayoutStore } from "src/app/core/components/layout/layout.store";
import { UtilService } from "src/app/core/services/util.service";
import { tapResponse } from '@ngrx/operators';

export interface JobAdsState {
  jobAds: JobAdDto[],
  searchText: string | null,
  searchStatus: string | null
}

@Injectable({
  providedIn: 'root'
})
export class JobAdsStore extends ComponentStore<JobAdsState> {
  private jobsService: JobService = inject(JobService);
  private layoutStore: LayoutStore = inject(LayoutStore);
  private invoiceStore: InvoiceStore = inject(InvoiceStore);
  private util = inject(UtilService);
  private jobAds$: Observable<JobAd[]> = this.select((state) => this.filterAds(state));
  private jobAdDtos$: Observable<JobAdDto[]> = this.select((state) => state.jobAds);
  private searchText$: Observable<string | null> = this.select((state) => state.searchText);
  private searchStatus$: Observable<string | null> = this.select((state) => state.searchStatus);

  vm$ = this.select({
    jobAds: this.jobAds$,
    searchText: this.searchText$,
    searchStatus: this.searchStatus$
  });

  constructor(){
    super({
      jobAds: [],
      searchText: '',
      searchStatus: ''
    })
  }

  filterAds(state: JobAdsState): JobAd[] {
    let ads: JobAd[] = state.jobAds as JobAd[];
    if(state.searchStatus) {
      ads = ads.filter(x => x.status === state.searchStatus);
    }

    if(state.searchText) {
      ads = ads.filter(x =>
        x.description.toLowerCase().includes((state.searchText as string).toLowerCase()) ||
        x.title.toLowerCase().includes((state.searchText as string).toLowerCase()) ||
        x.skills.map(x => x.toLowerCase()).includes((state.searchText as string).toLowerCase())
      );
    }
    return ads;
  }

  jobAdDtoById$(id: number | undefined): Observable<JobAdDto | undefined> {
    return this.select(this.jobAdDtos$,
    (jobAdDtos) => {
        return jobAdDtos.find(x => x.id === id);
    }
  )}

  setJobAds = this.updater((state, ads: JobAdDto[]) => ({
    ...state,
    jobAds: ads
  }));

  addJobAd = this.updater((state, ad: JobAdDto) => ({
    ...state,
    jobAds: [...state.jobAds, ad]
  }));

  removeJobAd = this.updater((state, id: number) => ({
    ...state,
    jobAds: [...state.jobAds.filter(x => x.id !== id)]
  }));

  updateJobAd  = this.updater((state, ad: JobAdDto) => ({
    ...state,
    jobAds: [...state.jobAds.map(x => (x.id === ad.id ? ad : x))]
  }));

  updateSearchState = this.updater((state, search: {text: string | null, status: JobAdStatus | null}) => ({
    ...state,
    searchStatus: search.status,
    searchText: search.text
  }));


  //effects
  updateSearchTerms = this.effect((search$: Observable<{text: string | null, status: JobAdStatus | null}>) => {
    return search$.pipe(
      tap((search: {text: string | null, status: JobAdStatus | null}) => {
        this.updateSearchState(search);
      })
    );
  });

  createJobAd = this.effect((jobAd$: Observable<JobAd>) => {
    return jobAd$.pipe(tap(()=>  {
      this.layoutStore.setIsLoading(true);
    }),
    exhaustMap((jobAd: JobAd) => {
      const jobAdDto:JobAdDto = {
        ...jobAd,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      return this.jobsService.saveJobAd(jobAdDto).pipe(
        tapResponse(
          (ad: JobAdDto) => {
            this.addJobAd(ad);
            this.layoutStore.setIsLoading(false);
          },
          (err: HttpErrorResponse) => this.util.setError(err))
      );
    })
  );
  });

  getJobAds = this.effect(trigger$ => {
    return trigger$.pipe(tap(()=>  {
      this.layoutStore.setIsLoading(true);
    }),
    exhaustMap(() => {
      return this.jobsService.getJobAds().pipe(
        tapResponse(
          (ads: JobAdDto[]) => {
            this.setJobAds(ads);
            this.layoutStore.setIsLoading(false);
          },
          (err: HttpErrorResponse) => this.util.setError(err))
      );
    })
  );
  });

  deleteJobAd = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      exhaustMap((id: number) => {
      return this.jobsService.deleteJobAd(id).pipe(
        tapResponse(
          (jobAd: JobAdDto) => {
            this.removeJobAd(id);
            if(jobAd.status === 'published' || jobAd.status === 'archived') {
              this.invoiceStore.deleteInvoice(id);
            }
          },
          (err: HttpErrorResponse) => this.util.setError(err))
      );
    })
  );
  });

  editJobAd = this.effect((jobAd$: Observable<JobAd>) => {
    return jobAd$.pipe(tap(()=>  {
      this.layoutStore.setIsLoading(true);
    }),
    exhaustMap((jobAd: JobAd) => {
      return this.jobAdDtoById$(jobAd.id).pipe(
        take(1),
        exhaustMap((oldJobAd: JobAdDto | undefined) => {
          const jobToUpdate = {
            ...jobAd,
            updatedAt: new Date(),
          }
          return this.jobsService.updateJobAd(jobToUpdate).pipe(
            tapResponse(
              (ad: JobAdDto) => {
                this.updateJobAd(ad);
                if(oldJobAd && oldJobAd.status === 'draft' && jobToUpdate.status === 'published') {
                  this.invoiceStore.createInvoice(ad);
                }
                this.layoutStore.setIsLoading(false);
              },
              (err: HttpErrorResponse) => this.util.setError(err))
          );
      }))
    })
  );
  });
}

