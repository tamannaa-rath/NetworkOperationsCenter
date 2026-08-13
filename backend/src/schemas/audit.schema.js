const { z } = require("zod");


const createAuditLogSchema = z.object({
    userId: z.number()
        .int()
        .positive(),

    action: z.string()
        .trim()
        .min(1)
        .max(100),

    resourceType: z.enum([
        "USER",
        "DEVICE",
        "ALERT",
        "INCIDENT",
        "METRIC"
    ]),

    resourceId: z.number()
        .int()
        .positive(),

    description: z.string()
        .trim()
        .min(1),

    ipAddress: z.ipv4().optional()
});


module.exports = {
    createAuditLogSchema
};