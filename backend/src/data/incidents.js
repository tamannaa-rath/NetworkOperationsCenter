const incidents = [
    {
        id: 1,
        title: "Router CPU Overload",
        description: "CPU usage has remained above 90% for more than 5 minutes.",
        severity: "CRITICAL",
        status: "OPEN",
        deviceId: 1,
        assignedTo: null,
        createdAt: "2026-08-10T10:30:00Z",
        assignedAt: null,
        resolvedAt: null,
        resolution: null,
        timeline: [
            {
                id: 1,
                userId: 1,
                message: "Incident created automatically from CPU alert.",
                createdAt: "2026-08-10T10:30:00Z"
            }
        ]
    },

    {
        id: 2,
        title: "Firewall Unreachable",
        description: "Firewall has stopped responding to network requests.",
        severity: "CRITICAL",
        status: "IN_PROGRESS",
        deviceId: 3,
        assignedTo: 1,
        createdAt: "2026-08-10T11:15:00Z",
        assignedAt: "2026-08-10T11:20:00Z",
        resolvedAt: null,
        resolution: null,
        timeline: [
            {
                id: 1,
                userId: 1,
                message: "Investigating firewall connectivity.",
                createdAt: "2026-08-10T11:25:00Z"
            }
        ]
    }
];

module.exports = incidents;