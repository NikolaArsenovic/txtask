import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobAdsStore } from '../../job-ads.store';
import { JobSearchBarComponent } from './job-search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { jobStatuses } from 'src/app/core/models/job-ad.model';

describe('JobSearchBarComponent', () => {
  let component: JobSearchBarComponent;
  let fixture: ComponentFixture<JobSearchBarComponent>;
  let jobAdsStoreMock: any;

  beforeEach(async () => {
    jobAdsStoreMock = {
      updateSearchTerms: jasmine.createSpy('updateSearchTerms'),
    };

    await TestBed.configureTestingModule({
      declarations: [JobSearchBarComponent],
      providers: [
        { provide: JobAdsStore, useValue: jobAdsStoreMock },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } }
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    const formValue = component.searchForm.value;
    expect(formValue.text).toBe('');
    expect(formValue.status).toBe('');
  });

  it('should call updateSearchTerms on form value change', (done) => {
    const searchTerms = { text: 'test', status: jobStatuses[0] };
    component.searchForm.setValue(searchTerms);

    // Allow debounce time to pass
    setTimeout(() => {
      expect(jobAdsStoreMock.updateSearchTerms).toHaveBeenCalledWith(searchTerms);
      done();
    }, 500);
  });

  it('should generate the correct job statuses for the dropdown', () => {
    const expectedStatuses = [
      { text: 'All Statuses', value: '' },
      ...jobStatuses.map(status => ({
        text: status.charAt(0).toUpperCase() + status.slice(1),
        value: status
      }))
    ];
    expect(component.jobAdSelectStatuses).toEqual(expectedStatuses);
  });
});
