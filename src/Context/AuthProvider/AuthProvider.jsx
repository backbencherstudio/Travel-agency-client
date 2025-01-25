import React, { useState, createContext, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axiosClient.get("/api/auth/me");
      // console.log("response", response.data?.data);
      setUser(response?.data?.data);
    } catch (error) {
      console.error(
        "Failed to fetch user info:",
        error.response?.data?.message || error.message
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // console.log("user", user);
  // Handle API errors
  const handleError = (error) => {
    if (error.response?.data?.message) {
      console.error("error", error.response.data.message);
      // alert(error.response.data.message);
    }
  };

  // User signup
  const signup = async (credentials) => {
    try {
      const response = await axiosClient.post(
        "/api/auth/register",
        credentials
      );
      console.log(response.data.message);
    } catch (error) {
      console.log("error", error);
      handleError(error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axiosClient.post("/api/auth/login", credentials);
      console.log("Login Response:", response?.data);
      const { authorization } = response?.data;
      const userData = response?.data;
      const message = response?.data?.message;
      console.log("authorization", authorization);
      localStorage.setItem("token", authorization.token);
      localStorage.setItem("role", userData?.type);
      fetchUserInfo();
      console.log("response?.message", message);
      toast.success(message);
      // console.log("Token saved to localStorage:", token);
    } catch (error) {
      const resMessage = error.response?.data?.message?.message;
      console.log("error", error);
      toast.error(resMessage);
      // handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    const token = localStorage.getItem("token");
    if (!token) {
      toast.warning("Logged out!");
    }
    // try {
    //     await axiosClient.post("/auth/logout", {}, { withCredentials: true });
    //     setUser(null);
    //     console.log("Logout successful");
    // } catch (error) {
    //     console.error("Logout failed:", error);
    //     alert("Logout failed. Please try again.");
    // }
  };

    const changePassword = async (data) => {
        try {
            const res = await axiosClient.post("/api/auth/change-password", data);
            const message = res?.data?.message;
            console.log('res', res)
            toast.success(message);
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
        changePassword,
    };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
