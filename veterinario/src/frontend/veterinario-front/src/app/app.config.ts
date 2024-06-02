import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, HttpInterceptor } from '@angular/common/http';
import { httpInterceptorInterceptor } from './http-interceptor.interceptor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { TimepickerComponent, TimepickerModule } from 'ngx-bootstrap/timepicker';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withInterceptors([httpInterceptorInterceptor])),
  importProvidersFrom(BsDatepickerModule.forRoot()),
  importProvidersFrom(TimepickerModule.forRoot()),
  importProvidersFrom(BrowserAnimationsModule),
provideToastr({timeOut:3000,preventDuplicates:true}),
provideAnimations()]
};
