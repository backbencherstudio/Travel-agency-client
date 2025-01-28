// React Component for ReviewBooking
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
  deleteReview,
  getBookingById,
  submitReview
} from '../Apis/clientApi/ClientBookApi'
import Loading from '../Shared/Loading'
import { FaStar, FaTrash } from 'react-icons/fa'
import { AuthContext } from '../Context/AuthProvider/AuthProvider'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const ReviewBooking = () => {
  const { id } = useParams()   
  const [bookingData, setBookingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ rating_value: 0, comment: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useContext(AuthContext)

  const fetchBookingData = async () => {
    try {
      setLoading(true)
      const data = await getBookingById(id)
      setBookingData(data)
      setReviews(data.reviews || [])
    } catch (err) {
      console.error('Error fetching booking data:', err)
      setError('Failed to fetch booking details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookingData()
  }, [id])

  // Handle star click
  const handleStarClick = rating_value => {
    setNewReview(prev => ({ ...prev, rating_value }))
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setNewReview(prev => ({ ...prev, [name]: value }))
  }


  // Submit Review Functionality
  const handleReviewSubmit = async () => {
    if (!newReview.rating_value || !newReview.comment.trim()) {
      toast.error('Please provide both rating and comment')
      return
    }

    const packageId = bookingData?.data?.booking_items?.[0]?.package?.id

    if (!packageId) {
      toast.error('Package ID not found')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await submitReview(packageId, newReview)
      if (response.success) {
        // Fetch updated data after submitting review
        await fetchBookingData()
        setNewReview({ rating_value: 0, comment: '' })
        toast.success(response.message || 'Review submitted successfully')
      } else {
        toast.error(response.message || 'Failed to submit review')
      }
    } catch (error) {
      if (error.response?.data?.message === 'Package not found') {
        toast.error(
          'Package not found. Please check the package ID and try again.'
        )
      } else {
        toast.error(
          error.response?.data?.message ||
            'An error occurred while submitting review'
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasUserReviewed =
    bookingData?.data?.booking_items?.[0]?.package?.reviews?.some(
      review => review.user_id === user.id
    )

  // Get user's review if exists
  const userReview = bookingData?.data?.booking_items?.[0]?.package?.reviews?.find(
    review => review.user_id === user.id
  )

  // Delete Review Functionality
  const handleDeleteReview = async reviewId => {
    const packageId = bookingData?.data?.booking_items?.[0]?.package?.id
    if (!packageId || !reviewId) {
      Swal.fire(
        'Error',
        'Failed to delete review. Invalid package or review ID.',
        'error'
      )
      return
    }

    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this review? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      try {
        const response = await deleteReview(packageId, reviewId)
        if (response.success) {
          // Fetch updated data after deleting review
          await fetchBookingData()
          Swal.fire('Deleted!', 'Your review has been deleted.', 'success')
        } else {
          Swal.fire(
            'Error',
            response.message || 'Failed to delete review.',
            'error'
          )
        }
      } catch (error) {
        console.error('Error deleting review:', error)
        Swal.fire(
          'Error',
          'An error occurred while deleting the review.',
          'error'
        )
      }
    }
  }
  //   loading
  if (loading) {
    return (
      <p className='text-center text-gray-500'>
        <Loading />
      </p>
    )
  }

  if (error) {
    return <p className='text-center text-red-500'>{error}</p>
  }

  //   console.log(bookingData)
  //   console.log(user)
  return (
    <div className='mx-auto max-w-[1216px] px-4 xl:px-0 py-10'>
      {bookingData ? (
        <div className='mb-8'>
          <div className='max-w-screen-lg mx-auto'>
            <div className='mt-10'>
              <h1 className='text-4xl font-bold text-gray-800 mb-6'>
                {bookingData?.data?.booking_items?.[0]?.package?.name}
              </h1>
              <div className='flex items-center justify-between my-5'>
                <div className='flex flex-col'>
                  <p className='text-gray-500 capitalize'>Package type</p>
                  <p className='text-lg font-semibold capitalize'>
                    {bookingData?.data?.type}
                  </p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-gray-500 capitalize'>Durations</p>
                  <p className='text-lg font-semibold capitalize'>
                    {bookingData?.data?.booking_items?.[0]?.start_date &&
                      bookingData?.data?.booking_items?.[0]?.end_date && (
                        <>
                          {Math.ceil(
                            (new Date(
                              bookingData.data.booking_items[0].end_date
                            ) -
                              new Date(
                                bookingData.data.booking_items[0].start_date
                              )) /
                              (1000 * 60 * 60 * 24)
                          )}{' '}
                          days
                        </>
                      )}
                  </p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-gray-500 capitalize'>Location</p>
                  <p className='text-lg font-semibold capitalize'>
                    {bookingData?.data?.booking_items?.[0]?.package?.package_destinations?.map(
                      (item, index) => (
                        <span key={index}>
                          {item.destination.name}
                          {index <
                          bookingData.data.booking_items[0].package
                            .package_destinations.length -
                            1
                            ? ', '
                            : ''}
                        </span>
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>
            <img
              className='w-full'
              src={
                bookingData?.booking_items?.[0]?.package?.package_files?.[0]
                  ?.image_url ||
                'https://img.freepik.com/free-photo/tourist-with-map-sunny-sky-background_23-2147828103.jpg'
              }
              alt=''
            />
          </div>
        </div>
      ) : (
        <p className='text-gray-500'>No booking details found.</p>
      )}

      {/* Add New Review */}
      <div>
        <h3 className='text-lg font-semibold text-gray-700 mb-3'>
          Add Your Review
        </h3>
        {hasUserReviewed ? (
          <div className='mb-4'>
            <label className='block text-gray-600 mb-2'>Your Rating:</label>
            <div className='flex items-center space-x-2'>
              {[1, 2, 3, 4, 5].map(num => (
                <FaStar 
                  key={num} 
                  className={`text-2xl ${num <= userReview.rating_value ? 'text-yellow-500' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </div>
        ) : (
          <div className='mb-4'>
            <label className='block text-gray-600 mb-2'>Rating:</label>
            <div className='flex items-center space-x-2'>
              {[1, 2, 3, 4, 5].map(num => (
                <FaStar
                  key={num}
                  className={`cursor-pointer text-2xl ${
                    num <= newReview.rating_value
                      ? 'text-yellow-500'
                      : 'text-gray-300'
                  }`}
                  onClick={() => handleStarClick(num)}
                />
              ))}
            </div>
          </div>
        )}
        <div className='mb-4'>
          <label className='block text-gray-600 mb-2' htmlFor='comment'>
            Comment:
          </label>
          <textarea
            id='comment'
            name='comment'
            value={hasUserReviewed ? userReview.comment : newReview.comment}
            onChange={handleInputChange}
            rows='4'
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500'
            disabled={hasUserReviewed}
          />
        </div>
        <button
          onClick={handleReviewSubmit}
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed'
          disabled={isSubmitting || hasUserReviewed}
        >
          {isSubmitting
            ? 'Submitting...'
            : hasUserReviewed
            ? 'Already Reviewed'
            : 'Submit Review'}
        </button>
      </div>

      {/* Reviews */}
      <div className='bg-white mt-10'>
        <h2 className='text-xl font-semibold text-gray-700 mb-4'>Reviews</h2>
        {bookingData?.data?.booking_items?.[0]?.package?.reviews?.map(
          review => (
            <div
              key={review.id}
              className='border rounded-lg p-4 mb-4 relative flex'
            >
              {/* Profile Icon */}
              <div className='mr-4'>
                <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
                  {/* <span className='text-white text-sm font-bold'>
                    {review.user_name
                      ? review.user_name.charAt(0).toUpperCase()
                      : 'U'}
                  </span> */}
                </div>
              </div>

              {/* Review Content */}
              <div className='flex-1'>
                <div className='flex justify-between items-center mb-2'>
                  <div>
                    {/* <h3 className='text-gray-900 font-semibold'>
                      {user.name || 'Anonymous User'}
                    </h3> */}
                    <p className='text-sm text-gray-500'>
                      {new Date(review.updated_at).toLocaleString()}
                    </p>
                  </div>

                  {/* Show delete icon only for the logged-in user's comments */}
                  {review.user_id === user.id && (
                    <button
                      className='text-red-500 hover:text-red-700'
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      <FaTrash className='h-5 w-5' />
                    </button>
                  )}
                </div>

                {/* Star Rating */}
                <div className='flex items-center mb-2'>
                  {[1, 2, 3, 4, 5].map(star => (
                    <FaStar
                      key={star}
                      className={`${
                        star <= review.rating_value
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className='text-gray-700 whitespace-pre-wrap break-words'>
                  {review.comment || 'No comment provided.'}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ReviewBooking
