import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

// Gerenciamento do estado global das variáveis mano

export const useChatStore = create((set, get) => ({
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

  // Função para enviar mensagens
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      // Requisição para API
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      // Atualizando estado da variável
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  // Assinando as mensagens
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      // Erro: quando eu enviava mensagem através de outro usuário estava aparecendo a mensagem na conversa com outro usuário
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if(isMessageSentFromSelectedUser) return;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubcribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
