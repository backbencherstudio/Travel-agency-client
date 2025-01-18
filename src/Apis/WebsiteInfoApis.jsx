import axiosClient from "../axiosClient";

const WebsiteInfoApis = {};

WebsiteInfoApis.get = async () => {
    const url = "/api/admin/website-info";
    const res = await axiosClient.get(url)
        .then(response => response.data)
        .catch(error => {
        if (error.response) {
            return {
            errors: error.response.data.errors || null,
            message:
                error.response.data.message || 'An error occurred on the server.'
            }
        } else {
            return { message: 'An error occurred while fetching blogs.' }
        }
        })
    return res
}

WebsiteInfoApis.save = async (data) => {
    let url = "/api/admin/website-info";
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

export default WebsiteInfoApis;