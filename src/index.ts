import app from "./app";
import sequelize from "./db";
import dotenv from "dotenv";
import checkAndCreateRolesAndPermissions from "./config/db_init";
import permissionService from "./service/permissionService";
import tokenService from "./service/tokenService";
import "./grpcServer";

dotenv.config();

const PORT = process.env.KANBAN_AUTH_PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    await checkAndCreateRolesAndPermissions();

    // (async () => {
    //   const roleId = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0NDc0NTczLTE0NWUtNDhmOC1iZDRhLTA3MzkwNDVhMWMxMiIsInVzZXJuYW1lIjoiU3VwZXJfRGVuXzc3NyIsImVtYWlsIjoia2F6aWV2MzBAbWFpbC5ydSIsInN0YXRlIjoiYWN0aXZlIiwicm9sZSI6InVzZXIiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGVfYm9hcmQiLCJ1cGRhdGVfYm9hcmQiLCJkZWxldGVfYm9hcmQiLCJjcmVhdGVfdGFzayIsInVwZGF0ZV90YXNrIiwiZGVsZXRlX3Rhc2siLCJjcmVhdGVfZXZlbnQiLCJ1cGRhdGVfZXZlbnQiLCJkZWxldGVfZXZlbnQiXSwiaWF0IjoxNzMwNTc3Njk4LCJleHAiOjE3MzA1Nzk0OTh9.0Kr2Isv8vyoWetQhGhkpF61LSj5fnTN-yfOkKjHhNXY';
    //   const actions = tokenService.validateAccessTokenWithPermission(roleId, "create_board")
    //   console.log(actions);
    // })();

    app.listen(PORT, () => {
      console.log("\x1b[32m", `Auth service started on PORT = ${PORT}`);
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};

start();
