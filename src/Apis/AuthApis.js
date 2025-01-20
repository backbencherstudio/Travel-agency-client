import axiosClient from "../axiosClient";

const AuthApis = {};

AuthApis.save = async (data) => {
    let url = "/api/auth/register";
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

AuthApis.login = async (data) => {
    let url = "/api/auth/login";
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

AuthApis.logout = async (data) => {
    let url = "/api/logout";
    const res = await axiosClient.post(url, data)
        .then(response => {
            return response.data;
        }).catch(error => { 
            return error;
        });
    return res;
}

AuthApis.update = async (data) => {
    let url = "/api/auth/update";
    const res = await axiosClient.patch(url, data)
        .then(response => {
            return response.data;
        }).catch(error => { 
            return error;
        });
    return res;
}

export default AuthApis;