import { useState } from 'react'
import { booking } from '../../../data/booking'
import BookingManagementTable from '../../../Components/Dashboard/Booking/BookingManagementTable'
import BookManageApis from '../../../Apis/BookManageApis'
import { useQuery } from '@tanstack/react-query'

const BookingManagement = () => {
  const [columns] = useState({
    bookingId: true,
    name: true,
    date: true,
    packageName:true,
    status: true
  })
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['booking-management'],
    queryFn: BookManageApis.get
  });


  return (
    <div>
      <BookingManagementTable
        title={'Booking Management'}
        data={data?.data}
        columns={columns}
      />
    </div>
  )
}

export default BookingManagement
