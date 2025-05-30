// Permite a comunicação em tempo real

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// Retorna o sockerid
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Armazena usuários online
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("Um usuario conectado", socket.id);

  // Se ele ficar online atualizamos o status dele
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // Usado para enviar eventos para todos os clientes conectados
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("Um usuário desconectado", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
