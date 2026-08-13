const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pool = require("../config/db");
const JWT_SECRET = process.env.JWT_SECRET || "development-secret";


// REGISTER
async function registerUser(userData) {
    const { name, email, password } = userData;

    // Check if email already exists
    const existingUser = await pool.query(
        `
        SELECT id
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    if (existingUser.rows.length > 0) {
        return null;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(
        password,
        10
    );

    // Insert user
    const result = await pool.query(
        `
        INSERT INTO users (
            name,
            email,
            password_hash,
            role
        )
        VALUES ($1, $2, $3, 'Viewer')
        RETURNING id, name, email, role, created_at
        `,
        [
            name,
            email,
            passwordHash
        ]
    );

    return result.rows[0];
}


// LOGIN
async function loginUser(email, password) {
    // Find user
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    const user = result.rows[0];

    if (!user) {
        return null;
    }

    // Compare password
    const passwordMatches =
        await bcrypt.compare(
            password,
            user.password_hash
        );

    if (!passwordMatches) {
        return null;
    }

    // Generate access token
    const accessToken =
        generateAccessToken(user);

    // Generate refresh token
    const refreshToken =
        crypto.randomBytes(64).toString("hex");

    // Hash refresh token before storing
    const tokenHash =
        hashRefreshToken(refreshToken);

    // Store refresh token
    await pool.query(
        `
        INSERT INTO refresh_tokens (
            user_id,
            token_hash,
            expires_at
        )
        VALUES (
            $1,
            $2,
            CURRENT_TIMESTAMP + INTERVAL '7 days'
        )
        `,
        [
            user.id,
            tokenHash
        ]
    );

    return {
        accessToken,
        refreshToken,
        user: sanitizeUser(user)
    };
}


// REFRESH ACCESS TOKEN
async function refreshAccessToken(refreshToken) {
    const tokenHash =
        hashRefreshToken(refreshToken);

    // Find valid refresh token
    const tokenResult = await pool.query(
        `
        SELECT *
        FROM refresh_tokens
        WHERE token_hash = $1
        AND revoked_at IS NULL
        AND expires_at > CURRENT_TIMESTAMP
        `,
        [tokenHash]
    );

    const storedToken =
        tokenResult.rows[0];

    if (!storedToken) {
        return null;
    }

    // Get user
    const userResult = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [storedToken.user_id]
    );

    const user = userResult.rows[0];

    if (!user) {
        return null;
    }

    // Revoke old refresh token
    await pool.query(
        `
        UPDATE refresh_tokens
        SET revoked_at = CURRENT_TIMESTAMP
        WHERE id = $1
        `,
        [storedToken.id]
    );

    // Create new refresh token
    const newRefreshToken =
        crypto.randomBytes(64).toString("hex");

    const newTokenHash =
        hashRefreshToken(newRefreshToken);

    await pool.query(
        `
        INSERT INTO refresh_tokens (
            user_id,
            token_hash,
            expires_at
        )
        VALUES (
            $1,
            $2,
            CURRENT_TIMESTAMP + INTERVAL '7 days'
        )
        `,
        [
            user.id,
            newTokenHash
        ]
    );

    // Generate new access token
    const accessToken =
        generateAccessToken(user);

    return {
        accessToken,
        refreshToken: newRefreshToken
    };
}


// LOGOUT
async function logoutUser(refreshToken) {
    const tokenHash =
        hashRefreshToken(refreshToken);

    const result = await pool.query(
        `
        UPDATE refresh_tokens
        SET revoked_at = CURRENT_TIMESTAMP
        WHERE token_hash = $1
        AND revoked_at IS NULL
        RETURNING id
        `,
        [tokenHash]
    );

    return result.rows.length > 0;
}


// GET CURRENT USER
async function getUserById(id) {
    const result = await pool.query(
        `
        SELECT
            id,
            name,
            email,
            role,
            created_at
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0] || null;
}


// GENERATE ACCESS TOKEN
function generateAccessToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );
}


// HASH REFRESH TOKEN
function hashRefreshToken(token) {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
}


// SANITIZE USER
function sanitizeUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at
    };
}


module.exports = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    getUserById
};