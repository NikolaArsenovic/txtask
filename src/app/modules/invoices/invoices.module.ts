import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './pages/invoices/invoices.component';


@NgModule({
  declarations: [
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }
