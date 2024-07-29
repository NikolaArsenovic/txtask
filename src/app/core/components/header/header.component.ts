import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { JobAdDialogData } from '../../models/job-ad-dialog-data.model';
import { JobAdFormDialogComponent } from 'src/app/modules/jobs/components/job-ad-form-dialog/job-ad-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  private dialog = inject(MatDialog);
  private router: Router = inject(Router);
  isJobsRouteActive$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map(e => {
      const jobsRoute = '/jobs';
      return e.url === jobsRoute || e.urlAfterRedirects === jobsRoute
    })
  );
  openDialog(): void {
    const data: JobAdDialogData = {
      title: 'Create Job Ad',
    };

    this.dialog.open(JobAdFormDialogComponent, {
      data
    });
  }
}
