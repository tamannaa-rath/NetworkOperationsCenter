const { z } = require("zod");

const deviceSchema = z.object({
    hostname: z.string().trim().min(3),
    ipAddress: z.ipv4(),
    status: z.enum(["active", "inactive", "maintenance"]),
});

module.exports = deviceSchema;