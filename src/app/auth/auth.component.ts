import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';
import {ConfigService} from '../../service/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  /** 当前模式 */
  mode = 'login';

  showUpdateBowerTips: boolean | undefined;

  year = new Date().getFullYear();

  version: string | undefined;

  apiVersion: string | undefined;

  constructor(private configService: ConfigService,
              private commonService: CommonService) {
    this.apiVersion = configService.config.apiVersion;
    this.version = configService.config.version;
  }

  ngOnInit(): void {
    // this.checkBrowsers();
  }

  onChangeToLogin(): void {
    this.mode = 'login';
  }

  onChangeToRegister(): void {
    this.mode = 'register';
  }

  /**
   * 判断是不是需要升级的浏览器
   */
  checkBrowsers(): void {
    const ua = navigator.userAgent.toLowerCase();
    // 如果是IE或者windows版safari，跳转页面
    if (ua.match(/(trident)\/([\d.]+)/) || ua.match(/version\/([\d.]+).*safari/) || ua.match(/msie ([\d.]+)/)) {
      this.showUpdateBowerTips = true;
    }
  }

  onRegisterDone(): void {
    this.mode = 'login';
  }

  onShowYz(): void {
    this.commonService.info(() => {}, '业务联系电话(微信同号)：13920618851', 'YAHAHA');
  }

}
