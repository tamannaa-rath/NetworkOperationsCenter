const alerts = [
    {
        id: 1,
        deviceId: 1,
        severity: "WARNING",
        status: "ACTIVE",
        message: "CPU usage exceeded 80%",
        createdAt: "2026-08-10T10:30:00Z",
        acknowledgedAt: null,
        acknowledgedBy: null
    },
    {
        id: 2,
        deviceId: 3,
        severity: "CRITICAL",
        status: "ACTIVE",
        message: "Device is unreachable",
        createdAt: "2026-08-10T11:15:00Z",
        acknowledgedAt: null,
        acknowledgedBy: null
    },
    {
        id: 3,
        deviceId: 2,
        severity: "WARNING",
        status: "ACKNOWLEDGED",
        message: "Memory usage exceeded 75%",
        createdAt: "2026-08-10T09:00:00Z",
        acknowledgedAt: "2026-08-10T09:10:00Z",
        acknowledgedBy: 1
    }
];

module.exports = alerts;