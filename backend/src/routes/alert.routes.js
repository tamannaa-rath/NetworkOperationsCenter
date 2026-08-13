const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alert.controller");
const validate = require("../middleware/validate.middleware");
const { createAlertSchema, updateAlertSchema, acknowledgeAlertSchema } = require("../schemas/alert.schema");

router.get("/", alertController.getAlerts);
router.get("/:id", alertController.getAlert);

router.post("/", validate(createAlertSchema), alertController.createAlert);
router.post("/:id/acknowledge", validate(acknowledgeAlertSchema), alertController.acknowledgeAlert);

router.put("/:id", validate(updateAlertSchema), alertController.updateAlert);

router.delete("/:id", alertController.deleteAlert);

module.exports = router;