const { z } = require("zod");


const registerSchema = z.object({
    name: z.string()
        .trim()
        .min(2)
        .max(100),

    email: z.string()
        .trim()
        .email(),

    password: z.string()
        .min(8)
        .max(100)
});


const loginSchema = z.object({
    email: z.string()
        .trim()
        .email(),

    password: z.string()
        .min(1)
});


const refreshTokenSchema = z.object({
    refreshToken: z.string()
        .min(1)
});


const logoutSchema = z.object({
    refreshToken: z.string()
        .min(1)
});


module.exports = {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    logoutSchema
};