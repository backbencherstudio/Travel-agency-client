import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Tours from "../Pages/Tours/Tours";
import Signup from "../Pages/Auth/Signup";
import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Otp from "../Pages/Auth/OTP";
import SIgnupOTP from "../Pages/Auth/SIgnupOTP";

export const router = createBrowserRouter([
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
            }
        ]
    },
    {
        path: 'signup',
        element:

            <Signup />
    },
    {
        path: 'signupotp',
        element:

            <SIgnupOTP />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'forget-password',
        element: <ForgetPassword />
    },
    {
        path: 'otp',
        element: <Otp />
    },
]);