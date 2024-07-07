import express from "express";
import dontenv from "dotenv";
import { conecctDB } from "./config/db";
import projectRouter from "./routes/ProjectRoutes";
import { corsConfig } from "./cors";
import cors from "cors";
dontenv.config();

conecctDB();
const app = express();
app.use(cors(corsConfig));
// Routes
app.use(express.json());
app.use("/api/projects", projectRouter);

export default app;
