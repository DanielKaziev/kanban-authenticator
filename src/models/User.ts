import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { EUserState } from "../config/state";
import sequelize from "../db";

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  state: EUserState;
  salt: string;
  roleId: string;
}

export interface UserInstance
  extends Model<UserAttributes, Optional<UserAttributes, "id">>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define<UserInstance>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM(...Object.values(EUserState)),
      allowNull: false,
      defaultValue: EUserState.INACTIVE,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "User",
  }
);

export default User;
