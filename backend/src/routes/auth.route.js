import express from "express";
import {
  checkAuth,
  cadastro,
  entrar,
  sair,
  updateProfile,
} from "../controllers/auth.cotroller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Endpoints

router.post("/cadastro", cadastro);
router.post("/entrar", entrar);
router.post("/sair", sair);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
