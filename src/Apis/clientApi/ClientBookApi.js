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
        message:
          error.response.data.message ||
          'An error occurred while creating the booking.'
      }
    } else if (error.request) {
      return { message: 'No response received from the server.' }
    } else {
      return { message: 'An error occurred while processing the request.' }
    }
  }
}

// Function to get booking details by booking ID
export const getBookingDetails = async bookingId => {
  try {
    const response = await axiosClient.get(`/api/booking/${bookingId}`)
    return response.data // Return the response data from the API
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data)
      if (error.response.status === 400) {
        console.error('Bad Request. Check the booking ID or request format.')
      }
      if (error.response.status === 500) {
        console.error('Server error. Try again later.')
      }
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error occurred during the request:', error.message)
    }

    throw error
  }
}

// Function to get all booking data
export const getAllBookings = async () => {
  try {
    const response = await axiosClient.get('/api/booking')
    return response.data // Return the response data from the API
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data)
      if (error.response.status === 400) {
        console.error('Bad Request. Check the request parameters.')
      }
      if (error.response.status === 500) {
        console.error('Server error. Try again later.')
      }
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error occurred during the request:', error.message)
    }

    throw error
  }
}

// Function to search for bookings based on a query
export const searchBookings = async query => {
  try {
    const response = await axiosClient.get(`/api/booking?q=${query}`)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data)
      if (error.response.status === 400) {
        console.error('Bad Request. Check the query parameter.')
      }
      if (error.response.status === 500) {
        console.error('Server error. Try again later.')
      }
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error occurred during the request:', error.message)
    }

    throw error
  }
}

// Function to get booking data by ID
export const getBookingById = async bookingId => {
  try {
    const response = await axiosClient.get(`/api/booking/${bookingId}`)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data)
      if (error.response.status === 400) {
        console.error('Bad Request. Check the request parameters.')
      }
      if (error.response.status === 500) {
        console.error('Server error. Try again later.')
      }
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error occurred during the request:', error.message)
    }

    throw error
  }
}
// Function to submit a review
export const submitReview = async (packageId, reviewData) => {
  try {
    const response = await axiosClient.post(
      `/api/package/${packageId}/review`,
      reviewData
    )
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data)
      if (error.response.status === 400) {
        console.error('Bad Request. Check the request parameters.')
      }
      if (error.response.status === 500) {
        console.error('Server error. Try again later.')
      }
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error occurred during the request:', error.message)
    }
    throw error
  }
}

// Function to delete a review
export const deleteReview = async (packageId, reviewId) => {
  try {
    const response = await axiosClient.delete(
      `/api/package/${packageId}/review/${reviewId}`
    )
    return response.data 
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data)
      if (error.response.status === 400) {
        console.error('Bad Request. Check the request parameters.')
      }
      if (error.response.status === 500) {
        console.error('Server error. Try again later.')
      }
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Error occurred during the request:', error.message)
    }
    throw error
  }
}
