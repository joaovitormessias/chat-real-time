import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

// Gerenciamento do estado global das variáveis mano

export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Carregando usuários
  getUsers: async () => {
    // Alterando estado da variável
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users"); // Enviando uma requisição para o endpoint
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Carregando mensagens
  getMessages: async (userId) => {
    // Alterando estado da variável
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`); // Enviando uma requisição para o endpoint
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Seleciona o usuário da conversa: otimizar
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
