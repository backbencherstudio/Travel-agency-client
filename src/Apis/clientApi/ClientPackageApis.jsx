import axiosClient from "../../axiosClient";

const ClientPackageApis = {};

ClientPackageApis.all = async (type) => {
    console.log('type', type)
    const url = `/api/package?type=${type}`
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

export default ClientPackageApis;