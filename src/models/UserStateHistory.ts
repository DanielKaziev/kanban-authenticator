import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";

interface UserStateHistoryAttributes {
  id: string;
  when: Date;
  reason: string;
  userId: string;
  decisionerId: string;
}

export interface UserStateHistoryInstance
  extends Model<
      UserStateHistoryAttributes,
      Optional<UserStateHistoryAttributes, "id">
    >,
    UserStateHistoryAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const UserStateHistory = sequelize.define<UserStateHistoryInstance>(
  "UserStateHistory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    when: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    decisionerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "UserStateHistory",
  }
);

export default UserStateHistory;
