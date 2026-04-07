const express = require("express");
const cors = require("cors");
const sensorRoutes = require("./routes/sensorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "IoT Sensor Monitoring API is running" });
});

app.use("/api/sensors", sensorRoutes);

module.exports = app;