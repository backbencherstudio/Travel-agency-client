import React, { createContext, useState, useContext } from 'react';

// Create the context
const BookingContext = createContext();

// Provider component
export const BookingProvider = ({ children }) => {
    const [bookingDetails, setBookingDetails] = useState({
        package_id: null,
        price: null,
        startDate: null,
        endDate: null,
        extraServices: [],
    });

    console.log('bookingDetails', bookingDetails)

    return (
        <BookingContext.Provider value={{ bookingDetails, setBookingDetails }}>
            {children}
        </BookingContext.Provider>
    );
};

// Custom hook for using the BookingContext
export const useBookingContext = () => {
    return useContext(BookingContext);
};
