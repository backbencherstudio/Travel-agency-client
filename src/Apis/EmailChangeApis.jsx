import axiosClient from "../axiosClient";

const EmailChangeApis = {};

EmailChangeApis.send = async (data) => {
    console.log('data', data)
    let url = "/api/auth/request-email-change";
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

export default EmailChangeApis;