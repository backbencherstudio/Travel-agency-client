import axiosClient from "../axiosClient";

const ChangePasswordApis = {};

ChangePasswordApis.send = async (data) => {
    let url = "/api/auth/forgot-password";
    const res = await axiosClient.post(url, data)
        .then(response => {
            return response.data;
        }).catch(error => {
            if (error.response) {
                return {
                    errors: error.response.data.errors,
                    message: error.response.data.message
                };
            } else if (error.request) {
                return {
                    message: "No response received from the server."
                };
            } else {
                return {
                    message: "An error occurred while processing the request."
                };
            }  
            });
    return res;
}

ChangePasswordApis.reset = async (data) => {
    let url = "/api/auth/reset-password";
    const res = await axiosClient.post(url, data)
        .then(response => {
            return response.data;
        }).catch(error => {
            if (error.response) {
                return {
                    errors: error.response.data.errors,
                    message: error.response.data.message
                };
            } else if (error.request) {
                return {
                    message: "No response received from the server."
                };
            } else {
                return {
                    message: "An error occurred while processing the request."
                };
            }  
            });
    return res;
}

export default ChangePasswordApis;