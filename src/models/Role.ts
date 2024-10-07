import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";

interface RoleAttributes {
  id: string;
  name: string;
  description: string;
}

export interface RoleInstance
  extends Model<RoleAttributes, Optional<RoleAttributes, "id">>,
    RoleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Role = sequelize.define<RoleInstance>(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "Role",
  }
);

export default Role;
