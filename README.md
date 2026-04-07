# IoT Sensor Monitoring Platform

A full-stack real-time IoT monitoring system that simulates industrial machine telemetry, processes sensor data through a backend API, stores historical readings in PostgreSQL, and visualises live updates on a React dashboard.

## Project Overview

This project was built to simulate how real-world industrial IoT systems monitor machine health using telemetry streams.

The platform currently supports:

* Multi-sensor telemetry simulation using Python
* REST API ingestion with Node.js and Express
* Threshold-based alert classification
* Historical storage in PostgreSQL
* Live dashboard using React
* Real-time updates using WebSocket
* Multi-service containerisation using Docker Compose
* Automated backend testing with Jest and Supertest
* CI pipeline using GitHub Actions

## Architecture

```text
Python Sensor Simulator
        ↓
Node.js + Express API
        ↓
PostgreSQL Database
        ↓
WebSocket Broadcast
        ↓
React Dashboard
```

## Tech Stack

### Backend

* Node.js
* Express
* Sequelize ORM
* WebSocket (`ws`)
* PostgreSQL

### Frontend

* React
* Vite
* Axios

### Simulator

* Python
* Requests

### DevOps / Engineering

* Docker
* Docker Compose
* GitHub Actions
* Jest
* Supertest

## Features

### Sensor Simulator

* Simulates multiple IoT sensors
* Generates temperature, pressure, and vibration data
* Produces normal, warning, and critical scenarios
* Sends telemetry automatically to backend

### Backend API

* POST sensor readings
* GET recent readings
* GET latest reading per sensor
* Threshold-based alert classification
* WebSocket broadcasting for live UI updates

### Frontend Dashboard

* Live sensor status cards
* Recent telemetry table
* Automatic WebSocket updates
* Colour-coded health states

### Testing

* Health-check endpoint tests
* Input validation tests
* Sensor ingestion tests
* Mocked DB writes for fast isolated execution

## Folder Structure

```text
iot-sensor-monitoring/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── websocket/
│   ├── tests/
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── services/
│   └── Dockerfile
│
├── sensor-simulator/
│   ├── simulator.py
│   └── Dockerfile
│
├── .github/workflows/
│   └── ci.yml
│
└── docker-compose.yml
```

## Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Sensor Simulator

```bash
cd sensor-simulator
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python simulator.py
```

## Run with Docker

From the project root:

```bash
docker compose up --build
```

Services:

* Frontend: `http://localhost:5173`
* Backend: `http://localhost:5000`
* PostgreSQL: `localhost:5433`

## Running Tests

```bash
cd backend
npm test
```

## CI Pipeline

The GitHub Actions workflow automatically:

* installs backend dependencies
* runs Jest tests
* validates API behaviour on push and pull request

## Future Improvements

Planned enhancements:

* historical trend charts
* alert notification panel
* Redis pub-sub integration
* authentication and role-based access
* anomaly detection with ML models
* deployment to AWS ECS / EC2

## Author

**Akram Beldar**

* Data Science & Software Engineering Projects
* Melbourne, Australia
