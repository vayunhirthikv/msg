import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

//set=>change the state get=>read the current state
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });//checking the authentication

    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket(res.data);

    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });//finished checking the authentication
    }
  },

  clearAuth: () => {
    set({ authUser: null, isCheckingAuth: false, onlineUsers: [] });
    get().disconnectSocket();
  },

  connectSocket: (user) => {
    if (!user || get().socket?.connected) return; //no user or already connected, we need to stop
    //socket?.connected returns true if the user is connected
    
    const socket = io(BASE_URL, { query: { userId: user._id } });//backend recieves user id via socket.handshake.query.userId

    set({ socket:socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect(); //disconnect if the user is connected
    set({ socket: null });
  },
}));
