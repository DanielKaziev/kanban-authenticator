import { EUserState } from "../config/state";
import Role from "../models/Role";
import User from "../models/User";
import { RequestError, ResponseError } from "../utils/errors";
import bcrypt from "bcrypt";
import tokenService from "./tokenService";
import UserDto from "../dtos/userDto";
import { IBaseUserCredentials, ICreateUserCredentials } from "../types/users";

class AuthService {
  public async registration(data: ICreateUserCredentials) {
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
      throw ResponseError.InternalServerError("Can't find user role id");
    }
  }

  public async login(data: IBaseUserCredentials) {
    const { email, password } = data;

    const user = await User.findOne({ where: { email } });
    if (!user)
      throw RequestError.BadRequest(`User with email: ${email} doesn't exist!`);

    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (!isPasswordSame)
      throw RequestError.BadRequest(
        `Incorrect password for user: ${user.email}`
      );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveTokens(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
    };
  }

  public async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  public async refresh(refreshToken: string) {
    if (!refreshToken)
      throw RequestError.Unauthorized("Incorrect refresh token!");

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromBb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromBb) {
      throw RequestError.Unauthorized("User is not authorized!");
    }

    const user = await User.findOne({ where: { id: userData.id } });
    if (!user) throw RequestError.Unauthorized("User is not authorized!");

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveTokens(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
    };
  }
}

export default new AuthService();
