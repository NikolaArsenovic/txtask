import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobAdDialogData } from 'src/app/core/models/job-ad-dialog-data.model';
import { JobAdFormDialogComponent } from './job-ad-form-dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('JobAdFormDialogComponent', () => {
  let component: JobAdFormDialogComponent;
  let fixture: ComponentFixture<JobAdFormDialogComponent>;



  const data = {
    title: 'Bulk Edit',
    jobAd: {
      status: 'draft',
      description: 'test',
      skills: ['test1', 'test2', 'test3'],
      title: 'Best title ever',
      id: 1
    }
    } as JobAdDialogData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: {} }
     ],
      declarations: [JobAdFormDialogComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatChipsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdFormDialogComponent);
    component = fixture.componentInstance;
    component.data = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
