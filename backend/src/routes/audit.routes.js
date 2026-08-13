const express = require("express");
const router = express.Router();
const auditController = require("../controllers/audit.controller");
const validate = require("../middleware/validate.middleware");
const { createAuditLogSchema } = require("../schemas/audit.schema");


// GET /api/audit-logs
router.get(
    "/",
    auditController.getAuditLogs
);
// GET /api/audit-logs/:id
router.get(
    "/:id",
    auditController.getAuditLog
);
// POST /api/audit-logs
router.post(
    "/",
    validate(createAuditLogSchema),
    auditController.createAuditLog
);


module.exports = router;