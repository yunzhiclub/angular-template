import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
declare var require: any;

/**
 * 系统配置API.
 */
export class ConfigApi implements MockApiInterface {
  getInjectors(): ApiInjector<any>[] {
    return [{
      method: 'GET',
      url: 'config.json',
      result: () => require('../config.json')
    }];
  }
}
