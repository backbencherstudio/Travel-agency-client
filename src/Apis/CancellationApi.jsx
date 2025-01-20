import axiosClient from '../axiosClient'


const CancellationApi = {
  

  getAllCancellation: async () => {
    const url = '/api/cancellation-policy';
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
  },

  deleteCancellation: async (id) => {
    const url = `/api/admin/faq/${id}`;
    try {
      const response = await axiosClient.delete(url);
      return response.data;
    } catch (error) {
      console.error('Error while deleting FAQ:', error);
      if (error.response) {
        return { message: error.response.data.message || 'Request failed.' };
      }
      return { message: 'Network or unknown error occurred.' };
    }
  },
}

export default CancellationApi;
