import { Component, Input, inject } from '@angular/core';

import { JobAd } from 'src/app/core/models/job-ad.model';
import { JobAdDialogData } from 'src/app/core/models/job-ad-dialog-data.model';
import { JobAdFormDialogComponent } from '../job-ad-form-dialog/job-ad-form-dialog.component';
import { JobService } from 'src/app/core/services/job.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-job-ad-item',
  templateUrl: './job-ad-item.component.html',
  styleUrls: ['./job-ad-item.component.scss']
})
export class JobAdItemComponent {
  jobService: JobService = inject(JobService);
  dialog: MatDialog = inject(MatDialog);

  @Input() jobAd?: JobAd;

  delete(): void {
    if(this.jobAd && this.jobAd.id) {
      this.jobService.deleteJobAd(this.jobAd.id);
    }
  }

  edit(): void {
      const data: JobAdDialogData = {
        title: 'Update Job Ad',
        jobAd: this.jobAd
      };

      this.dialog.open(JobAdFormDialogComponent, {
        data
      });
  }
}
