const { z } = require("zod");


const createMetricSchema = z.object({
    deviceId: z.number().int().positive(),

    cpuUsage: z.number()
        .min(0)
        .max(100),

    memoryUsage: z.number()
        .min(0)
        .max(100),

    diskUsage: z.number()
        .min(0)
        .max(100),

    networkThroughput: z.number()
        .min(0),

    latency: z.number()
        .min(0),

    packetLoss: z.number()
        .min(0)
        .max(100)
});


module.exports = {
    createMetricSchema
};