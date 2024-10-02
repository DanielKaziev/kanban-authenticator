import { Router } from "express";
import permissionController from "../controllers/permissionController";

const permissionRouter = Router();

permissionRouter.get("/", permissionController.getPermissionsList);
permissionRouter.post("/", permissionController.addPermission);
permissionRouter.get("/:id", permissionController.getPermissionById);
permissionRouter.put("/:id", permissionController.updatePermissionById);
permissionRouter.delete("/:id", permissionController.deletePermissionById);

export default permissionRouter;
