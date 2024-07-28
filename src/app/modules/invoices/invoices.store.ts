import { Injectable, inject } from "@angular/core";
import { Observable, exhaustMap, take, tap } from "rxjs";

import { ComponentStore } from "@ngrx/component-store"
import { HttpErrorResponse } from "@angular/common/http";
import { Invoice } from "src/app/core/models/invoice.model";
import { InvoiceDto } from "src/app/core/models/invoice-dto.model";
import { InvoiceService } from "src/app/core/services/invoice.service";
import { JobAdDto } from "src/app/core/models/job-add-dto.model";
import { LayoutStore } from "src/app/core/components/layout/layout.store";
import { UtilService } from "src/app/core/services/util.service";
import { tapResponse } from '@ngrx/operators';

export interface InvoicesState {
  invoices: InvoiceDto[]
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceStore extends ComponentStore<InvoicesState> {
  private invoiceService = inject(InvoiceService);
  private layoutStore = inject(LayoutStore);
  private util = inject(UtilService);
  private invoices$: Observable<Invoice[]> = this.select((state) => state.invoices as Invoice[]);
  private invoicesDto$: Observable<InvoiceDto[]> = this.select((state) => state.invoices);

  vm$ = this.select({
    invoices: this.invoices$
  });

  constructor(){
    super({
      invoices: []
    })
  }

  getInvoiceByAdId$(jobAdId: number | undefined): Observable<InvoiceDto | undefined> {
    return this.select(this.invoicesDto$,
    (invoices) => {
        return invoices.find(x => x.jobAdId === jobAdId);
    }
  )}

  // reduce
  setInvoices = this.updater((state, invoices: InvoiceDto[]) => ({
    ...state,
    invoices: [...invoices],
  }));

  addInvoice = this.updater((state, invoice: InvoiceDto) => ({
    ...state,
    invoices: [...state.invoices, invoice],
  }));

  removeInvoice = this.updater((state, id: number) => ({
    ...state,
    invoices: [...state.invoices.filter(x => x.id !== id)],
  }));

  //effects
  createInvoice = this.effect((jobAd$: Observable<JobAdDto>) => {
    return jobAd$.pipe(
      exhaustMap((jobAd: JobAdDto) => {
        const jobUpdatedAt = new Date(jobAd.updatedAt);
        const invoice: InvoiceDto = {
          jobAdId: jobAd.id as number,
          amount: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
          dueDate: this.invoiceService.getInvoiceDueDate(jobUpdatedAt.getFullYear(), jobUpdatedAt.getMonth())
        };
      return this.invoiceService.createInvoice(invoice).pipe(
        tapResponse(
          (invoice: InvoiceDto) => {
            this.addInvoice(invoice);
          },
          (err: HttpErrorResponse) => this.util.setError(err))
      );
    }));
  });

  loadInvoices = this.effect(trigger$ => {
    return trigger$.pipe(tap(()=>  {
      this.layoutStore.setIsLoading(true);
    }),
    exhaustMap(() => {
      return this.invoiceService.getInvoices().pipe(
        tapResponse(
          (invoices: InvoiceDto[]) => {
            this.setInvoices(invoices);
            this.layoutStore.setIsLoading(false);
          },
          (err: HttpErrorResponse) => this.util.setError(err))
      );
    })
  );
  });

  deleteInvoice = this.effect((jobAdId$: Observable<number>) => {
    return jobAdId$.pipe(
      exhaustMap((jobAdId: number) => {
      return this.getInvoiceByAdId$(jobAdId as number).pipe(
        take(1),
        exhaustMap((oldInvoice: InvoiceDto | undefined) => {
          return this.invoiceService.deleteInvoice(oldInvoice?.id as number).pipe(
            tapResponse(
              (invoice: InvoiceDto) => {
                this.removeInvoice(invoice.id as number);
              },
              (err: HttpErrorResponse) => this.util.setError(err))
          );
      }))
    })
  );
  });
}
