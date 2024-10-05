import { EUserState } from "../config/state";
import Role from "../models/Role";
import User from "../models/User";
import { RequestError, ResponseError } from "../utils/errors";
import bcrypt from "bcrypt";
import tokenService from "./tokenService";
import UserDto from "../dtos/userDto";
import { IUserCredentials } from "../types/users";

class AuthService {
  async registration(data: IUserCredentials) {
    const { email, password, username } = data;

    const isExist = await User.findOne({ where: { email } });

    if (isExist)
      RequestError.BadRequest(`User with email: ${email} already exist!`);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const role = await Role.findOne({ where: { name: "user" } });

    if (role) {
      const user = await User.create({
        email: email,
        password: hashedPassword,
        username: username,
        roleId: role?.id,
        salt: salt,
        state: EUserState.ACTIVE,
      });

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });

      await tokenService.saveTokens(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
      };
    } else {
      ResponseError.InternalServerError("Can't find user role id");
    }
  }
}

export default new AuthService();
