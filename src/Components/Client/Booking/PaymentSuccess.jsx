import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import Confetti from 'react-confetti'
import { Helmet } from 'react-helmet-async'

const PaymentSuccess = () => {
  const [showConfetti, setShowConfetti] = useState(true)
  // const [searchParams] = useSearchParams();
  // const amount = searchParams.get('amount');

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 relative'>
       <Helmet>
        <title>Around 360 - Payment Success</title>
      </Helmet>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={true}
          numberOfPieces={200}
          style={{ position: 'fixed', top: 0, left: 0 }}
        />
      )}
      <div className='max-w-2xl w-full bg-white p-8 rounded-2xl  text-center'>
        <div className='flex justify-center mb-6 animate-bounce'>
          <FaCheckCircle className='text-6xl text-green-500' />
        </div>

        <h1 className='text-3xl font-bold text-gray-800 mb-4 animate-fade-in'>
          Payment Successful!
        </h1>
        {/* <p className='text-sm font-bold text-gray-800 mb-4 animate-fade-in'>Payment Amount: ${amount}</p> */}

        <p className='text-gray-600 mb-8'>
          Thank you for your booking. Your payment has been processed
          successfully. You will receive a confirmation email shortly with your
          booking details.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            to='/'
            className='px-8 py-3 bg-[#0E457D] text-white rounded-full hover:bg-[#0c3761] transition duration-300'
          >
            Return to Home
          </Link>

          <Link
            to='/booking-history'
            className='px-8 py-3 border border-[#0E457D] text-[#0E457D] rounded-full hover:bg-gray-50 transition duration-300'
          >
            View Booking
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
