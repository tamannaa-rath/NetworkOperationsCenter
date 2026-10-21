
const request = require("supertest");

// Mock the audit service so tests don't access PostgreSQL.
jest.mock("../src/services/audit.service", () => ({
    getAllAuditLogs: jest.fn(),
    getAuditLogById: jest.fn(),
    createAuditLog: jest.fn(),
}));

const app = require("../src/app");
const auditService = require("../src/services/audit.service");

describe("Audit Logs API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/audit-logs", () => {
        test("returns all audit logs successfully", async () => {
            const mockLogs = [
                {
                    id: 1,
                    user_id: 1,
                    action: "CREATE",
                    resource_type: "device",
                    resource_id: 5,
                    description: "Device created",
                    ip_address: "127.0.0.1",
                },
            ];

            auditService.getAllAuditLogs.mockResolvedValue(mockLogs);

            const response = await request(app)
                .get("/api/audit-logs");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockLogs);
            expect(auditService.getAllAuditLogs).toHaveBeenCalledTimes(1);
        });
    });

    describe("GET /api/audit-logs/:id", () => {
        test("returns one audit log successfully", async () => {
            const mockLog = {
                id: 1,
                user_id: 1,
                action: "CREATE",
                resource_type: "device",
                resource_id: 5,
                description: "Device created",
                ip_address: "127.0.0.1",
            };

            auditService.getAuditLogById.mockResolvedValue(mockLog);

            const response = await request(app)
                .get("/api/audit-logs/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockLog);
            expect(auditService.getAuditLogById).toHaveBeenCalledWith(1);
        });

        test("returns 404 when the audit log does not exist", async () => {
            auditService.getAuditLogById.mockResolvedValue(null);

            const response = await request(app)
                .get("/api/audit-logs/999");

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                message: "Audit log not found",
            });
            expect(auditService.getAuditLogById).toHaveBeenCalledWith(999);
        });
    });

    describe("POST /api/audit-logs", () => {
        test("creates an audit log successfully", async () => {
            const logData = {
                user_id: 1,
                action: "CREATE",
                resource_type: "DEVICE",
                resource_id: 5,
                description: "Device created",
                ip_address: "127.0.0.1",
            };

            const createdLog = {
                id: 2,
                ...logData,
            };

            auditService.createAuditLog.mockResolvedValue(createdLog);

            const response = await request(app)
                .post("/api/audit-logs")
                .send(logData);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(createdLog);
            expect(auditService.createAuditLog).toHaveBeenCalledWith(logData);
        });
    });
});
