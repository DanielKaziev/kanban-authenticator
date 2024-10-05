import { EUserState } from "../config/state.js";
import { UserInstance } from "../models/User.js";

class UserDto {
  public id: string;
  public username: string;
  public email: string;
  public state: EUserState;

  constructor(user: UserInstance) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.state = user.state;
  }
}

export default UserDto;
