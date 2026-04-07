let wss = null;

function setWebSocketServer(server) {
  wss = server;
}

function broadcastNewReading(reading) {
  if (!wss) return;

  const message = JSON.stringify({
    type: "NEW_READING",
    payload: reading,
  });

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
}

module.exports = {
  setWebSocketServer,
  broadcastNewReading,
};