import Permission from "../models/Permission";
import Role from "../models/Role";
import RolePermission from "../models/RolePermission";

const checkAndCreateRolesAndPermissions = async () => {
  const rolesPermissions = {
    admin: ["control_users", "control_board"],
    user: ["create_board", "update_board", "delete_board"],
  };

  for (const [roleName, permissions] of Object.entries(rolesPermissions)) {
    let role = await Role.findOne({ where: { name: roleName } });
    if (!role) {
      role = await Role.create({
        name: roleName,
        description: `${roleName} role`,
      });
      console.log(`Создана роль: ${roleName}`);
    }

    for (const permissionAction of permissions) {
      let permission = await Permission.findOne({
        where: { action: permissionAction },
      });
      if (!permission) {
        permission = await Permission.create({ action: permissionAction });
        console.log(`Создано разрешение: ${permissionAction}`);
      }

      const rolePermissionExists = await RolePermission.findOne({
        where: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });

      if (!rolePermissionExists) {
        await RolePermission.create({
          roleId: role.id,
          permissionId: permission.id,
        });
        console.log(
          `Роль ${roleName} связана с разрешением ${permissionAction}`
        );
      }
    }
  }
};
export default checkAndCreateRolesAndPermissions;
