import React, { useRef, useState, useContext } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import calender from '../../assets/img/tour-details/calender.svg'
import { useBookingContext } from '../../Context/BookingContext/BookingContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider'
import { createCheckout } from '../../Apis/clientApi/ClientBookApi'

const BookCard = ({ details, renderStars }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [extraServices, setExtraServices] = useState([])
  const { setBookingDetails } = useBookingContext()
  const startDatePickerRef = useRef(null)
  const endDatePickerRef = useRef(null)
  const navigate = useNavigate()

  // Access user from AuthContext
  const { user } = useContext(AuthContext)

  // const handleCheckboxChange = (service, isChecked) => {
  //   if (isChecked) {
  //     setExtraServices(prevState => [
  //       ...prevState,
  //       { id: service?.extra_service?.id }
  //     ])
  //   } else {
  //     setExtraServices(prevState =>
  //       prevState.filter(id => id?.id !== service?.extra_service?.id)
  //     )
  //   }
  // }
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
      const response = await createCheckout(bookingData)
      // console.log('response', response)
      if (response.errors) {
        toast.error(response.message || 'Failed to complete booking.')
      } else {
        // toast.success('Booking successful!')
        navigate(`/booking/${response?.data?.id}`)
      }
    } catch (error) {
      toast.error('An error occurred while processing your booking.')
    }
  }
  return (
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
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
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
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText='End Date'
            className='outline-none w-full placeholder:text-[#b6b9bb] placeholder:text-base placeholder:font-normal'
            ref={endDatePickerRef}
          />
          <img
            src={calender}
            onClick={() => endDatePickerRef.current.setOpen(true)}
            className='text-2xl cursor-pointer ml-2'
          />
        </div>

        {/* Extra Services */}
        <div className='flex flex-col gap-4'>
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
  )
}

export default BookCard
