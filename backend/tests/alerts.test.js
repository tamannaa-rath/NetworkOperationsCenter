
const request = require("supertest");

// Mock the alert service so tests don't access the database.
jest.mock("../src/services/alert.service", () => ({
    getAllAlerts: jest.fn(),
    getAlertById: jest.fn(),
    createAlert: jest.fn(),
    updateAlert: jest.fn(),
    deleteAlert: jest.fn(),
    acknowledgeAlert: jest.fn(),
}));

// Mock Socket.IO because update and acknowledge emit events.
jest.mock("../src/socket/socket", () => ({
    getIO: jest.fn(() => ({
        emit: jest.fn(),
    })),
}));

const app = require("../src/app");
const alertService = require("../src/services/alert.service");

describe("Alerts API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/alerts", () => {
        test("returns all alerts successfully", async () => {
            const mockAlerts = [
                {
                    id: 1,
                    device_id: 1,
                    severity: "CRITICAL",
                    status: "ACTIVE",
                    message: "High CPU usage detected",
                },
                {
                    id: 2,
                    device_id: 2,
                    severity: "WARNING",
                    status: "ACTIVE",
                    message: "High network latency detected",
                },
            ];

            alertService.getAllAlerts.mockResolvedValue(mockAlerts);

            const response = await request(app)
                .get("/api/alerts");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockAlerts);
            expect(alertService.getAllAlerts).toHaveBeenCalledTimes(1);
        });
    });

    describe("GET /api/alerts/:id", () => {
        test("returns one alert successfully", async () => {
            const mockAlert = {
                id: 1,
                device_id: 1,
                severity: "CRITICAL",
                status: "ACTIVE",
                message: "High CPU usage detected",
            };

            alertService.getAlertById.mockResolvedValue(mockAlert);

            const response = await request(app)
                .get("/api/alerts/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockAlert);
            expect(alertService.getAlertById).toHaveBeenCalledWith(1);
        });
    });

    describe("POST /api/alerts", () => {
        test("creates an alert successfully", async () => {
            const newAlert = {
                id: 3,
                device_id: 1,
                severity: "CRITICAL",
                status: "ACTIVE",
                message: "High CPU usage detected",
            };

            alertService.createAlert.mockResolvedValue(newAlert);

            const response = await request(app)
                .post("/api/alerts")
                .send({
                    device_id: 1,
                    severity: "CRITICAL",
                    message: "High CPU usage detected",
                });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newAlert);
            expect(alertService.createAlert).toHaveBeenCalledTimes(1);
        });
    });

    describe("PUT /api/alerts/:id", () => {
        test("updates an alert successfully", async () => {
            const updatedAlert = {
                id: 1,
                device_id: 1,
                severity: "WARNING",
                status: "ACTIVE",
                message: "High memory usage detected",
            };

            alertService.updateAlert.mockResolvedValue(updatedAlert);

            const response = await request(app)
                .put("/api/alerts/1")
                .send({
                    severity: "WARNING",
                    message: "High memory usage detected",
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedAlert);
            expect(alertService.updateAlert).toHaveBeenCalledWith(1, {
                severity: "WARNING",
                message: "High memory usage detected",
            });
        });
    });

    describe("POST /api/alerts/:id/acknowledge", () => {
        test("acknowledges an alert successfully", async () => {
            const acknowledgedAlert = {
                id: 1,
                device_id: 1,
                severity: "CRITICAL",
                status: "ACKNOWLEDGED",
                message: "High CPU usage detected",
                acknowledged_by: 7,
            };

            alertService.acknowledgeAlert.mockResolvedValue(
                acknowledgedAlert
            );

            const response = await request(app)
                .post("/api/alerts/1/acknowledge")
                .send({
                    user_id: 7,
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(acknowledgedAlert);
            expect(alertService.acknowledgeAlert).toHaveBeenCalledWith(1, 7);
        });
    });

    describe("DELETE /api/alerts/:id", () => {
        test("deletes an alert successfully", async () => {
            const deletedAlert = {
                id: 1,
                device_id: 1,
                severity: "CRITICAL",
                status: "ACTIVE",
                message: "High CPU usage detected",
            };

            alertService.deleteAlert.mockResolvedValue(deletedAlert);

            const response = await request(app)
                .delete("/api/alerts/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Alert deleted successfully",
                alert: deletedAlert,
            });
            expect(alertService.deleteAlert).toHaveBeenCalledWith(1);
        });
    });
});
