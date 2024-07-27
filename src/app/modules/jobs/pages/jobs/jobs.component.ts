import { Component, inject } from '@angular/core';

import { JobAdDialogData } from 'src/app/core/models/job-ad-dialog-data.model';
import { JobAdFormDialogComponent } from '../../components/job-ad-form-dialog/job-ad-form-dialog.component';
import { JobService } from 'src/app/core/services/job.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  jobService = inject(JobService);
  dialog = inject(MatDialog);


  jobAds$ = this.jobService.getJobAds();

  openDialog() {
    const data: JobAdDialogData = {
      title: 'Create Job Ad',
    };

    this.dialog.open(JobAdFormDialogComponent, {
      data
    });
  }
}
