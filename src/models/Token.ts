import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";

interface TokenAttributes {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
}

export interface TokenInstance
  extends Model<TokenAttributes, Optional<TokenAttributes, "id">>,
    TokenAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Token = sequelize.define<TokenInstance>(
  "Token",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "Token",
  }
);

export default Token;
