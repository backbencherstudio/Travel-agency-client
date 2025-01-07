import { useState } from 'react'
// import { bookingData } from '../../../data/data'
import CustomsTable from '../../../Shared/CustomsTable'
import { booking } from '../../../data/booking'

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
      <CustomsTable
        title={'Booking Management'}
        data={booking}
        columns={columns}
      />
    </div>
  )
}

export default BookingManagement
