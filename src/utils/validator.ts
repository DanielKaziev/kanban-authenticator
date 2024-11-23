import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { RequestError } from "./errors";

export function validatorErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw RequestError.BadRequest(errors.array()[0].msg);
  }
  next();
}
