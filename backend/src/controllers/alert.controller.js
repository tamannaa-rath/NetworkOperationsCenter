const alertService = require("../services/alert.service");
const { getIO } = require("../socket/socket");

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
    const updatedAlert =
        await alertService.updateAlert(
            id,
            req.body
        );
    if (!updatedAlert) {
        return res.status(404).json({
            message: "Alert not found"
        });
    }
    const io = getIO();
    io.emit("alert:updated", updatedAlert);
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
    const user_id = req.body.user_id;

    const updatedAlert =
        await alertService.acknowledgeAlert(
            id,
            user_id
        );

    if (!updatedAlert) {
        return res.status(404).json({
            message: "Alert not found"
        });
    }

    const io = getIO();

    io.emit("alert:updated", updatedAlert);

    res.json(updatedAlert);
}


module.exports = {
    getAlerts,
    getAlert,
    createAlert,
    updateAlert,
    deleteAlert,
    acknowledgeAlert
};