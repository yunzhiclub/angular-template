import {USER_ROLE} from './enum/user-role';
import {UserStatus} from './enum/user-status';
import {Assert} from '../common/utils';
import {Role} from './role';

export class User {
  /** id */
  id: number | undefined;

  /**
   * 密码
   */
  password: string | undefined;

  /**
   * 姓名
   */
  name: string | undefined;

  /**
   * 工号/学号
   */
  num: string | undefined;

  /**
   * 角色
   */
  roles: Array<Role> | null;

  /**
   * 状态
   */
  status: UserStatus | undefined;

  /**
   * 用户名(手机号）
   */
  username: string | undefined;

  constructor(data = {} as {
    id?: number,
    password?: string,
    name?: string,
    num?: string,
    roles?: Role[],
    status?: UserStatus,
    username?: string,
  }) {
    this.id = data.id;
    this.password = data.password;
    this.username = data.username;
    if (Array.isArray(data.roles)) {
      this.roles = [];
      data.roles.forEach(role => {
        if (role instanceof Role) {
          this.roles.push(role);
        } else {
          this.roles.push(new Role(role));
        }
      });
    }

    this.status = data.status;
    this.name = data.name;
    this.num = data.num;
  }

  /**
   * 是否为系主任.
   */
  isManager(): boolean {
    Assert.isArray(this.roles, 'roles类型不正确');
    return this.roles.map(role => role.id).indexOf(USER_ROLE.manager.value) !== -1;
  }
}
