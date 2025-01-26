import axiosClient from "../../axiosClient";

const ClientHomeApis = {};

ClientHomeApis.get = async () => {
    const url = `/api/page/home`
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
};

export default ClientHomeApis;

