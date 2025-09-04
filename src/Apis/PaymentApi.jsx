import axiosClient from "../axiosClient";

const PaymentApi = {};

// Get all offers (coupons)
PaymentApi.get = async () => {
    const url = `/api/admin/payment-transaction/dashboard`;  // Added search and status to the query
    try {
        const response = await axiosClient.get(url);
        return response.data;
    } catch (error) {
        return {
            errors: error.response?.data?.errors || null,
            message: error.response?.data?.message || 'An error occurred while fetching offers.'
        };
    }
};

// Get details of a single offer
// OfferManagementApis.getOne = async (id) => {
//     const url = `/api/admin/coupon/${id}`;  // Fixed the URL to match "coupon"
//     try {
//         const response = await axiosClient.get(url);
//         return response.data;
//     } catch (error) {
//         return {
//             errors: error.response?.data?.errors || null,
//             message: error.response?.data?.message || 'An error occurred while fetching the offer details.'
//         };
//     }
// };

// // Update the status of an offer
// OfferManagementApis.update = async (id, data) => {
//     const url = `/api/admin/coupon/${id}`;
//     try {
//         const response = await axiosClient.patch(url, {status:data});
//         return response.data;
//     } catch (error) {
//         return {
//             errors: error.response?.data?.errors || null,
//             message: error.response?.data?.message || 'An error occurred while updating the offer status.'
//         };
//     }
// };
// OfferManagementApis.updateAll = async (id, data) => {
//     const url = `/api/admin/coupon/${id}`;
//     try {
//         const response = await axiosClient.patch(url, data);
//         return response.data;
//     } catch (error) {
//         return {
//             errors: error.response?.data?.errors || null,
//             message: error.response?.data?.message || 'An error occurred while updating the offer status.'
//         };
//     }
// };

// // Update the status of an offer
// OfferManagementApis.delete = async (id) => {
//     const url = `/api/admin/coupon/${id}`;  // Fixed the URL to match "coupon"
//     try {
//         const response = await axiosClient.delete(url);
//         return response.data;
//     } catch (error) {
//         return {
//             errors: error.response?.data?.errors || null,
//             message: error.response?.data?.message || 'An error occurred while updating the offer status.'
//         };
//     }
// };

export default PaymentApi;
