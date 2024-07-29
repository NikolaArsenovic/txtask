/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobAd } from 'src/app/core/models/job-ad.model';
import { JobAdDto } from 'src/app/core/models/job-add-dto.model';
import { JobAdFormDialogComponent } from '../../components/job-ad-form-dialog/job-ad-form-dialog.component';
import { JobAdItemComponent } from '../../components/job-ad-item/job-ad-item.component';
import { JobAdsStore } from '../../job-ads.store';
import { JobSearchBarComponent } from '../../components/job-search-bar/job-search-bar.component';
import { JobsComponent } from './jobs.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let jobAdsStoreMock: any;
  let matDialogMock: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
     ],
      declarations: [ JobsComponent, JobSearchBarComponent, JobAdItemComponent ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatChipsModule,
        MatIconModule,
      ]
    })
    .compileComponents();

  });  beforeEach(async () => {
    jobAdsStoreMock = {
      vm$: of({
        jobAds: mockData as JobAd[]
      }),
      getJobAds: jasmine.createSpy('getJobAds'),
      deleteJobAd: jasmine.createSpy('deleteJobAd')
    };

    matDialogMock = {
      open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of({}) })
    };

    await TestBed.configureTestingModule({
      declarations: [JobsComponent],
      providers: [
        { provide: JobAdsStore, useValue: jobAdsStoreMock },
        { provide: MatDialog, useValue: matDialogMock }
      ],
      imports: [BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getJobAds on init', () => {
    expect(jobAdsStoreMock.getJobAds).toHaveBeenCalled();
  });

  it('should call deleteJobAd with the correct id', () => {
    const id = 1;
    component.onDelete(id);
    expect(jobAdsStoreMock.deleteJobAd).toHaveBeenCalledWith(id);
  });

  it('should not call deleteJobAd when id is undefined', () => {
    component.onDelete(undefined);
    expect(jobAdsStoreMock.deleteJobAd).not.toHaveBeenCalled();
  });

  it('should open dialog with correct data', () => {
    const dialogData = {
      title: 'Create Job Ad'
    };

    component.openDialog();
    expect(matDialogMock.open).toHaveBeenCalledWith(JobAdFormDialogComponent, {
      data: dialogData
    });
  });
});

const mockData: JobAdDto[] =
 [
    {
      id: 1,
      title: 'Wizard',
      description: 'Conjures spells and potions',
      skills: [
        'magic',
        'alchemy',
        'wizardry'
      ],
      status: 'published',
      createdAt: new Date('2024-03-20T09:30:00Z'),
      updatedAt: new Date('2024-03-20T09:30:00Z')
    },
    {
      id: 2,
      title: 'Juggler',
      description: 'Master of juggling balls and chainsaws',
      skills: [
        'juggling',
        'entertainment',
        'coordination'
      ],
      status: 'draft',
      createdAt: new Date('2024-03-22T10:15:00Z'),
      updatedAt: new Date('2024-03-22T10:15:00Z')
    },
    {
      id: 3,
      title: 'Chocolate Taster',
      description: 'Indulges in the finest chocolates',
      skills: [
        'tasting',
        'chocolate',
        'discernment'
      ],
      status: 'archived',
      createdAt: new Date('2024-03-24T14:00:00Z'),
      updatedAt: new Date('2024-03-24T14:00:00Z')
    },
    {
      id: 4,
      title: 'Nap Consultant',
      description: 'Expert in optimizing nap schedules',
      'skills': [
        'napping',
        'consulting',
        'rest'
      ],
      status: 'published',
      createdAt: new Date('2024-03-25T08:45:00Z'),
      updatedAt: new Date('2024-03-25T08:45:00Z')
    },
    {
      id: 5,
      title: 'Banana Peel Slip Tester',
      description: 'Tests the slipperiness of banana peels',
      skills: [
        'testing',
        'banana',
        'balance'
      ],
      status: 'draft',
      createdAt: new Date('2024-03-25T12:00:00Z'),
      updatedAt: new Date('2024-03-25T12:00:00Z')
    }
  ];
