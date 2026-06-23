import express from "express";
import cors from "cors";
import ingestionRoutes from "./modules/ingestion/ingestion.route.js";

import { pool } from "./config/db.js";

import asyncHandler from "./utils/asycHandler.js";
import ApiResponse from "./utils/ApiResponse.js";
import ApiError from "./utils/ApiError.js";

import { errorHandler,notFoundHandler,} from "./middleware/error.middleware.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(
            new ApiError(
                403,
                `CORS blocked for origin: ${origin}`
            )
        );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.get(
    "/health",
    (req, res) => {
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Server running successfully"
            )
        );
    }
);

app.get("/health/db",asyncHandler(async (req, res) => {
        const result = await pool.query(
            "SELECT NOW()"
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                result.rows,
                "Database connected successfully"
            )
        );
    })
);

app.use("/api/ingestion", ingestionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;