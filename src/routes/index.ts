import { Router } from "express";
import roleRouter from "./roleRouters";
import permissionRouter from "./permissionRouters";
import authRouter from "./authRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/role", roleRouter);
router.use("/permission", permissionRouter);

export default router;
