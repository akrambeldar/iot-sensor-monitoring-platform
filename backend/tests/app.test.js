const request = require("supertest");
const app = require("../src/app");
const SensorReading = require("../src/models/SensorReading");

jest.mock("../src/models/SensorReading", () => ({
  create: jest.fn(),
}));

describe("IoT Sensor Monitoring API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET / should return API status message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "IoT Sensor Monitoring API is running"
    );
  });

  test("POST /api/sensors should fail when required fields are missing", async () => {
    const response = await request(app).post("/api/sensors").send({
      sensor_id: "sensor_001",
      temperature: 55.5,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message", "Missing required fields");
  });

  test("POST /api/sensors should create a sensor reading", async () => {
    SensorReading.create.mockResolvedValue({
      id: 1,
      sensor_id: "sensor_001",
      temperature: 65.5,
      pressure: 95.2,
      vibration: 45.1,
      status: "warning",
      recorded_at: "2026-04-07T10:00:00.000Z",
    });

    const response = await request(app).post("/api/sensors").send({
      sensor_id: "sensor_001",
      temperature: 65.5,
      pressure: 95.2,
      vibration: 45.1,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("sensor_id", "sensor_001");
    expect(response.body).toHaveProperty("status", "warning");
    expect(SensorReading.create).toHaveBeenCalledTimes(1);
  });
});