import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from '../error/error.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const fakeActivatedRoute = {
    data: {
      title: 'Dashboard'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent, ErrorComponent ],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}, Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

