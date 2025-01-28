import axiosClient from "../../axiosClient";

const AccountConvertApis = {};

AccountConvertApis.convertToVendor = async () => {
  const url = '/api/auth/convert-to-vendor';
  try {
    const response = await axiosClient.post(url);
    return response.data;
  } catch (error) {
    return { message: 'An error occurred while processing the request.' }
  }
}

export default AccountConvertApis;
