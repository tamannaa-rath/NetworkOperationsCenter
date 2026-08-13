const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { registerSchema, loginSchema, refreshTokenSchema, logoutSchema } = require("../schemas/auth.schema");


router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", validate(refreshTokenSchema), authController.refresh);
router.post("/logout", validate(logoutSchema), authController.logout);

router.get("/me", authenticate, authController.getCurrentUser);

module.exports = router;