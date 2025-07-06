import { FaRegBell } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import image from "../../assets/img/avatar.png";
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
  const [showMessage, setshowMessage] = useState(false);
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
      <div className="ml-0 lg:ml-[200px] px-6 bg-white py-5 shadow-sm">
        <div className="flex justify-between lg:justify-end items-center h-full">
          {/* Sidebar toggle */}
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:flex lg:hidden rounded-sm cursor-pointer"
          >
            <IoMenu className="text-2xl text-orange-500" />
          </div>

          {/* Welcome message */}
          {/* <div className="hidden lg:flex lg:ms-20">
            <p className="text-[#1D1F2C] text-[14px] font-medium">
              Welcome, {user?.name}
            </p>
          </div> */}

          {/* Notifications and Profile */}
          <div className="flex relative">
            {/* <input
              type="text"
              placeholder="Search"
              className="p-2 border mx-5 rounded-lg bg-no-repeat bg-left pl-10 hidden md:block"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" width="20px" height="20px"><path d="M10 2a8 8 0 015.664 13.736l5.316 5.316a1 1 0 01-1.414 1.414l-5.316-5.316A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"></path></svg>')`,
                backgroundSize: "16px 16px",
                backgroundPosition: "10px center",
              }}
            /> */}
            {/* Notifications */}
            <div
              className="bg-[#F7F8F8] mr-5 rounded-lg h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer relative"
              onClick={(e) => {
                e.stopPropagation();
                setshowMessage(!showMessage);
              }}
              ref={notificationRef}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M7 5.75C6.40326 5.75 5.83097 5.98705 5.40901 6.40901C4.98705 6.83097 4.75 7.40326 4.75 8V19.1893L7.46967 16.4697C7.61032 16.329 7.80109 16.25 8 16.25H17C17.5967 16.25 18.169 16.0129 18.591 15.591C19.0129 15.169 19.25 14.5967 19.25 14V8C19.25 7.40326 19.0129 6.83097 18.591 6.40901C18.169 5.98705 17.5967 5.75 17 5.75H7ZM4.34835 5.34835C5.05161 4.64509 6.00544 4.25 7 4.25H17C17.9946 4.25 18.9484 4.64509 19.6516 5.34835C20.3549 6.05161 20.75 7.00544 20.75 8V14C20.75 14.9946 20.3549 15.9484 19.6516 16.6517C18.9484 17.3549 17.9946 17.75 17 17.75H8.31066L4.53033 21.5303C4.31583 21.7448 3.99324 21.809 3.71299 21.6929C3.43273 21.5768 3.25 21.3033 3.25 21V8C3.25 7.00544 3.64509 6.05161 4.34835 5.34835Z" fill="#111827" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H16C16.4142 8.25 16.75 8.58579 16.75 9C16.75 9.41421 16.4142 9.75 16 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9Z" fill="#111827" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.25 13C7.25 12.5858 7.58579 12.25 8 12.25H14C14.4142 12.25 14.75 12.5858 14.75 13C14.75 13.4142 14.4142 13.75 14 13.75H8C7.58579 13.75 7.25 13.4142 7.25 13Z" fill="#111827" />
              </svg>
              {notifications.length >= 0 && (
                <span className="absolute top-[9px] right-2 bg-red-500 text-white text-xs rounded-full w-2 h-2 flex items-center justify-center">
                </span>
              )}
              {showMessage && (
                <div
                  className="absolute top-16 md:-right-20 w-80 bg-white shadow-lg rounded-lg p-4 z-50 transition-all duration-300 ease-in-out transform"
                  style={{
                    opacity: showMessage ? 1 : 0,
                    transform: showMessage
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
            {/* Notifications */}
            <div
              className="bg-[#F7F8F8] mr-5 rounded-lg h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer relative"
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications(!showNotifications);
              }}
              ref={notificationRef}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.0349 3.12501C7.31476 3.11025 5.01183 5.4298 5.01562 8.12414L5.01562 8.12502L5.01562 8.75002C5.01562 11.6348 4.41076 13.3722 3.83032 14.375H16.1697C15.5892 13.3722 14.9844 11.6348 14.9844 8.75002V8.19534C14.9844 5.42596 12.7738 3.14609 10.0349 3.12501ZM3.76562 8.12547C3.76111 4.74171 6.62412 1.85601 10.0425 1.87503L10.0438 1.87504C13.4921 1.90116 16.2344 4.76179 16.2344 8.19534V8.75002C16.2344 11.4584 16.8011 12.9709 17.2518 13.7494L17.2522 13.75C17.3617 13.9397 17.4195 14.1549 17.4197 14.3739C17.4199 14.593 17.3625 14.8082 17.2533 14.9981C17.1441 15.188 16.9869 15.3459 16.7975 15.4559C16.6081 15.5659 16.3931 15.6242 16.1741 15.625L16.1719 15.625H3.82812L3.82592 15.625C3.60688 15.6242 3.39188 15.5659 3.20246 15.4559C3.01305 15.3459 2.85588 15.188 2.74669 14.9981C2.6375 14.8082 2.58013 14.593 2.58032 14.3739C2.58052 14.1549 2.63827 13.9397 2.74779 13.75L2.74817 13.7494C3.19887 12.9709 3.76562 11.4584 3.76562 8.75002V8.12547Z" fill="#000E19" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 14.375C7.84517 14.375 8.125 14.6548 8.125 15V15.625C8.125 16.1223 8.32254 16.5992 8.67417 16.9508C9.0258 17.3025 9.50272 17.5 10 17.5C10.4973 17.5 10.9742 17.3025 11.3258 16.9508C11.6775 16.5992 11.875 16.1223 11.875 15.625V15C11.875 14.6548 12.1548 14.375 12.5 14.375C12.8452 14.375 13.125 14.6548 13.125 15V15.625C13.125 16.4538 12.7958 17.2487 12.2097 17.8347C11.6237 18.4208 10.8288 18.75 10 18.75C9.17119 18.75 8.37634 18.4208 7.79029 17.8347C7.20424 17.2487 6.875 16.4538 6.875 15.625V15C6.875 14.6548 7.15482 14.375 7.5 14.375Z" fill="#000E19" />
              </svg>
              {notifications.length > 0 && (
                <span className="absolute top-[9px] right-3 bg-red-500 text-white text-xs rounded-full w-2 h-2 flex items-center justify-center">
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
            <div className="flex gap-3 items-center">
              <div className=" border mr-1 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer">
                <img
                  src={image}
                  className="h-full w-full rounded-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-[26px] h-[26px] flex items-center justify-center bg-[#F7F8F8] rounded-[6px] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.64645 6.14645C3.84171 5.95118 4.15829 5.95118 4.35355 6.14645L8 9.79289L11.6464 6.14645C11.8417 5.95118 12.1583 5.95118 12.3536 6.14645C12.5488 6.34171 12.5488 6.65829 12.3536 6.85355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.64645 6.85355C3.45118 6.65829 3.45118 6.34171 3.64645 6.14645Z" fill="#000E19" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
