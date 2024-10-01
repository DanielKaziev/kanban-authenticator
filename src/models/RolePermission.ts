import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

interface RolePermissionAttributes {
  roleId: string;
  permissionId: string;
}

export interface RolePermissionInstance
  extends Model<RolePermissionAttributes>,
    RolePermissionAttributes {}

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
