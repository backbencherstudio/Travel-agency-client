import axiosClient from "../axiosClient";

const CouponApis = {};

CouponApis.get = async () => {
    const url = `/api/admin/coupon`
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

CouponApis.save = async (data) => {
    let url = "/api/admin/coupon";
    const res = await axiosClient.post(url, data)
        .then(response => {
            return response.data;
        }).catch(error => { 
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return {
                    errors: error.response.data.errors,
                    message: error.response.data.message
                };
            } else if (error.request) {
                // The request was made but no response was received
                return {
                    message: "No response received from the server."
                };
            } else {
                // Something happened in setting up the request that triggered an Error
                return {
                    message: "An error occurred while processing the request."
                };
            } 
        });
    return res;
}

CouponApis.update = async (id, data) => {
    let url = `/api/admin/coupon/${id}`;
    const res = await axiosClient.patch(url, data)
        .then(response => {
            return response.data;
        }).catch(error => { 
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return {
                    errors: error.response.data.errors,
                    message: error.response.data.message
                };
            } else if (error.request) {
                // The request was made but no response was received
                return {
                    message: "No response received from the server."
                };
            } else {
                // Something happened in setting up the request that triggered an Error
                return {
                    message: "An error occurred while processing the request."
                };
            } 
        });
    return res;
}

CouponApis.delete = async (id) => {
    let url = `/api/admin/coupon/${id}`;
    const res = await axiosClient.delete(url)
        .then(response => {
            return response.data;
        }).catch(error => { 
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return {
                    errors: error.response.data.errors,
                    message: error.response.data.message
                };
            } else if (error.request) {
                // The request was made but no response was received
                return {
                    message: "No response received from the server."
                };
            } else {
                // Something happened in setting up the request that triggered an Error
                return {
                    message: "An error occurred while processing the request."
                };
            } 
        });
    return res;
}


export default CouponApis;