import React from 'react';
import AuthProvider from './AuthProvider/AuthProvider';
import { BookingProvider } from './BookingContext/BookingContext';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <BookingProvider>{children}</BookingProvider>
    </AuthProvider>
  );
};

export default AppProvider;
