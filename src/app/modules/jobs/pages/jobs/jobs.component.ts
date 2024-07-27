import { Component, inject } from '@angular/core';

import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent {
  jobService = inject(JobService)

  jobAds$ = this.jobService.getJobAdds();
}
