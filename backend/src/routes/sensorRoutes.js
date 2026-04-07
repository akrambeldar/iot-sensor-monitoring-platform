const express = require("express");
const router = express.Router();
const {
  createReading,
  getReadings,
  getLatestBySensor,
} = require("../controllers/sensorController");

router.post("/", createReading);
router.get("/", getReadings);
router.get("/latest", getLatestBySensor);

module.exports = router;