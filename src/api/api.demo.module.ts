import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MockApiInterceptor} from '@yunzhi/ng-mock-api';
import {LoadingInterceptor} from '../interceptor/loading.interceptor';
import {HttpErrorInterceptor} from '../interceptor/http-error.interceptor';
import {apis} from './apis';

/**
 * 用于脱离后台跑demo
 */
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS, multi: true, useClass: MockApiInterceptor.forRoot(apis)
    }]
})
export class ApiDemoModule {
}
