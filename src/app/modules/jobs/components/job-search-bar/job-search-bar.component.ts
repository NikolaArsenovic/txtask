import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JobAdStatus, jobStatuses } from 'src/app/core/models/job-ad.model';

import { JobAdsStore } from '../../job-ads.store';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-job-search-bar',
  templateUrl: './job-search-bar.component.html',
  styleUrls: ['./job-search-bar.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
   ],
})
export class JobSearchBarComponent implements OnInit{
  jobAdsStore = inject(JobAdsStore);

  get jobAdSelectStatuses(): { value: string, text: string }[] {
    const selectStatuses = [{
      text: 'All Statuses',
      value: ''
    }];
    jobStatuses.forEach(status => {
      selectStatuses.push({
        text: status.charAt(0).toUpperCase() + status.slice(1), // capitalize first letter
        value: status
      })
    });
    return selectStatuses;
  }


  searchForm = new FormGroup({
    text: new FormControl(''),
    status: new FormControl(this.jobAdSelectStatuses[0].value),
  });

  ngOnInit(): void {
    this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.jobAdsStore.updateSearchTerms({text: value.text as string, status: value.status as JobAdStatus})
    })
  }

  trackByFn(index: number): number{
    return index;
  }
}
