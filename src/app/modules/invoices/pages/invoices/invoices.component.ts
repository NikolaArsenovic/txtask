import { Component, OnInit, inject } from '@angular/core';

import { InvoiceStore } from '../../invoices.store';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit{
  invoiceStore = inject(InvoiceStore);
  vm$ = this.invoiceStore.vm$;

  ngOnInit(): void {
    this.invoiceStore.loadInvoices();
  }
}
