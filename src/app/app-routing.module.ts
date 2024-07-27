import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'invoices', loadChildren: () => import('./modules/invoices/invoices.module').then(m => m.InvoicesModule)},
  { path: 'jobs', loadChildren: () => import('./modules/jobs/jobs.module').then(m => m.JobsModule)},
  { path: '**', redirectTo: 'jobs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
