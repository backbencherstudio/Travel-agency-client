import { FaRegBell } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import image from "../../assets/img/logo.png";
import { IoMenu } from "react-icons/io5";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { useContext, useState, useEffect, useRef } from "react";
import moment from "moment";
import NotificationApis from "../../Apis/NotificationApis";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  auth: {
    token: token,
  },
});

socket.on("connect", () => {
  // console.log("Admin Dashboard Connected to server!");
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected:", reason);
});

const AdminHeader = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notificationRef = useRef(null);

  // console.log('user', user);

  // Request browser notification permission on component mount
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        // console.log("Notification permission:", permission);
      });
    }
  }, []);

  // Fetch existing notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await NotificationApis.getNotification();
      if (response.success) {
        // Filter out review notifications that have been handled
        const filteredNotifications = response.data.data.filter(notification => {
          const isReviewNotification = notification.notification_event?.type?.toLowerCase() === 'review';
          const hasBeenHandled = notification.is_read || notification.is_deleted;
          return !isReviewNotification || !hasBeenHandled;
        });
        setNotifications(filteredNotifications);
      } else {
        console.error("Error fetching notifications:", response.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle notification navigation
  const handleNotificationNavigation = (notification) => {
    const notificationType = notification?.notification_event?.type?.toLowerCase();
    
    switch (notificationType) {
      case 'booking':
        navigate('/dashboard/bookings');
        break;
      case 'package':
        navigate('/dashboard/packages');
        break;
      case 'payment':
        navigate('/dashboard/payment');
        break;
      case 'review':
        navigate('/dashboard/review');
        break;
      // Add more cases as needed
      default:
        // Default fallback route if type doesn't match
        navigate('/dashboard');
    }
    setShowNotifications(false);
  };


  // Use useEffect to fetch notifications when component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle real-time notifications
  useEffect(() => {
    socket.on("notification", (notification) => {
      console.log('notification', notification);
 
      // Check receiver_id and user type conditions
      if (notification.receiver_id === null) {
        // Show notification only to admin users
        if (user?.type?.toLowerCase() === 'admin') {
          addNewNotification(notification);
        }
      } else {
        // Show notification if receiver_id matches user's ID
        if (notification.receiver_id === user?.id) {
          addNewNotification(notification);
        }
      }
    });

    // Helper function to add new notification
    const addNewNotification = (notification) => {
      const newNotification = {
        id: notification.entity_id,
        notification_event: {
          text: notification.text,
          type: notification.type
        },
        created_at: new Date().toISOString(),
        is_read: false,
        is_deleted: false
      };

      setNotifications((prev) => [newNotification, ...prev]);

      // Show browser notification if permitted
      if (Notification.permission === "granted") {
        const browserNotification = new Notification(
          `New ${notification.type}`,
          {
            body: notification.text,
            icon: "/default-avatar.png",
          }
        );

        // Update browser notification click handler
      browserNotification.onclick = () => {
        window.focus();
        handleNotificationNavigation(newNotification);
      };
      }
    };

    return () => {
      socket.off("notification");
    };
  }, [user]); // Added user to dependency array

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearNotification = async (id) => {
    try {
      const res = await NotificationApis.deleteNotification(id);
      console.log('delete response', res);

      if (res.success) {
        // Remove the notification from state
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id)
        );
      } else {
        console.error("Failed to delete notification:", res.message);
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      const res = await NotificationApis.deleteAllNotifications();
      console.log("delete all response", res);


      if (res.success) {
        // Clear all notifications from state
        setNotifications([]);
      } else {
        console.error("Failed to delete all notifications:", res.message);
      }
    } catch (error) {
      console.error("Error deleting all notifications:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-40">
      <div className="ml-0 lg:ml-[200px] px-6 bg-zinc-50 py-5 shadow-md">
        <div className="flex justify-between items-center h-full">
          {/* Sidebar toggle */}
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:flex lg:hidden rounded-sm cursor-pointer"
          >
            <IoMenu className="text-2xl text-orange-500" />
          </div>

          {/* Welcome message */}
          <div className="hidden lg:flex lg:ms-20">
            <p className="text-[#1D1F2C] text-[14px] font-medium">
              Welcome, {user?.name}
            </p>
          </div>

          {/* Notifications and Profile */}
          <div className="flex relative">
            <input
              type="text"
              placeholder="Search"
              className="p-2 border mx-5 rounded-lg bg-no-repeat bg-left pl-10 hidden md:block"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" width="20px" height="20px"><path d="M10 2a8 8 0 015.664 13.736l5.316 5.316a1 1 0 01-1.414 1.414l-5.316-5.316A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"></path></svg>')`,
                backgroundSize: "16px 16px",
                backgroundPosition: "10px center",
              }}
            />
            {/* Notifications */}
            <div
              className="border mr-5 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer relative"
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
              }}
              ref={notificationRef}
            >
              <FaRegBell />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
              {showNotifications && (
                <div
                  className="absolute top-16 md:-right-20 w-80 bg-white shadow-lg rounded-lg p-4 z-50 transition-all duration-300 ease-in-out transform"
                  style={{
                    opacity: showNotifications ? 1 : 0,
                    transform: showNotifications
                      ? "translateY(0)"
                      : "translateY(-10px)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">
                      Notifications
                    </h3>
                    <button
                      className="text-sm text-red-500 hover:underline"
                      onClick={clearAllNotifications}
                    >
                      Clear All
                    </button>
                  </div>
                  <ul className="mt-2 space-y-2 h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <li
                          key={notification?.entity_id}
                          className="flex justify-between items-start gap-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition-colors duration-200"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 mb-1">
                              {notification?.notification_event?.text}
                            </p>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full mb-1">
                              {notification?.notification_event?.type}
                            </span>
                            <p className="text-xs text-gray-400">
                              {moment(notification?.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                            </p>
                          </div>
                          <button
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                            onClick={(e) => {
                          e.stopPropagation(); // Prevent navigation when clicking delete
                          clearNotification(notification.id);
                        }}
                          >
                            <FaTimes />
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-500 text-center py-4">
                        No new notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            {/* User Profile */}
            <div className="flex">
              <div className=" border mr-1 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer">
                <img
                  src={image}
                  className="h-full w-full rounded-full object-cover"
                  alt=""
                />
              </div>
              <div>
                <h1 className="font-semibold text-[16px]">Tren bold</h1>
                <p className="text-[12px] text-[#72777F]">{user?.type}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
