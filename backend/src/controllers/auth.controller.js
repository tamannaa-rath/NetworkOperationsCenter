const authService = require("../services/auth.service");


async function register(req, res) {
    const user = req.body;

    const newUser = await authService.registerUser(user);

    if (!newUser) {
        return res.status(409).json({
            message: "Email already registered"
        });
    }

    res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });
}


async function login(req, res) {
    const { email, password } = req.body;

    const result = await authService.loginUser(
        email,
        password
    );

    if (!result) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    res.json(result);
}


async function refresh(req, res) {
    const { refreshToken } = req.body;

    const result =
        await authService.refreshAccessToken(refreshToken);

    if (!result) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }

    res.json(result);
}


async function logout(req, res) {
    const { refreshToken } = req.body;

    const success =
        await authService.logoutUser(refreshToken);

    if (!success) {
        return res.status(401).json({
            message: "Invalid refresh token"
        });
    }

    res.json({
        message: "Logged out successfully"
    });
}


async function getCurrentUser(req, res) {
    const user = await authService.getUserById(req.user.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
}


module.exports = {
    register,
    login,
    refresh,
    logout,
    getCurrentUser
};