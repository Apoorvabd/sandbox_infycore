import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sandboxRoutes from "./routes/sandbox.routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import ApiError from "./utils/ApiError.js";

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new ApiError(403, `CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/sandbox/mock", sandboxRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
