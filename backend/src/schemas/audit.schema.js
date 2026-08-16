const { z } = require("zod");


const createAuditLogSchema = z.object({
    user_id: z.number()
        .int()
        .positive(),

    action: z.string()
        .trim()
        .min(1)
        .max(100),

    resource_type: z.enum([
        "USER",
        "DEVICE",
        "ALERT",
        "INCIDENT",
        "METRIC"
    ]),

    resource_id: z.number()
        .int()
        .positive(),

    description: z.string()
        .trim()
        .min(1),

    ip_address: z.ipv4().optional()
});


module.exports = {
    createAuditLogSchema
};