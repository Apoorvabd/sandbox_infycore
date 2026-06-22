const express = require("express");
const cors = require("cors");

const sandboxRoutes = require("./routes/sandbox.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sandbox", sandboxRoutes);

module.exports = app;