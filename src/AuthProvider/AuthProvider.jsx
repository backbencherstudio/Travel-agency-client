import React, { useState, createContext, useEffect } from "react";
import axiosClient from "../axiosClient";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     fetchUserInfo();
    // }, []);

    // const fetchUserInfo = async () => {
    //     try {
    //         const response = await axiosClient.get("/auth/userinfo", {
    //             withCredentials: true,
    //         });
    //         setUser(response.data.user);
    //         console.log(response.data.user);
    //     } catch (error) {
    //         console.error("Failed to fetch user info:", error.response?.data?.message || error.message);
    //         setUser(null);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // Handle API errors
    const handleError = (error) => {
        if (error.response?.data?.message) {
            console.error(error.response.data.message);
            alert(error.response.data.message);
        } else {
            console.error("An unexpected error occurred:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    // User signup
    const signup = async (credentials) => {
        try {
            const response = await axiosClient.post("/api/auth/register", credentials);
            console.log(response.data.message);
        } catch (error) {
            handleError(error);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axiosClient.post("/api/auth/login", credentials, { withCredentials: true });
            console.log("Login Response:", response);
            const { token, user } = response;
            localStorage.setItem("token", token.authorization.token);
            setUser(user);
            // console.log("Token saved to localStorage:", token);
        } catch (error) {
            handleError(error);
        }
    };

    const logout = async () => {
        try {
            await axiosClient.post("/auth/logout", {}, { withCredentials: true });
            setUser(null);
            console.log("Logout successful");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    };

    const userInfo = {
        user,
        loading,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
