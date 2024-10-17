import { Options, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  KANBAN_DB_PORT,
  KANBAN_DB_USER,
  KANBAN_DB_PASSWORD,
  KANBAN_DB_HOST,
  KANBAN_DB_NAME,
} = process.env;

const DB_DATA: Options = {
  database: KANBAN_DB_NAME,
  username: KANBAN_DB_USER,
  password: KANBAN_DB_PASSWORD,
  dialect: "postgres",
  host: KANBAN_DB_HOST,
  port: Number(KANBAN_DB_PORT),
  logging: false,
};

const sequelize = new Sequelize(DB_DATA);

export default sequelize;
