import { Injectable, inject } from "@angular/core";
import { Observable, exhaustMap, tap } from "rxjs";

import { ComponentStore } from "@ngrx/component-store"
import { HttpErrorResponse } from "@angular/common/http";
import { JobAd } from "src/app/core/models/job-ad.model";
import { JobAdDto } from "src/app/core/models/job-add-dto.model";
import { JobService } from "src/app/core/services/job.service";
import { LayoutStore } from "src/app/core/components/layout/layout.store";
import { tapResponse } from '@ngrx/operators';

export interface JobAdsState {
  jobAds: JobAdDto[]
}

@Injectable({
  providedIn: 'root'
})
export class JobAdsStore extends ComponentStore<JobAdsState> {
  private jobsService: JobService = inject(JobService);
  private layoutStore: LayoutStore = inject(LayoutStore);
  private jobAds$: Observable<JobAd[]> = this.select((state) => state.jobAds as JobAd[]);
  private jobAdDtos$: Observable<JobAdDto[]> = this.select((state) => state.jobAds);

  vm$ = this.select({
    jobAds: this.jobAds$
  });

  constructor(){
    super({
      jobAds: []
    })
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


  //effects
  createJobAd = this.effect((jobAd$: Observable<JobAd>) => {
    return jobAd$.pipe(tap(()=>  {
      this.layoutStore.setIsLoading(true);
    }),
    exhaustMap((jobAd: JobAd) => {
      return this.jobsService.saveJobAd(jobAd).pipe(
        tapResponse(
          (ad: JobAdDto) => {
            this.addJobAd(ad);
            this.layoutStore.setIsLoading(false);
          },
          (err: HttpErrorResponse) => console.log(err))
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
          (err: HttpErrorResponse) => console.log(err))
      );
    })
  );
  });

  deleteJobAd = this.effect((id$: Observable<number>) => {
    return id$.pipe(
      exhaustMap((id: number) => {
      return this.jobsService.deleteJobAd(id).pipe(
        tapResponse(
          () => {
            this.removeJobAd(id);
          },
          (err: HttpErrorResponse) => console.log(err))
      );
    })
  );
  });

  editJobAd = this.effect((jobAd$: Observable<JobAd>) => {
    return jobAd$.pipe(tap(()=>  {
      this.layoutStore.setIsLoading(true);
    }),
    exhaustMap((jobAd: JobAd) => {
      const jobToUpdate = {
        ...jobAd,
        updatedAt: new Date()
      }
      return this.jobsService.updateJobAd(jobToUpdate).pipe(
        tapResponse(
          (ad: JobAdDto) => {
            this.updateJobAd(ad);
            this.layoutStore.setIsLoading(false);
          },
          (err: HttpErrorResponse) => console.log(err))
      );
    })
  );
  });
}

