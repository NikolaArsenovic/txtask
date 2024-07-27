import { FormControl, FormGroup } from '@angular/forms';

import { Component } from '@angular/core';
import { jobStatuses } from 'src/app/core/models/job-ad.model';

@Component({
  selector: 'app-job-search-bar',
  templateUrl: './job-search-bar.component.html',
  styleUrls: ['./job-search-bar.component.scss']
})
export class JobSearchBarComponent {

  get jobAdStatuses(): { value: string, text: string }[] {
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

  search = new FormGroup({
    text: new FormControl(''),
    status: new FormControl(this.jobAdStatuses[0].value),
  });

  trackByFn(index: number): number{
    return index;
  }
}
