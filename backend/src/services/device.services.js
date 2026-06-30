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

async function updateDevice(id, update) {
    const device = await getDeviceById(id);

    if(update.hostname != null) 
        device.hostname = update.hostname;
    if(update.ipAddress != null) 
        device.ipAddress = update.ipAddress;
    if(update.status != null)
        device.status = update.status;

    return device;
}

async function deleteDevice(id){
    const index = devices.findIndex(device => device.id === id);
    if(index >= 0) devices.splice(index, 1);
    else return -1;
}

module.exports = {
    getAllDevices,
    getDeviceById,
    createNewDevice,
    updateDevice,
    deleteDevice,
};