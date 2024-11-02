import app from "./app";
import sequelize from "./db";
import dotenv from "dotenv";
import checkAndCreateRolesAndPermissions from "./config/db_init";

dotenv.config();

const PORT = process.env.KANBAN_AUTH_PORT || 5000;

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
