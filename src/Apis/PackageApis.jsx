import axiosClient from "../axiosClient";

const PackageApis = {};

PackageApis.approvePackage = async id => {
    const url = `/api/admin/package/approve/${id}`
    try {
      const response = await axiosClient.patch(url)
      return response.data
    } catch (error) {
      if (error.response) {
        return {
          errors: error.response.data.errors,
          message: error.response.data.message
        }
      } else if (error.request) {
        return {
          message: 'No response received from the server.'
        }
      } else {
        return {
          message: 'An error occurred while processing the request.'
        }
      }
    }
  }
  
  // Reject package
  PackageApis.rejectPackage = async id => {
    const url = `/api/admin/package/reject/${id}`
    try {
      const response = await axiosClient.patch(url)
      return response.data
    } catch (error) {
      if (error.response) {
        return {
          errors: error.response.data.errors,
          message: error.response.data.message
        }
      } else if (error.request) {
        return {
          message: 'No response received from the server.'
        }
      } else {
        return {
          message: 'An error occurred while processing the request.'
        }
      }
    }
  }

  PackageApis.activePackage = async (id, data) => {
    const url = `api/admin/package/${id}/status`
    try {
        const response = await axiosClient.patch(url, data)
        return response.data
    } catch (error) {
    if (error.response) {
        return {
        errors: error.response.data.errors,
        message: error.response.data.message
        }
    } else if (error.request) {
        return {
        message: 'No response received from the server.'
        }
    } else {
        return {
        message: 'An error occurred while processing the request.'
        }
    }
  }
}

export default PackageApis;