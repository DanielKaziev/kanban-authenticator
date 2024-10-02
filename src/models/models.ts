import Permission from "./Permission";
import Role from "./Role";
import RolePermission from "./RolePermission";
import Token from "./Token";
import User from "./User";
import UserStateHistory from "./UserStateHistory";

// User.roleId > Role.id
User.belongsTo(Role, { foreignKey: "roleId", targetKey: "id" });
Role.hasMany(User, { foreignKey: "roleId", sourceKey: "id" });

// User.id < UserStateHistory.userId
User.hasMany(UserStateHistory, { foreignKey: "userId", sourceKey: "id" });
UserStateHistory.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

// User.id < UserStateHistory.decisionerId
User.hasMany(UserStateHistory, { foreignKey: "decisionerId", sourceKey: "id" });
UserStateHistory.belongsTo(User, {
  foreignKey: "decisionerId",
  targetKey: "id",
});

// Role.id < RolePermission.roleId
Role.hasMany(RolePermission, { foreignKey: "roleId", sourceKey: "id" });
RolePermission.belongsTo(Role, { foreignKey: "roleId", targetKey: "id" });

// Permission.id < RolePermission.permissionId
Permission.hasMany(RolePermission, {
  foreignKey: "permissionId",
  sourceKey: "id",
});
RolePermission.belongsTo(Permission, {
  foreignKey: "permissionId",
  targetKey: "id",
});

// Token.userId > User.id
User.hasMany(Token, { foreignKey: "userId", sourceKey: "id" });
Token.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

export default {
  User,
  UserStateHistory,
  Role,
  Permission,
  Token,
  RolePermission,
};
