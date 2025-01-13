import axiosClient from '../../axiosClient'

// Named export function to get all blogs
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
