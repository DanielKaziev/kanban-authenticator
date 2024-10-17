import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import "./models/models";
import router from "./routes";
import errorMiddleware from "./middlewares/errorMiddleware";

dotenv.config();

const app: Application = express();
const BASE_URL = process.env.KANBAN_BASE_API_URL || "/api";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(BASE_URL, router);
app.use(errorMiddleware);

export default app;
