function ReadingsTable({ readings }) {
  return (
    <div className="table-container">
      <h2>Recent Readings</h2>
      <table>
        <thead>
          <tr>
            <th>Sensor ID</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Vibration</th>
            <th>Status</th>
            <th>Recorded At</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((reading) => (
            <tr key={reading.id}>
              <td>{reading.sensor_id}</td>
              <td>{reading.temperature}</td>
              <td>{reading.pressure}</td>
              <td>{reading.vibration}</td>
              <td>{reading.status}</td>
              <td>{new Date(reading.recorded_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReadingsTable;