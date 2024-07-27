import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';

import { CommonModule } from '@angular/common';
import { JobAdItemComponent } from './components/job-ad-item/job-ad-item.component';
import { JobSearchBarComponent } from './components/job-search-bar/job-search-bar.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobsRoutingModule } from './jobs-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  providers: [
  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { subscriptSizing: 'dynamic' },
  },
 ],
  declarations: [
    JobsComponent,
    JobSearchBarComponent,
    JobAdItemComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule
  ]
})
export class JobsModule { }
