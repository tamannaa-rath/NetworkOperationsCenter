const pool = require("../config/db");

async function getAllDevices() {
    const devices = await pool.query("SELECT * FROM devices");
    return devices.rows;
}

async function getDeviceById(id) {
    const device = await pool.query("SELECT * FROM devices WHERE id = $1", [id]);
    return device.rows[0];
}

async function createNewDevice(device){
    const result = await pool.query(
        "INSERT INTO devices(hostname, ip_address, status) VALUES($1, $2, $3) RETURNING *",
        [device.hostname, device.ipAddress, device.status]
    );
    return result.rows[0];
}

async function updateDevice(id, update) {
    const device = await getDeviceById(id);
    if (!device) {
        return null;
    }
    const result = await pool.query(
        "UPDATE devices SET hostname = $1, ip_address = $2, status = $3 WHERE id = $4 RETURNING *",
        [update.hostname, update.ipAddress, update.status, id]
    );

    return result.rows[0];
}

async function deleteDevice(id){
    const result = await pool.query("DELETE FROM devices WHERE id = $1", [id]);
    return result.rowCount > 0;
}

module.exports = {
    getAllDevices,
    getDeviceById,
    createNewDevice,
    updateDevice,
    deleteDevice,
};