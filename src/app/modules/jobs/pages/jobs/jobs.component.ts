import { Component, OnInit, inject } from '@angular/core';

import { JobAdDialogData } from 'src/app/core/models/job-ad-dialog-data.model';
import { JobAdFormDialogComponent } from '../../components/job-ad-form-dialog/job-ad-form-dialog.component';
import { JobAdsStore } from '../../job-ads.store';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
  jobAdsStore = inject(JobAdsStore);
  dialog = inject(MatDialog);
  vm$ = this.jobAdsStore.vm$;

  ngOnInit(): void {
    this.jobAdsStore.getJobAds();
  }

  onDelete(id: number | undefined): void {
    if(id) {
      this.jobAdsStore.deleteJobAd(id);
    }
  }

  openDialog() {
    const data: JobAdDialogData = {
      title: 'Create Job Ad',
    };

    this.dialog.open(JobAdFormDialogComponent, {
      data
    });
  }
}
