const { z } = require("zod");

const createAlertSchema = z.object({
    device_id: z.number().int().positive(),

    severity: z.enum([
        "WARNING",
        "CRITICAL"
    ]),

    message: z.string().trim().min(1)
});


const updateAlertSchema = z.object({
    device_id: z.number().int().positive().optional(),

    severity: z.enum([
        "WARNING",
        "CRITICAL"
    ]).optional(),

    message: z.string().trim().min(1).optional(),

    status: z.enum([
        "ACTIVE",
        "ACKNOWLEDGED",
        "RESOLVED"
    ]).optional()
});


const acknowledgeAlertSchema = z.object({
    user_id: z.number().int().positive()
});


module.exports = {
    createAlertSchema,
    updateAlertSchema,
    acknowledgeAlertSchema
};