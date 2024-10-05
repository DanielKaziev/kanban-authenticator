import { Router } from "express";
import authController from "../controllers/authController";
import { body } from "express-validator";

const authRouter = Router();

authRouter.post("/login",authController.login);
authRouter.get("/logout", authController.logout);
authRouter.get("/refresh", authController.refresh);
authRouter.post(
    "/registration", 
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 32}),
    authController.registration
);

export default authRouter;
