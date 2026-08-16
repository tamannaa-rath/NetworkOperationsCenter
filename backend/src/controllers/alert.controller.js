const alertService = require("../services/alert.service");


// GET /api/alerts
async function getAlerts(req, res) {
    const alerts = await alertService.getAllAlerts();

    res.json(alerts);
}


// GET /api/alerts/:id
async function getAlert(req, res) {
    const id = Number(req.params.id);

    const alert = await alertService.getAlertById(id);

    if (!alert) {
        return res.status(404).json({
            message: "Alert not found"
        });
    }

    res.json(alert);
}


// POST /api/alerts
async function createAlert(req, res) {
    const alert = req.body;

    const newAlert =
        await alertService.createAlert(alert);

    res.status(201).json(newAlert);
}


// PUT /api/alerts/:id
async function updateAlert(req, res) {
    const id = Number(req.params.id);
    const update = req.body;

    const updatedAlert =
        await alertService.updateAlert(id, update);

    if (!updatedAlert) {
        return res.status(404).json({
            message: "Alert not found"
        });
    }

    res.json(updatedAlert);
}


// DELETE /api/alerts/:id
async function deleteAlert(req, res) {
    const id = Number(req.params.id);

    const deletedAlert =
        await alertService.deleteAlert(id);

    if (!deletedAlert) {
        return res.status(404).json({
            message: "Alert not found"
        });
    }

    res.json({
        message: "Alert deleted successfully",
        alert: deletedAlert
    });
}


// POST /api/alerts/:id/acknowledge
async function acknowledgeAlert(req, res) {
    const id = Number(req.params.id);

    // Temporary:
    // Later this will come from authenticated user
    const user_id = req.body.user_id;

    const alert =
        await alertService.acknowledgeAlert(id, user_id);

    if (!alert) {
        return res.status(404).json({
            message: "Alert not found"
        });
    }

    res.json(alert);
}


module.exports = {
    getAlerts,
    getAlert,
    createAlert,
    updateAlert,
    deleteAlert,
    acknowledgeAlert
};