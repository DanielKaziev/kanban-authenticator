import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ITokens, IUserTokensPayload } from "../types/users";
import Token from "../models/Token";

dotenv.config();

class TokenService {
  generateTokens(payload: IUserTokensPayload): ITokens {
    const envAToken = process.env.KANBAN_JWT_A_SECRET ?? "30m";
    const envATokenTime = process.env.KANBAN_JWT_A_TTL;
    const envRToken = process.env.KANBAN_JWT_R_SECRET ?? "30d";
    const envRTokenTime = process.env.KANBAN_JWT_R_TTL;

    const accessToken = jwt.sign(payload, envAToken, {
      expiresIn: envATokenTime,
    });
    const refreshToken = jwt.sign(payload, envRToken, {
      expiresIn: envRTokenTime,
    });
    return { accessToken, refreshToken };
  }

  async saveTokens(userId: string, refreshToken: string) {
    const tokenData = await Token.findOne({ where: { userId: userId } });

    if (tokenData) {
      tokenData.token = refreshToken;
    }

    const token = await Token.create({ token: refreshToken, userId: userId });
    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await Token.destroy({ where: { token: refreshToken } });
    return tokenData;
  }
}
export default new TokenService();
