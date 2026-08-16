const pool = require("../config/db");


// GET ALL AUDIT LOGS
async function getAllAuditLogs() {
    const result = await pool.query(
        `
        SELECT *
        FROM audit_logs
        ORDER BY created_at DESC
        `
    );

    return result.rows;
}


// GET AUDIT LOG BY ID
async function getAuditLogById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM audit_logs
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}


// CREATE AUDIT LOG
async function createAuditLog(logData) {
    const result = await pool.query(
        `
        INSERT INTO audit_logs (
            user_id,
            action,
            resource_type,
            resource_id,
            description,
            ip_address
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
            logData.user_id,
            logData.action,
            logData.resource_type,
            logData.resource_id,
            logData.description,
            logData.ip_address || null
        ]
    );

    return result.rows[0];
}


module.exports = {
    getAllAuditLogs,
    getAuditLogById,
    createAuditLog
};