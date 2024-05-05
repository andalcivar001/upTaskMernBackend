import express from "express";
import dontenv from "dotenv";
import { conecctDB } from "./config/db";
import projectRouter from "./routes/ProjectRoutes";

dontenv.config();

conecctDB();
const app = express();

// Routes
app.use(express.json());
app.use("/api/projects", projectRouter);

export default app;
