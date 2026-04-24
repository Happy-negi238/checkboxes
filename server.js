import { createServer } from "node:http";
import express from "express";
import path from "node:path";
import { Server } from "socket.io";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const app = express();
  const server = createServer(app);
  const io = new Server();

  io.attach(server);

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  io.on("connection", (socket) => {
    socket.on("user:check", (data) => {
      socket.broadcast.emit("socket:message", data);
    });
  });

  server.listen(8080, () => {
    console.log("Server is running on port 8080");
  });
}

main();
