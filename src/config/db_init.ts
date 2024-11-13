import Permission from "../models/Permission";
import Role from "../models/Role";
import RolePermission from "../models/RolePermission";
import ROLES from "./roles";

const checkAndCreateRolesAndPermissions = async () => {
  for (const role of ROLES) {
    const { name, permissions } = role;

    let dbRole = await Role.findOne({ where: { name } });

    if (!dbRole) {
      dbRole = await Role.create({
        name,
        description: `${name} role`,
      });
      console.log(`Создана роль: ${name}`);
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
          roleId: dbRole.id,
          permissionId: permission.id,
        },
      });

      if (!rolePermissionExists) {
        await RolePermission.create({
          roleId: dbRole.id,
          permissionId: permission.id,
        });
        console.log(`Роль ${name} связана с разрешением ${permissionAction}`);
      }
    }
  }
};

export default checkAndCreateRolesAndPermissions;
