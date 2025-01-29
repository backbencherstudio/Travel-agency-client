import { FaClock, FaDollarSign, FaSearch } from 'react-icons/fa'
import { AiOutlineDollar } from 'react-icons/ai'
import PaymentHistoryTable from '../../../Components/Dashboard/PaymentHistory/PaymentHistoryTable'
import { useState } from 'react'
import { paymentHistory } from '../../../data/paymentHistory'
import { Helmet } from 'react-helmet-async'
const Payments = () => {
  const data = [
    { icon: <AiOutlineDollar />, label: 'Total Earnings', value: '$12,890' },
    { icon: <FaClock />, label: 'Pending Payments', value: '$1,200' },
    { icon: <FaDollarSign />, label: 'Last Payment', value: '$400' }
  ]

  const [columns] = useState({
    bookingId: true,
    name: true,
    amount: true,
    date: true
  })
  return (
    <>
      <Helmet>
        <title>Around 360 - Payment Overview</title>
      </Helmet>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-[#0D0E0D] text-[20px] font-semibold capitalize'>
          Payment Overview
        </h1>
        <div className='relative md:col-span-1'>
          <input
            type='text'
            placeholder='Search...'
            className='py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%]'
            // value={searchQuery}
            // onChange={e => setSearchQuery(e.target.value)}
          />
          <FaSearch className='absolute top-3 left-3 text-zinc-400' />
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 w-full'>
        {data.map((item, index) => (
          <div
            key={index}
            className=' bg-white border border-[#EAECF0] shadow-sm rounded-lg p-6 flex flex-col justify-between'
          >
            <div className='flex items-center gap-4'>
              <div className='bg-[#EB5B2A] rounded-lg w-16 h-16 flex items-center justify-center'>
                <div className='text-[#FFFFFF] text-2xl'>{item.icon}</div>
              </div>
              <div>
                <div className='text-[#4A4C56] text-[14px] lg:text-lg font-medium mt-4'>
                  {item.label}
                </div>
                <div className='text-[#0F1416] text-xl text-[16px] font-bold mt-2'>
                  {item.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <PaymentHistoryTable
        title={'Payment History'}
        data={paymentHistory}
        columns={columns}
      />
    </>
  )
}

export default Payments
