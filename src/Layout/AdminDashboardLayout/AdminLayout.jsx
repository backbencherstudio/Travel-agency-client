import { useContext, useEffect, useState } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Loading from '../../Shared/Loading';
import { Alert } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import AccountConvertApis from '~/Apis/clientApi/AccountConvertApis';
import { Link } from 'react-router-dom';


const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [notification, setNotification] = useState(null); // Single notification state
  const { loading, user } = useContext(AuthContext);
  const [vendorStatus, setVendorStatus] = useState(null);
  const navigate = useNavigate();

  // Make sure the dashboard always leaves body scroll enabled on first render
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.overflowY = 'auto';
  }, []);

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

  useEffect(() => {
    const getOnboardingStatus = async () => {
      try {
        const response = await AccountConvertApis.getOnboardingStatus();
        if (response.success) {
          setVendorStatus(response.data);
        }
      } catch (error) {
        console.error('Error fetching onboarding status:', error);
      }
    }
    if (user?.type === 'vendor') {
      getOnboardingStatus();
    }
  }, [user?.type])


  return (
    <div className="w-full h-screen bg-[#e9f0f9]">
      <Helmet>
        <title>Around 360 - Admin Dashboard</title>
      </Helmet>

      {(loading || typeof (vendorStatus) !== 'object') ? (
        <Loading />
      ) : (
        <div className="animate-from-middle">
          <ScrollRestoration />
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
                      setNotification(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    X
                  </button>
                </div>
              </Alert>
            </div>
          )}

          <div className="ml-0 lg:ml-[275px] pt-[75px] p-5">
            {vendorStatus?.onboarding_required && (
              <div className='fixed inset-0 h-screen bg-[#0003] grid items-center justify-center backdrop-blur-sm' style={{ zIndex: 9 }}>
                <div className='bg-white p-4 rounded-md w-full max-w-[350px] space-y-5' onClick={(e)=>e.stopPropagation()}>
                  <h2 className='text-3xl font-semibold mb-2 text-center text-[#061d35]'>Welcome onboard</h2>
                  <p className='mb-4 text-center text-sm'>To start receiving payments, please complete your onboarding process.</p>
                  <div className='flex items-center justify-between'>
                    <Link to="/" type="button" className="bg-[#061d35] text-white px-4 py-1 rounded cursor-pointer hover:bg-[#050e18]">Back to home</Link>
                    <Link to={vendorStatus?.onboarding_url} type="button" className='bg-[#eb5b2a] text-white px-4 py-1 rounded cursor-pointer hover:bg-[#d94e22] '>Continue</Link>
                  </div>
                </div>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
