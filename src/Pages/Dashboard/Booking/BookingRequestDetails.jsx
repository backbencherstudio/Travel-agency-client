import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { booking } from '../../../data/booking'
import { useQuery } from '@tanstack/react-query'
import BookManageApis from '../../../Apis/BookManageApis'
import { toast } from 'react-toastify'
import moment from 'moment'
import { Helmet } from 'react-helmet-async'
import Loading from '~/Shared/Loading'

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
      setLoading(false);
      setSelectedStatus(data.data.status);
    }
  }, [data]);

  const handleUpdateStatus = async (status) => {
    setLoading(true);
    if (!status) return;
    const res = await BookManageApis.update(id, { status })
    if(res.success){
      toast.success(res.message);
      navigate(-1);
      setLoading(false);
      refetch();
    }
  }

  if (loading) {
    return <Loading />
  }

  if (!data) {
    return (
      <div className='text-center text-red-500 mt-4'>
        Booking request not found!
      </div>
    )
  }

  return (
    <div className='p-8 bg-white rounded-lg w-full'>
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
            <p className='text-gray-600 text-sm'>Traveler's Name</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {data?.data?.user?.name || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Email</p>
            <p className='font-medium text-[#111827] text-[14px] break-words max-w-full overflow-hidden overflow-ellipsis whitespace-normal'>
              {data?.data?.user?.email || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Booking Date</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {moment(data?.data?.created_at).format('DD MMMM YYYY') || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Phone</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {data?.data?.user?.phone || 'N/A'}
            </p>
            <p className='text-gray-600 text-sm'>Package</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {data?.data?.booking_items?.[0]?.package?.name || 'N/A'}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className='w-full'>
          <h3 className='font-semibold text-lg mb-6'>Package Information</h3>
          <div className='grid grid-cols-2 gap-4'>
            <p className='text-gray-600 text-sm'>Package</p>
            {/* <Link 
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
            </Link> */}
            <p className='font-medium text-[#111827] text-[14px]'>
              {data?.data?.booking_items?.[0]?.package?.name || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Tour Category</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {data?.data?.booking_items?.[0]?.package?.tour_category || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Geofencing</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {data?.data?.booking_items?.[0]?.package?.geofencing || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Package Duration (Days)</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {data?.data?.booking_items?.[0]?.package?.duration || 'N/A'}
            </p>

            <p className='text-gray-600 text-sm'>Extra Service</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              {data?.data?.booking_extra_services?.map((item) => `${item?.extra_service?.name} ($${item.extra_service.price})`).join(', ') || 'N/A'}
            </p>

            {/* <p className='text-gray-600 text-sm'>Total Amount:</p>
            <p className='font-medium text-[#111827] text-[14px]'>
              ${data?.data?.booking_items?.[0]?.package?.price || 'N/A'}
            </p> */}


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
      <div className='mt-8 flex flex-col-reverse md:flex-row justify-center gap-6 md:gap-6'>
        
        <div className='flex gap-4 justify-between'>
          <button onClick={()=>{setSelectedStatus("confirmed");handleUpdateStatus("confirmed")}} className='bg-[#4CAF50] text-white px-4 rounded cursor-pointer'>Approve</button>
          <button 
            onClick={()=>handleUpdateStatus("cancelled")} 
            className='bg-[#FF5252] px-4 text-white rounded cursor-pointer font-medium'
          >
            Reject
          </button>
          <button
          className='bg-[#E7ECF2] text-[14px] text-[#3B82F6] transform duration-300 font-medium py-[7px] px-6 rounded shadow'
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        </div>
      </div>
    </div>
  )
}

export default BookingRequestDetails
