const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/device.controller");
const validate = require("../middleware/validate.middleware");
const deviceSchema = require("../schemas/device.schema").deviceSchema;
const updateDeviceSchema = require("../schemas/device.schema").updateDeviceSchema;

router.get("/", deviceController.getDevices);
router.get("/:id", deviceController.getDevice);

router.post("/", validate(deviceSchema), deviceController.postDevices);

router.put("/:id", validate(updateDeviceSchema), deviceController.updateDevice);

router.delete("/:id", deviceController.deleteDevice)

module.exports = router;