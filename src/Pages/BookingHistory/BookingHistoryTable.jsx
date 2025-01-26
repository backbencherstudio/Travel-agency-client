import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import debounce from 'lodash.debounce'
import BookingHistory from '../../Components/Home/BookingHistory'
import { getAllBookings, searchBookings } from '../../Apis/clientApi/ClientBookApi'
import Loading from '../../Shared/Loading'
import { toast } from 'react-toastify'

const BookingHistoryTable = () => {
  const [columns] = useState({
    invoice_number: true,
    package_name: true,
    total_amount: true,
    date: true,
    payment_status: true,
  })

  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([]) // Filtered data based on search
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get('q') || '' // Get initial search query from URL

  // Fetch all bookings data
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await getAllBookings()
      if (response.success) {
        const bookings = response.data.map((booking) => ({
          id: booking.id,
          invoice_number: booking?.invoice_number,
          payment_status: booking?.payment_status,
          package_name: booking?.booking_items[0]?.package?.name || 'N/A',
          total_amount: booking?.total_amount || 0,
          created_at: new Date(booking?.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }))
        setData(bookings)
        setFilteredData(bookings) // Initialize filtered data
      } else {
        throw new Error('Failed to load booking data')
      }
    } catch (err) {
      setError('Failed to load user data. Please try again later.')
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  // Debounced search function to filter data
  useEffect(() => {
    const performSearch = debounce(async () => {
      if (searchQuery.trim()) {
        navigate(`?q=${searchQuery}`) // Update query parameter in the URL
        setLoading(true)
        try {
          const response = await searchBookings(searchQuery)
          if (response.success) {
            const bookings = response.data.map((booking) => ({
              id: booking.id,
              invoice_number: booking?.invoice_number,
              payment_status: booking?.payment_status,
              package_name: booking?.booking_items[0]?.package?.name || 'N/A',
              total_amount: booking?.total_amount || 0,
              created_at: new Date(booking?.created_at).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }
              ),
            }))
            setFilteredData(bookings)
          } else {
            setFilteredData([])
            throw new Error('Search failed.')
          }
        } catch (err) {
          toast.error(
            err.response?.data?.message ||
              err.message ||
              'An error occurred while searching.'
          )
          console.error('Error searching bookings:', err)
        } finally {
          setLoading(false)
        }
      } else {
        navigate(location.pathname) // Clear query parameter if search is empty
        setFilteredData(data) // Reset to all data
      }
    }, 500)

    performSearch()

    return () => {
      performSearch.cancel()
    }
  }, [searchQuery, data, navigate, location.pathname])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {loading ? (
        <p>
          <Loading />
        </p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <BookingHistory
          title='Booking History'
          data={filteredData} // Pass filtered data
          columns={columns}
          handleSearch={(query) => navigate(`?q=${query}`)} // Trigger URL update on search input
        />
      )}
    </div>
  )
}

export default BookingHistoryTable
