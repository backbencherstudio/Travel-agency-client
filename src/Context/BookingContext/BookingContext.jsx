import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const BookingContext = createContext();
// console.log('BookingContext', BookingContext);

// Provider component
export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    package: {
      id: null,
      name: "",
      review: 0.0,
      destination: "",
      duration: 0,
      duration_type: "",
      price: 0,
    },
    startDate: null,
    endDate: null,
    extraServices: [],
    pickUpLocation: "",
    bookingDate: "",
    totalMember: 0,
    memberType: {
      adult: 0,
      child: 0,
      infant: 0,
    },
    contactInfo: {
      phone_number: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      country: '',
      zip_code: '',
    },
    checkoutId: '',
    final_price: 0,
    discount_amount: 0,
    cardInfo:{
        name:'',
        number: '',
        date: '',
        cvc: ''
    }
  });

  const updateBooking = (name, value) => {
    setBookingDetails((prev) => {
      prev[name] = value;
      console.log("bookingDetails", prev);
      return prev;
    });
  };

  return (
    <BookingContext.Provider value={{ bookingDetails, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook for using the BookingContext
export const useBookingContext = () => {
  return useContext(BookingContext);
};
