import axiosClient from "../axiosClient";

// Function to add a new user
export const addUser = async (userData) => {
  try {
    const response = await axiosClient.post("/api/admin/user", userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
      if (error.response.status === 400) {
        console.error("Bad Request. Check the user data.");
      }
      if (error.response.status === 500) {
        console.error("Server error. Try again later.");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error occurred during the request:", error.message);
    }

    throw error;
  }
};
// Function to get the list of users
export const getUsers = async (params) => {
  try {
    let response;
    if (params && params.role) {
      response = await axiosClient.get(`/api/admin/user?type=${params.role}&page=${params.page}&limit=${params.limit}`);
    } else {
      response = await axiosClient.get(`/api/admin/user?page=${params.page}&limit=${params.limit}`);
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
      if (error.response.status === 400) {
        console.error("Bad Request. Check the request parameters.");
      }
      if (error.response.status === 500) {
        console.error("Server error. Try again later.");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error occurred during the request:", error.message);
    }

    throw error;
  }
};

// Function to update a user's details by user ID
export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosClient.patch(
      `/api/admin/user/${userId}`,
      userData
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
      if (error.response.status === 400) {
        console.error("Bad Request. Check the user data or user ID.");
      }
      if (error.response.status === 500) {
        console.error("Server error. Try again later.");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error occurred during the request:", error.message);
    }

    throw error;
  }
};

// Function to delete a user by user ID
export const deleteUser = async (userId) => {
  try {
    const response = await axiosClient.delete(`/api/admin/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
      if (error.response.status === 400) {
        console.error("Bad Request. Check the user ID or request format.");
      }
      if (error.response.status === 500) {
        console.error("Server error. Try again later.");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error occurred during the request:", error.message);
    }

    throw error;
  }
};

// Function to search for users based on a query
export const searchUsers = async (query) => {
  try {
    const response = await axiosClient.get(`/api/admin/user?q=${query}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
      if (error.response.status === 400) {
        console.error("Bad Request. Check the query parameter.");
      }
      if (error.response.status === 500) {
        console.error("Server error. Try again later.");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error occurred during the request:", error.message);
    }

    throw error;
  }
};

export const getVendorsRequests = async () => {
  try {
    const response = await axiosClient.get(`/api/auth/vendor-request-list`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
      if (error.response.status === 400) {
        console.error("Bad Request. Check the query parameter.");
      }
      if (error.response.status === 500) {
        console.error("Server error. Try again later.");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error occurred during the request:", error.message);
    }

    throw error;
  }
};

export const updateVendorRequest = async (requestId) => {
  try {
    const response = await axiosClient.post(`/api/auth/convert-to-vendor`, {
      user_id: requestId,
      status: 1,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
      if (error.response.status === 400) {
        console.error("Bad Request. Check the query parameter.");
      }
      if (error.response.status === 500) {
        console.error("Server error. Try again later.");
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error occurred during the request:", error.message);
    }

    throw error;
  }
};
