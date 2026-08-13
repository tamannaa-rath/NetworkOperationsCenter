const auditLogs = [
    {
        id: 1,
        userId: 1,
        action: "DEVICE_CREATED",
        resourceType: "DEVICE",
        resourceId: 4,
        description: "Created device router-02",
        ipAddress: "127.0.0.1",
        timestamp: "2026-08-12T10:00:00Z"
    },
    {
        id: 2,
        userId: 1,
        action: "ALERT_ACKNOWLEDGED",
        resourceType: "ALERT",
        resourceId: 2,
        description: "Acknowledged critical firewall alert",
        ipAddress: "127.0.0.1",
        timestamp: "2026-08-12T10:05:00Z"
    },
    {
        id: 3,
        userId: 1,
        action: "INCIDENT_ASSIGNED",
        resourceType: "INCIDENT",
        resourceId: 1,
        description: "Assigned incident to NOC engineer",
        ipAddress: "127.0.0.1",
        timestamp: "2026-08-12T10:10:00Z"
    }
];

module.exports = auditLogs;