const request = require("supertest");

// Replace the device service with a mock.
jest.mock("../src/services/device.service", () => ({
    getAllDevices: jest.fn(),
    getDeviceById: jest.fn(),
    createNewDevice: jest.fn(),
    updateDevice: jest.fn(),
    deleteDevice: jest.fn(),
}));

const deviceService = require("../src/services/device.service");
const app = require("../src/app");

describe("GET /api/devices", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("returns all devices successfully", async () => {
        const mockDevices = [
            {
                id: 1,
                hostname: "router-01",
                ip_address: "192.168.1.1",
                status: "ONLINE",
            },
            {
                id: 2,
                hostname: "switch-01",
                ip_address: "192.168.1.2",
                status: "OFFLINE",
            },
        ];

        deviceService.getAllDevices.mockResolvedValue(mockDevices);

        const response = await request(app)
            .get("/api/devices");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockDevices);
        expect(deviceService.getAllDevices).toHaveBeenCalledTimes(1);
    });
});


describe("GET /api/devices/:id", () => {
    test("returns a device successfully", async () => {
        const mockDevice = {
            id: 1,
            hostname: "router-01",
            ip_address: "192.168.1.1",
            status: "ONLINE",
        };

        deviceService.getDeviceById.mockResolvedValue(mockDevice);

        const response = await request(app)
            .get("/api/devices/1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockDevice);
        expect(deviceService.getDeviceById).toHaveBeenCalledWith(1);
    });
});


describe("POST /api/devices", () => {
    test("creates a device successfully", async () => {
                const newDevice = {
            id: 3,
            hostname: "server-01",
            ip_address: "192.168.1.3",
            status: "active",
        };

        deviceService.createNewDevice.mockResolvedValue(newDevice);

        const response = await request(app)
            .post("/api/devices")
            .send({
                hostname: "server-01",
                ip_address: "192.168.1.3",
                status: "active",
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(newDevice);
        expect(deviceService.createNewDevice).toHaveBeenCalledTimes(1);
    });
});

