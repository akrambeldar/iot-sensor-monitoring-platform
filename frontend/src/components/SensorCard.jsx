function SensorCard({ sensor }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "normal":
        return "green";
      case "warning":
        return "orange";
      case "critical":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="sensor-card">
      <h3>{sensor.sensor_id}</h3>
      <p><strong>Temperature:</strong> {sensor.temperature}</p>
      <p><strong>Pressure:</strong> {sensor.pressure}</p>
      <p><strong>Vibration:</strong> {sensor.vibration}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span style={{ color: getStatusColor(sensor.status), fontWeight: "bold" }}>
          {sensor.status}
        </span>
      </p>
      <p><strong>Recorded At:</strong> {new Date(sensor.recorded_at).toLocaleString()}</p>
    </div>
  );
}

export default SensorCard;