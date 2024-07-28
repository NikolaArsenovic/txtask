import { CommonModule } from '@angular/common';
import { InvoiceItemComponent } from './components/invoice-item/invoice-item.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceItemComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    MatDividerModule
  ]
})
export class InvoicesModule { }
