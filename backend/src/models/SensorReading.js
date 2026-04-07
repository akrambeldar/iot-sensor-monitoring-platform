const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const SensorReading = sequelize.define(
  "SensorReading",
  {
    sensor_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pressure: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    vibration: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "normal",
    },
    recorded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "sensor_readings",
    timestamps: false,
  }
);

module.exports = SensorReading;