const { z } = require("zod");

const deviceSchema = z.object({
    hostname: z.string().trim().min(3),
    ip_address: z.ipv4(),
    status: z.enum(["active", "inactive", "maintenance"]),
});

const updateDeviceSchema = z.object({
    hostname: z.string().trim().min(3).optional(),
    ip_address: z.ipv4().optional(),
    status: z.enum(["active", "inactive", "maintenance"]).optional(),
});

module.exports = {
    deviceSchema,
    updateDeviceSchema
};