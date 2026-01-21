import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5005";

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["polling", "websocket"], 
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log(" Socket disconnected:", reason);
});

export default socket;
