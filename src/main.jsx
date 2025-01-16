import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Route.jsx';
import AuthProvider from './Context/AuthProvider/AuthProvider.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import { BookingProvider } from './Context/BookingContext/BookingContext.jsx';
import AppProvider from './Context/AppProvider.jsx';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ToastContainer />
          <RouterProvider router={router} />
      </AppProvider>
    </QueryClientProvider>
  </StrictMode>,
)
