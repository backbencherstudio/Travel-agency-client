import { useState } from 'react'
import BlogsTable from '../../../Components/Dashboard/Blogs/BlogsTable'

const BlogsPost = () => {
  const [columns] = useState({
    id: true,
    title: true,
    blog_images: true,
    user: true,
    status: true,
    created_at: true,
    approved_at: true,
    updated_at: true
  })

  return (
    <BlogsTable
      title={'Blog Posts'}
      // data={data}
      columns={columns}
    />
  )
}

export default BlogsPost
