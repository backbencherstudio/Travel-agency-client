import axiosClient from "../axiosClient";

const TransactionApis = {};

// Get all transactions
TransactionApis.getAllTransactions = async () => {
  const url = "/api/admin/payment-transaction";
  console.log(url);
    const res = await axiosClient.get(url)
      .then(response => {
        return {
          success: true,
          data: response.data
        };
      }).catch(error => {
        if (error.response) {
          return {
            success: false,
            errors: error.response.data.errors,
            message: error.response.data.message
          };
        } else if (error.request) {
          return {
            success: false,
            message: 'No response received from the server.'
          };
        } else {
          return {
            success: false,
            message: 'An error occurred while processing the request.'
          };
        }
      });
  return res;
};

console.log();

// You can add more methods for TransactionApis here if needed

export default TransactionApis;
