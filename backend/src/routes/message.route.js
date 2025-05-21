import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

// Endpoints

// Mostra os usuários online
router.get("/users", protectRoute, getUsersForSidebar);

// Recebe mensagem entre dois usuários
router.get("/:id", protectRoute, getMessages);

// Enviar mensagem
router.post("/send/:id", protectRoute, sendMessage);

export default router;
