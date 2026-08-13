const express = require("express");
const router = express.Router();
const metricsController = require("../controllers/metrics.controller");
const validate = require("../middleware/validate.middleware");
const { createMetricSchema } = require("../schemas/metrics.schema");


router.get(
    "/",
    metricsController.getMetrics
);
router.get(
    "/device/:deviceId",
    metricsController.getDeviceMetrics
);router.get(
    "/:id",
    metricsController.getMetric
);


router.post(
    "/",
    validate(createMetricSchema),
    metricsController.createMetric
);


module.exports = router;