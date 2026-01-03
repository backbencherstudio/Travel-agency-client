import { useState, useEffect } from 'react'
import BookingManagementTable from '../../../Components/Dashboard/Booking/BookingManagementTable'
import BookManageApis from '../../../Apis/BookManageApis'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async';
import Loading from '~/Shared/Loading';

const BookingManagement = () => {

  const [columns] = useState({
    bookingId: true,
    name: true,
    date: true,
    packageName: true,
    status: true,
    total_amount: true,
    payment_status: true,
  })

  const [statusFilter, setStatusFilter] = useState('All Status');
  const [query, setQuery] = useState('');
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['booking-management', statusFilter,query],
    queryFn: () => BookManageApis.get(statusFilter, query),
  })

  if (isLoading) {
    return <div>
      <Loading />
    </div>
  }

  if (error) {
    console.log(error)
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
        handleFilterChange={(value) => setStatusFilter(value)}
        handleQueryChange={(value) => setQuery(value)}
        query={query}
        status={statusFilter}
      />
    </div>
  )
}

export default BookingManagement