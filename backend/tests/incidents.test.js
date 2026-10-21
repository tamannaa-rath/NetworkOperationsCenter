
const request = require("supertest");

// Mock the incident service so tests don't access PostgreSQL.
jest.mock("../src/services/incidents.service", () => ({
    getAllIncidents: jest.fn(),
    getIncidentById: jest.fn(),
    createIncident: jest.fn(),
    updateIncident: jest.fn(),
    deleteIncident: jest.fn(),
    assignIncident: jest.fn(),
    resolveIncident: jest.fn(),
    addIncidentComment: jest.fn(),
}));

const app = require("../src/app");
const incidentService = require("../src/services/incidents.service");

describe("Incidents API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/incidents", () => {
        test("returns all incidents successfully", async () => {
            const mockIncidents = [
                {
                    id: 1,
                    title: "High CPU usage",
                    description: "CPU usage exceeded the threshold",
                    severity: "CRITICAL",
                    status: "OPEN",
                    device_id: 1,
                },
            ];

            incidentService.getAllIncidents.mockResolvedValue(
                mockIncidents
            );

            const response = await request(app)
                .get("/api/incidents");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockIncidents);
            expect(incidentService.getAllIncidents).toHaveBeenCalledTimes(1);
        });
    });

    describe("GET /api/incidents/:id", () => {
        test("returns one incident successfully", async () => {
            const mockIncident = {
                id: 1,
                title: "High CPU usage",
                description: "CPU usage exceeded the threshold",
                severity: "CRITICAL",
                status: "OPEN",
                device_id: 1,
            };

            incidentService.getIncidentById.mockResolvedValue(
                mockIncident
            );

            const response = await request(app)
                .get("/api/incidents/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockIncident);
            expect(incidentService.getIncidentById).toHaveBeenCalledWith(1);
        });
    });

    describe("POST /api/incidents", () => {
        test("creates an incident successfully", async () => {
            const newIncident = {
                id: 2,
                title: "High CPU usage",
                description: "CPU usage exceeded the threshold",
                severity: "CRITICAL",
                status: "OPEN",
                device_id: 1,
            };

            incidentService.createIncident.mockResolvedValue(newIncident);

            const response = await request(app)
                .post("/api/incidents")
                .send({
                    title: "High CPU usage",
                    description: "CPU usage exceeded the threshold",
                    severity: "CRITICAL",
                    device_id: 1,
                });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newIncident);
            expect(incidentService.createIncident).toHaveBeenCalledTimes(1);
        });
    });

    describe("PUT /api/incidents/:id", () => {
        test("updates an incident successfully", async () => {
            const updatedIncident = {
                id: 1,
                title: "CPU usage critical",
                description: "CPU usage remains above the threshold",
                severity: "CRITICAL",
                status: "OPEN",
                device_id: 1,
            };

            incidentService.updateIncident.mockResolvedValue(
                updatedIncident
            );

            const response = await request(app)
                .put("/api/incidents/1")
                .send({
                    title: "CPU usage critical",
                    description: "CPU usage remains above the threshold",
                    severity: "CRITICAL",
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedIncident);
            expect(incidentService.updateIncident).toHaveBeenCalledWith(1, {
                title: "CPU usage critical",
                description: "CPU usage remains above the threshold",
                severity: "CRITICAL",
            });
        });
    });

    describe("DELETE /api/incidents/:id", () => {
        test("deletes an incident successfully", async () => {
            const deletedIncident = {
                id: 1,
                title: "High CPU usage",
                description: "CPU usage exceeded the threshold",
                severity: "CRITICAL",
                status: "OPEN",
                device_id: 1,
            };

            incidentService.deleteIncident.mockResolvedValue(
                deletedIncident
            );

            const response = await request(app)
                .delete("/api/incidents/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Incident deleted successfully",
                incident: deletedIncident,
            });
            expect(incidentService.deleteIncident).toHaveBeenCalledWith(1);
        });
    });

    describe("POST /api/incidents/:id/assign", () => {
        test("assigns an incident successfully", async () => {
            const assignedIncident = {
                id: 1,
                title: "High CPU usage",
                description: "CPU usage exceeded the threshold",
                severity: "CRITICAL",
                status: "IN_PROGRESS",
                device_id: 1,
                assigned_to: 7,
            };

            incidentService.assignIncident.mockResolvedValue(
                assignedIncident
            );

            const response = await request(app)
                .post("/api/incidents/1/assign")
                .send({
                    user_id: 7,
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(assignedIncident);
            expect(incidentService.assignIncident).toHaveBeenCalledWith(1, 7);
        });
    });

    describe("POST /api/incidents/:id/resolve", () => {
        test("resolves an incident successfully", async () => {
            const resolvedIncident = {
                id: 1,
                title: "High CPU usage",
                description: "CPU usage exceeded the threshold",
                severity: "CRITICAL",
                status: "RESOLVED",
                device_id: 1,
                resolution: "Restarted the affected service",
            };

            incidentService.resolveIncident.mockResolvedValue(
                resolvedIncident
            );

            const response = await request(app)
                .post("/api/incidents/1/resolve")
                .send({
                    resolution: "Restarted the affected service",
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(resolvedIncident);
            expect(incidentService.resolveIncident).toHaveBeenCalledWith(
                1,
                "Restarted the affected service"
            );
        });
    });

    describe("POST /api/incidents/:id/comments", () => {
        test("adds a comment successfully", async () => {
            const newComment = {
                id: 1,
                incident_id: 1,
                user_id: 7,
                message: "Investigating the affected server",
            };

            incidentService.addIncidentComment.mockResolvedValue(newComment);

            const response = await request(app)
                .post("/api/incidents/1/comments")
                .send({
                    user_id: 7,
                    message: "Investigating the affected server",
                });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newComment);
            expect(
                incidentService.addIncidentComment
            ).toHaveBeenCalledWith(
                1,
                7,
                "Investigating the affected server"
            );
        });
    });
});
