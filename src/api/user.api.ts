import {HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {ApiInjector, MockApiInterface} from '@yunzhi/ng-mock-api';
import {User} from '../entity/user';
import {Assert, randomNumber, randomString} from '../common/utils';
import {Observable} from 'rxjs';
import {Role} from '../entity/role';
import {USER_ROLE} from '../entity/enum/user-role';
import {USER_STATUS} from '../entity/enum/user-status';

export class UserApi implements MockApiInterface {
  protected baseUrl = 'user';
  private sessionKey = 'currentLoginUser';

  /**
   * 清除当前登录用户
   */
  private clearCurrentLoginUser(): void {
    localStorage.removeItem(this.sessionKey);
  }

  /**
   * 获取当前登录用户
   */
  private getCurrentLoginUser(): User | null {
    const userJsonString = localStorage.getItem(this.sessionKey);
    if (userJsonString === null) {
      return null;
    }
    return JSON.parse(userJsonString);
  }

  getInjectors(): ApiInjector<any>[] {
    return [
      // 登录
      {
        url: this.baseUrl + '/login',
        method: 'GET',
        result: (urlMatches: any, options: { headers: HttpHeaders; }) => {
          const auth = options.headers.get('Authorization');
          const auths = atob(auth!.substr(6)).split(':');

          const username = auths[0];
          const password = auths[1];

          if (password === 'yunzhi') {
            let user: User;
            user = new User({
              id: randomNumber(),
              username
            });


            if (username === '13900000000') {
              user.roles = [
                new Role({id: USER_ROLE.admin.value}),
                new Role({id: USER_ROLE.teacher.value})];
            }

            if (username === '13911111111') {
              user.roles = [
                new Role({id: USER_ROLE.manager.value}),
                new Role({id: USER_ROLE.teacher.value})];
            }

            if (username === '13922222222') {
              user.roles = [new Role({id: USER_ROLE.teacher.value})];
            }
            // 设置user基本信息
            user.name = randomString('姓名');
            user.num = randomNumber().toString();
            this.setCurrentLoginUser(user);
            return user;
          } else {
            return new Observable<HttpErrorResponse>(subscriber => {
              subscriber.error(new HttpErrorResponse({status: 401}));
              subscriber.complete();
            });
          }
        }
      },
      // 获取当前登录用户
      {
        method: 'GET',
        url: this.baseUrl + '/currentLoginUser',
        result: () => {
          return this.getCurrentLoginUser();
        }
      },
      // 注销
      {
        method: 'GET',
        url: `${this.baseUrl}/logout`,
        result: () => {
          if (this.getCurrentLoginUser() !== null) {
            this.clearCurrentLoginUser();
            return null;
          } else {
            return new Observable<HttpErrorResponse>(subscriber => {
              subscriber.next(new HttpErrorResponse({status: 401}));
              subscriber.complete();
            });
          }
        }
      },
      // 检验密码是否正确
      {
        method: 'POST',
        url: this.baseUrl + '/checkPasswordIsRight',
        result: (urlMatches: (string)[], options: { body: { password: string, newPassword: string }; }) => {
          let body = {} as { password: string, newPassword: string };

          if (options) {
            body = options.body;
          }
          Assert.isString(body.password, 'password must be set');
          if ('yunzhi' === body.password) {
            return true;
          } else {
            return false;
          }
        }
      },
      // 修改密码
      {
        method: 'PUT',
        url: this.baseUrl + '/updatePassword',
        result: (urlMatches: (string)[], options: { body: { password: string, newPassword: string }; }) => {
          const body = options.body;

          Assert.isString(body.password, 'password must be set');
          Assert.isString(body.newPassword, 'newPassword must be set');
        }
      },
      // 重置密码
      {
        method: 'PATCH',
        url: `${this.baseUrl}/resetPassword/(\\d+)`,
      },
      // 冻结用户
      {
        url: `${this.baseUrl}/frozen/(\\d+)`,
        method: 'PATCH',
        result: {status: USER_STATUS.frozen.value},
      },
      // 解冻用户
      {
        url: `${this.baseUrl}/unfrozen/(\\d+)`,
        method: 'PATCH',
        result: {status: USER_STATUS.normal.value},
      },
      // 根据username获取用户角色
      {
        url: this.baseUrl + '/getRolesByUsername',
        method: 'GET',
        result: (urlMatches: (string)[], options: { params: HttpParams }) => {

          const username = options.params.get('username');
          Assert.isString(username, 'username must be set');
          const roles = new Array<number>();
          if (username === '13900000000' || username === '13911111111') {
            roles.push(randomNumber() % 2 ? USER_ROLE.manager.value : USER_ROLE.admin.value);
            roles.push(USER_ROLE.teacher.value);
            return roles;
          }
          roles.push(USER_ROLE.student.value);
          return roles;

        }
      },
      // 绑定用户
      {
        url: this.baseUrl + '/userBinding',
        method: 'POST',
        result: (urlMatches: (string)[],
                 options: { body: { user: { name: string, username: string, num: string, verificationCode: string } }; }) => {
          const body = options.body;
          Assert.isString(body.user.name, 'name must be set');
          Assert.isString(body.user.username, 'username must be set');
          Assert.isString(body.user.num, 'num must be set');
          Assert.isString(body.user.verificationCode, 'verificationCode must be set');

          return {
            password: randomString(),
          } as User;
        }
      },
      // 发送验证码
      {
        url: this.baseUrl + '/sendVerificationCode',
        method: 'GET',
        result: (urlMatches: (string)[], options: { params: HttpParams }) => {
          const params = options.params;
          Assert.isString(params.get('username'), 'username must be set');
          const username = params.get('username');
          if (username === '13900000000') {
            return new HttpErrorResponse({error: {message: '手机号已注册'}});
          }

          if (username === '13911111111') {
            return new HttpErrorResponse({error: {message: '系统内未找到该手机号'}});
          }

          return null;
        }
      },
      // 设置密码
      {
        url: this.baseUrl + '/setPassword',
        method: 'PATCH',
        result: (urlMatches: (string)[], options: { body: { password: string }; }) => {
          let body = options.body;

          if (options) {
            body = options.body;
          }
          Assert.isString(body.password, 'password must be set');
        }
      }
    ];
  }

  /**
   * 设置当前登录用户
   * @param user 用户
   */
  private setCurrentLoginUser(user: User): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
  }
}
