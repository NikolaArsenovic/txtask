import { Component, Input } from '@angular/core';

import { JobAd } from 'src/app/core/models/job-ad.model';

@Component({
  selector: 'app-job-ad-item',
  templateUrl: './job-ad-item.component.html',
  styleUrls: ['./job-ad-item.component.scss']
})
export class JobAdItemComponent {
  @Input() jobAd?: JobAd;
}
