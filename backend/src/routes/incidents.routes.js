const express = require("express");
const router = express.Router();
const incidentController = require("../controllers/incidents.controller");
const validate = require("../middleware/validate.middleware");
const { createIncidentSchema, updateIncidentSchema, assignIncidentSchema, resolveIncidentSchema, addIncidentCommentSchema } = require("../schemas/incidents.schema");


// GET /api/incidents
router.get("/", incidentController.getIncidents);
// GET /api/incidents/:id
router.get("/:id", incidentController.getIncident);

// POST /api/incidents
router.post("/", validate(createIncidentSchema), incidentController.createIncident);

// PUT /api/incidents/:id
router.put("/:id", validate(updateIncidentSchema), incidentController.updateIncident);

// DELETE /api/incidents/:id
router.delete("/:id", incidentController.deleteIncident);

// POST /api/incidents/:id/assign
router.post("/:id/assign", validate(assignIncidentSchema), incidentController.assignIncident);
// POST /api/incidents/:id/resolve
router.post("/:id/resolve", validate(resolveIncidentSchema), incidentController.resolveIncident);
// POST /api/incidents/:id/comments
router.post("/:id/comments", validate(addIncidentCommentSchema), incidentController.addComment);


module.exports = router;