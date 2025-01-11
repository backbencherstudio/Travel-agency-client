import axiosClient from "../axiosClient";

const BlogApis = {};

BlogApis.createBlogPost = async (data) => {
    const url = "/api/admin/blog"; 
    const res = await axiosClient.post(url, data)
        .then(response => {
            return response.data; 
        })
        .catch(error => {
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
};

export default BlogApis;
