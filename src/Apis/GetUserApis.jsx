import axiosClient from '../axiosClient'

// Get All Users
export const getUsers = async (searchQuery = '') => {
  try {
    const response = await axiosClient.get('/api/admin/user', {
      params: { q: searchQuery }
    })
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error fetching users: ', error.response.data)
      alert('Failed to fetch users. Server error occurred.')
    } else if (error.request) {
      console.error('Error fetching users: No response received.')
      alert('No response from the server. Please check your connection.')
    } else {
      console.error('Error: ', error.message)
      alert('An unexpected error occurred.')
    }
    throw error
  }
}

// Get User By Id
export const getUserById = async (id) => {
  try {
    const response = await axiosClient.get(`/api/admin/user/${id}`)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error fetching user: ', error.response.data)
      alert('Failed to fetch user. Server error occurred.')
    } else if (error.request) {
      console.error('Error fetching user: No response received.')
      alert('No response from the server. Please check your connection.')
    } else {
      console.error('Error: ', error.message)
      alert('An unexpected error occurred.')
    }
    throw error
  }
}

// Approve User
export const approveUser = async (id) => {
  try {
    const response = await axiosClient.post(`/api/admin/user/${id}/approve`)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error approving user: ', error.response.data)
      alert('Failed to approve user. Server error occurred.')
    } else if (error.request) {
      console.error('Error approving user: No response received.')
      alert('No response from the server. Please check your connection.')
    } else {
      console.error('Error: ', error.message)
      alert('An unexpected error occurred.')
    }
    throw error
  }
}

// Reject User
export const rejectUser = async (id) => {
  try {
    const response = await axiosClient.post(`/api/admin/user/${id}/reject`)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error rejecting user: ', error.response.data)
      alert('Failed to reject user. Server error occurred.')
    } else if (error.request) {
      console.error('Error rejecting user: No response received.')
      alert('No response from the server. Please check your connection.')
    } else {
      console.error('Error: ', error.message)
      alert('An unexpected error occurred.')
    }
    throw error
  }
}

// Delete User
export const deleteUser = async (id) => {
  try {
    const response = await axiosClient.delete(`/api/admin/user/${id}`)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('Error deleting user: ', error.response.data)
      alert('Failed to delete user. Server error occurred.')
    } else if (error.request) {
      console.error('Error deleting user: No response received.')
      alert('No response from the server. Please check your connection.')
    } else {
      console.error('Error: ', error.message)
      alert('An unexpected error occurred.')
    }
    throw error
  }
}
