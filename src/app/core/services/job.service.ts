import { Injectable, inject } from '@angular/core';
import { JobAd, JobAdStatus, jobStatuses } from '../models/job-ad.model';

import { HttpClient } from '@angular/common/http';
import { JobAdDto } from '../models/job-add-dto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private http = inject(HttpClient);

  getJobAds(): Observable<JobAdDto[]> {
    return this.http.get<JobAdDto[]>('jobs');
  }

  saveJobAd(jobAd: JobAd): Observable<JobAdDto> {
    const jobAdDto:JobAdDto = {
      ...jobAd,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return this.http.post<JobAdDto>('jobs', jobAdDto);
  }

  deleteJobAd(id: number) {
    this.http.delete('jobs/' + id).subscribe(value => console.log(value));
  }

  updateJobAd(jobAd: JobAd): Observable<JobAdDto> {
    return this.http.patch<JobAdDto>('jobs/' + jobAd.id, jobAd);
  }

  getNextStatus(status: JobAdStatus): string | null {
    const index = jobStatuses.indexOf(status) + 1;
    const lastIndex = jobStatuses.length - 1;
    if(index > 0 && index <= lastIndex) {
      return jobStatuses[index];
    }
    return null;
  }
}
