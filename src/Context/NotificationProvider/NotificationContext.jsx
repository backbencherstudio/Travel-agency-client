import React, { createContext, useState, useContext, useEffect } from 'react';
import React, { createContext, useState, useContext } from 'react';
import NotificationApis from '../../Apis/NotificationApis';

// Create the context
const NotificationContext = createContext();

// Provider component
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            const res = await NotificationApis.getNotification();
            if (res.success) {
                setNotifications(res.data);
            } else {
                setError(res.message);
            }
            setLoading(false);
        };
        fetchNotifications();
    }, []);

    // console.log('bookingDetails', bookingDetails)

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications, loading, error }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Custom hook for using the BookingContext
export const useNotificationContext = () => {
    return useContext(NotificationContext);
};
