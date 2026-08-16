const pool = require("../config/db");


// GET ALL METRICS
async function getAllMetrics() {
    const result = await pool.query(
        `
        SELECT
            metrics.*,
            devices.hostname
        FROM metrics
        JOIN devices
            ON metrics.device_id = devices.id
        ORDER BY metrics.timestamp DESC
        `
    );

    return result.rows;
}


// GET METRIC BY ID
async function getMetricById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM metrics
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}


// GET METRICS FOR A DEVICE
async function getMetricsByDeviceId(device_id) {
    const result = await pool.query(
        `
        SELECT *
        FROM metrics
        WHERE device_id = $1
        ORDER BY timestamp DESC
        `,
        [device_id]
    );

    return result.rows;
}


// CREATE METRIC
async function createMetric(metric) {
    const result = await pool.query(
        `
        INSERT INTO metrics (
            device_id,
            cpu_usage,
            memory_usage,
            disk_usage,
            network_throughput,
            latency,
            packet_loss
        )
        VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
        )
        RETURNING *
        `,
        [
            metric.device_id,
            metric.cpu_usage,
            metric.memory_usage,
            metric.disk_usage,
            metric.network_throughput,
            metric.latency,
            metric.packet_loss
        ]
    );

    return result.rows[0];
}


module.exports = {
    getAllMetrics,
    getMetricById,
    getMetricsByDeviceId,
    createMetric
};