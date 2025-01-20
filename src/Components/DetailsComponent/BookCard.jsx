import React, { useRef, useState, useContext, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import calender from '../../assets/img/tour-details/calender.svg'
// import { useBookingContext } from '../../Context/BookingContext/BookingContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider'
import { createCheckout } from '../../Apis/clientApi/ClientBookApi'
import Loading from '../../Shared/Loading'

const BookCard = ({ details, renderStars }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [extraServices, setExtraServices] = useState([])
  const [loading, setLoading] = useState(false)
  // const { setBookingDetails } = useBookingContext()
  const startDatePickerRef = useRef(null)
  const endDatePickerRef = useRef(null)
  const navigate = useNavigate()

  // Access user from AuthContext
  const { user } = useContext(AuthContext)

  const duration = details?.duration || 0

  // Get today's date
  const today = new Date()

  // Dynamically calculate max end date based on start date and duration
  const calculateMaxEndDate = startDate => {
    if (!startDate) return null
    const maxEndDate = new Date(startDate)
    maxEndDate.setDate(startDate.getDate() + duration)
    return maxEndDate
  }

  useEffect(() => {
    if (startDate) {
      const calculatedEndDate = calculateMaxEndDate(startDate)
      setEndDate(calculatedEndDate)
    }
  }, [startDate, duration])

  const handleCheckboxChange = (service, isChecked) => {
    if (isChecked) {
      setExtraServices(prevState => [
        ...prevState,
        { id: service?.extra_service?.id, name: service?.extra_service?.name }
      ])
    } else {
      setExtraServices(prevState =>
        prevState.filter(s => s.id !== service?.extra_service?.id)
      )
    }
  }

  const handleBookNow = async () => {
    if (!user) {
      toast.error('You need to log in to proceed with booking.')
      navigate('/login')
      return
    }

    if (user.type !== 'user') {
      toast.error('Only users with a valid account type can book.')
      return
    }

    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates.')
      return
    }

    const bookingData = {
      package_id: details?.id,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      extra_services: extraServices.map(service => ({
        id: service.id,
        name: service.name
      }))
    }

    try {
      setLoading(true)
      document.body.style.overflow = 'hidden'
      
      setTimeout(async () => {
        try {
          const response = await createCheckout(bookingData)
          if (response.errors) {
            toast.error(response.message || 'Failed to complete booking.')
          } else {
            navigate(`/booking/${response?.data?.id}`)
          }
        } catch (error) {
          toast.error('An error occurred while processing your booking.')
        } finally {
          setLoading(false)
          document.body.style.overflow = 'auto'
        }
      }, 500)

    } catch (error) {
      toast.error('An error occurred while processing your booking.')
      setLoading(false)
      document.body.style.overflow = 'auto'
    }
  }

  const handleStartDateChange = date => {
    if (date < today) {
      toast.error('Start date cannot be in the past.')
      return
    }
    setStartDate(date)
  }

  const handleEndDateChange = date => {
    if (date < startDate) {
      toast.error('End date cannot be before the start date.')
      return
    }
    setEndDate(date)
  }

  return (
    <>
      {loading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
          <Loading />
        </div>
      )}
      <div className='flex flex-col gap-4 max-w-full'>
        <h1 className='text-[40px] font-bold border-b border-b-[#e5e6e6] pb-[15px]'>
          ${details?.price}
          <span className='text-lg font-normal'>/per person</span>
        </h1>
        <div>
          {/* Start Date Picker */}
          <div className='flex border items-center justify-between p-2 rounded-md border-[#e5e6e6] shadow-sm'>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={today}
              placeholderText='Start Date'
              className='outline-none w-full placeholder:text-[#b6b9bb] placeholder:text-base placeholder:font-normal'
              ref={startDatePickerRef}
            />
            <img
              src={calender}
              onClick={() => startDatePickerRef.current.setOpen(true)}
              className='text-2xl cursor-pointer ml-2'
            />
          </div>

          {/* End Date Picker */}
          <div className='flex border mt-4 items-center justify-between p-2 rounded-md border-[#e5e6e6] shadow-sm'>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={calculateMaxEndDate(startDate)}
              placeholderText='End Date'
              className='outline-none w-full placeholder:text-[#b6b9bb] placeholder:text-base placeholder:font-normal'
              ref={endDatePickerRef}
              disabled={!startDate}
            />
            <img
              src={calender}
              onClick={() => endDatePickerRef.current.setOpen(true)}
              className='text-2xl cursor-pointer ml-2'
            />
          </div>

          {/* Extra Services */}
          <div className='flex flex-col gap-4 mt-5'>
            <h4 className='text-xl font-bold text-[#0F1416]'>Extra Service</h4>
            {[
              ...new Map(
                details?.package_extra_services?.map(service => [
                  service?.extra_service?.id,
                  service
                ])
              ).values()
            ].map((service, index) => (
              <div key={index} className='flex items-center gap-3'>
                <input
                  type='checkbox'
                  onChange={e => handleCheckboxChange(service, e.target.checked)}
                />
                <p className='text-base font-normal text-[#49556D]'>
                  {service?.extra_service?.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleBookNow}
          className='flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w-full mt-2'
        >
          Book Now
        </button>
      </div>
    </>
  )
}

export default BookCard
