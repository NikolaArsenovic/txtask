/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobAdDialogData } from 'src/app/core/models/job-ad-dialog-data.model';
import { JobAdFormDialogComponent } from './job-ad-form-dialog.component';
import { JobAdsStore } from '../../job-ads.store';
import { JobService } from 'src/app/core/services/job.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

describe('JobAdFormDialogComponent', () => {
  let component: JobAdFormDialogComponent;
  let fixture: ComponentFixture<JobAdFormDialogComponent>;
  let jobServiceMock: any;
  let jobAdsStoreMock: any;
  let matDialogRefMock: any;
  const dialogDataMock: JobAdDialogData = {
    title: 'Best Title ever',
    jobAd: {
      id: 1,
      title: 'Test Job Ad',
      description: 'Test Description',
      status: 'draft',
      skills: ['Angular', 'TypeScript']
    }
  }


  beforeEach(async () => {
    jobServiceMock = jasmine.createSpyObj('JobService', ['getNextStatus']);
    jobAdsStoreMock = jasmine.createSpyObj('JobAdsStore', ['editJobAd', 'createJobAd']);
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [JobAdFormDialogComponent],
      providers: [
        { provide: JobService, useValue: jobServiceMock },
        { provide: JobAdsStore, useValue: jobAdsStoreMock },
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock }
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatChipsModule,
        MatIconModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAdFormDialogComponent);
    component = fixture.componentInstance;
    component.data = dialogDataMock;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture = TestBed.createComponent(JobAdFormDialogComponent);
    component = fixture.componentInstance;
    component.data = dialogDataMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with data', () => {
    expect(component.jobAdForm.value.id).toEqual(1);
  });

  it('should call onCancel and close the dialog', () => {
    component.onCancel();
    expect(matDialogRefMock.close).toHaveBeenCalled();
  });

  it('should call editJobAd on submit if jobAd exists', () => {
    component.onSubmit();
    expect(jobAdsStoreMock.editJobAd).toHaveBeenCalledWith(component.jobAdForm.value);
    expect(matDialogRefMock.close).toHaveBeenCalled();
  });

  it('should add a skill', () => {
    const event: MatChipInputEvent = {
      value: 'React',
      input:{} as any,
      chipInput: { clear: () => console.log('asdf')} as any
    } as any;
    component.add(event);
    expect(component.skillsValue).toContain('React');
    component.remove('React');
  });

  it('should remove a skill', () => {
    component.remove('Angular');
    expect(component.skillsValue).not.toContain('Angular');
    const event: MatChipInputEvent = {
      value: 'Angular',
      input:{} as any,
      chipInput: { clear: () => console.log('asdf')} as unknown
    } as any;
    component.add(event);
  });

  it('should edit a skill', () => {
    const event: MatChipEditedEvent = {
      value: 'Vue.js',
    } as any;
    component.edit('Angular', event);
    expect(component.skillsValue).toContain('Vue.js');
    expect(component.skillsValue).not.toContain('Angular');
  });

  it('should track by index', () => {
    const index = component.trackByFn(1);
    expect(index).toBe(1);
  });
});
