import { useState, useEffect } from 'react'
import BlogsTable from '../../../Components/Dashboard/Blogs/BlogsTable'
import BlogApis from '../../../Apis/BlogApi'

const BlogsPost = () => {
  const [columns] = useState({
    id: true,
    title: true,
    blog_images: true,
    user: true,
    created_at: true,
    approved_at: true,
    updated_at: true
  })

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await BlogApis.getAllBlogs()
        if (response?.data) {
          setData(response.data)
        } else {
          console.error('Failed to fetch blogs', response?.message)
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <BlogsTable title={'Blog Posts'} data={data} columns={columns} />
      )}
    </div>
  )
}

export default BlogsPost
