const pool = require("../config/db");


// GET ALL INCIDENTS
async function getAllIncidents() {
    const result = await pool.query(
        `
        SELECT
            incidents.*,
            devices.hostname
        FROM incidents
        JOIN devices
            ON incidents.device_id = devices.id
        ORDER BY incidents.created_at DESC
        `
    );

    return result.rows;
}

// GET INCIDENT BY ID
async function getIncidentById(id) {
    const result = await pool.query(
        `
        SELECT
            incidents.*,
            devices.hostname
        FROM incidents
        JOIN devices
            ON incidents.device_id = devices.id
        WHERE incidents.id = $1
        `,
        [id]
    );

    return result.rows[0];
}


// CREATE INCIDENT
async function createIncident(incident) {
    const result = await pool.query(
        `
        INSERT INTO incidents (
            title,
            description,
            severity,
            status,
            device_id
        )
        VALUES (
            $1,
            $2,
            COALESCE($3, 'WARNING'),
            'OPEN',
            $4
        )
        RETURNING *
        `,
        [
            incident.title,
            incident.description,
            incident.severity,
            incident.device_id
        ]
    );

    return result.rows[0];
}


// UPDATE INCIDENT
async function updateIncident(id, update) {
    const existingIncident = await getIncidentById(id);

    if (!existingIncident) {
        return null;
    }

    const result = await pool.query(
        `
        UPDATE incidents
        SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            severity = COALESCE($3, severity),
            device_id = COALESCE($4, device_id)
        WHERE id = $5
        RETURNING *
        `,
        [
            update.title ?? null,
            update.description ?? null,
            update.severity ?? null,
            update.device_id ?? null,
            id
        ]
    );

    return result.rows[0];
}


// DELETE INCIDENT
async function deleteIncident(id) {
    const result = await pool.query(
        `
        DELETE FROM incidents
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
}


// ASSIGN INCIDENT
async function assignIncident(id, user_id) {
    const result = await pool.query(
        `
        UPDATE incidents
        SET
            assigned_to = $1,
            assigned_at = CURRENT_TIMESTAMP,
            status = 'IN_PROGRESS'
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


// RESOLVE INCIDENT
async function resolveIncident(id, resolution) {
    const result = await pool.query(
        `
        UPDATE incidents
        SET
            status = 'RESOLVED',
            resolved_at = CURRENT_TIMESTAMP,
            resolution = $1
        WHERE id = $2
        RETURNING *
        `,
        [
            resolution,
            id
        ]
    );

    return result.rows[0];
}


// ADD COMMENT
async function addIncidentComment(
    id,
    user_id,
    message
) {
    // First make sure incident exists
    const incident = await getIncidentById(id);

    if (!incident) {
        return null;
    }

    const result = await pool.query(
        `
        INSERT INTO incident_timeline (
            incident_id,
            user_id,
            message
        )
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [
            id,
            user_id,
            message
        ]
    );

    return result.rows[0];
}


module.exports = {
    getAllIncidents,
    getIncidentById,
    createIncident,
    updateIncident,
    deleteIncident,
    assignIncident,
    resolveIncident,
    addIncidentComment
};