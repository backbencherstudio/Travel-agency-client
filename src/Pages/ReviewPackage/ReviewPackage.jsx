import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { FiPlusCircle } from 'react-icons/fi'
import { useBookingContext } from '../../BookingContext/BookingContext'

function ReviewPackage () {
    const { bookingDetails } = useBookingContext();
  const [formData, setFormData] = useState({
    mobileNumber: '',
    address: '',
    area: '',
    city: '',
    pinCode: '',
    state: ''
  })

  const [rating, setRating] = useState(3)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  console.log('bookingDetails', bookingDetails)

  return (
    <div className='max-w-[1216px] mx-auto my-10  px-4 lg:px-0'>
      <div className='flex flex-col lg:flex-row justify-between gap-10'>
        <div className='w-full lg:w-8/12'>
          <div className=' flex flex-col gap-10'>
            <h1 className='text-[#0F1416] text-4xl font-bold'>
              Review Package
            </h1>

            {/*  */}
            <div className='bg-[#FDEFEA] p-5 rounded-lg'>
              <div className='flex items-center justify-between'>
                <h1 className='font-bold text-[#000E19]  text-xl sm:text-4xl '>
                  Beijing, China
                </h1>
                <div className='flex gap-1 sm:hidden'>
                  <p className='text-[#4A4C56] text-[14px] '>Review</p>
                  <div className='flex'>
                    <p className='flex gap-1'>
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`${
                            index < rating ? 'text-yellow-500' : 'text-gray-400'
                          }`}
                          size={20}
                        />
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex gap-5 sm:gap-16 lg:justify-start lg:gap-16 mt-5'>
                <div className='hidden sm:block'>
                  <p className='text-[#4A4C56] text-[14px] mb-3'>Review</p>
                  <div className='flex'>
                    <p className='flex gap-1'>
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`${
                            index < rating ? 'text-yellow-500' : 'text-gray-400'
                          }`}
                          size={20}
                        />
                      ))}
                    </p>
                  </div>
                </div>
                <div className='h-14 w-[1px] bg-gray-300 hidden sm:block'></div>
                <div className=''>
                  <p className='text-[#4A4C56] text-[14px] mb-3'>Days</p>
                  <p className='font-semibold'>6 days</p>
                </div>
                <div className='h-14 w-[1px] bg-gray-300'></div>
                <div>
                  <p className='text-[#4A4C56] text-[14px] mb-3'>Location</p>
                  <p className='font-semibold'>Beijing, China</p>
                </div>
              </div>

              <div className='flex items-center  mt-10 '>
                <div className='text-[#000E19]'>
                  <p className='whitespace-nowrap'>Aug 11, 2024</p>
                </div>
                <div className='relative flex items-center w-full max-w-xs mx-4'>
                  <div className='border-t border-dashed border border-gray-300 w-full'></div>
                  <div className='absolute left-1/2 -translate-x-1/2'>
                    <span className='bg-orange-500 text-white px-3 py-2 rounded-full text-sm'>
                      6D/5N
                    </span>
                  </div>
                </div>
                <div className='text-[#000E19]'>
                  <p className='whitespace-nowrap'>Aug 16, 2024</p>
                </div>
              </div>
            </div>

            <h4 className='text-[20px] text-[#0F1416] font-bold'>
              Please Enter Contact Details
            </h4>
            <form className='flex flex-col gap-5'>
              <div className='flex flex-col'>
                <label
                  className='text-[15px] text-[#0F1416]'
                  htmlFor='mobileNumber'
                >
                  Mobile Number
                </label>
                <input
                  type='text'
                  name='mobileNumber'
                  placeholder='Enter Mobile Number'
                  className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-[15px] text-[#0F1416]' htmlFor='address'>
                  Flat, House no., Building, Company, Apartment
                </label>
                <input
                  type='text'
                  name='Enter your Address'
                  placeholder='Enter Address'
                  className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-[15px] text-[#0F1416]' htmlFor='area'>
                  Area, Colony, Street, Sector, Village
                </label>
                <input
                  type='text'
                  name='area'
                  placeholder='Enter Area'
                  className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                  value={formData.area}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-[15px] text-[#0F1416]' htmlFor='city'>
                  City
                </label>
                <input
                  type='text'
                  name='city'
                  placeholder='Enter City'
                  className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-[15px] text-[#0F1416]' htmlFor='pinCode'>
                  Pin Code
                </label>
                <input
                  type='text'
                  name='pinCode'
                  placeholder='Enter Pin/Zip Code'
                  className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                  value={formData.pinCode}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-[15px] text-[#0F1416]' htmlFor='state'>
                  State
                </label>
                <input
                  type='text'
                  name='state'
                  placeholder='Enter State'
                  className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          {/* Add Traveler  */}
          <div className=''>
            <h1 className='text-xl font-semibold my-10'>Add Traveler</h1>
            <button className='bg-[#EB5B2A] hover:bg-[#eb5a2ae4] transform duration-300 px-7 py-3 rounded-full text-white flex items-center gap-2'>
              <FiPlusCircle className='text-xl' />
              Add Traveler
            </button>
          </div>
        </div>

        <div className='w-full lg:w-4/12 h-fit px-5 shadow-lg border rounded-lg py-5'>
          <h1 className='border-b text-[#0F1416] text-4xl font-bold pb-5'>
            $4700{' '}
            <span className='font-normal text-lg'>
              (Inclusive of All Taxes)
            </span>
          </h1>
          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                Total Basic Cost
              </h4>
              <p className='text-base text-[#0F1416] font-normal flex items-center gap-3'>
                <span>2500</span> <span>x</span> <span>2</span> Travelers
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>$5000</h4>
          </div>
          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <div className='flex flex-col gap-2 mb-2'>
                <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                  Coupon Discount
                </h4>
                <span className='bg-[#EB5B2A] text-white px-3 py-1 rounded-2xl w-fit text-[12px]'>
                  BESTOFFER50
                </span>
              </div>
              {/* <p className='text-base font-normal flex items-center gap-3'>
                <span>2500</span> <span>x</span> <span>2</span> Travelers
              </p> */}
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>-$350</h4>
          </div>
          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                Fee & Taxes
              </h4>
              <p className='text-base font-normal flex items-center gap-3'>
                <span>2500</span> <span>x</span> <span>2</span> Travelers
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>+$50</h4>
          </div>
          <button className='bg-[#EB5B2A] rounded-full px-6 py-3 text-white w-full mt-4 hover:bg-[#eb5a2ada] transform duration-300 '>
            Proceed To Payments
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewPackage
