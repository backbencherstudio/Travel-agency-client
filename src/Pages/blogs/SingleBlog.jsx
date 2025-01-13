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
import {
  getBlogDetails,
  postCommentOnBlog,
  deleteCommentOnBlog,
  postLikeOnBlog
} from '../../Apis/clientApi/ClientBlogApi'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import Swal from 'sweetalert2'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { BiSolidLike } from 'react-icons/bi'

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
  const [comment, setComment] = useState('')
  const [commentError, setCommentError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLiking, setIsLiking] = useState(false) // New state for like button
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await getBlogDetails(id)
        console.log('Blog details fetched:', response)

        if (response.errors || response.message) {
          setError(response.message || 'Failed to fetch blog details')
        } else {
          setBlog(response)
          setIsLiked(response.data?.is_liked_by_user || false)
        }
      } catch (err) {
        // console.error('Error fetching blog details:', err)
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

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      setCommentError('Comment cannot be empty.')
      return
    }

    setCommentError('')
    setIsSubmitting(true)

    try {
      const response = await postCommentOnBlog(id, comment)
      if (response.success) {
        const updatedBlog = await getBlogDetails(id)
        setBlog(updatedBlog)
        setComment('')
        toast.success('Comment posted successfully!')
      } else {
        setCommentError(response.message || 'Failed to post comment')
        toast.error(response.message || 'Failed to post comment')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      setCommentError('An unexpected error occurred while posting the comment.')
      toast.error('An unexpected error occurred.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikeClick = async () => {
    if (!user) {
      toast.error('Please log in to like the post.')
      return
    }

    setIsLiking(true)
    try {
      const response = await postLikeOnBlog(id)
      if (response.success) {
        const updatedBlog = await getBlogDetails(id)
        setBlog(updatedBlog)
        setIsLiked(!isLiked)
        toast.success(isLiked ? 'You unliked the post!' : 'You liked the post!')
      } else {
        toast.error(response.message || 'Failed to like/unlike the post.')
      }
    } catch (error) {
      toast.error('An unexpected error occurred while liking the post.')
    } finally {
      setIsLiking(false)
    }
  }

  const handleDeleteComment = async commentId => {
    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure you want to delete this comment?',
      text: 'You won’t be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      try {
        const response = await deleteCommentOnBlog(id, commentId)
        if (response.errors) {
          await Swal.fire(
            'Error',
            response.message || 'Failed to delete the comment.',
            'error'
          )
        } else {
          // Success case
          await Swal.fire(
            'Deleted!',
            'Your comment has been deleted.',
            'success'
          )
          const updatedBlog = await getBlogDetails(id)
          setBlog(updatedBlog)
        }
      } catch (error) {
        await Swal.fire(
          'Error',
          'An unexpected error occurred while deleting the comment.',
          'error'
        )
        console.error(error)
      }
    }
  }

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
        <div className='blog-details grid grid-cols-12 gap-6'>
          <div className='col-span-12 lg:col-span-8'>
            <div>
              <img
                className='rounded-2xl'
                src={blog.data?.blog_images[0]?.image_url}
                alt={blog.data?.title}
              />
            </div>
            <span className='flex items-center mt-5 mb-6 gap-2'>
              <button
                className='flex items-center gap-1'
                onClick={handleLikeClick}
                disabled={isLiking}
              >
                <SlLike
                  className={`text-xl ${
                    isLiked ? 'text-orange-500' : 'text-orange-500'
                  } cursor-pointer`}
                />

                {isLiking ? 'Liking...' : `${blog.data?.like_count} Likes`}
              </button>

              <h2 className='flex items-center mr-2'>
                <FaRegComments className='text-orange-500 mr-1 text-xl' />
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

              {user ? (
                <div>
                  <div className='relative'>
                    <input
                      type='text'
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder='Leave a comment...'
                      className='w-full px-4 py-4 pr-28 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#EB5B2A] focus:border-transparent'
                    />
                    <button
                      onClick={handleCommentSubmit}
                      disabled={isSubmitting}
                      className='absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-3 bg-[#0E457D] text-white rounded-lg font-medium hover:bg-[#0e457de4] text-[15px] duration-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                  {commentError && (
                    <p className='text-red-500 mt-2'>{commentError}</p>
                  )}
                </div>
              ) : (
                <div className='mt-4'>
                  <p>
                    Please{' '}
                    <button
                      className='text-[#EB5B2A] font-bold underline'
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
              <h2 className='font-inter text-[24px] font-semibold leading-[1.3] tracking-[0.12px] mb-7'>
                {blog.data?.blog_comments.length} Comments
              </h2>

              {blog.data?.blog_comments.map(comment => (
                <div key={comment.id} className='mb-5 border-b pb-5'>
                  <div className='flex items-center'>
                    <div className='flex '>
                      {/* img */}
                      <Avatar
                        alt={comment.user.name}
                        src={comment.user.avatar}
                      />

                      <span className='ml-2'>
                        <h2 className='font-inter text-[16px] text-[#0F1416] capitalize font-bold '>
                          {comment.user.name}
                        </h2>
                        <p className='mt-1 text-[14px] text-[#0F1416]'>
                          {new Date(comment.created_at).toLocaleString()}
                        </p>
                      </span>
                    </div>

                    {/* Show delete button if the comment belongs to the logged-in user */}
                    {user && comment.user.id === user.id && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className='ml-auto text-red-500 hover:underline'
                      >
                        <RiDeleteBin6Line className='text-2xl' />
                      </button>
                    )}
                  </div>
                  <p className='mt-5 text-[16px] text-[#0F1416] leading-6'>
                    {comment.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='col-span-12 lg:col-span-4 '>
            <div className='flex border rounded-lg items-center px-2 bg-white'>
              <CiSearch className='text-3xl cursor-pointer' />
              <input type='text' placeholder='Search blog...' className='w-full p-2 focus:outline-none' />
            </div>

            <div className='bg-[#f0f4f9] mt-4 px-6 py-5 rounded-lg'>
              <h2 className='font-inter text-[20px] font-bold'>Recent Posts</h2>
              <div className='mt-5'>
                {blog.data?.recent_blogs.map(item => (
                  <div key={item.id} className='mb-5 pb-5 border-b'>
                    <div className='flex items-center'>
                      <img
                        src={item.blog_images[0]?.image_url}
                        className='w-[100px] h-[80px] rounded-xl'
                        alt={item.title}
                      />
                      <span className='ml-2'>
                        <h2 className='font-inter text-[16px] font-bold'>
                          {item.title}
                        </h2>
                        <p className='mt-2'>
                          {new Date(item.created_at).toLocaleDateString(
                            'en-GB',
                            {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            }
                          )}
                        </p>
                      </span>
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
