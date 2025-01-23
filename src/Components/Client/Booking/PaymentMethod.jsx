import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

if (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error(
    'VITE_STRIPE_PUBLISHABLE_KEY is not set in the environment variables'
  )
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const PaymentMethod = ({ onCardDetailsChange, checkoutData, totalPrice }) => {
  const [selectedMethod, setSelectedMethod] = useState('card')

  const handleMethodChange = method => {
    setSelectedMethod(method)
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>Payment Method</h2>
      <p className='text-gray-600 mb-6'>Select a payment method</p>

      <div className='space-y-4'>
        {/* Card Payment */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'card' ? 'border-[#EB5B2A]' : 'border-gray-200'
          }`}
          onClick={() => setSelectedMethod('card')}
        >
          <div className='flex items-center gap-3'>
            <input
              type='radio'
              checked={selectedMethod === 'card'}
              onChange={() => setSelectedMethod('card')}
              className='accent-[#EB5B2A]'
            />
            <span className='font-medium'>Debit/Credit Card</span>
          </div>

          {selectedMethod === 'card' && (
            <Elements stripe={stripePromise}>
              <CheckoutForm onCardDetailsChange={onCardDetailsChange} />
            </Elements>
          )}
        </div>

        {/* Google Pay */}
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

        {/* PayPal */}
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

        {/* Cash on Delivery */}
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
