import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
      const socketInstance = io(import.meta.env.VITE_API_BASE_URL, {
        auth: {
          token: localStorage.getItem("token"),
        },
    // Initialize socket connection
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);

      // Automatically try to reconnect
      if (reason === "io server disconnect") {
        socketInstance.connect();
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  if (!socket) return null; // Wait for socket to initialize

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
