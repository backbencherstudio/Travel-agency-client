import axiosClient from '../../axiosClient'

// post data
export const createCheckout = async data => {
  const url = '/api/checkout'
  try {
    // Making the POST request
    const response = await axiosClient.post(url, data)
    return response.data
  } catch (error) {
    if (error.response) {
      return {
        errors: error.response.data.errors,
        message:
          error.response.data.message ||
          'An error occurred while processing your request.'
      }
    } else if (error.request) {
      return { message: 'No response received from the server.' }
    } else {
      return { message: 'An error occurred while processing the request.' }
    }
  }
}

// get data
export const getCheckoutById = async id => {
  const url = `/api/checkout/${id}`
  try {
    // Making the GET request
    const response = await axiosClient.get(url)
    return response.data
  } catch (error) {
    if (error.response) {
      return {
        errors: error.response.data.errors,
        message:
          error.response.data.message ||
          'An error occurred while fetching the data.'
      }
    } else if (error.request) {
      return { message: 'No response received from the server.' }
    } else {
      return { message: 'An error occurred while processing the request.' }
    }
  }
}

export const updateCheckout = async (checkoutId, data) => {
  const url = `/api/checkout/${checkoutId}`
  try {
    const response = await axiosClient.patch(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    if (error.response) {
      return {
        errors: error.response.data.errors,
        message: error.response.data.message || 'An error occurred while processing your request.'
      }
    } else if (error.request) {
      return { message: 'No response received from the server.' }
    } else {
      return { message: 'An error occurred while processing the request.' }
    }
  }
}

// Create booking from checkout id
export const createBookingFromCheckout = async checkoutId => {
  const url = `/api/booking/${checkoutId}`
  try {
    const response = await axiosClient.post(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    if (error.response) {
      return {
        errors: error.response.data.errors,
        message: error.response.data.message || 'An error occurred while creating the booking.'
      }
    } else if (error.request) {
      return { message: 'No response received from the server.' }
    } else {
      return { message: 'An error occurred while processing the request.' }
    }
  }
}
