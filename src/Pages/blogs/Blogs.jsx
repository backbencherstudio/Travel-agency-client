import { useEffect, useState } from 'react'
import { Pagination, Stack } from '@mui/material'
import Featured from '../../Components/BlogComponents/Featured'
import Subscribe from '../../Components/BlogComponents/Subscribe'
import CardComponent from '../../Components/CardComponent/CardComponent'
import HeroSection from '../../Components/HeroSection/HeroSection'
import ParentComponent from '../../Components/ParentComponent/ParentComponent'
import Faqs from '../../Components/Home/Faqs'

import blogImage from '../../assets/img/blogs/blogImage.png'
import { allBlogsGet } from '../../Apis/clientApi/ClientBlogApi'

import { Skeleton, Box } from '@mui/material'

const Blogs = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/tours' }
  ]
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const blogsPerPage = 6

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
      <HeroSection
        bgImg={blogImage}
        pageName='Our Blogs'
        links={links}
        description='Explore our blog for the latest travel tips, destination guides, and inspiring stories to fuel your wanderlust. From must-see locations to insider advice, we’re here to make your journey unforgettable.'
      />
      <div className='bg-[#F0F4F9]'>
        <ParentComponent>
          {/* Featured Section */}
          <Featured />

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
          <div className='flex justify-center mt-20'>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(blogs.length / blogsPerPage)}
                color='primary'
                page={page}
                onChange={handleChangePage}
              />
            </Stack>
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
