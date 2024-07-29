import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JobAdItemComponent } from './job-ad-item.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('JobAdItemComponent', () => {
  let component: JobAdItemComponent;
  let fixture: ComponentFixture<JobAdItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
     ],
      declarations: [ JobAdItemComponent ],
      imports: [
        MatDividerModule,
        MatChipsModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAdItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
