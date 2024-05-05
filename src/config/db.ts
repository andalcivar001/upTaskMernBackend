import mongoose, { mongo } from "mongoose";
import colors from "colors";
import { exit } from "node:process";

export const conecctDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.cyan.bold(`MongoDB conectado en ${url}`));
  } catch (error) {
    console.log(colors.bgRed(`Error al conectar MongoDB ${error.message}`));
    exit(1);
  }
};
