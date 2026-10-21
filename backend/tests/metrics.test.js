
const request = require("supertest");

// Mock the metrics service so tests don't access PostgreSQL.
jest.mock("../src/services/metrics.service", () => ({
    getAllMetrics: jest.fn(),
    getMetricById: jest.fn(),
    getMetricsByDeviceId: jest.fn(),
    createMetric: jest.fn(),
}));

// Mock the alert engine so metric tests don't create real alerts.
jest.mock("../src/services/alertEngine.service", () => ({
    evaluateMetric: jest.fn().mockResolvedValue([]),
}));

const app = require("../src/app");
const metricsService = require("../src/services/metrics.service");
const alertEngine = require("../src/services/alertEngine.service");

describe("Metrics API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/metrics", () => {
        test("returns all metrics successfully", async () => {
            const mockMetrics = [
                {
                    id: 1,
                    device_id: 1,
                    cpu_usage: 45,
                    memory_usage: 60,
                    disk_usage: 50,
                    network_throughput: 100,
                    latency: 20,
                    packet_loss: 0,
                },
            ];

            metricsService.getAllMetrics.mockResolvedValue(mockMetrics);

            const response = await request(app)
                .get("/api/metrics");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockMetrics);
            expect(metricsService.getAllMetrics).toHaveBeenCalledTimes(1);
        });
    });

    describe("GET /api/metrics/:id", () => {
        test("returns one metric successfully", async () => {
            const mockMetric = {
                id: 1,
                device_id: 1,
                cpu_usage: 45,
                memory_usage: 60,
                disk_usage: 50,
                network_throughput: 100,
                latency: 20,
                packet_loss: 0,
            };

            metricsService.getMetricById.mockResolvedValue(mockMetric);

            const response = await request(app)
                .get("/api/metrics/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockMetric);
            expect(metricsService.getMetricById).toHaveBeenCalledWith(1);
        });
    });

    describe("GET /api/metrics/device/:device_id", () => {
        test("returns metrics for a device successfully", async () => {
            const mockMetrics = [
                {
                    id: 1,
                    device_id: 5,
                    cpu_usage: 45,
                    memory_usage: 60,
                    disk_usage: 50,
                    network_throughput: 100,
                    latency: 20,
                    packet_loss: 0,
                },
            ];

            metricsService.getMetricsByDeviceId.mockResolvedValue(
                mockMetrics
            );

            const response = await request(app)
                .get("/api/metrics/device/5");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockMetrics);
            expect(metricsService.getMetricsByDeviceId).toHaveBeenCalledWith(5);
        });
    });

    describe("POST /api/metrics", () => {
        test("creates a metric successfully and evaluates it for alerts", async () => {
            const newMetric = {
                id: 2,
                device_id: 1,
                cpu_usage: 45,
                memory_usage: 60,
                disk_usage: 50,
                network_throughput: 100,
                latency: 20,
                packet_loss: 0,
            };

            metricsService.createMetric.mockResolvedValue(newMetric);

            const response = await request(app)
                .post("/api/metrics")
                .send({
                    device_id: 1,
                    cpu_usage: 45,
                    memory_usage: 60,
                    disk_usage: 50,
                    network_throughput: 100,
                    latency: 20,
                    packet_loss: 0,
                });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newMetric);
            expect(metricsService.createMetric).toHaveBeenCalledTimes(1);
            expect(alertEngine.evaluateMetric).toHaveBeenCalledWith(newMetric);
        });
    });
});
