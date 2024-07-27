import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { JobAdDto } from '../models/job-add-dto.model';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private http = inject(HttpClient);
  private util = inject(UtilService);

  getJobAdds(): Observable<JobAdDto[]> {
    return this.http.get<JobAdDto[]>('jobs');
  }
}
