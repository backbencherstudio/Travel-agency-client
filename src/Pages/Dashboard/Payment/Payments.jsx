import { FaClock, FaDollarSign, FaSearch, FaLock, FaHourglassHalf } from 'react-icons/fa'
import { AiOutlineDollar } from 'react-icons/ai'
import PaymentHistoryTable from '../../../Components/Dashboard/PaymentHistory/PaymentHistoryTable'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import PaymentApi from '~/Apis/PaymentApi'
import { IoIosCard } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { MdFactCheck } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import { BsFillSendCheckFill } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";
import { MdCountertops } from "react-icons/md";
import { TbLockCancel } from "react-icons/tb";
import { TbFilePercent } from "react-icons/tb";

const Payments = () => {
  // State to hold the data fetched from the API
  const [data, setData] = useState({});

  const [paymentData, setPaymentData] = useState([]);

  const [columns] = useState({
    bookingId: true,
    name: true,
    amount: true,
    date: true
  })

  // Fetch the data using PaymentApi.get when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PaymentApi.get()

        console.log('payment dashboard data', response)

        const fetchedData = response.data
        if (response?.success) {
          setPaymentData(response?.data?.bookings || []);
          setData(response?.data?.summary);
        }
      } catch (error) {
        console.error('Error fetching payment data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='space-y-4 mt-4'>
      <Helmet>
        <title>Around 360 - Payment Overview</title>
      </Helmet>
      <div className='flex justify-between items-center'>
        <h1 className='text-[#0D0E0D] text-[20px] font-semibold capitalize'>
          Payment Overview
        </h1>
        {/* <div className='relative md:col-span-1'>
          <input
            type='text'
            placeholder='Search...'
            className='py-1.5 pl-10 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%]'
            // value={searchQuery}
            // onChange={e => setSearchQuery(e.target.value)}
          />
          <FaSearch className='absolute top-3 left-3 text-zinc-400' />
        </div> */}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 w-full'>

        <div
          className=' bg-white border border-[#EAECF0] shadow-sm rounded-lg flex flex-col justify-between'
        >
          <div className='p-4 bg-[#EB5B2A] text-white rounded-t-lg flex items-center gap-2'>
            <IoIosCard className='text-3xl' />
            <h3 className='capitalize text-xl font-semibold'>Payments</h3>
          </div>
          <div className='p-4 space-y-1'>
            <div className='flex items-center gap-1'>
              <GiReceiveMoney className='text-[#EB5B2A] text-lg' />
              <div className='text-sm flex items-center gap-1'>
                <h4 className='font-medium text-gray-600'>Received : </h4>
                <p >${data?.payment?.total_received}</p>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <MdFactCheck className='text-[#EB5B2A] text-lg'/>
              <div className='text-sm flex items-center gap-1'>
                <h4 className='font-medium text-gray-600'>Completed : </h4>
                <p>{data?.payment?.succeeded_count}</p>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <MdPendingActions className='text-[#EB5B2A] text-lg'/>
              <div className='text-sm flex items-center gap-1'>
                <h4 className='font-medium text-gray-600'>Pending : </h4>
                <p>{data?.payment?.pending_count}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className=' bg-white border border-[#EAECF0] shadow-sm rounded-lg flex flex-col justify-between'
        >
          <div className='p-4 bg-[#EB5B2A] text-white rounded-t-lg flex items-center gap-2'>
            <RiBankFill className='text-3xl' />
            <h3 className='capitalize text-xl font-semibold'>Escrow</h3>
          </div>
          <div className='p-4 space-y-1'>
            <div className='flex items-center gap-1'>
              <FaLock className='text-[#EB5B2A] text-lg' />
              <div className='text-sm flex items-center gap-1'>
                <h4 className='font-medium text-gray-600'>On hold : </h4>
                <p>${data?.escrow?.total_held}</p>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <BsFillSendCheckFill className='text-[#EB5B2A] text-lg' />
              <div className='text-sm flex items-center gap-1'>
                <h4 className='font-medium text-gray-600'>Released : </h4>
                <p>${data?.escrow?.total_released}</p>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <FaHourglassHalf className='text-[#EB5B2A] text-lg' />
              <div className='text-sm flex items-center gap-1'>
                <h4 className='font-medium text-gray-600'>Hold count : </h4>
                <p>{data?.escrow?.held_bookings_count}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className=' bg-white border border-[#EAECF0] shadow-sm rounded-lg flex flex-col justify-between'
        >
          <div className='p-4 bg-[#EB5B2A] text-white rounded-t-lg flex items-center gap-2'>
            <TbFilePercent className='text-3xl' />
            <h3 className='capitalize text-xl font-semibold'>Commission</h3>
          </div>
          <div className='p-4 space-y-1'>
            <div className='flex items-center gap-1'>
              <AiOutlineDollar className='text-[#EB5B2A] text-lg' />
              <div className='text-sm flex items-center gap-1'>
                <h4 className='font-medium text-gray-600'>Total commission : </h4>
                <p>${data?.commission?.total_commission}</p>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <CiDiscount1 className='text-[#EB5B2A] text-lg' />
              <div className='text-sm flex items-center gap-1'>
                <h4 className='font-medium text-gray-600'>Platform commission : </h4>
                <p>${data?.commission?.platform_commission}</p>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <MdPendingActions className='text-[#EB5B2A] text-lg' />
              <div className='text-sm flex items-center gap-1'>
                <h4 className='font-medium text-gray-600'>Pending approval : </h4>
                <p>${data?.commission?.pending_approval}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentHistoryTable
        title={'Payment History'}
        data={paymentData}
        columns={columns}
      />
    </div>
  )
}

export default Payments