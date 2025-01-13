import axiosClient from '../axiosClient'

const FaqApis = {
  createFaq: async (data) => {
    const url = '/api/admin/faq/batch-create';
    try {
      const response = await axiosClient.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Error details:', error);
      if (error.response) {
        return {
          errors: error.response.data.errors || [],
          message: error.response.data.message || 'Request failed.',
        };
      }
      return { message: 'Network or unknown error occurred.' };
    }
  },

  getAllFaq: async () => {
    const url = '/api/admin/faq';
    try {
      const response = await axiosClient.get(url);
      return response.data;
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

  deleteFaq: async (id) => {
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

export default FaqApis;
