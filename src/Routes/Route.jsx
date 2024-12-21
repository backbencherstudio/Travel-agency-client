import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Tours from "../Pages/Tours/Tours";
import Signup from "../Pages/Auth/Signup";
import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Otp from "../Pages/Auth/OTP";
import Blogs from "../Pages/blogs/Blogs";
import TourDetails from "../Pages/TourDetails/TourDetails";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardAnalysis from "../Components/Dashboard/Dashboard/DashboardAnalysis";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tours",
        element: <Tours />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/tour-details/:id",
        element: <TourDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardAnalysis />,
      },
    ],
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "otp",
    element: <Otp />,
  },
]);
