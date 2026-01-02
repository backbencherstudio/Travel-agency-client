import axiosClient from "../../axiosClient";

const AccountConvertApis = {};

AccountConvertApis.convertToVendor = async () => {
  const url = '/api/auth/vendor-request';
  try {
    const response = await axiosClient.post(url);
    return response.data;
  } catch (error) {
    return { message: 'An error occurred while processing the request.' }
  }
}

AccountConvertApis.getOnboardingStatus = async () => {
  const url = '/api/escrow/onboarding-link';
  try {
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    return { message: 'An error occurred while fetching onboarding status.' }
  } 
}

export default AccountConvertApis;
