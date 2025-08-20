import { useEffect, useState } from 'react'
import Featured from '../../Components/BlogComponents/Featured'
import Subscribe from '../../Components/BlogComponents/Subscribe'
import CardComponent from '../../Components/CardComponent/CardComponent'
import HeroSection from '../../Components/HeroSection/HeroSection'
import ParentComponent from '../../Components/ParentComponent/ParentComponent'
import Faqs from '../../Components/Home/Faqs'

import blogImage from '../../assets/img/blogs/blogImage.png'
import { allBlogsGet } from '../../Apis/clientApi/ClientBlogApi'

import { Skeleton, Box } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const Blogs = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/tours' }
  ]
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const blogsPerPage = 4

  // Fetching blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      const res = await allBlogsGet()
      if (res.success) {
        setBlogs(res.data)
      } else {
        setError(res.message)
      }
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  const displayedBlogs = blogs.slice(
    (page - 1) * blogsPerPage,
    page * blogsPerPage
  )

  const skeletonArray = Array.from({ length: blogsPerPage })

  return (
    <div>
      <Helmet>
        <title>Around 360 - Blogs</title>
      </Helmet>
      <HeroSection
        bgImg={blogImage}
        pageName='Our Blogs'
        links={links}
        description='Explore our blog for the latest travel tips, destination guides, and inspiring stories to fuel your wanderlust. From must-see locations to insider advice, we’re here to make your journey unforgettable.'
      />
      <div className='bg-[#F0F4F9] px-5 pt-12'>
        <ParentComponent>
          {/* Featured Section */}
          <Featured blogs={displayedBlogs} />

          {/* All Blogs Section */}
          {loading ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8'>
              {skeletonArray.map((_, index) => (
                <Box
                  key={index}
                  className='bg-white shadow-md rounded-xl'
                  p={2}
                >
                  <Skeleton
                    variant='rectangular'
                    width='100%'
                    height={200}
                    className='rounded-t-lg'
                  />
                  <Box pt={2}>
                    <Skeleton variant='text' width='80%' height={32} />
                    <Skeleton variant='text' width='60%' height={24} />
                    <Skeleton
                      variant='circular'
                      width={40}
                      height={40}
                      className='mt-4'
                    />
                  </Box>
                </Box>
              ))}
            </div>
          ) : error ? (
            <div className='text-center text-red-600 mt-10'>{error}</div>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8'>
              {displayedBlogs.map(item => (
                <CardComponent
                  key={item.id}
                  blog={{
                    id: item.id,
                    title: item.title,
                    body: item.body,
                    createTime: item.created_at,
                    readTime: item.read_time,
                    image: item.blog_images[0]?.image_url || blogImage,
                    user: {
                      name: item.user.name || 'Guest Author',
                      avatar:
                        item.user.avatar || 'https://via.placeholder.com/40'
                    }
                  }}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-20">
            <div className="flex items-center gap-2 bg-white rounded-lg shadow-md px-4 py-2">
              <button
                onClick={() => handleChangePage(null, page - 1)}
                disabled={page === 1}
                className={`flex items-center gap-1 px-3 py-1 ${
                  page === 1 ? 'text-gray-400' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <MdKeyboardArrowLeft className="text-xl" />
                Previous
              </button>

              {[...Array(Math.ceil(blogs.length / blogsPerPage))].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleChangePage(null, index + 1)}
                  className={`w-8 h-8 rounded-full ${
                    page === index + 1
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handleChangePage(null, page + 1)}
                disabled={page === Math.ceil(blogs.length / blogsPerPage)}
                className={`flex items-center gap-1 px-3 py-1 ${
                  page === Math.ceil(blogs.length / blogsPerPage)
                    ? 'text-gray-400'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Next
                <MdKeyboardArrowRight className="text-xl" />
              </button>
            </div>
          </div>

          {/* Subscribe Section */}
          <div className='mt-10'>
            <Subscribe />
          </div>

          {/* FAQs Section */}
          <div className='py-20'>
            <Faqs />
          </div>
        </ParentComponent>
      </div>
    </div>
  )
}

export default Blogs
