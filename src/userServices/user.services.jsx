// api.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const UserServices = {
  createPackagePlaces: async (data) => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) throw new Error("User token not found. Please login.");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.post(
        `${baseURL}/api/admin/place`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error creating package place:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  },

  getAllPlaces: async () => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) throw new Error("User token not found. Please login.");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.get(`${baseURL}/api/admin/place`, config);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching places:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  },

  updatePackagePlaces: async (id, data) => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) throw new Error("User token not found. Please login.");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.patch(
        `${baseURL}/api/admin/place/${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error creating package place:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  },

  deletePackagePlace: async (id) => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) throw new Error("User token not found. Please login.");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.delete(
        `${baseURL}/api/admin/place/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error creating package place:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  },

  approvePackage: async (id) => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) throw new Error("User token not found. Please login.");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.delete(
        `${baseURL}/api/admin/package/approve/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error updating package place:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  },
  rejectPackage: async (id) => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) throw new Error("User token not found. Please login.");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.delete(
        `${baseURL}/api/admin/package/reject/${id}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error updating package place:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  },
};
