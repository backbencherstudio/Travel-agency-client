import axiosClient from '../../axiosClient'

// to get all blogs
export const allBlogsGet = async () => {
  const url = '/api/blog'
  const res = await axiosClient
    .get(url)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        return {
          errors: error.response.data.errors || null,
          message:
            error.response.data.message || 'An error occurred on the server.'
        }
      } else {
        return { message: 'An error occurred while fetching blogs.' }
      }
    })
  return res
}

// get blog details
export const getBlogDetails = async id => {
  const url = `/api/blog/${id}`
  const res = await axiosClient
    .get(url)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        return {
          errors: error.response.data.errors || null,
          message:
            error.response.data.message || 'An error occurred on the server.'
        }
      } else {
        return { message: 'An error occurred while fetching the blog details.' }
      }
    })
  return res
}

// add comment

export const postCommentOnBlog = async (id, commentData) => {
  const url = `/api/blog/${id}/comment`

  const res = await axiosClient
    .post(url, {
      comment: commentData
    })
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        return {
          errors: error.response.data.errors || null,
          message:
            error.response.data.message ||
            'An error occurred while posting the comment.'
        }
      } else {
        return { message: 'An error occurred while posting the comment.' }
      }
    })

  return res
}

// delete comment
export const deleteCommentOnBlog = async (blogId, commentId) => {
  const url = `/api/blog/${blogId}/comment/${commentId}`

  const res = await axiosClient
    .delete(url)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        return {
          errors: error.response.data.errors || null,
          message:
            error.response.data.message ||
            'An error occurred while deleting the comment.'
        }
      } else {
        return { message: 'An error occurred while deleting the comment.' }
      }
    })

  return res
}

// like a blog post
export const postLikeOnBlog = async blogId => {
  const url = `/api/blog/${blogId}/like`

  const res = await axiosClient
    .post(url) // POST request to register a like
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        return {
          errors: error.response.data.errors || null,
          message:
            error.response.data.message ||
            'An error occurred while liking the blog post.'
        }
      } else {
        return { message: 'An error occurred while liking the blog post.' }
      }
    })

  return res
}
