import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ITokenData, ITokens, IUserTokensPayload } from "../types/users";
import Token from "../models/Token";

dotenv.config();

class TokenService {
  public generateTokens(payload: IUserTokensPayload): ITokens {
    const envAToken = process.env.KANBAN_JWT_A_SECRET as string;
    const envATokenTime = process.env.KANBAN_JWT_A_TTL ?? "30m";
    const envRToken = process.env.KANBAN_JWT_R_SECRET as string;
    const envRTokenTime = process.env.KANBAN_JWT_R_TTL ?? "30d";

    const accessToken = jwt.sign(payload, envAToken, {
      expiresIn: envATokenTime,
    });
    const refreshToken = jwt.sign(payload, envRToken, {
      expiresIn: envRTokenTime,
    });
    return { accessToken, refreshToken };
  }

  public async saveTokens(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ where: { userId: userId } });

    if (tokenData) {
      tokenData.token = refreshToken;
    }

    const token = await Token.create({ token: refreshToken, userId: userId });
    return token;
  }

  public async removeToken(refreshToken: string) {
    const tokenData = await Token.destroy({ where: { token: refreshToken } });
    return tokenData;
  }

  public validateAccessToken(accessToken: string) {
    try {
      const envAToken = process.env.KANBAN_JWT_A_SECRET as string;
      const verified = jwt.verify(accessToken, envAToken) as ITokenData;

      return verified;
    } catch (error) {
      return null;
    }
  }

  public validateRefreshToken(refreshToken: string) {
    try {
      const envRToken = process.env.KANBAN_JWT_R_SECRET as string;
      const verified = jwt.verify(refreshToken, envRToken) as ITokenData;

      return verified;
    } catch (error) {
      return null;
    }
  }

  public async findToken(refreshToken: string) {
    const tokenData = await Token.findOne({ where: { token: refreshToken } });
    return tokenData;
  }
}
export default new TokenService();
