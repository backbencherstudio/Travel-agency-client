import { useState } from 'react'
import BlogsTable from '../../../Components/Dashboard/Blogs/BlogsTable'
import { blogData } from '../../../data/blogData'

const BlogsPost = () => {
  const [columns] = useState({
    postId: true,
    title: true,
    blogImg: true,
    author: true,
    publishedDate: true,
    modifiedDate: true,
    status: true
  })
  return (
    <div>
      <BlogsTable title={'Blog Posts'} data={blogData} columns={columns} />
    </div>
  )
}

export default BlogsPost
