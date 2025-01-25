import React from 'react';
import AuthProvider from './AuthProvider/AuthProvider';
import { BookingProvider } from './BookingContext/BookingContext';
import { TravelDataProvider } from './TravelDataContext/TravelDataContext';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <BookingProvider>
        <TravelDataProvider>
          {children}
        </TravelDataProvider>
      </BookingProvider>
    </AuthProvider>
  );
};

export default AppProvider;
