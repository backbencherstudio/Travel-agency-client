import { io } from "socket.io-client";

const token = localStorage.getItem("token");

export const socket = io(import.meta.env.VITE_API_BASE_URL, {
  auth: {
    token: token
  }
});

socket.on("connect", () => {
  console.log("Connected to server!");
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});