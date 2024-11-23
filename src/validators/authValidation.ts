import { body } from "express-validator";
import { validatorErrorHandler } from "../utils/validator";

export const validateRegistration = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .notEmpty()
    .withMessage("Email is required"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6, max: 32 })
    .withMessage("Password must be between 6 and 32 characters long")
    .notEmpty()
    .withMessage("Password is required"),

  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Username must be between 3 and 32 characters long"),

  validatorErrorHandler,
];
