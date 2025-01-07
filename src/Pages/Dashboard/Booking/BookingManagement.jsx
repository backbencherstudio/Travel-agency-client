import { useState } from 'react'
import { booking } from '../../../data/booking'
import BookingManagementTable from '../../../Components/Dashboard/Booking/BookingManagementTable'

const BookingManagement = () => {
  const [columns] = useState({
    bookingId: true,
    name: true,
    date: true,
    packageName:true,
    status: true
  })
  return (
    <div>
      <BookingManagementTable
        title={'Booking Management'}
        data={booking}
        columns={columns}
      />
    </div>
  )
}

export default BookingManagement
