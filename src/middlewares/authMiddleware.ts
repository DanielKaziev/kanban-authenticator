import { Request, Response, NextFunction } from "express";
import { RequestError } from "../utils/errors";
import { EUserResponse } from "../config/messages";
import tokenService from "../service/tokenService";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.method === "OPTIONS") return next();

    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(RequestError.Unauthorized(EUserResponse.NO_TOKEN));
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return next(RequestError.Unauthorized(EUserResponse.NO_TOKEN));
    }

    const userData = await tokenService.validateAccessToken(token)
    if (!userData) {
      return next(RequestError.Unauthorized(EUserResponse.TOKEN_INVALID));
    }

    next();
  } catch (err) {
    next(RequestError.Unauthorized(EUserResponse.UNAUTHORIZED_USER));
  }
};

export default authMiddleware;
