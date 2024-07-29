import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { JobAdsState, JobAdsStore } from './job-ads.store';
import { of, throwError } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { InvoiceStore } from '../invoices/invoices.store';
import { JobAd } from 'src/app/core/models/job-ad.model';
import { JobAdDto } from 'src/app/core/models/job-add-dto.model';
import { JobService } from 'src/app/core/services/job.service';
import { LayoutStore } from 'src/app/core/components/layout/layout.store';
import { TestBed } from '@angular/core/testing';
import { UtilService } from 'src/app/core/services/util.service';
import { provideHttpClient } from '@angular/common/http';

describe('JobAdsStore', () => {
  let store: JobAdsStore;
  let jobServiceMock: jasmine.SpyObj<JobService>;
  let layoutStoreMock: jasmine.SpyObj<LayoutStore>;
  let invoiceStoreMock: jasmine.SpyObj<InvoiceStore>;
  let utilServiceMock: jasmine.SpyObj<UtilService>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const jobServiceSpy = jasmine.createSpyObj('JobService', ['getJobAds', 'saveJobAd', 'deleteJobAd', 'updateJobAd']);
    const layoutStoreSpy = jasmine.createSpyObj('LayoutStore', ['setIsLoading']);
    const invoiceStoreSpy = jasmine.createSpyObj('InvoiceStore', ['createInvoice', 'deleteInvoice']);
    const utilServiceSpy = jasmine.createSpyObj('UtilService', ['setError']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        JobAdsStore,
        { provide: JobService, useValue: jobServiceSpy },
        { provide: LayoutStore, useValue: layoutStoreSpy },
        { provide: InvoiceStore, useValue: invoiceStoreSpy },
        { provide: UtilService, useValue: utilServiceSpy }
      ]
    });

    store = TestBed.inject(JobAdsStore);
    jobServiceMock = TestBed.inject(JobService) as jasmine.SpyObj<JobService>;
    layoutStoreMock = TestBed.inject(LayoutStore) as jasmine.SpyObj<LayoutStore>;
    invoiceStoreMock = TestBed.inject(InvoiceStore) as jasmine.SpyObj<InvoiceStore>;
    utilServiceMock = TestBed.inject(UtilService) as jasmine.SpyObj<UtilService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Selectors', () => {
    it('should return filtered job ads based on search criteria', () => {
      const initialState: JobAdsState = {
        jobAds: [
          { id: 1, title: 'Test Job Ad 1', description: 'Description 1', status: 'draft', createdAt: new Date(), updatedAt: new Date(), skills: ['skill1', 'skill2'] },
          { id: 2, title: 'Test Job Ad 2', description: 'Description 2', status: 'published', createdAt: new Date(), updatedAt: new Date(), skills: ['skill1', 'skill2'] }
        ],
        searchText: 'Test',
        searchStatus: 'draft'
      };

      store.setState(initialState);

      store.vm$.subscribe((vm) => {
        expect(vm.jobAds.length).toBe(1);
        expect(vm.jobAds[0].title).toBe('Test Job Ad 1');
      });
    });
  });

  describe('Effects', () => {
    it('should fetch job ads and update the state', () => {
      const mockJobAds: JobAdDto[] = [
        { id: 1, title: 'Test Job Ad 1', description: 'Description 1', status: 'draft', createdAt: new Date(), updatedAt: new Date(), skills: ['skill1', 'skill2'] },
        { id: 2, title: 'Test Job Ad 2', description: 'Description 2', status: 'published', createdAt: new Date(), updatedAt: new Date(), skills: ['skill1', 'skill2'] }
      ];

      jobServiceMock.getJobAds.and.returnValue(of(mockJobAds));

      store.getJobAds();

      store.vm$.subscribe((vm) => {
        expect(vm.jobAds).toEqual(mockJobAds);
      });

      expect(layoutStoreMock.setIsLoading).toHaveBeenCalledWith(true);
      expect(layoutStoreMock.setIsLoading).toHaveBeenCalledWith(false);
    });

    it('should handle errors when fetching job ads', () => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not Found'
      });

      jobServiceMock.getJobAds.and.returnValue(throwError(() => errorResponse));

      store.getJobAds();
      expect(utilServiceMock.setError).toHaveBeenCalledWith(errorResponse);

    });

    // Additional tests for createJobAd, deleteJobAd, and editJobAd effects
    it('should create a job ad and update the state', () => {
      const mockJobAd: JobAdDto = { id: 1, title: 'Test Job Ad 1', description: 'Description 1', status: 'draft', createdAt: new Date(), updatedAt: new Date(), skills: ['skill1', 'skill2'] };
      const jobAdToSave: JobAd = { id: 1, title: 'Test Job Ad 1', description: 'Description 1', status: 'published', skills: ['skill1', 'skill2'] };

      jobServiceMock.saveJobAd.and.returnValue(of(mockJobAd));

      store.createJobAd(of(jobAdToSave));

      store.vm$.subscribe((vm) => {
        expect(vm.jobAds).toContain(mockJobAd);
      });

      expect(layoutStoreMock.setIsLoading).toHaveBeenCalledWith(true);
      expect(layoutStoreMock.setIsLoading).toHaveBeenCalledWith(false);
    });

    it('should delete a job ad and update the state', () => {
      const mockJobAd: JobAdDto = { id: 1, title: 'Test Job Ad 1', description: 'Description 1', status: 'published', createdAt: new Date(), updatedAt: new Date(), skills: ['skill1', 'skill2'] };

      jobServiceMock.deleteJobAd.and.returnValue(of(mockJobAd));

      store.deleteJobAd(of(1));

      store.vm$.subscribe((vm) => {
        expect(vm.jobAds).not.toContain(mockJobAd);
      });

      expect(invoiceStoreMock.deleteInvoice).toHaveBeenCalledWith(1);
    });

    it('should edit a job ad and update the state', () => {
      const oldJobAd: JobAdDto = { id: 1, title: 'Test Job Ad 1', description: 'Description 1', status: 'draft', createdAt: new Date(), updatedAt: new Date(), skills: ['skill1', 'skill2'] };
      const updatedJobAd: JobAd = { id: 1, title: 'Updated Job Ad', description: 'Updated Description', status: 'published', skills: []};
      const returnedJobAd: JobAdDto = { ...updatedJobAd, createdAt: new Date(), updatedAt: new Date() };

      store.setState({ jobAds: [oldJobAd], searchText: '', searchStatus: '' });

      jobServiceMock.updateJobAd.and.returnValue(of(returnedJobAd));

      store.editJobAd(of(updatedJobAd));

      store.vm$.subscribe((vm) => {
        expect(vm.jobAds).toContain(returnedJobAd);
      });

      expect(invoiceStoreMock.createInvoice).toHaveBeenCalledWith(returnedJobAd);
    });
  });
});
