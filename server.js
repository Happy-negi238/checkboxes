import { createServer } from "node:http";
import express from "express";
import path from "node:path";
import { Server } from "socket.io";
import { fileURLToPath } from "node:url";
import { publisher, subscriber, redis } from "./redis-connection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHECKBOX_SIZE = 4000;
const CHECKBOX_STATE_KEY = "checkbox-state";

const rateLimit = new Map();

async function main() {
  const app = express();
  const server = createServer(app);
  const io = new Server();
  const PORT = process.env.PORT || 8080;

  io.attach(server);

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.get("/checkboxes", async (req, res) => {
    const existingState = await redis.get(CHECKBOX_STATE_KEY);
    if (existingState) {
      const remoteData = JSON.parse(existingState);
      return res.json({ checkboxes: remoteData });
    }
    return res.json({ checkboxes: new Array(CHECKBOX_SIZE).fill(false) });
  });

  await subscriber.subscribe("internal-server:checkbox:changed");
  subscriber.on("message", (channel, message) => {
    if (channel === "internal-server:checkbox:changed") {
      const { index, checked } = JSON.parse(message);
      io.emit("socket:message", { index, checked });
    }
  });

  io.on("connection", (socket) => {
    socket.on("user:check", async (data) => {
      const lastOperationTime = rateLimit.get(socket.id);
      if (lastOperationTime) {
        const timeElapsed = Date.now() - lastOperationTime;
        if (timeElapsed < 5 * 1000) {
          socket.emit("server:error", { error: "Take a rest of 5s" });
          return;
        }
      }
      rateLimit.set(socket.id, Date.now());

      const existingState = await redis.get(CHECKBOX_STATE_KEY);
      if (existingState) {
        const remoteData = JSON.parse(existingState);
        remoteData[data.index] = data.checked;
        await redis.set(CHECKBOX_STATE_KEY, JSON.stringify(remoteData));
      } else {
        redis.set(
          CHECKBOX_STATE_KEY,
          JSON.stringify(new Array(CHECKBOX_SIZE).fill(false)),
        );
      }

      await publisher.publish(
        "internal-server:checkbox:changed",
        JSON.stringify(data),
      );
    });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
