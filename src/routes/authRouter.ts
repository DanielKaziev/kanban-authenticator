import { Router } from "express";
import authController from "../controllers/authController";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.get("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);
authRouter.post("/registration", authController.registration);

export default authRouter;
