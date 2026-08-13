const express = require("express");
const logger = require("./middleware/logger.middleware");
const errorHandler = require("./middleware/error.middleware");

const app = express();

const deviceRouter = require("./routes/device.routes");
const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");
const alertRouter = require("./routes/alert.routes");
const incidentRouter = require("./routes/incidents.routes");
const metricsRouter = require("./routes/metrics.routes");
const auditRouter = require("./routes/audit.routes");

//middleware
app.use(express.json());
app.use(logger);

//routes
app.use ("/api/devices", deviceRouter);
app.use ("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/alerts", alertRouter);
app.use("/api/incidents", incidentRouter);
app.use("/api/metrics", metricsRouter);
app.use("/api/audit-logs", auditRouter);

//error handling
app.use(errorHandler);

module.exports = app;