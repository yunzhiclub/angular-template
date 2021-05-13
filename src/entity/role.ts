/**
 * 角色.
 */
export class Role {
  id: number;

  name: string;

  value: string;

  constructor(data = {} as { id?: number, name?: string, value?: string }) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.value = data.value;
    }
  }
}
