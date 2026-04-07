import { useEffect, useState } from "react";
import { fetchLatestSensors, fetchRecentReadings } from "./services/api";
import SensorCard from "./components/SensorCard";
import ReadingsTable from "./components/ReadingsTable";
import "./index.css";

function App() {
  const [latestSensors, setLatestSensors] = useState([]);
  const [recentReadings, setRecentReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInitialData = async () => {
    try {
      const [latest, readings] = await Promise.all([
        fetchLatestSensors(),
        fetchRecentReadings(),
      ]);

      setLatestSensors(latest);
      setRecentReadings(readings);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();

    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === "NEW_READING") {
          const newReading = message.payload;

          setRecentReadings((prev) => [newReading, ...prev].slice(0, 50));

          setLatestSensors((prev) => {
            const updated = prev.filter(
              (sensor) => sensor.sensor_id !== newReading.sensor_id
            );
            return [newReading, ...updated];
          });
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  if (loading) {
    return <div className="app"><h2>Loading dashboard...</h2></div>;
  }

  return (
    <div className="app">
      <h1>IoT Sensor Monitoring Dashboard</h1>

      <section>
        <h2>Live Sensor Status</h2>
        <div className="sensor-grid">
          {latestSensors.map((sensor) => (
            <SensorCard key={sensor.sensor_id} sensor={sensor} />
          ))}
        </div>
      </section>

      <section>
        <ReadingsTable readings={recentReadings} />
      </section>
    </div>
  );
}

export default App;