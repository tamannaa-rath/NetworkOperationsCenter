async function getAllDevices() {
    return [
        {
            "id": 1,
            "hostname": "router-01",
            "ipAddress": "10.0.0.1",
            "status": "ACTIVE"
        },
        {
            "id": 2,
            "hostname": "switch-01",
            "ipAddress": "10.0.0.2",
            "status": "ACTIVE"
        },
        {
            "id": 3,
            "hostname": "firewall-01",
            "ipAddress": "10.0.0.3",
            "status": "OFFLINE"
        },
    ];
}

module.exports = getAllDevices;