import express from "express";
import cors from "cors";
import sandboxRoutes from "./routes/sandbox.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(
        `Mock Bank Server Running On Port ${PORT}`
    );
});
