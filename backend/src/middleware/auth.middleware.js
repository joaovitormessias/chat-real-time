import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    // Verificando se possui token

    if (!token) {
      return res
        .status(401)
        .json({ message: "Não autorizado - Nenhum token foi fornecido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Não autorizado - token inválido" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Erro no protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
};
