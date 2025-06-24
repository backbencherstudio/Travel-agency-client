import React, { useState } from 'react'
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'



const PaymentMethod = ({ onCardDetailsChange, onPaymentMethodChange }) => {
  const [selectedMethod, setSelectedMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({})
  const stripe = useStripe()
  const elements = useElements()
  // Handle changes in card details
  const handleCardDetailsChange = details => {
    setCardDetails(details)
    onCardDetailsChange(details)
  }

  // Handle payment method selection change
  const handleMethodChange = method => {
    setSelectedMethod(method)
    onPaymentMethodChange(method)
  }

  return (
    <div className='p-6'>
      <h2 className='text-[40px] font-bold mb-4 text-[#0F1416]'>Payment Method</h2>
      <p className='mb-6 text-[#0F1416] text-[20px] font-bold'>Select a payment method</p>

      <div className='space-y-4'>
        {/* Card Payment */}
        <div
          className={`rounded-lg cursor-pointer `}
          onClick={() => handleMethodChange('card')}
        >
          <div className='flex items-center gap-3'>
            <input
              type='radio'
              checked={selectedMethod === 'card'}
              onChange={() => handleMethodChange('card')}
              className='accent-[#EB5B2A]'
            />
            <span className='font-bold text-[#0F1416] text-[20px]'>Debit/Credit Card</span>
          </div>

          {selectedMethod === 'card' && (
           
               <CheckoutForm onCardDetailsChange={handleCardDetailsChange} /> 
       
          )}
        </div>

        {/* Google Pay  */}
        <div
          className={`py-4 border-b rounded-lg cursor-pointer border-[#a6aaac33]`}
          onClick={() => handleMethodChange('googlepay')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={selectedMethod === 'googlepay'}
              onChange={() => handleMethodChange('googlepay')}
              className="accent-[#EB5B2A] w-[24xp] h-[24px]"
            />
            <span className="font-medium">Google Pay</span>
          </div>
        </div>

        {/* Apple Pay */}
        <div
          className={`py-4 border-b rounded-lg cursor-pointer border-[#a6aaac33]`}
          onClick={() => handleMethodChange('applepay')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={selectedMethod === 'applepay'}
              onChange={() => handleMethodChange('applepay')}
              className="accent-[#EB5B2A] w-[24xp] h-[24px]"
            />
            <span className="font-medium">Apple Pay</span>
          </div>
        </div>


        {/* PayPal */}
        <div
          className={`py-4 border-b rounded-lg cursor-pointer border-[#a6aaac33]`}
          onClick={() => handleMethodChange('paypal')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={selectedMethod === 'paypal'}
              onChange={() => handleMethodChange('paypal')}
              className="accent-[#EB5B2A] w-[24xp] h-[24px]"
            />
            <span className="font-medium">PayPal</span>
          </div>
        </div>

        {/* Cash on Delivery */}
        {/* <div
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
        </div>*/}
      </div>
    </div>
  )
}

export default PaymentMethod
