import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db";
import http from "node:http";
import "./models/models";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const server = http.createServer(app);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    server.listen(PORT, () => {
      console.log("\x1b[32m", `Auth service starts working on port = ${PORT}`);
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

start();
