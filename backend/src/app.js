const express = require("express");
const logger = require("./middleware/logger.middleware")

const app = express();

const deviceRouter = require("./routes/device.routes");

//middleware
app.use(express.json());
app.use(logger);

//routes
app.use ("/api/devices", deviceRouter);


module.exports = app;