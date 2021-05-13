import {TestBed} from '@angular/core/testing';

import {ConfigService} from './config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApiTestingModule} from '../api/api.testing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('ConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ApiTestingModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: ConfigService = TestBed.inject(ConfigService);
    expect(service).toBeTruthy();
  });
});
