import { useState } from 'react'
import BlogsTable from '../../../Components/Dashboard/Blogs/BlogsTable'
import { Helmet } from 'react-helmet-async'

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
    <>
      <Helmet>
        <title>Around 360 - Blog Posts</title>
      </Helmet>
      <BlogsTable
        title={'Blog Posts'}
        // data={data}
        columns={columns}
      />
    </>
  )
}

export default BlogsPost
