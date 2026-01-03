import axiosClient from "../axiosClient";

const BookManageApis = {};

BookManageApis.get = async (filter,query) => {
    let status = filter;
    console.log('Filter in API:', filter);
    if (filter === 'all' || filter === 'All Status') {
        status = '';
    }
    const url = `/api/admin/booking?status=${status?.toLowerCase()}&q=${query || ''}`;
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

BookManageApis.getOne = async (id) => {
    const url = `/api/admin/booking/${id}`;
    const res = await axiosClient.get(url)
        .then(response => response.data)
        .catch(error => {
            return error.response.data
        })

    return res
};

BookManageApis.update = async (id, data) => {
    const url = `/api/admin/booking/${id}/status`;
    const res = await axiosClient.patch(url, data)
        .then(response => response.data)
        .catch(error => {
            return error.response.data
        })
    return res
};

BookManageApis.requestComplete = async (id) => {
    const url = `/api/admin/booking/${id}/complete`;
    const res = await axiosClient.post(url)
        .then(response => response.data)
        .catch(error => {
            return error.response.data
        })
    return res
}

export default BookManageApis;