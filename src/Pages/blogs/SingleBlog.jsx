/* eslint-disable react/no-unescaped-entities */
import { Avatar } from '@mui/material'
import HeroSection from '../../Components/HeroSection/HeroSection'
import ParentComponent from '../../Components/ParentComponent/ParentComponent'

import blogImage from '../../assets/img/blogs/blogImage.png'
import Faqs from '../../Components/Home/Faqs'
import { FaRegComments } from 'react-icons/fa'
import { SlLike } from 'react-icons/sl'
import { CiSearch } from 'react-icons/ci'
import { useContext, useEffect, useState } from 'react'
import { getBlogDetails } from '../../Apis/clientApi/ClientBlogApi'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider/AuthProvider'

const SingleBlog = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Blog Details', path: '' }
  ]
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await getBlogDetails(id)
        console.log('Blog details fetched:', response)

        if (response.errors || response.message) {
          setError(response.message || 'Failed to fetch blog details')
        } else {
          setBlog(response)
        }
      } catch (err) {
        console.error('Error fetching blog details:', err)
        setError('An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogDetails()
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (!blog) {
    return <p>No blog found!</p>
  }

  const handleLoginRedirect = () => {
    navigate('/login')
  }

  const comments = [
    {
      id: 1,
      image:
        'https://static.artzone.ai/media/62077/conversions/22yojXNhcyfLN9S4fsdjFXkjvxK7UcGKiIw92ybU-w768.webp',
      name: 'Mark Williams',
      data: '11 jun, 2024',
      description:
        'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
      id: 2,
      image:
        'https://static.artzone.ai/media/62077/conversions/22yojXNhcyfLN9S4fsdjFXkjvxK7UcGKiIw92ybU-w768.webp',
      name: 'Mark Williams',
      data: '11 jun, 2024',
      description:
        'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
      id: 3,
      image:
        'https://static.artzone.ai/media/62077/conversions/22yojXNhcyfLN9S4fsdjFXkjvxK7UcGKiIw92ybU-w768.webp',
      name: 'Mark Williams',
      data: '11 jun, 2024',
      description:
        'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    }
  ]

  return (
    <div className='bg-[#F0F4F9]'>
      <HeroSection
        bgImg={blogImage}
        pageName='Our Blogs'
        dynamicData='Dynamic Data'
        links={links}
        pathName1='/'
        pathName2='blogs'
        pageName1='Home'
        pageName2='Blog'
        description='Explore our blog for the latest travel tips, destination guides, and inspiring stories to fuel your wanderlust. From must-see locations to insider advice, we’re here to make your journey unforgettable.'
      />

      <ParentComponent>
        <div className='blog-details grid grid-cols-12 gap-6 '>
          <div className=' col-span-12 lg:col-span-8'>
            <div>
              <img
                className='rounded-2xl'
                src='https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg'
                alt=''
              />
            </div>
            <span className='flex items-center mt-5 mb-6 gap-2'>
              <h2 className='flex items-center mr-2'>
                {' '}
                <SlLike className='text-orange-500 mr-1 text-xl ' />{' '}
                {blog.data?.like_count} Likes
              </h2>
              <h2 className='flex items-center mr-2'>
                <FaRegComments className='text-orange-500 mr-1 text-xl ' />{' '}
                {blog.data?.blog_comments.length} Comments
              </h2>
            </span>

            <div className='content'>
              <h2 className='font-inter text-[30px] md:text-[40px] font-semibold leading-[130%]'>
                {blog.data?.title}
              </h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: blog.data?.body || 'No content available'
                }}
              ></div>
            </div>

            {/* Comment Section */}
            <div className='max-w-2xl w-full mt-10'>
              <h2 className='text-xl font-semibold mb-4'>Comments</h2>

              {/* Conditional Rendering */}
              {user ? (
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Leave a comment...'
                    className='w-full px-4 py-4 pr-28 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EB5B2A] focus:border-transparent'
                  />
                  <button className='absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-3 bg-[#0E457D] text-white rounded-lg font-medium hover:bg-[#0e457de4] text-[15px] duration-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                    Submit
                  </button>
                </div>
              ) : (
                <div className='mt-4'>
                  <p>
                    Please{' '}
                    <button
                      className='text-[#EB5B2A]  font-bold underline'
                      onClick={handleLoginRedirect}
                    >
                      log in
                    </button>{' '}
                    to leave a comment.
                  </p>
                </div>
              )}
            </div>

            <div className='mt-12'>
              <h2 className='font-inter text-[24px] font-semibold leading-[1.3] tracking-[0.12px] mb-7 '>
                {comments?.length} Comments
              </h2>

              {comments?.map(item => (
                <div key={item.id}>
                  <div className='mb-5 border-b pb-5 '>
                    <div className='flex items-center'>
                      <Avatar alt='Travis Howard' src={item.image} />
                      <span className='ml-2'>
                        <h2 className='font-inter text-[16px] font-bold leading-[1.6] tracking-[0.08px]'>
                          {item.name}
                        </h2>
                        <p className='mt-2'>{item.data}</p>
                      </span>
                    </div>

                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=' col-span-12 lg:col-span-4'>
            <div className='flex border rounded-lg items-center px-2 '>
              <CiSearch className='text-3xl cursor-pointer ' />
              <input type='text' className=' w-full p-2 focus:outline-none ' />
            </div>

            <div className='bg-[#f0f4f9] mt-4 px-6 py-5 rounded-lg '>
              <h2 className='font-inter text-[20px] font-bold leading-[1.3] tracking-[0.1px]'>
                {' '}
                Recent Post{' '}
              </h2>

              <div className='mt-5'>
                {comments?.map((item, index) => (
                  <div key={item.id}>
                    <div
                      className={`mb-5 pb-5 ${
                        comments.length === index + 1
                          ? 'border-none'
                          : 'border-b'
                      } `}
                    >
                      <div className='flex items-center'>
                        <img
                          src='https://create.microsoft.com/_next/image?url=https%3A%2F%2Fdsgrcdnblobprod5u3.azureedge.net%2Fimages%2Fimage-creator-T03_cat.webp&w=1920&q=90'
                          className='w-[100px] h-[80px] rounded-xl '
                          alt=''
                        />
                        <span className='ml-2'>
                          <h2 className='font-inter text-[16px] font-bold leading-[1.6] tracking-[0.08px]'>
                            {item.name}
                          </h2>
                          <p className='mt-2'>{item.data}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='py-20'>
          <Faqs />
        </div>
      </ParentComponent>
    </div>
  )
}

export default SingleBlog
