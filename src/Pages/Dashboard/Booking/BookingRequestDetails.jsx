import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { booking } from '../../../data/booking'

const BookingRequestDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  //   const [isOpen, setIsOpen] = useState(false)
  //   const [selectedStatus, setSelectedStatus] = useState('All Status')
  useEffect(() => {
    const fetchBookingDetails = () => {
      const requestDetails = booking.find(
        item => item.bookingId.toString() === id
      )
      setTimeout(() => {
        setBookingDetails(requestDetails)
        setLoading(false)
      }, 1000)
    }

    fetchBookingDetails()
  }, [id])

  if (loading) {
    return <div className='text-center mt-4'>Loading...</div>
  }

  if (!bookingDetails) {
    return (
      <div className='text-center text-red-500 mt-4'>
        Booking request not found!
      </div>
    )
  }

  //   const statuses = [
  //     'All Status',
  //     'Booking Request',
  //     'Pending',
  //     'Confirmed',
  //     'Cancelled'
  //   ]

  return (
    <div className='p-8 bg-white shadow-lg rounded-lg w-full  mx-auto'>
      {/* <div className='flex justify-center '>
        <div className='relative inline-block text-left'>
         
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200'
          >
            {selectedStatus}
            <span className='ml-2'>&#9660;</span>
          </button>

      
          {isOpen && (
            <div className='absolute mt-5 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 right-0 '>
              
              <div className='absolute top-[-10px] right-4 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45'></div>

              <div className='bg-white rounded-md'>
                {statuses.map(status => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status)
                      setIsOpen(false)
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-200 ${
                      selectedStatus === status
                        ? 'bg-gray-100 font-semibold'
                        : ''
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div> */}
      <h2 className='text-2xl font-semibold mb-8 text-center'>
        Booking Request Details
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-8 my-10'>
        {/* Left Column */}
        <div className='w-full'>
          <h3 className='font-semibold text-lg mb-6'>Traveler Information</h3>
          <div className='grid grid-cols-2 gap-4'>
            <p className='text-gray-600 text-sm'>Traveler's Name:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {bookingDetails.customerName || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Email:</p>
            <p className='font-medium text-[#111827] text-[14px] break-words max-w-full overflow-hidden overflow-ellipsis whitespace-normal'>
              {bookingDetails.email || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Booking Date:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {bookingDetails.date || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Phone:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {bookingDetails.phone || 'N/A'}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className='w-full'>
          <h3 className='font-semibold text-lg mb-6'>Package Information</h3>
          <div className='grid grid-cols-2 gap-4'>
            <p className='text-gray-600 text-sm'>Package:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {bookingDetails.packageInformation?.[0]?.packageName || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Tour Category:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {bookingDetails.packageInformation?.[0]?.tourCategory || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Geofencing:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {bookingDetails.packageInformation?.[0]?.geofencing || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Package Duration (Days):</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {bookingDetails.packageInformation?.[0]?.packageDuration || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Extra Service:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {bookingDetails.packageInformation?.[0]?.extraServices || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Total Amount:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {bookingDetails.packageInformation?.[0]?.totalAmount || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Total Status:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {bookingDetails.packageInformation?.[0]?.totalStatus || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='mt-8 flex flex-col sm:flex-row justify-center gap-4'>
        <button className='bg-[#4CAF50] hover:bg-green-600 text-[14px] transform duration-300 text-white font-medium py-2 px-5 rounded shadow'>
          Approve
        </button>
        <button className='bg-[#FF5252] hover:bg-red-600 text-[14px] transform duration-300 text-white font-medium py-2 px-5 rounded shadow'>
          Reject
        </button>
        <button
          className='bg-[#E7ECF2] hover:bg-gray-400  text-[14px] text-[#3B82F6] transform duration-300 font-medium py-2 px-5 rounded shadow'
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default BookingRequestDetails
