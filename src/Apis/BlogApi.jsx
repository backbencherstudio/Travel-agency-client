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

// get all blog

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

export default BlogApis
