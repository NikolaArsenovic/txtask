import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { JobAd } from 'src/app/core/models/job-ad.model';
import { JobAdDto } from 'src/app/core/models/job-add-dto.model';
import { JobAdFormDialogComponent } from '../job-ad-form-dialog/job-ad-form-dialog.component';
import { JobAdItemComponent } from './job-ad-item.component';
import { JobService } from 'src/app/core/services/job.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

describe('JobAdItemComponent', () => {
  let component: JobAdItemComponent;
  let fixture: ComponentFixture<JobAdItemComponent>;
  let jobServiceMock: any;
  let matDialogMock: any;

  beforeEach(async () => {
    jobServiceMock = jasmine.createSpyObj('JobService', ['']);
    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [JobAdItemComponent],
      providers: [
        { provide: JobService, useValue: jobServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ],
      imports: [
        MatDividerModule,
        MatChipsModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAdItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event with the correct id', () => {
    const jobAd: JobAd = mockData[0];
    component.jobAd = jobAd;
    spyOn(component.delete, 'emit');

    component.onDelete();
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  it('should open dialog with correct data on edit', () => {
    const jobAd: JobAd = mockData[0];
    component.jobAd = jobAd;

    const data = {
      title: 'Update Job Ad',
      jobAd: jobAd
    };

    component.edit();
    expect(matDialogMock.open).toHaveBeenCalledWith(JobAdFormDialogComponent, { data });
  });

  it('should call onDelete when delete button is clicked', () => {
    spyOn(component, 'onDelete');
    const button = fixture.debugElement.query(By.css('.delete'));
    button.triggerEventHandler('click', null);
    expect(component.onDelete).toHaveBeenCalled();
  });

  it('should call edit when edit button is clicked', () => {
    spyOn(component, 'edit');
    const button = fixture.debugElement.query(By.css('.edit'));
    button.triggerEventHandler('click', null);
    expect(component.edit).toHaveBeenCalled();
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
