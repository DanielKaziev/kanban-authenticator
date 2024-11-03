import dotenv from "dotenv";
import Permission from "../models/Permission";
import RolePermission from "../models/RolePermission";

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
      (rolePermission) => rolePermission.Permission.action
    );

    return actions;
  }
}
export default new PermissionService();
