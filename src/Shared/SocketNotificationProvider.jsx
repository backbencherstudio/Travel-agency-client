import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
});
// console.log("socket, ", socket);
socket.on("connect", () => {
//   console.log("Socket connected:", socket.id);
});

const SocketNotificationContext = createContext();

const SocketNotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for all incoming notifications
    socket.on("notification", (data) => {
      console.log("Received Notification:", data);

      // Use addNotification function to handle new notifications
      addNotification({
        id: data.id || Date.now(), // Use a unique ID
        message: data.message || data.notification_event?.text || "New data received",
        type: data.type || data.notification_event?.type || "info",
        timestamp: new Date().toLocaleString(),
      });
    });
    console.log("addNotifications, ", addNotification);
    

    // Cleanup socket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to add a new notification
  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  // Function to clear a specific notification
  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Function to clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <SocketNotificationContext.Provider
      value={{ notifications, addNotification, clearNotification, clearAllNotifications }}
    >
      {children}
    </SocketNotificationContext.Provider>
  );
};

export { SocketNotificationProvider, SocketNotificationContext };
