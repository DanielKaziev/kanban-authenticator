import { Request, Response, NextFunction } from "express";
import authService from "../service/authService";
import { validationResult } from "express-validator";
import { RequestError } from "../utils/errors";

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const authData = await authService.login({
        email,
        password,
      });

      return res.json(authData);
    } catch (error) {
      next(error);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken)
        throw RequestError.BadRequest("Refresh token is empty!");

      const token = await authService.logout(refreshToken);

      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const authData = await authService.refresh(refreshToken);

      return res.json(authData);
    } catch (error) {
      next(error);
    }
  }

  public async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return next(
          RequestError.BadRequest(
            "Validation error: ",
            validationErrors.array()
          )
        );
      }

      const { email, password, username } = req.body;
      const authData = await authService.registration({
        email,
        password,
        username,
      });

      return res.json(authData);
    } catch (error) {
      next(error);
    }
  }
}
export default new AuthController();
