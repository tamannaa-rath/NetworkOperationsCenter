const express = require("express");

const app = express();

const deviceRouter = require("./routes/device.routes");

//middleware
app.use(express.json());

//routes
app.use ("/api/devices", deviceRouter);


module.exports = app;