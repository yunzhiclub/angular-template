import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MockApiTestingInterceptor} from '@yunzhi/ng-mock-api/testing';
import {CommonService} from '../service/common.service';
import {CommonStubService} from '../service/common.stub.service';
import {apis} from './apis';

/**
 * 用于单元测试的ApiModule.
 */
@NgModule({
  providers: [
    {provide: CommonService, useClass: CommonStubService},
    {
      provide: HTTP_INTERCEPTORS, multi: true, useClass: MockApiTestingInterceptor.forRoot(apis)
    }],
  imports: [
    HttpClientModule
  ],
})
export class ApiTestingModule {
}
