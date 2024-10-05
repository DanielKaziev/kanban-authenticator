import { Response } from "express";
import { ITokens } from "../types/users";

export const setTokensToCookiesInResponse = (res: Response, data: ITokens) => {
  const envAToken = process.env.KANBAN_JWT_A_TTL_MSEC ?? 1800000;
  const envRToken = process.env.KANBAN_JWT_R_TTL_MSEC ?? 2592000000;

  res.cookie("accessToken", data.accessToken, {
    maxAge: Number(envAToken),
    httpOnly: true,
  });
  res.cookie("refreshToken", data.refreshToken, {
    maxAge: Number(envRToken),
    httpOnly: true,
  });
};
