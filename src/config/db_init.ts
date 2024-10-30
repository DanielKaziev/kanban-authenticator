import Permission from "../models/Permission";
import Role from "../models/Role";
import RolePermission from "../models/RolePermission";

const checkAndCreateRolesAndPermissions = async () => {
  const rolesPermissions = {
    admin: {
      isGlobal: true,
      permissions: [
        "control_users",
        "control_roles",
        "control_permissions",
        "control_boards",
        "control_events",
        "control_tasks",
      ],
    },
    user: {
      isGlobal: true,
      permissions: [
        "create_board",
        "update_board",
        "delete_board",
        "create_task",
        "update_task",
        "delete_task",
        "create_event",
        "update_event",
        "delete_event",
      ],
    },
  };

  for (const [roleName, { permissions, isGlobal }] of Object.entries(rolesPermissions)) {
    
    let role = await Role.findOne({ where: { name: roleName } });
    
    if (!role) {
      role = await Role.create({
        name: roleName,
        isGlobal: isGlobal,
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
        console.log(`Роль ${roleName} связана с разрешением ${permissionAction}`);
      }
    }
  }
};

export default checkAndCreateRolesAndPermissions;
