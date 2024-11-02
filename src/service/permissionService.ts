import dotenv from "dotenv";
import Role from "../models/Role";
import Permission from "../models/Permission";
import RolePermission from "../models/RolePermission";
import { ResponseError } from "../utils/errors";

dotenv.config();

class PermissionService {
  public async getPermissionsByRoleId(roleId: string) {
    const rolePermissions = await RolePermission.findAll({
      where: { roleId },
      include: [
        {
          model: Permission,
          attributes: ["action"],
        },
      ],
    });
    const actions = rolePermissions.map(
      (rolePermission) => rolePermission.Permission?.action
    );

    return actions;
  }
}
export default new PermissionService();
