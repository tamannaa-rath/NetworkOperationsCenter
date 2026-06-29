const deviceService = require ("../services/device.services");

async function getDevices(req, res) {
    const devices = await deviceService.getAllDevices();
    res.json(devices);
}

async function getDevice(req, res) {
    const id = Number(req.params.id);
    const device = await deviceService.getDeviceById(id);
    res.json(device);
}

async function postDevices(req, res){
    const device = req.body;
    const newDevice = await deviceService.createNewDevice(device);
    res.json(newDevice);
}

module.exports = {
    getDevices,
    getDevice,
    postDevices,
};