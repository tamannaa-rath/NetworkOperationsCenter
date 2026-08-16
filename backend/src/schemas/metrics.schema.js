const { z } = require("zod");


const createMetricSchema = z.object({
    device_id: z.number().int().positive(),

    cpu_usage: z.number()
        .min(0)
        .max(100),

    memory_usage: z.number()
        .min(0)
        .max(100),

    disk_usage: z.number()
        .min(0)
        .max(100),

    network_throughput: z.number()
        .min(0),

    latency: z.number()
        .min(0),

    packet_loss: z.number()
        .min(0)
        .max(100)
});


module.exports = {
    createMetricSchema
};