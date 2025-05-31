// Permite a configuração eficiente do meu backend
import express from "express";
// Carrega as variáveis do arquivo .env
import dotenv from "dotenv";
// Separa os cookies
import cookieParser from "cookie-parser";

// Rotas 'URLS' do meu sistema
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// Comunicação entre o front e back
import cors from "cors";

import path from "path";

// Arquivo de conexão do banco de dados
import { connectDB } from "./lib/db.js";

// Acessa dados sensíveis do meu arquivo .env
dotenv.config();

const PORTA = process.env.PORTA;

const __dirname = path.resolve();

// Permite extrair dados do arquivo JSON
app.use(express.json());

app.use(cookieParser());

// Configurando porta de comunicação
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Rota padrão da APIe
app.use("/api/auth", authRoutes);

// Rota de mensagens
app.use("/api/messages", messageRoutes);


// Verifica se está em produção
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*{splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORTA, () => {
  console.log("Servidor rodando na PORTA: " + PORTA);
  connectDB();
});
