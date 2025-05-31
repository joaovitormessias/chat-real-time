import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

// Permite gerenciarmos o estado global dos componentes

// Estado das variaveis
export const useAuthStore = create((set, get) => ({
  authUser: null, // Por que nao se sabe se o usuário está autenticado
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  // Verificar se o usuário está autenticado ou não
  isCheckingAuth: true,

  onlineUsers: [],

  socket: null,

  checkAuth: async () => {
    // Enviar uma solicitação ao endpoint
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });

      // Facila a depuração
    } catch (error) {
      console.log("Erro no checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  // Lógica de cadastro
  signup: async (data) => {
    // Alterando estado da variavel
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/cadastro", data);
      // Exibindo mensagem de sucesso
      set({ authUser: res.data });
      toast.success("Sua conta foi criada com sucesso truta");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Lógica para entrar
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      // Se comunica com o endpoint backend
      const res = await axiosInstance.post("/auth/entrar", data);
      set({ authUser: res.data });
      toast.success("É bom esconder esse perfil do FBI");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  // Lógica para sair
  logout: async () => {
    try {
      await axiosInstance.post("/auth/sair");
      set({ authUser: null });
      toast.success("Você saiu com êxito");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  // Lógica para atualizar a foto de perfil do usuário
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Ta de cara nova");
    } catch (error) {
      console.log("erro ao atualizar perfil:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Conexão com o socket
  connectSocket: () => {
    // Se o usuário não estiver autenticado ele nao vai criar a conexão
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    // Mapeando para exibir usuários online
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  // Desconexão
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
