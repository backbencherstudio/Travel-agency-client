import { FaBoxes, FaCalendarCheck, FaClock, FaDollarSign } from 'react-icons/fa'
import img from '../../assets/img/vendorDashboard/indexbg.png'
import BookingTable from '../../Components/VendorDashboard/BookingTable'
import { useState } from 'react'
import { booking } from '../../data/booking'

const IndexDashboard = () => {
  const data = [
    { icon: <FaBoxes />, label: 'Total Packages', value: '16' },
    { icon: <FaCalendarCheck />, label: 'Total Bookings', value: '100+' },
    { icon: <FaClock />, label: 'Pending Bookings', value: '08' },
    { icon: <FaDollarSign />, label: 'Total Earnings', value: '$12,890' }
  ]
  const [columns] = useState({
    bookingId: true,
    name: true,
    date: true,
    packageName: true,
    status: true
  })
  return (
    <div className='mt-4'>
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-6 w-full'>
        {data.map((item, index) => (
          <div
            key={index}
            className='relative bg-white border border-[#EAECF0] shadow-sm rounded-lg p-6 flex flex-col justify-between'
          >
            <div>
              <div className='bg-[#EB5B2A] rounded-lg w-16 h-16 flex items-center justify-center'>
                <div className='text-[#FFFFFF] text-2xl'>{item.icon}</div>
              </div>
              <div className='text-[#4A4C56] text-[14px] lg:text-lg font-medium mt-4'>
                {item.label}
              </div>
              <div className='text-[#0F1416] text-xl text-[16px] font-bold mt-2'>
                {item.value}
              </div>
            </div>

            {/* Background Image Positioned at Bottom-Right */}
            <div className='absolute bottom-3 right-5 '>
              <img
                src={img}
                alt='image'
                className=' opacity-100 w-[99px] h-[99px]'
              />
            </div>
          </div>
        ))}
      </div>

      {/* bokking table  */}

      <div className='mt-5'>
        <BookingTable
          title={'Recent Booking'}
          data={booking}
          columns={columns}
        />
      </div>
    </div>
  )
}

export default IndexDashboard
