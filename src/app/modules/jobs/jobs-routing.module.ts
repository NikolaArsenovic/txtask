import { RouterModule, Routes } from '@angular/router';

import { JobsComponent } from './pages/jobs/jobs.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '',  component: JobsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
