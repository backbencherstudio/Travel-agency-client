import axiosClient from '../../axiosClient';

// Apply coupon
export const applyCouponApi = async (Checkoutid, data) => {
  const url = `/api/checkout/${Checkoutid}/coupon`;

  try {
    const response = await axiosClient.post(url, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        errors: error.response.data.errors || null,
        message: error.response.data.message || 'An error occurred while applying the coupon.',
      };
    }
    return { message: 'An error occurred while applying the coupon.' };
  }
};

// Delete coupon
export const deleteCouponApi = async (checkoutId, couponId) => {
  const url = `/api/checkout/${checkoutId}/coupon/${couponId}`;

  try {
    const response = await axiosClient.delete(url);
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        errors: error.response.data.errors || null,
        message: error.response.data.message || 'An error occurred while deleting the coupon.',
      };
    }
    return { message: 'An error occurred while deleting the coupon.' };
  }
};
