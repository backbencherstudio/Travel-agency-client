import axiosClient from '../axiosClient'

// Function to add a new user
export const addUser = async userData => {
  try {
    const response = await axiosClient.post('/api/admin/user', userData)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data)
      if (error.response.status === 400) {
        console.error('Bad Request. Check the user data.')
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
// Function to get the list of users
export const getUsers = async () => {
  try {
    const response = await axiosClient.get('/api/admin/user')
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

// Function to update a user's details by user ID
export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosClient.patch(
      `/api/admin/user/${userId}`,
      userData
    )
    return response.data 
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data)
      if (error.response.status === 400) {
        console.error('Bad Request. Check the user data or user ID.')
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

// Function to delete a user by user ID
export const deleteUser = async userId => {
  try {
    const response = await axiosClient.delete(`/api/admin/user/${userId}`)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data)
      if (error.response.status === 400) {
        console.error('Bad Request. Check the user ID or request format.')
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
