require("dotenv").config();
const http = require("http");
const WebSocket = require("ws");
const app = require("./src/app");
const sequelize = require("./src/config/db");
const { setWebSocketServer } = require("./src/websocket/socket");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync();
    console.log("Models synchronized.");

    const server = http.createServer(app);

    const wss = new WebSocket.Server({ server });
    setWebSocketServer(wss);

    wss.on("connection", () => {
      console.log("Frontend connected to WebSocket.");
    });

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`WebSocket running on ws://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();