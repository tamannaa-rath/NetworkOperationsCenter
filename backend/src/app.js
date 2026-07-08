const express = require("express");
const logger = require("./middleware/logger.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

const deviceRouter = require("./routes/device.routes");
const userRouter = require("./routes/user.routes");

//middleware
app.use(express.json());
app.use(logger);

//routes
app.use ("/api/devices", deviceRouter);
app.use ("/api/users", userRouter);

//error handling
app.use(errorHandler);

module.exports = app;