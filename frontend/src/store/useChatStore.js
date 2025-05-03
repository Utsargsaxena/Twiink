import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data }); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages, users } = get();
    const { authUser } = useAuthStore.getState();
  
    const tempMessage = {
      _id: Date.now().toString(), // temporary ID
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text || "",
      image: messageData.image || "",
      createdAt: new Date().toISOString(),
    };
  
    // Optimistically update UI
    set({ messages: [...messages, tempMessage] });
  
    // Move selected user to top
    const updatedUsers = [
      selectedUser,
      ...users.filter((u) => u._id !== selectedUser._id),
    ];
    set({ users: updatedUsers });
  
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
  
      // Replace temp message with real one
      const updatedMessages = get().messages.map((msg) =>
        msg._id === tempMessage._id ? res.data : msg
      );
      set({ messages: updatedMessages });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },
  
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;

      if (isMessageSentFromSelectedUser) {
        set({
          messages: [...get().messages, newMessage],
        });
      }

      // Move sender to top of user list
      const { users } = get();
      const senderId = newMessage.senderId;
      const user = users.find((u) => u._id === senderId);

      if (user) {
        const updatedUsers = [
          user,
          ...users.filter((u) => u._id !== senderId),
        ];
        set({ users: updatedUsers });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
