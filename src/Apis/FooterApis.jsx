import axiosClient from '../axiosClient';

const FooterApis = {};

FooterApis.getFooterData = async () => {
  const url = '/api/footer';

  try {
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        errors: error.response.data.errors,
        message: error.response.data.message,
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'No response received from the server.',
      };
    } else {
      return {
        success: false,
        message: 'An error occurred while processing the request.',
      };
    }
  }
};

export default FooterApis;
