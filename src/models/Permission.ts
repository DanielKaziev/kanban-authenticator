import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";

interface PermissionAttributes {
  id: string;
  action: string;
}

export interface PermissionInstance
  extends Model<PermissionAttributes, Optional<PermissionAttributes, "id">>,
    PermissionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Permission = sequelize.define<PermissionInstance>(
  "Permission",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    tableName: "Permission",
  }
);

export default Permission;
