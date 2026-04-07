const SensorReading = require("../models/SensorReading");
const { determineStatus } = require("../services/alertService");
const { broadcastNewReading } = require("../websocket/socket");

const createReading = async (req, res) => {
  try {
    const { sensor_id, temperature, pressure, vibration } = req.body;

    if (
      !sensor_id ||
      temperature === undefined ||
      pressure === undefined ||
      vibration === undefined
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const status = determineStatus({ temperature, pressure, vibration });

    const reading = await SensorReading.create({
      sensor_id,
      temperature,
      pressure,
      vibration,
      status,
    });

    broadcastNewReading(reading);

    return res.status(201).json(reading);
  } catch (error) {
    console.error("Error creating reading:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getReadings = async (req, res) => {
  try {
    const readings = await SensorReading.findAll({
      order: [["recorded_at", "DESC"]],
      limit: 50,
    });

    return res.status(200).json(readings);
  } catch (error) {
    console.error("Error fetching readings:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getLatestBySensor = async (req, res) => {
  try {
    const readings = await SensorReading.findAll({
      order: [["recorded_at", "DESC"]],
    });

    const latestMap = {};

    for (const reading of readings) {
      if (!latestMap[reading.sensor_id]) {
        latestMap[reading.sensor_id] = reading;
      }
    }

    return res.status(200).json(Object.values(latestMap));
  } catch (error) {
    console.error("Error fetching latest sensor readings:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createReading, getReadings, getLatestBySensor };