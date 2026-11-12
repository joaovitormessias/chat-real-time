import { Server } from "socket.io";
import http from "http";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:5173"], credentials: true },
});

// Route to a user room rather than one socket: multiple tabs share delivery.
export function getReceiverSocketId(userId) {
  return `user:${userId}`;
}
const onlineUsers = new Map();

io.use(async (socket, next) => {
  try {
    const cookies = Object.fromEntries((socket.handshake.headers.cookie || "")
      .split(";").filter(part => part.includes("="))
      .map(part => { const i = part.indexOf("="); return [part.slice(0, i).trim(), part.slice(i + 1)]; }));
    // Identity comes from the signed HTTP-only cookie, never a query parameter.
    const decoded = jwt.verify(cookies.jwt || "", process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("_id");
    if (!user) return next(new Error("Unauthorized"));
    socket.data.userId = user._id.toString();
    next();
  } catch {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", socket => {
  const userId = socket.data.userId;
  socket.join(getReceiverSocketId(userId));
  onlineUsers.set(userId, (onlineUsers.get(userId) || 0) + 1);
  io.emit("getOnlineUsers", [...onlineUsers.keys()]);
  socket.on("disconnect", () => {
    const remaining = onlineUsers.get(userId) - 1;
    if (remaining > 0) onlineUsers.set(userId, remaining);
    else onlineUsers.delete(userId);
    io.emit("getOnlineUsers", [...onlineUsers.keys()]);
  });
});

export { io, app, server };
