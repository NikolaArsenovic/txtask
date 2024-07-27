import { RouterModule, Routes } from '@angular/router';

import { InvoicesComponent } from './pages/invoices/invoices.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '',  component: InvoicesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
