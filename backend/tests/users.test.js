
const request = require("supertest");

// Mock the user service so tests don't access PostgreSQL.
jest.mock("../src/services/user.service", () => ({
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    createNewUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
}));

const app = require("../src/app");
const userService = require("../src/services/user.service");

describe("Users API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/users", () => {
        test("returns all users successfully", async () => {
            const mockUsers = [
                {
                    id: 1,
                    name: "Test User",
                    email: "test@example.com",
                    role: "Viewer",
                },
            ];

            userService.getAllUsers.mockResolvedValue(mockUsers);

            const response = await request(app)
                .get("/api/users");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
            expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
        });
    });

    describe("GET /api/users/:id", () => {
        test("returns one user successfully", async () => {
            const mockUser = {
                id: 1,
                name: "Test User",
                email: "test@example.com",
                role: "Viewer",
            };

            userService.getUserById.mockResolvedValue(mockUser);

            const response = await request(app)
                .get("/api/users/1");

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
            expect(userService.getUserById).toHaveBeenCalledWith(1);
        });
    });

    describe("POST /api/users", () => {
        test("creates a user successfully", async () => {
            const newUser = {
                id: 2,
                name: "New User",
                email: "newuser@example.com",
                role: "Viewer",
            };

            userService.createNewUser.mockResolvedValue(newUser);

            const response = await request(app)
                .post("/api/users")
                .send({
                    name: "New User",
                    email: "newuser@example.com",
                    password: "testpass123",
                    role: "viewer",
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(newUser);
            expect(userService.createNewUser).toHaveBeenCalledTimes(1);
        });
    });

    describe("PUT /api/users/:id", () => {
        test("updates a user successfully", async () => {
            const updatedUser = {
                id: 1,
                name: "Updated User",
                email: "updated@example.com",
                role: "Viewer",
            };

            userService.updateUser.mockResolvedValue(updatedUser);

            const response = await request(app)
                .put("/api/users/1")
                .send({
                    name: "Updated User",
                    email: "updated@example.com",
                    password: "testpass123",
                    role: "viewer",
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedUser);
            expect(userService.updateUser).toHaveBeenCalledWith(1, {
                name: "Updated User",
                email: "updated@example.com",
                password: "testpass123",
                role: "viewer",
            });
        });
    });

    describe("DELETE /api/users/:id", () => {
        test("deletes a user successfully", async () => {
            userService.deleteUser.mockResolvedValue(true);

            const response = await request(app)
                .delete("/api/users/1");

            expect(response.status).toBe(200);
            expect(response.text).toBe("User deleted");
            expect(userService.deleteUser).toHaveBeenCalledWith(1);
        });
    });
});
