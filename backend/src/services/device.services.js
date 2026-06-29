const devices = require("../data/devices")

async function getAllDevices() {
    return devices;
}

async function getDeviceById(id) {
    const devices = await getAllDevices();
    return devices.find(device => device.id === id);
}

async function createNewDevice(device){
    devices.push(device);
    return device;
}

module.exports = {
    getAllDevices,
    getDeviceById,
    createNewDevice,
};