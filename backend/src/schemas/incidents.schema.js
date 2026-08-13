const { z } = require("zod");


const createIncidentSchema = z.object({
    title: z.string().trim().min(3).max(200),

    description: z.string().trim().min(1),

    severity: z.enum([
        "WARNING",
        "CRITICAL"
    ]),

    deviceId: z.number().int().positive()
});


const updateIncidentSchema = z.object({
    title: z.string().trim().min(3).max(200).optional(),

    description: z.string().trim().min(1).optional(),

    severity: z.enum([
        "WARNING",
        "CRITICAL"
    ]).optional(),

    deviceId: z.number().int().positive().optional()
});


const assignIncidentSchema = z.object({
    userId: z.number().int().positive()
});


const resolveIncidentSchema = z.object({
    resolution: z.string().trim().min(1)
});


const addIncidentCommentSchema = z.object({
    userId: z.number().int().positive(),

    message: z.string().trim().min(1)
});


module.exports = {
    createIncidentSchema,
    updateIncidentSchema,
    assignIncidentSchema,
    resolveIncidentSchema,
    addIncidentCommentSchema
};