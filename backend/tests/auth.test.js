
const request = require("supertest");
const jwt = require("jsonwebtoken");

// Mock the auth service so tests don't access PostgreSQL or Redis.
jest.mock("../src/services/auth.service", () => ({
    registerUser: jest.fn(),
    loginUser: jest.fn(),
    refreshAccessToken: jest.fn(),
    logoutUser: jest.fn(),
    getUserById: jest.fn(),
}));

const app = require("../src/app");
const authService = require("../src/services/auth.service");

describe("Auth API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /api/auth/register", () => {
        test("registers a user successfully", async () => {
            const newUser = {
                id: 1,
                name: "Test User",
                email: "test@example.com",
                role: "Viewer",
            };

            authService.registerUser.mockResolvedValue(newUser);

            const response = await request(app)
                .post("/api/auth/register")
                .send({
                    name: "Test User",
                    email: "test@example.com",
                    password: "testpass123",
                });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                message: "User registered successfully",
                user: newUser,
            });
            expect(authService.registerUser).toHaveBeenCalledTimes(1);
        });
    });

    describe("POST /api/auth/login", () => {
        test("logs in a user successfully", async () => {
            const loginResult = {
                accessToken: "mock-access-token",
                refreshToken: "mock-refresh-token",
                user: {
                    id: 1,
                    name: "Test User",
                    email: "test@example.com",
                    role: "Viewer",
                },
            };

            authService.loginUser.mockResolvedValue(loginResult);

            const response = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "test@example.com",
                    password: "testpass123",
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(loginResult);
            expect(authService.loginUser).toHaveBeenCalledWith(
                "test@example.com",
                "testpass123"
            );
        });
    });

    describe("POST /api/auth/refresh", () => {
        test("refreshes tokens successfully", async () => {
            const tokenResult = {
                accessToken: "new-access-token",
                refreshToken: "new-refresh-token",
            };

            authService.refreshAccessToken.mockResolvedValue(tokenResult);

            const response = await request(app)
                .post("/api/auth/refresh")
                .send({
                    refreshToken: "old-refresh-token",
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(tokenResult);
            expect(authService.refreshAccessToken).toHaveBeenCalledWith(
                "old-refresh-token"
            );
        });
    });

    describe("POST /api/auth/logout", () => {
        test("logs out a user successfully", async () => {
            authService.logoutUser.mockResolvedValue(true);

            const response = await request(app)
                .post("/api/auth/logout")
                .send({
                    refreshToken: "mock-refresh-token",
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: "Logged out successfully",
            });
            expect(authService.logoutUser).toHaveBeenCalledWith(
                "mock-refresh-token"
            );
        });
    });

    describe("GET /api/auth/me", () => {
        test("returns the current user successfully", async () => {
            const currentUser = {
                id: 1,
                name: "Test User",
                email: "test@example.com",
                role: "Viewer",
            };

            authService.getUserById.mockResolvedValue(currentUser);

            const token = jwt.sign(
                {
                    id: 1,
                    email: "test@example.com",
                    role: "Viewer",
                },
                process.env.JWT_SECRET || "development-secret"
            );

            const response = await request(app)
                .get("/api/auth/me")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(currentUser);
            expect(authService.getUserById).toHaveBeenCalledWith(1);
        });
    });
});
