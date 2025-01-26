import React from 'react'
import axiosClient from "../axiosClient";


const ReviewApis = {};

ReviewApis.getAllReviews = async () => {
  const url = "/api/admin/reviews";
  console.log(url);
  
  const res = await axiosClient.get(url)
  .then(response => {
    return response.data;
  })
  .catch((error) => {
    if (error.response) {
      return {
        success: false,
        errors: error.response.data.errors,
        message: error.response.data.message,
      };
    } else if (error.request) {
      return {
        success: false,
        message: "No response received from the server.",
      };
    } else {
      return {
        success: false,
        message: "An error occurred while processing the request.",
      };
    }
  });

  return res;

};


export default ReviewApis;






// const TransactionApis = {};

// Get all transactions
// TransactionApis.getAllTransactions = async () => {
//   const url = "/api/admin/payment-transaction";
//   console.log(url);
//   const res = await axiosClient
//     .get(url)
//     .then((response) => {
//       return {
//         success: true,
//         data: response.data,
//       };
//     })
//     .catch((error) => {
//       if (error.response) {
//         return {
//           success: false,
//           errors: error.response.data.errors,
//           message: error.response.data.message,
//         };
//       } else if (error.request) {
//         return {
//           success: false,
//           message: "No response received from the server.",
//         };
//       } else {
//         return {
//           success: false,
//           message: "An error occurred while processing the request.",
//         };
//       }
//     });
//   return res;
// };

// Delete transaction
// TransactionApis.deleteTransaction = async (transactionId) => {
//   const url = `/api/admin/payment-transaction/${transactionId}`;
//   const res = await axiosClient.delete(url);
//   return res;
// };

// You can add more methods for TransactionApis here if needed

// export default TransactionApis;
