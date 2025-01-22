import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const token = localStorage.getItem("token");

const socket = io(import.meta.env.VITE_API_BASE_URL, {
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

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [isTabActive, setIsTabActive] = useState(true);

    // Track tab visibility
    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabActive(document.visibilityState === "visible");
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Request notification permission when component mounts
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    // Listen for notifications
    useEffect(() => {
        socket.on("message", (data) => {
            if (!isTabActive) {
                // Show browser notification
                if ("Notification" in window && Notification.permission === "granted") {
                    const notification = new Notification(data.data.sender.name, { 
                        body: data.data.message,
                        icon: data.data.sender.avatar_url || '/default-avatar.png',
                        tag: 'chat-message', // Ensures only one notification is shown at a time
                        silent: false, // Will play sound
                        requireInteraction: true, // Notification persists until user interacts
                    });

                    // Position the notification in the bottom left
                    if (notification.onclick === null) {
                        notification.onclick = function(event) {
                            event.preventDefault();
                            window.focus(); // Focus the window when notification is clicked
                            notification.close();
                        };
                    }

                    // Store notification in state
                    setNotifications(prev => [...prev, {
                        title: data.data.sender.name,
                        message: data.data.message,
                        timestamp: new Date(),
                        avatar: data.data.sender.avatar_url
                    }]);

                    // Auto close notification after 5 seconds
                    setTimeout(() => {
                        notification.close();
                    }, 5000);
                }
            }
        });

        return () => {
            socket.off("message");
        };
    }, [isTabActive]);

    return (
        <div className="fixed bottom-4 left-4 z-50">
            {notifications.slice(-3).map((notif, index) => (
                <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg p-4 mb-2 border border-gray-200 max-w-sm"
                    style={{
                        animation: 'slideIn 0.3s ease-out'
                    }}
                >
                    <div className="flex items-center">
                        <img 
                            src={notif.avatar || '/default-avatar.png'} 
                            alt="avatar"
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <h4 className="font-semibold text-gray-800">{notif.title}</h4>
                            <p className="text-gray-600">{notif.message}</p>
                            <small className="text-gray-500">
                                {new Date(notif.timestamp).toLocaleTimeString()}
                            </small>
                        </div>
                    </div>
                </div>
            ))}
            <style>
                {`
                    @keyframes slideIn {
                        from {
                            transform: translateX(-100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Notifications;
