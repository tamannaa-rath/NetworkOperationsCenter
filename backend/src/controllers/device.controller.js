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

async function updateDevice(req, res){
    const id = Number(req.params.id);
    const update = req.body;
    const updatedDevice = await deviceService.updateDevice(id, update);
    res.json(updatedDevice);
}

async function deleteDevice(req, res){
    const id = Number(req.params.id);
    const result = await deviceService.deleteDevice(id);
    if(result !== -1) res.send("Device deleted");
    else res.send("Device not found");
}

module.exports = {
    getDevices,
    getDevice,
    postDevices,
    updateDevice,
    deleteDevice,
};