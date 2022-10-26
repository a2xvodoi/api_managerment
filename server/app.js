import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from 'cors';
import "dotenv/config";
import router from "./routes";
import { connect } from "./config/db";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
    })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use(cors());
// Connect db
connect();
// Router
router(app);

export default app;
