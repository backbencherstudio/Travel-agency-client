import axiosClient from '../axiosClient'

const BlogApis = {}

// create blog
BlogApis.createBlogPost = async data => {
  const url = '/api/admin/blog'
  const res = await axiosClient
    .post(url, data)
    .then(response => {
      return response.data
    })
    .catch(error => {
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
    })

  return res
}

// get all blogs
BlogApis.getAllBlogs = async () => {
  const url = '/api/admin/blog'
  const res = await axiosClient
    .get(url)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        return {
          errors: error.response.data.errors,
          message: error.response.data.message
        }
      } else {
        return { message: 'An error occurred while fetching blogs.' }
      }
    })
  return res
}

// single blog
BlogApis.getBlogPost = async id => {
  const url = `/api/admin/blog/${id}`
  const res = await axiosClient
    .get(url)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        return {
          errors: error.response.data.errors,
          message: error.response.data.message
        }
      } else {
        return { message: 'An error occurred while fetching the blog.' }
      }
    })
  return res
}

// UPDATE
BlogApis.updateBlogPost = async (id, data) => {
  const url = `/api/admin/blog/${id}`
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

// Update blog status
BlogApis.updateBlogStatus = async (id, status) => {
  const url = `/api/admin/blog/${id}/status`
  try {
    const response = await axiosClient.patch(url, { status })
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

// update Approval staus approved or reject
// Approve blog post
BlogApis.approveBlogPost = async id => {
  const url = `/api/admin/blog/approve/${id}`
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

// Reject blog post
BlogApis.rejectBlogPost = async id => {
  const url = `/api/admin/blog/reject/${id}`
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

// delete blog
BlogApis.deleteBlogPost = async id => {
  const url = `/api/admin/blog/${id}`
  const res = await axiosClient
    .delete(url)
    .then(response => {
      return response.data
    })
    .catch(error => {
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
    })

  return res
}

// Consolidated function for both single and multiple parameters
BlogApis.searchBlogs = async (query = '', status = '') => {
  const params = new URLSearchParams()
  if (query) params.append('q', encodeURIComponent(query))
  if (status) params.append('status', encodeURIComponent(status))

  const url = `/api/admin/blog?${params.toString()}`
  try {
    const response = await axiosClient.get(url)
    return response.data
  } catch (error) {
    return error.response
      ? {
          errors: error.response.data.errors,
          message: error.response.data.message || 'Failed to search blogs.'
        }
      : { message: 'An error occurred while searching for blogs.' }
  }
}

export default BlogApis
