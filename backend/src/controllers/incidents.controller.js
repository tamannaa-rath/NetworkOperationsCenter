const incidentService = require("../services/incidents.service");


// GET /api/incidents
async function getIncidents(req, res) {
    const incidents =
        await incidentService.getAllIncidents();

    res.json(incidents);
}


// GET /api/incidents/:id
async function getIncident(req, res) {
    const id = Number(req.params.id);

    const incident =
        await incidentService.getIncidentById(id);

    if (!incident) {
        return res.status(404).json({
            message: "Incident not found"
        });
    }

    res.json(incident);
}


// POST /api/incidents
async function createIncident(req, res) {
    const incident = req.body;

    const newIncident =
        await incidentService.createIncident(incident);

    res.status(201).json(newIncident);
}


// PUT /api/incidents/:id
async function updateIncident(req, res) {
    const id = Number(req.params.id);

    const update = req.body;

    const updatedIncident =
        await incidentService.updateIncident(
            id,
            update
        );

    if (!updatedIncident) {
        return res.status(404).json({
            message: "Incident not found"
        });
    }

    res.json(updatedIncident);
}


// DELETE /api/incidents/:id
async function deleteIncident(req, res) {
    const id = Number(req.params.id);

    const deletedIncident =
        await incidentService.deleteIncident(id);

    if (!deletedIncident) {
        return res.status(404).json({
            message: "Incident not found"
        });
    }

    res.json({
        message: "Incident deleted successfully",
        incident: deletedIncident
    });
}


// POST /api/incidents/:id/assign
async function assignIncident(req, res) {
    const id = Number(req.params.id);

    const user_id = req.body.user_id;

    const incident =
        await incidentService.assignIncident(
            id,
            user_id
        );

    if (!incident) {
        return res.status(404).json({
            message: "Incident not found"
        });
    }

    res.json(incident);
}


// POST /api/incidents/:id/resolve
async function resolveIncident(req, res) {
    const id = Number(req.params.id);

    const resolution = req.body.resolution;

    const incident =
        await incidentService.resolveIncident(
            id,
            resolution
        );

    if (!incident) {
        return res.status(404).json({
            message: "Incident not found"
        });
    }

    res.json(incident);
}


// POST /api/incidents/:id/comments
async function addComment(req, res) {
    const id = Number(req.params.id);

    const user_id = req.body.user_id;
    const message = req.body.message;

    const comment =
        await incidentService.addIncidentComment(
            id,
            user_id,
            message
        );

    if (!comment) {
        return res.status(404).json({
            message: "Incident not found"
        });
    }

    res.status(201).json(comment);
}


module.exports = {
    getIncidents,
    getIncident,
    createIncident,
    updateIncident,
    deleteIncident,
    assignIncident,
    resolveIncident,
    addComment
};