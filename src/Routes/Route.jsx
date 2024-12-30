import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Tours from "../Pages/Tours/Tours";
import Signup from "../Pages/Auth/Signup";
import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Otp from "../Pages/Auth/OTP";
import Blogs from "../Pages/blogs/Blogs";
import SingleBlog from "../Pages/blogs/SingleBlog";
import TourDetails from "../Pages/TourDetails/TourDetails";
import ReviewPackage from "../Pages/ReviewPackage/ReviewPackage";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardAnalysis from "../Components/Dashboard/Dashboard/DashboardAnalysis";
import Packages from "../Components/Dashboard/Packages/Packages";
import ChangePassword from "../Pages/Auth/ChangePassword";
import BlogDetails from "../Pages/blogs/BlogDetails";
import AddPackage from "../Pages/Dashboard/Package/AddPackage";

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
        path: "/blogDetails/:id",
        element: <SingleBlog />,
      },
      {
        path: "/review_package",
        element: <ReviewPackage />,
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
      {
        path: "add-package",
        element: <AddPackage />,
      },
      {
        path: "packages",
        element: <Packages />,
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
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/tours',
                element: <Tours />
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
              path: "/tour-details/:id",
              element: <TourDetails />,
            },
            {
                path: '/blogDetails/:id',
                element: <SingleBlog />
            },
            {
                path: '/review_package',
                element: <ReviewPackage />
            },
            {
              path: "/blog-details/:id",
              element: <BlogDetails />,
            },
        ]
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
    {
      path: "change-password",
      element: <ChangePassword />,
    },
]);
