import { Router } from "express";
import authController from "../controllers/authController";
import { validateRegistration } from "../validators/authValidation";

const authRouter = Router();

authRouter.post("/login",authController.login);
authRouter.get("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);
authRouter.post("/registration", validateRegistration, authController.registration);

export default authRouter;
