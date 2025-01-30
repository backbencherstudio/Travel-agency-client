import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { booking } from '../../../data/booking'
import { useQuery } from '@tanstack/react-query'
import BookManageApis from '../../../Apis/BookManageApis'
import { toast } from 'react-toastify'
import moment from 'moment'
import { Helmet } from 'react-helmet-async'

const BookingRequestDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bookingDetails, setBookingDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState('');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['booking-request-details'],
    queryFn: () => BookManageApis.getOne(id)
  }); 

  useEffect(() => {
    if (data?.data?.status) {
      setSelectedStatus(data.data.status);
    }
  }, [data]);

  console.log(data);

  const handleUpdateStatus = async () => {
    if (!selectedStatus) return;
    
    const res = await BookManageApis.update(id, { status: selectedStatus })
    console.log('res', res)
    if(res.success){
      toast.success(res.message);
      // navigate(-1);
      refetch();
    }
  }

  if (isLoading) {
    return <div className='text-center mt-4'>Loading...</div>
  }

  if (!data) {
    return (
      <div className='text-center text-red-500 mt-4'>
        Booking request not found!
      </div>
    )
  }

  return (
    <div className='p-8 bg-white shadow-lg rounded-lg w-full  mx-auto'>
       <Helmet>
        <title>Around 360 - Booking Request Details</title>
      </Helmet>
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
              {data?.data?.user?.name || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Email:</p>
            <p className='font-medium text-[#111827] text-[14px] break-words max-w-full overflow-hidden overflow-ellipsis whitespace-normal'>
              {data?.data?.user?.email || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Booking Date:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {moment(data?.data?.created_at).format('DD MMMM YYYY') || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Phone:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {data?.data?.user?.phone || 'N/A'}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className='w-full'>
          <h3 className='font-semibold text-lg mb-6'>Package Information</h3>
          <div className='grid grid-cols-2 gap-4'>
            <p className='text-gray-600 text-sm'>Package Name:</p>
            <Link 
              to={`/dashboard/packages/${data?.data?.booking_items?.[0]?.package?.id}`} 
              target="_blank"
              rel="noopener noreferrer"
              className='font-medium text-[#111827] text-[14px] hover:text-blue-600 flex items-center gap-1'
            >
              {data?.data?.booking_items?.[0]?.package?.name || 'N/A'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-[14px] w-[14px]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </Link>

            <p className='text-gray-600 text-sm'>Package Price:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              ${data?.data?.booking_items?.[0]?.package?.price || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Extra Service:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {data?.data?.booking_extra_services?.map((item) => `${item?.extra_service?.name} ($${item.extra_service.price})`).join(', ') || 'N/A'}
            </p>

            {/* <p className='text-gray-600 text-sm'>Extra Service Price:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              ${data?.data?.booking_extra_services?.[0]?.extra_service?.price || 'N/A'}
            </p> */}

            <p className='text-gray-600 text-sm'>Total Amount:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              ${data?.data?.total_amount || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Payment Status:</p>
            <p className='font-medium text-[#111827] text-[14px] capitalize'>
              {data?.data?.payment_status || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Booking Status:</p>
            <p className='font-medium text-[#111827] text-[14px] capitalize'>
              {data?.data?.status || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='mt-8 flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-6'>
        <button
          className='bg-[#E7ECF2] hover:bg-gray-400 text-[14px] text-[#3B82F6] transform duration-300 font-medium py-2 px-5 rounded shadow'
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <div className='flex gap-4 justify-between'>
          <select 
            onChange={(e) => setSelectedStatus(e.target.value)}
            className='bg-white border border-gray-300 text-[14px] text-gray-700 py-2 px-5 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={selectedStatus}
          >
            <option value="" disabled>Select Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="paused">Paused</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button 
            onClick={handleUpdateStatus} 
            disabled={!selectedStatus}
            className={`${
              selectedStatus 
                ? 'bg-[#4CAF50] hover:bg-green-600' 
                : 'bg-gray-400 cursor-not-allowed'
            } text-[14px] transform duration-300 text-white font-medium py-2 px-5 rounded shadow`}
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingRequestDetails
