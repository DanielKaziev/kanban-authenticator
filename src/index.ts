import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db";
import "./models/models";
import router from "./routes";
import checkAndCreateRolesAndPermissions from "./config/db_init";

dotenv.config();

const app: Application = express();
const PORT = process.env.KANBAN_AUTH_PORT || 5000;
const BASE_URL = process.env.KANBAN_BASE_API_URL || "/api";

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(BASE_URL, router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await checkAndCreateRolesAndPermissions();

    app.listen(PORT, () => {
      console.log("\x1b[32m", `Auth service started on PORT = ${PORT}`);
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

start();
