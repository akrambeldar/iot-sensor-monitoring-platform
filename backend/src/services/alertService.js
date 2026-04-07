function determineStatus({ temperature, pressure, vibration }) {
  if (temperature > 80 || pressure > 120 || vibration > 70) {
    return "critical";
  }

  if (temperature > 60 || pressure > 100 || vibration > 50) {
    return "warning";
  }

  return "normal";
}

module.exports = { determineStatus };