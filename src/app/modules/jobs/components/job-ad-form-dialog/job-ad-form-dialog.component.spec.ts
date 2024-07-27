import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAdFormDialogComponent } from './job-ad-form-dialog.component';

describe('JobAdFormDialogComponent', () => {
  let component: JobAdFormDialogComponent;
  let fixture: ComponentFixture<JobAdFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAdFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
