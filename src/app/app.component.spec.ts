import { ActivatedRoute, Router } from "@angular/router";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const fakeActivatedRoute = {
    data: {
      title: 'Dashboard'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [CoreModule],
    providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, Router, provideHttpClient(withInterceptorsFromDi())]
})
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
