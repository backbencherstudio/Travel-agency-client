import React, { useEffect, useState } from 'react'
import BookingHistory from '../../Components/Home/BookingHistory'
import { getAllBookings } from '../../Apis/clientApi/ClientBookApi'
import Loading from '../../Shared/Loading'

const BookingHistoryTable = () => {
  const [columns] = useState({
    invoice_number: true,
    package_name: true,
    total_amount: true,
    date: true,
    payment_status: true,
    booking_status: true
  })

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getBookings()
  }, [])
  const getBookings = async () => {
    try {
      setLoading(true)
      const response = await getAllBookings()

      if (!response.success) {
        throw new Error('Failed to fetch bookings')
      }

      setData(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching bookings:', err)
      setError('Failed to load booking data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading ? (
        <p>
          <Loading />
        </p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <BookingHistory title='Booking History' data={data} columns={columns} />
      )}
    </div>
  )
}

export default BookingHistoryTable
