import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchLatestSensors = async () => {
  const response = await API.get("/sensors/latest");
  return response.data;
};

export const fetchRecentReadings = async () => {
  const response = await API.get("/sensors");
  return response.data;
};