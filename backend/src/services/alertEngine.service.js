const alertService = require("./alert.service");
const { getIO } = require("../socket/socket");

async function evaluateMetric(metric) {

    const alerts = [];


    // CPU
    if (Number(metric.cpu_usage) > 90) {
        alerts.push({
            device_id: metric.device_id,
            severity: "CRITICAL",
            message: "High CPU usage detected"
        });
    }


    // MEMORY
    if (Number(metric.memory_usage) > 90) {
        alerts.push({
            device_id: metric.device_id,
            severity: "CRITICAL",
            message: "High memory usage detected"
        });
    }


    // LATENCY
    if (Number(metric.latency) > 100) {
        alerts.push({
            device_id: metric.device_id,
            severity: "WARNING",
            message: "High network latency detected"
        });
    }


    // PACKET LOSS
    if (Number(metric.packet_loss) > 5) {
        alerts.push({
            device_id: metric.device_id,
            severity: "WARNING",
            message: "High packet loss detected"
        });
    }


    const createdAlerts = [];

    for (const alert of alerts) {

        const createdAlert =
            await alertService.createAlertIfNotActive(alert);

        if (createdAlert) {
            createdAlerts.push(createdAlert);

            const io = getIO();

            io.emit("alert:created", createdAlert);
        }
    }

    return createdAlerts;
}


module.exports = {
    evaluateMetric
};