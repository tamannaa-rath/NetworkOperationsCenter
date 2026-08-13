const auditService = require("../services/audit.service");


// GET /api/audit-logs
async function getAuditLogs(req, res) {
    const logs =
        await auditService.getAllAuditLogs();

    res.json(logs);
}


// GET /api/audit-logs/:id
async function getAuditLog(req, res) {
    const id = Number(req.params.id);

    const log =
        await auditService.getAuditLogById(id);

    if (!log) {
        return res.status(404).json({
            message: "Audit log not found"
        });
    }

    res.json(log);
}


// POST /api/audit-logs
async function createAuditLog(req, res) {
    const logData = req.body;

    const newLog =
        await auditService.createAuditLog(logData);

    res.status(201).json(newLog);
}


module.exports = {
    getAuditLogs,
    getAuditLog,
    createAuditLog
};