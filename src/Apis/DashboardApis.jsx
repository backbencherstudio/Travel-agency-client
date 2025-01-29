import React from 'react'
import axiosClient from '../axiosClient'

const DashboardApis = {};

DashboardApis.getDashboardData = async () => {
    const url = "/api/admin/dashboard";

    const res = await axiosClient.get(url)
    .then(response => {
        return response.data;
    })
    .catch((error) => {
        if (error.response) {
          return {
            success: false,
            errors: error.response.data.errors,
            message: error.response.data.message,
          };
        } else if (error.request) {
          return {
            success: false,
            message: "No response received from the server.",
          };
        } else {
          return {
            success: false,
            message: "An error occurred while processing the request.",
          };
        }
      });
      return res;
}



export default DashboardApis