import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Route.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import { BookingProvider } from './BookingContext/BookingContext.jsx';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
          <BookingProvider>
            <RouterProvider router={router} />
          </BookingProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
