import { CommonModule } from '@angular/common';
import { JobAdFormDialogComponent } from './components/job-ad-form-dialog/job-ad-form-dialog.component';
import { JobAdItemComponent } from './components/job-ad-item/job-ad-item.component';
import { JobSearchBarComponent } from './components/job-search-bar/job-search-bar.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { JobsRoutingModule } from './jobs-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    JobsComponent,
    JobSearchBarComponent,
    JobAdItemComponent,
    JobAdFormDialogComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class JobsModule { }
