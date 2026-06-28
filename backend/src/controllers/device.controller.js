const getAllDevices = require ("../services/device.services");

async function getDevices(req, res) {
    const devices = await getAllDevices();
    res.json(devices);
}

module.exports = getDevices;