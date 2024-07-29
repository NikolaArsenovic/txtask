import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent, provideRouter } from '@angular/router';

import { ErrorComponent } from '../error/error.component';
import { HeaderComponent } from './header.component';
import { JobAdDialogData } from '../../models/job-ad-dialog-data.model';
import { JobAdFormDialogComponent } from 'src/app/modules/jobs/components/job-ad-form-dialog/job-ad-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReplaySubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dialogMock: jasmine.SpyObj<MatDialog>;
  let routerEventsSubject: ReplaySubject<RouterEvent>;

  beforeEach(() => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    routerEventsSubject = new ReplaySubject<RouterEvent>(1);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent, ErrorComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        provideRouter([]),
        { provide: Router, useValue: { events: routerEventsSubject.asObservable() } },
      ],
      imports: [
        MatIconModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    dialogMock = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  afterEach(() => {
    routerEventsSubject.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog with correct data when openDialog is called', () => {
    const data: JobAdDialogData = { title: 'Create Job Ad' };
    component.openDialog();
    expect(dialogMock.open).toHaveBeenCalledWith(JobAdFormDialogComponent, { data });
  });

  it('should emit true when the route is /jobs', (done) => {
    routerEventsSubject.next(new NavigationEnd(1, '/jobs', '/jobs'));
    fixture.detectChanges();

    component.isJobsRouteActive$.subscribe(isActive => {
      expect(isActive).toBe(true);
      done();
    });
  });

  it('should emit false when the route is not /jobs', (done) => {
    routerEventsSubject.next(new NavigationEnd(1, '/other', '/other'));
    fixture.detectChanges();

    component.isJobsRouteActive$.subscribe(isActive => {
      expect(isActive).toBe(false);
      done();
    });
  });
});
