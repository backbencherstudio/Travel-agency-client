import { useState } from 'react'
import BookingManagementTable from '../../../Components/Dashboard/Booking/BookingManagementTable'
import BookManageApis from '../../../Apis/BookManageApis'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

const BookingManagement = () => {
  const [columns] = useState({
    bookingId: true,
    name: true,
    date: true,
    packageName: true,
    status: true
  })
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['booking-management'],
    queryFn: BookManageApis.get // Remove the parentheses - pass the function reference, not call it
  })

  console.log('booking data', data)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading booking data</div>
  }

  return (
    <div>
      <Helmet>
        <title>Around 360 - Booking Management</title>
      </Helmet>
      <BookingManagementTable
        title={'Booking Management'}
        data={data?.data}
        columns={columns}
      />
    </div>
  )
}

export default BookingManagement