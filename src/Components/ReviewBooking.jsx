// React Component for ReviewBooking
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
  deleteReview,
  getBookingById,
  submitReview,
  updateComment
} from '../Apis/clientApi/ClientBookApi'
import Loading from '../Shared/Loading'
import { FaDollarSign, FaPaw, FaStar } from 'react-icons/fa'
import { AuthContext } from '../Context/AuthProvider/AuthProvider'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { IoLocationSharp, IoTime } from 'react-icons/io5'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { Pagination } from '@mui/material'
import { Helmet } from 'react-helmet-async'
const ReviewBooking = () => {
  const { id } = useParams()
  const [bookingData, setBookingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ rating_value: 0, comment: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useContext(AuthContext)
  const [editMode, setEditMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const reviewsPerPage = 5
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
      toast.error('Please provide both rating and comment.')
      return
    }

    const packageId = bookingData?.data?.booking_items?.[0]?.package?.id

    if (!packageId) {
      toast.error('Package ID not found.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await submitReview(packageId, newReview)
      if (response.success) {
        toast.success('Review submitted successfully.')
        setNewReview({ rating_value: 0, comment: '' })
        fetchBookingData()
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error('An error occurred while submitting the review.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasUserReviewed =
    bookingData?.data?.booking_items?.[0]?.package?.reviews?.some(
      review => review.user_id === user.id
    )

  // Get user's review if exists
  const userReview =
    bookingData?.data?.booking_items?.[0]?.package?.reviews?.find(
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

  // Update Review Functionality
  const handleReviewUpdate = async () => {
    if (!newReview.comment.trim()) {
      toast.error('Comment cannot be empty.')
      return
    }

    const packageId = bookingData?.data?.booking_items?.[0]?.package?.id
    const reviewId = newReview.id

    if (!packageId || !reviewId) {
      toast.error('Invalid package or review ID.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await updateComment(packageId, reviewId, {
        comment: newReview.comment
      })
      if (response.success) {
        toast.success('Review updated successfully.')
        setEditMode(false)
        setNewReview({ rating_value: 0, comment: '' })
        fetchBookingData()
      } else {
        toast.error('Failed to update review.')
      }
    } catch (error) {
      toast.error('An error occurred while updating the review.')
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleEditClick = review => {
    setEditMode(true)
    setNewReview({ id: review.id, comment: review.comment })
  }

  // Calculate the number of pages
  const totalPages = Math.ceil(
    bookingData?.data?.booking_items?.[0]?.package?.reviews?.length /
      reviewsPerPage
  )

  // Get the reviews for the current page
  const displayedReviews =
    bookingData?.data?.booking_items?.[0]?.package?.reviews?.slice(
      (currentPage - 1) * reviewsPerPage,
      currentPage * reviewsPerPage
    ) || []

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value)
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

  return (
    <div className='mx-auto max-w-[1216px] px-4 xl:px-0 py-10'>
       <Helmet>
        <title>Around 360 - Review Booking</title>
      </Helmet>
      {bookingData ? (
        <div className='mb-8 flex flex-col md:flex-row justify-between  gap-10 w-full'>
          <div className='w-full lg:w-8/12'>
            <div>
              <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5'>
                <div>
                  <h1 className='text-2xl lg:text-4xl font-bold text-gray-800 '>
                    {bookingData?.data?.booking_items?.[0]?.package?.name}
                  </h1>

                  <div className='flex flex-col mt-3'>
                    <div className='text-md capitalize'>
                      {bookingData?.data?.booking_items?.[0]?.package?.package_destinations?.map(
                        (item, index) => (
                          <div key={index} className='flex items-center'>
                            {/* Icon added for each destination */}
                            <IoLocationSharp className='mr-2 text-lg' />
                            <span>
                              {item.destination?.name},{' '}
                              {item.destination?.country?.name}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <p className='text-lg font-semibold text-orange-500'>
                    {(() => {
                      const reviewCount =
                        bookingData?.data?.booking_items?.[0]?.package?.reviews
                          ?.length ?? 0

                      if (reviewCount >= 1 && reviewCount <= 100) {
                        return 'Good'
                      } else if (reviewCount > 100) {
                        return 'Excellent'
                      } else {
                        return 'No reviews yet'
                      }
                    })()}
                  </p>
                  <p className='text-orange-500'>
                    {bookingData?.data?.booking_items?.[0]?.average_rating ?? 0}
                    <span>/5</span>
                    <span className='text-sm text-gray-500'>
                      ({' '}
                      {bookingData?.data?.booking_items?.[0]?.package?.reviews
                        ?.length ?? 0}{' '}
                      reviews )
                    </span>
                  </p>
                </div>
              </div>

              {/* package details  */}
              <div className='flex flex-col  lg:flex-row lg:items-center gap-5 justify-between my-5 mt-10 border-t border-gray-300 py-2 border-b'>
                <div className='flex items-center gap-2'>
                  <IoTime className='text-3xl text-black' />
                  <div className='flex flex-col'>
                    <p className='capitalize text-lg font-semibold'>
                      Durations{' '}
                    </p>
                    <p className=' text-gray-500 capitalize'>
                      {bookingData?.data?.booking_items?.[0]?.package?.duration}{' '}
                      Days
                    </p>
                    {/* <p className=' text-gray-500 capitalize'>
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
                    </p> */}
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <FaPaw className='text-3xl text-black' />
                  <div className='flex flex-col'>
                    <p className='capitalize text-lg font-semibold'>
                      Package type
                    </p>
                    <p className=' text-gray-500 capitalize'>
                      {bookingData?.data?.type}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-1'>
                  <FaDollarSign className='text-3xl text-black' />
                  <div className='flex flex-col'>
                    <p className='capitalize text-lg font-semibold'>Price</p>
                    <p className=' text-gray-500 capitalize text-lg'>
                      ${bookingData?.data?.booking_items?.[0]?.package?.price}
                      <span className='text-sm text-gray-500'>
                        / Per person
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <img
              className='w-full rounded-lg'
              src={
                bookingData?.booking_items?.[0]?.package?.package_files?.[0]
                  ?.image_url ||
                'https://img.freepik.com/free-photo/tourist-with-map-sunny-sky-background_23-2147828103.jpg'
              }
              alt=''
            />
            {/* overview section  */}
            <div className='shadow-md mt-5 border border-gray-300 rounded-lg p-5'>
              <h2 className='text-xl font-semibold text-gray-700 mb-4 border-b-2 border-orange-500 inline-block'>
                Overview
              </h2>

              <p>
                {bookingData?.data?.booking_items?.[0]?.package?.description}
              </p>
            </div>

            {/* mobile device show user info */}
            <div className='block md:hidden mt-10 w-full lg:w-5/12 shadow-md border border-gray-300 rounded-lg p-5 self-start'>
              {/* package category  */}
              <div className='flex flex-col items-center'>
                <h2 className='text-lg font-semibold text-gray-700 mb-4 border-b-2 border-orange-500 inline-block'>
                  {
                    bookingData?.data?.booking_items?.[0]?.package
                      ?.package_categories?.[0]?.category?.name
                  }
                </h2>
              </div>
              {/* booking date  */}
              <div className='mt-5'>
                <h1 className='text-lg font-semibold text-gray-700 mb-2 border-b border-orange-500 inline-block'>
                  Travel Date{' '}
                </h1>
                <div className='flex  gap-10'>
                  <div>
                    <h1 className='font-semibold text-gray-700'>Start Date </h1>
                    <p className='text-gray-500 mt-1'>
                      {new Date(
                        bookingData?.data?.booking_items?.[0]?.start_date
                      ).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <h1 className='font-semibold text-gray-700'>End Date </h1>
                    <p className='text-gray-500 mt-1'>
                      {new Date(
                        bookingData?.data?.booking_items?.[0]?.end_date
                      ).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              {/* booking extra service  */}
              <div className='my-10'>
                <h1 className='text-lg font-semibold text-gray-700 mb-2 border-b border-orange-500 inline-block'>
                  Booking Extra Service{' '}
                </h1>
                {bookingData?.data?.booking_extra_services?.length > 0 ? (
                  bookingData.data.booking_extra_services.map(
                    (service, index) => (
                      <div
                        key={index}
                        className='flex justify-between items-center border-b py-2'
                      >
                        <span className='text-gray-700 '>
                          {service.extra_service?.name || 'Unnamed Service'}
                        </span>
                        <span className='text-orange-500 '>
                          ${service.extra_service?.price}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <p className='text-gray-500'>No extra services added.</p>
                )}
              </div>
              {/* total traveler  */}
              <div className='mt-5'>
                <h1 className='text-lg font-semibold text-gray-700 mb-2 border-b border-orange-500 inline-block'>
                  Travellers{' '}
                </h1>
                {bookingData?.data?.booking_travellers?.length > 0 ? (
                  bookingData.data.booking_travellers.map(
                    (traveller, index) => (
                      <div
                        key={index}
                        className='flex justify-between items-center border-b py-2'
                      >
                        <span className='text-gray-700 '>
                          {traveller.full_name || 'Unnamed Traveller'}
                        </span>
                        <span className='text-gray-500 text-sm capitalize'>
                          {traveller.type || 'Unknown Type'}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <p className='text-gray-500'>No travellers added.</p>
                )}
              </div>

              {/* paid amount  */}
              <div className='mt-10'>
                <div className='flex items-center justify-between border-b pb-3 mb-3'>
                  <h2 className='text-xl font-bold text-gray-800'>
                    Paid Amount
                  </h2>
                  <span
                    className={`text-white text-sm px-2 py-1 rounded-md capitalize ${
                      bookingData?.data?.payment_transactions?.[0]?.status ===
                      'succeeded'
                        ? 'bg-green-500'
                        : 'bg-orange-500'
                    }`}
                  >
                    {bookingData?.data?.payment_transactions?.[0]?.status}
                  </span>
                </div>
                <div className='text-center'>
                  <p className='text-3xl font-extrabold text-orange-500'>
                    ${bookingData?.data?.total_amount}
                  </p>
                  <p className='text-gray-600 text-sm mt-1'>
                    {bookingData?.data?.payment_transactions?.[0]?.status ===
                    'succeeded'
                      ? 'Thank you for your payment!'
                      : 'Your payment is pending. Please complete it at your earliest convenience.'}
                  </p>
                </div>
              </div>
            </div>
            {/* review and comment section  */}
            <div className='mt-10 '>
              <div className='border border-gray-300 rounded-lg p-5'>
                <h3 className='text-lg font-semibold text-gray-700 mb-5 uppercase'>
                  Write Your Review
                </h3>
                {hasUserReviewed ? (
                  <div className='mb-4 flex items-center gap-2'>
                    <label className='block text-gray-600 '>Your Rating:</label>
                    <div className='flex items-center space-x-2'>
                      {[1, 2, 3, 4, 5].map(num => (
                        <FaStar
                          key={num}
                          className={`text-2xl ${
                            num <= userReview.rating_value
                              ? 'text-orange-500'
                              : 'text-gray-300'
                          }`}
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
                              ? 'text-orange-500'
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
                    value={newReview.comment}
                    onChange={handleInputChange}
                    rows='4'
                    disabled={hasUserReviewed}
                    className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#F9751A]'
                  />
                </div>
                <div className='flex justify-end mt-2'>
                  {editMode ? (
                    <button
                      onClick={handleReviewUpdate}
                      className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Updating...' : 'Update Review'}
                    </button>
                  ) : (
                    <button
                      onClick={handleReviewSubmit}
                      className='bg-[#F9751A] text-white px-4 py-2 rounded-md hover:bg-[#F9631A]'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  )}
                </div>
              </div>

              {/* Reviews */}

              <div className='bg-white mt-10'>
                <h2 className='text-xl font-semibold text-gray-700 mb-4'>
                  Reviews
                </h2>

                {displayedReviews.map(review => (
                  <div
                    key={review.id}
                    className='border rounded-lg p-4 mb-4 relative flex'
                  >
                    {/* Profile Icon */}
                    <div className='mr-4'>
                      <div className='w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
                        {review.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className='flex-1'>
                      <div className='flex justify-between items-center mb-2'>
                        <div>
                          <h3 className='text-gray-900 font-semibold'>
                            {review.user?.name || 'Anonymous User'}
                          </h3>
                          <p className='text-sm text-gray-500'>
                            {new Date(review.updated_at).toLocaleString()}
                          </p>
                        </div>

                        {/* Show delete and update icons only for the logged-in user's comments */}
                        {review.user?.id === user?.id && (
                          <div className='flex space-x-2'>
                            <button
                              onClick={() => handleEditClick(review)}
                              className='text-blue-500 hover:text-blue-700'
                            >
                              <FiEdit className='text-xl' />
                            </button>

                            <button
                              className='text-red-500 hover:text-red-700'
                              onClick={() => handleDeleteReview(review.id)}
                            >
                              <FiTrash2 className='text-xl' />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Star Rating */}
                      <div className='flex items-center mb-2'>
                        {[1, 2, 3, 4, 5].map(star => (
                          <FaStar
                            key={star}
                            className={`${
                              star <= review.rating_value
                                ? 'text-orange-500'
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
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className='flex justify-center mt-5'>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color='primary'
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/*  */}
          <div className='hidden md:block w-full lg:w-5/12 shadow-md border border-gray-300 rounded-lg p-5 self-start'>
            {/* package category  */}
            <div className='flex flex-col items-center'>
              <h2 className='text-lg font-semibold text-gray-700 mb-4 border-b-2 border-orange-500 inline-block'>
                {
                  bookingData?.data?.booking_items?.[0]?.package
                    ?.package_categories?.[0]?.category?.name
                }
              </h2>
            </div>
            {/* booking date  */}
            <div className='mt-5'>
              <h1 className='text-lg font-semibold text-gray-700 mb-2 border-b border-orange-500 inline-block'>
                Travel Date{' '}
              </h1>
              <div className='flex  gap-10'>
                <div>
                  <h1 className='font-semibold text-gray-700'>Start Date </h1>
                  <p className='text-gray-500 mt-1'>
                    {new Date(
                      bookingData?.data?.booking_items?.[0]?.start_date
                    ).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <h1 className='font-semibold text-gray-700'>End Date </h1>
                  <p className='text-gray-500 mt-1'>
                    {new Date(
                      bookingData?.data?.booking_items?.[0]?.end_date
                    ).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
            {/* booking extra service  */}
            <div className='my-10'>
              <h1 className='text-lg font-semibold text-gray-700 mb-2 border-b border-orange-500 inline-block'>
                Booking Extra Service{' '}
              </h1>
              {bookingData?.data?.booking_extra_services?.length > 0 ? (
                bookingData.data.booking_extra_services.map(
                  (service, index) => (
                    <div
                      key={index}
                      className='flex justify-between items-center border-b py-2'
                    >
                      <span className='text-gray-700 '>
                        {service.extra_service?.name || 'Unnamed Service'}
                      </span>
                      <span className='text-orange-500 '>
                        ${service.extra_service?.price}
                      </span>
                    </div>
                  )
                )
              ) : (
                <p className='text-gray-500'>No extra services added.</p>
              )}
            </div>
            {/* total traveler  */}
            <div className='mt-5'>
              <h1 className='text-lg font-semibold text-gray-700 mb-2 border-b border-orange-500 inline-block'>
                Travellers{' '}
              </h1>
              {bookingData?.data?.booking_travellers?.length > 0 ? (
                bookingData.data.booking_travellers.map((traveller, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center border-b py-2'
                  >
                    <span className='text-gray-700 '>
                      {traveller.full_name || 'Unnamed Traveller'}
                    </span>
                    <span className='text-gray-500 text-sm capitalize'>
                      {traveller.type || 'Unknown Type'}
                    </span>
                  </div>
                ))
              ) : (
                <p className='text-gray-500'>No travellers added.</p>
              )}
            </div>

            {/* paid amount  */}
            <div className='mt-10'>
              <div className='flex items-center justify-between border-b pb-3 mb-3'>
                <h2 className='text-xl font-bold text-gray-800'>Paid Amount</h2>
                <span
                  className={`text-white text-sm px-2 py-1 rounded-md capitalize ${
                    bookingData?.data?.payment_transactions?.[0]?.status ===
                    'succeeded'
                      ? 'bg-green-500'
                      : 'bg-orange-500'
                  }`}
                >
                  {bookingData?.data?.payment_transactions?.[0]?.status}
                </span>
              </div>
              <div className='text-center'>
                <p className='text-3xl font-extrabold text-orange-500'>
                  ${bookingData?.data?.total_amount}
                </p>
                <p className='text-gray-600 text-sm mt-1'>
                  {bookingData?.data?.payment_transactions?.[0]?.status ===
                  'succeeded'
                    ? 'Thank you for your payment!'
                    : 'Your payment is pending. Please complete it at your earliest convenience.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className='text-gray-500'>No booking details found.</p>
      )}
    </div>
  )
}

export default ReviewBooking
