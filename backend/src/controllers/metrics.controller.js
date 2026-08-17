const metricsService = require("../services/metrics.service");
const alertEngine = require("../services/alertEngine.service");

// GET /api/metrics
async function getMetrics(req, res) {
    const metrics =
        await metricsService.getAllMetrics();

    res.json(metrics);
}


// GET /api/metrics/:id
async function getMetric(req, res) {
    const id = Number(req.params.id);

    const metric =
        await metricsService.getMetricById(id);

    if (!metric) {
        return res.status(404).json({
            message: "Metric not found"
        });
    }

    res.json(metric);
}


// GET /api/metrics/device/:deviceId
async function getDeviceMetrics(req, res) {
    const device_id =
        Number(req.params.device_id);

    const metrics =
        await metricsService.getMetricsByDeviceId(
            device_id
        );

    res.json(metrics);
}


// POST /api/metrics
async function createMetric(req, res) {

    const metric = req.body;

    const newMetric =
        await metricsService.createMetric(metric);


    await alertEngine.evaluateMetric(newMetric);


    res.status(201).json(newMetric);
}


module.exports = {
    getMetrics,
    getMetric,
    getDeviceMetrics,
    createMetric
};  