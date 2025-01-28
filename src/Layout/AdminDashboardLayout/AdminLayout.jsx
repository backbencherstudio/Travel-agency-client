import { useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Loading from '../../Shared/Loading';
import { Alert } from '@mui/material';

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [notification, setNotification] = useState(null); // Single notification state
  const { loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle a new notification (simulated or manually set)
  const handleNewNotification = (notification) => {
    console.log('Processing Notification:', notification);

    // Create a new notification object
    const newNotification = {
      id: notification.id,
      entity_id: notification.entity_id,
      text: notification.text,
      type: notification.type,
      sender: notification.sender,
      timestamp: new Date().toLocaleString(),
    };
    console.log('new notification', newNotification);

    // Set the single notification
    setNotification(newNotification);

    // Automatically hide the notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleNotificationClick = (entityId) => {
    // Navigate to the relevant notification page
    navigate(`/admin/notifications/${entityId}`);
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#e9f0f9]">
      {loading ? (
        <Loading />
      ) : (
        <div className="animate-from-middle">
          <AdminHeader
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />
          <AdminSidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
          />

          {/* Real-Time Notification Display */}
          {notification && (
            <div className="fixed top-20 right-4 z-50 max-w-md">
              <Alert
                className="bg-white shadow-lg cursor-pointer transition-all hover:shadow-xl"
                onClick={() => handleNotificationClick(notification.entity_id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {notification.sender?.avatar && (
                        <img
                          src={notification.sender.avatar}
                          alt={notification.sender.name}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <p className="text-xs text-gray-500">
                        {notification.sender?.name} • {notification.timestamp}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNotification(null); // Dismiss notification
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    X
                  </button>
                </div>
              </Alert>
            </div>
          )}

          <div className="ml-0 mt-4 lg:ml-[275px] py-[80px] px-5">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
