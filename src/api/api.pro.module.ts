import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiPrefixAndMergeMapInterceptor} from '../interceptor/api-prefix-and-merge-map.interceptor';
import {XAuthTokenInterceptor} from '../interceptor/x-auth-token.interceptor';
import {NullOrUndefinedOrEmptyInterceptor} from '../interceptor/null-or-undefined-or-empty.interceptor';
import {LoadingInterceptor} from '../interceptor/loading.interceptor';
import {HttpErrorInterceptor} from '../interceptor/http-error.interceptor';

@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiPrefixAndMergeMapInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: XAuthTokenInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: NullOrUndefinedOrEmptyInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
})
export class ApiProModule {
}
