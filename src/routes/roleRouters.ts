import { Router } from "express";
import roleController from "../controllers/roleController";

const roleRouter = Router();

roleRouter.get("/", roleController.getRolesList);
roleRouter.post("/", roleController.addRole);
roleRouter.get("/:id", roleController.getRoleById);
roleRouter.put("/:id", roleController.updateRoleById);
roleRouter.delete("/:id", roleController.deleteRoleById);
roleRouter.patch("/:id/permission", roleController.bindPermissionToRole);

export default roleRouter;
