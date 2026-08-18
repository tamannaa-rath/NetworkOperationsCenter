const pool = require("../config/db");
const { redisClient } = require("../config/redis");

async function getAllDevices() {
    const cacheKey = "devices:all";
    // CHECK REDIS CACHE
    const cachedDevices =
        await redisClient.get(cacheKey);
    if (cachedDevices) {
        console.log("Devices cache HIT");
        return JSON.parse(cachedDevices);
    }

    // CACHE MISS → QUERY POSTGRESQL
    console.log("Devices cache MISS");
    const result = await pool.query(
        `
        SELECT *
        FROM devices
        ORDER BY id
        `
    );
    const devices = result.rows;
    // STORE RESULT IN REDIS
    await redisClient.set(
        cacheKey,
        JSON.stringify(devices),
        {
            EX: 60
        }
    );
    return devices;
}

async function getDeviceById(id) {
    const device = await pool.query("SELECT * FROM devices WHERE id = $1", [id]);
    return device.rows[0];
}

async function createNewDevice(device){
    const result = await pool.query(
        "INSERT INTO devices(hostname, ip_address, status) VALUES($1, $2, $3) RETURNING *",
        [device.hostname, device.ip_address, device.status]
    );
    await redisClient.del("devices:all");
    return result.rows[0];
}

async function updateDevice(id, update) {
    const device = await getDeviceById(id);

    if (!device) {
        return null;
    }

    const result = await pool.query(
        `UPDATE devices
         SET
            hostname = COALESCE($1, hostname),
            ip_address = COALESCE($2, ip_address),
            status = COALESCE($3, status)
         WHERE id = $4
         RETURNING *`,
        [
            update.hostname,
            update.ip_address,
            update.status,
            id
        ]
    );
    await redisClient.del("devices:all");

    return result.rows[0];
}

async function deleteDevice(id) {
    const result = await pool.query(
        "DELETE FROM devices WHERE id = $1",
        [id]
    );

    if (result.rowCount === 0) {
        return false;
    }

    await redisClient.del("devices:all");

    return true;
}

module.exports = {
    getAllDevices,
    getDeviceById,
    createNewDevice,
    updateDevice,
    deleteDevice,
};