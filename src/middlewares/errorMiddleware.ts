import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { RequestError, ResponseError } from "../utils/errors";

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
  }
  return res.status(500).json({ message: err.message});
};

export default errorHandler;
