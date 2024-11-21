import { Router } from "express";
import roleRouter from "./roleRouters";
import permissionRouter from "./permissionRouters";
import authRouter from "./authRouter";

const router = Router();

router.use("", authRouter);
router.use("/roles", roleRouter);
router.use("/permissions", permissionRouter);

export default router;
