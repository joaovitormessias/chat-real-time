// Permite a configuração eficiente do meu backend
import express from "express";
// Carrega as variáveis do arquivo .env
import dotenv from "dotenv";
// Separa os cookies
import cookieParser from "cookie-parser";

// Rotas 'URLS' do meu sistema
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// Comunicação entre o front e back
import cors from "cors";

// Arquivo de conexão do banco de dados
import { connectDB } from "./lib/db.js";

// Acessa dados sensíveis do meu arquivo .env
dotenv.config();

// Instanciando biblioteca
const app = express();

const PORTA = process.env.PORTA;

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
app.use("/api/message", messageRoutes);

app.listen(PORTA, () => {
  console.log("Servidor rodando na PORTA: " + PORTA);
  connectDB();
});
