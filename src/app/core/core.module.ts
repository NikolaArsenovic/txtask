import { ErrorHandler, NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { CustomErrorHandler } from './error.handler';
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { apiBackendProvider } from './interceptors/api.interceptor';

@NgModule({ declarations: [
        LayoutComponent,
        HeaderComponent,
        ErrorComponent,
    ],
    exports: [
        LayoutComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatButtonModule
    ],
    providers: [
      apiBackendProvider,
      { provide: ErrorHandler, useClass: CustomErrorHandler },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class CoreModule { }
