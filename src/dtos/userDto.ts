import { EUserState } from "../config/state.js";
import { UserInstance } from "../models/User.js";

class UserDto {
  public id: string;
  public username: string;
  public email: string;
  public state: EUserState;
  public role: string;
  public permissions: Array<string>;

  constructor(user: UserInstance, role: string, permission: Array<string>) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.state = user.state;
    this.role = role;
    this.permissions = permission;
  }
}

export default UserDto;
