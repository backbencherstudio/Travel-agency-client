import axiosClient from '../axiosClient'


const CancellationApi = {
  

  getAllCancellation: async () => {
    const url = '/api/admin/faq';
    try {
      const response = await axiosClient.get(/api/admin/faq);
      console.log("respost:", response);
      
      return response;
    } catch (error) {
      console.error('Error while fetching FAQs:', error);
      if (error.response) {
        return {
          message: error.response.data.message || 'Request failed.',
          data: [],
        };
      }
      return { message: 'Network or unknown error occurred.', data: [] };
    }
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
