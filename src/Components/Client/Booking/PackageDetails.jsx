import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

const formatDate = isoDate => {
  const date = new Date(isoDate)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const PackageDetails = ({ checkoutData }) => {

  // console.log("checkout", checkoutData)
  // Get average rating from backend, default to 0 if null or undefined
  const averageRating = checkoutData?.data?.checkout?.average_rating ?? 0
  return (
    <div>
      <div className='bg-[#FDEFEA] p-5 rounded-lg'>
        <div className='flex flex-col sm:flex-row items-center justify-between'>
          <h1 className='font-bold text-[#000E19] text-xl sm:text-4xl mb-3'>
            {checkoutData?.data?.checkout?.checkout_items?.[0]?.package?.name ||
              'Not found'}
          </h1>
          <div className='flex items-center gap-2 sm:hidden'>
            <p className='text-[#4A4C56] text-[14px]'>Review</p>
            <div className='flex items-center gap-1'>
              {[...Array(5)].map((_, index) => {
                const fullStar = Math.floor(averageRating) > index
                const halfStar =
                  Math.ceil(averageRating) > index &&
                  Math.floor(averageRating) <= index
                return (
                  <React.Fragment key={index}>
                    {fullStar && (
                      <FaStar className='text-yellow-500' size={20} />
                    )}
                    {halfStar && (
                      <FaStarHalfAlt className='text-yellow-500' size={20} />
                    )}
                    {!fullStar && !halfStar && (
                      <FaStar className='text-gray-400' size={20} />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
            {/* Numeric Average Rating */}
            <p className='text-[#4A4C56] text-[14px] font-medium'>
              ({averageRating.toFixed(1)})
            </p>
          </div>
        </div>
        <div className='flex gap-5 sm:gap-16 lg:justify-start lg:gap-16 mt-5'>
          <div className='hidden sm:flex items-center gap-2'>
            <p className='text-[#4A4C56] text-[14px] '>Review</p>
            <div className='flex items-center gap-1'>
              {[...Array(5)].map((_, index) => {
                const fullStar = Math.floor(averageRating) > index
                const halfStar =
                  Math.ceil(averageRating) > index &&
                  Math.floor(averageRating) <= index
                return (
                  <React.Fragment key={index}>
                    {fullStar && (
                      <FaStar className='text-yellow-500' size={20} />
                    )}
                    {halfStar && (
                      <FaStarHalfAlt className='text-yellow-500' size={20} />
                    )}
                    {!fullStar && !halfStar && (
                      <FaStar className='text-gray-400' size={20} />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
            {/* Numeric Average Rating */}
            <p className='text-[#4A4C56] text-[14px] font-medium'>
              ({averageRating.toFixed(1)})
            </p>
          </div>
          <div className='h-14 w-[1px] bg-gray-300 hidden sm:block'></div>
          <div className=''>
            <p className='text-[#4A4C56] text-[14px] mb-3'>Days</p>
            <p className='font-semibold'>
              {checkoutData?.data?.checkout?.checkout_items?.[0]?.package
                ?.duration || '0'}{' '}
              days
            </p>
          </div>
          <div className='h-14 w-[1px] bg-gray-300'></div>
          <div>
            <p className='text-[#4A4C56] text-[14px] mb-3'>Location</p>
            <p className='font-semibold'>
              {checkoutData?.data?.checkout?.checkout_items?.[0]?.package
                ?.destination?.name || 'Default Location'}
              ,{' '}
              {checkoutData?.data?.checkout?.checkout_items?.[0]?.package
                ?.destination?.country?.name || 'Default Country'}
            </p>
          </div>
        </div>
        <div className='flex gap-5 sm:gap-16 lg:justify-start lg:gap-16 mt-10'>
          {checkoutData?.data?.checkout?.checkout_items?.length > 0 ? (
            checkoutData.data.checkout.checkout_items.map((item, index) => {
              // Calculate days and nights
              const startDate = new Date(item.start_date)
              const endDate = new Date(item.end_date)
              const days = Math.ceil(
                (endDate - startDate) / (1000 * 60 * 60 * 24)
              )
              const nights = days - 1

              return (
                <div
                  key={index}
                  className='flex gap-10 items-center w-full max-w-3xl'
                >
                  {/* Start Date */}
                  <div className='text-center sm:text-left'>
                    <p className='font-medium text-[#000E19]'>
                      {formatDate(item.start_date)}
                    </p>
                  </div>

                  {/* Duration Badge */}
                  <div className='relative flex items-center w-full max-w-xs my-2 sm:my-0'>
                    <div className='border-t border-dashed border-gray-300 w-full'></div>
                    <div className='absolute left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm'>
                      {days}D/{nights}N
                    </div>
                  </div>

                  {/* End Date */}
                  <div className='text-center sm:text-right'>
                    <p className='font-medium text-[#000E19]'>
                      {formatDate(item.end_date)}
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <p className='text-center'>No checkout items available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PackageDetails
