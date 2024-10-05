import { Request, Response, NextFunction } from "express";
import authService from "../service/authService";
import { setTokensToCookiesInResponse } from "../utils/cookiesSetter";

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {}
  }

  public async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, username } = req.body;
      const authData = await authService.registration({
        email,
        password,
        username,
      });

      setTokensToCookiesInResponse(res, authData!);

      return res.json(authData);
    } catch (error) {
      console.log(error);
    }
  }
}
export default new AuthController();
