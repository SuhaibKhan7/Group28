import express, { Request, Response } from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const port = 3000;

app.use(cors());
app.use(express.json());

wss.on("connection", (ws: WebSocket) => {
  console.log("New connection established");
  ws.send(JSON.stringify({ type: "ack", message: "Websockets Connected" }));

  ws.on("message", (message: string) => {
    console.log("Message received from client:", message);
  });

  ws.on("error", (error: Error) => {
    console.log("Error:", error.message);
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });
});

app.post("/api/image-uploaded-event", (req: Request, res: Response) => {
  console.log("Image Event Received");
  const notification = {
    type: "new-image-notification",
    message: "New Image Uploaded",
  };

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(notification));
    }
  });

  res.status(200).send("Notification sent to WebSocket clients");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Real-time Notification Server is running!");
});

server.listen(port, () => {
  console.log(
    `HTTP and WebSocket server listening on http://localhost:${port}`
  );
});
