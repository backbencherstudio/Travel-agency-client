import React, { useState } from 'react'

const PaymentMethod = ({ onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const handleMethodChange = method => {
    setSelectedMethod(method)
  }

  const handleCardDetailsChange = e => {
    const { name, value } = e.target
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-6'>
        {/* <button
          onClick={onBack}
          className='flex items-center gap-2 text-gray-600 hover:text-[#EB5B2A]'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
          Back
        </button> */}
      </div>
      <h2 className='text-2xl font-bold mb-4'>Payment Method</h2>
      <p className='text-gray-600 mb-6'>Select a payment method</p>

      <div className='space-y-4'>
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'card' ? 'border-[#EB5B2A]' : 'border-gray-200'
          }`}
          onClick={() => handleMethodChange('card')}
        >
          <div className='flex items-center gap-3'>
            <input
              type='radio'
              checked={selectedMethod === 'card'}
              onChange={() => handleMethodChange('card')}
              className='accent-[#EB5B2A]'
            />
            <span className='font-medium'>Debit/Credit Card</span>
          </div>

          {selectedMethod === 'card' && (
            <div className='mt-4 space-y-4'>
              <div>
                <label className='text-sm text-gray-600'>Card Number</label>
                <input
                  type='text'
                  name='cardNumber'
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailsChange}
                  placeholder='3897 22XX 1900 3890'
                  className='w-full p-3 mt-1 border rounded-lg focus:outline-none focus:border-[#EB5B2A]'
                />
              </div>

              <div>
                <label className='text-sm text-gray-600'>Card Name</label>
                <input
                  type='text'
                  name='cardName'
                  value={cardDetails.cardName}
                  onChange={handleCardDetailsChange}
                  placeholder='Robert Fox'
                  className='w-full p-3 mt-1 border rounded-lg focus:outline-none focus:border-[#EB5B2A]'
                />
              </div>

              <div className='flex gap-4'>
                <div className='flex-1'>
                  <label className='text-sm text-gray-600'>Expiry Date</label>
                  <input
                    type='text'
                    name='expiryDate'
                    value={cardDetails.expiryDate}
                    onChange={handleCardDetailsChange}
                    placeholder='09/26'
                    className='w-full p-3 mt-1 border rounded-lg focus:outline-none focus:border-[#EB5B2A]'
                  />
                </div>
                <div className='flex-1'>
                  <label className='text-sm text-gray-600'>CVV</label>
                  <input
                    type='password'
                    name='cvv'
                    value={cardDetails.cvv}
                    onChange={handleCardDetailsChange}
                    placeholder='•••'
                    className='w-full p-3 mt-1 border rounded-lg focus:outline-none focus:border-[#EB5B2A]'
                  />
                </div>
              </div>

              <button className='w-full p-3 mt-2 bg-[#EB5B2A] text-white rounded-full flex items-center justify-center gap-2'>
                <span className='text-lg'>+</span> Add New Card
              </button>
            </div>
          )}
        </div>

        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'googlepay'
              ? 'border-[#EB5B2A]'
              : 'border-gray-200'
          }`}
          onClick={() => handleMethodChange('googlepay')}
        >
          <div className='flex items-center gap-3'>
            <input
              type='radio'
              checked={selectedMethod === 'googlepay'}
              onChange={() => handleMethodChange('googlepay')}
              className='accent-[#EB5B2A]'
            />
            <span className='font-medium'>Google Pay</span>
          </div>
        </div>

        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'paypal' ? 'border-[#EB5B2A]' : 'border-gray-200'
          }`}
          onClick={() => handleMethodChange('paypal')}
        >
          <div className='flex items-center gap-3'>
            <input
              type='radio'
              checked={selectedMethod === 'paypal'}
              onChange={() => handleMethodChange('paypal')}
              className='accent-[#EB5B2A]'
            />
            <span className='font-medium'>Paypal</span>
          </div>
        </div>

        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'cod' ? 'border-[#EB5B2A]' : 'border-gray-200'
          }`}
          onClick={() => handleMethodChange('cod')}
        >
          <div className='flex items-center gap-3'>
            <input
              type='radio'
              checked={selectedMethod === 'cod'}
              onChange={() => handleMethodChange('cod')}
              className='accent-[#EB5B2A]'
            />
            <span className='font-medium'>Cash on Delivery</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
