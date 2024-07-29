import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { JobAdDto } from '../models/job-add-dto.model';
import { JobAdStatus } from '../models/job-ad.model';
import { JobService } from './job.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('JobService', () => {
  let service: JobService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        JobService
      ]
    });

    service = TestBed.inject(JobService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getJobAds', () => {
    it('should return a list of job ads', () => {
      const mockJobAds: JobAdDto[] = [
        { id: 1, title: 'Updated Job Ad', description: 'Updated Description', status: 'draft', skills: ['writing'], createdAt: new Date(), updatedAt: new Date() },
        { id: 2, title: 'Updated Job Ad 2', description: 'Updated Description', status: 'draft', skills: ['writing'], createdAt: new Date(), updatedAt: new Date() }
      ];

      service.getJobAds().subscribe((jobAds) => {
        expect(jobAds).toEqual(mockJobAds);
      });

      const req = httpMock.expectOne('jobs');
      expect(req.request.method).toBe('GET');
      req.flush(mockJobAds);
    });
  });

  describe('#saveJobAd', () => {
    it('should save a job ad and return it', () => {
      const mockJobAd: JobAdDto = { id: 1, title: 'Updated Job Ad', description: 'Updated Description', status: 'draft', skills: ['writing'], createdAt: new Date(), updatedAt: new Date() };
      const jobAdToSave: JobAdDto = { ...mockJobAd };
      delete jobAdToSave.id;

      service.saveJobAd(jobAdToSave).subscribe((jobAd) => {
        expect(jobAd).toEqual(mockJobAd);
      });

      const req = httpMock.expectOne('jobs');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(jobAdToSave);
      req.flush(mockJobAd);
    });
  });

  describe('#deleteJobAd', () => {
    it('should delete a job ad and return it', () => {
      const mockJobAd: JobAdDto = { id: 1, title: 'Updated Job Ad', description: 'Updated Description', status: 'draft', skills: ['writing'], createdAt: new Date(), updatedAt: new Date() };

      service.deleteJobAd(1).subscribe((jobAd) => {
        expect(jobAd).toEqual(mockJobAd);
      });

      const req = httpMock.expectOne('jobs/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(mockJobAd);
    });
  });

  describe('#updateJobAd', () => {
    it('should update a job ad and return it', () => {
      const mockJobAd: JobAdDto = { id: 1, title: 'Updated Job Ad', description: 'Updated Description', status: 'draft', skills: ['writing'], createdAt: new Date(), updatedAt: new Date() };

      service.updateJobAd(mockJobAd).subscribe((jobAd) => {
        expect(jobAd).toEqual(mockJobAd);
      });

      const req = httpMock.expectOne('jobs/1');
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual(mockJobAd);
      req.flush(mockJobAd);
    });
  });

  describe('#getNextStatus', () => {
    it('should return the next status in the sequence', () => {
      const currentStatus: JobAdStatus = 'draft';
      const nextStatus = service.getNextStatus(currentStatus);
      expect(nextStatus).toBe('published');
    });

    it('should return null if there is no next status', () => {
      const currentStatus: JobAdStatus = 'archived';
      const nextStatus = service.getNextStatus(currentStatus);
      expect(nextStatus).toBeNull();
    });
  });
});
