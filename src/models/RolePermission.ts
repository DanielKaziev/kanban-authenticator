import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import { PermissionInstance } from "./Permission";

interface RolePermissionAttributes {
  roleId: string;
  permissionId: string;
}

export interface RolePermissionInstance
  extends Model<RolePermissionAttributes>,
    RolePermissionAttributes {
  Permission: PermissionInstance;
}

const RolePermission = sequelize.define<RolePermissionInstance>(
  "RolePermission",
  {
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    permissionId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
    tableName: "RolePermission",
  }
);

export default RolePermission;
