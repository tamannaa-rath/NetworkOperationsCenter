const pool = require("../config/db");


// GET ALL
async function getAllAlerts() {
    const result = await pool.query(
        `
        SELECT *
        FROM alerts
        ORDER BY created_at DESC
        `
    );

    return result.rows;
}


// GET ONE
async function getAlertById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM alerts
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}


// CREATE
async function createAlert(alert) {
    const result = await pool.query(
        `
        INSERT INTO alerts (
            device_id,
            severity,
            status,
            message
        )
        VALUES ($1, $2, 'ACTIVE', $3)
        RETURNING *
        `,
        [
            alert.device_id,
            alert.severity,
            alert.message
        ]
    );

    return result.rows[0];
}


// UPDATE
async function updateAlert(id, update) {
    const existingAlert = await getAlertById(id);

    if (!existingAlert) {
        return null;
    }

    const result = await pool.query(
        `
        UPDATE alerts
        SET
            device_id = COALESCE($1, device_id),
            severity = COALESCE($2, severity),
            message = COALESCE($3, message),
            status = COALESCE($4, status)
        WHERE id = $5
        RETURNING *
        `,
        [
            update.device_id ?? null,
            update.severity ?? null,
            update.message ?? null,
            update.status ?? null,
            id
        ]
    );

    return result.rows[0];
}


// DELETE
async function deleteAlert(id) {
    const result = await pool.query(
        `
        DELETE FROM alerts
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
}


// ACKNOWLEDGE
async function acknowledgeAlert(id, user_id) {
    const result = await pool.query(
        `
        UPDATE alerts
        SET
            status = 'ACKNOWLEDGED',
            acknowledged_at = CURRENT_TIMESTAMP,
            acknowledged_by = $1
        WHERE id = $2
        RETURNING *
        `,
        [
            user_id,
            id
        ]
    );

    return result.rows[0];
}


module.exports = {
    getAllAlerts,
    getAlertById,
    createAlert,
    updateAlert,
    deleteAlert,
    acknowledgeAlert
};