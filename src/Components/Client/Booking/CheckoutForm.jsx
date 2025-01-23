import React, { useState } from 'react'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'

const CheckoutForm = ({ onCardDetailsChange }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [cardName, setCardName] = useState('')
  const [error, setError] = useState(null)

  const handleCardNameChange = e => {
    setCardName(e.target.value)
    // Pass updated card name along with validation status
    onCardDetailsChange({
      isValid: !!e.target.value,
      cardName: e.target.value,
      error
    })
  }

  const handleInputChange = async event => {
    // Validate Stripe elements
    if (event.error) {
      setError(event.error.message)
      onCardDetailsChange({
        isValid: false,
        cardName,
        error: event.error.message
      })
    } else {
      setError(null)
      onCardDetailsChange({ isValid: !!cardName, cardName, error: null })
    }
  }

  const customStyle = {
    base: {
      fontSize: '16px',
      color: '#333',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#e63946'
    }
  }

  return (
    <div>
      <div className='mt-4 space-y-4'>
        <div>
          <label className='text-sm text-gray-600'>Card Number</label>
          <div className='p-3 border rounded-lg focus-within:border-[#EB5B2A]'>
            <CardNumberElement
              options={{ style: customStyle }}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label className='text-sm text-gray-600'>Card Name</label>
          <input
            type='text'
            value={cardName}
            onChange={handleCardNameChange}
            placeholder='Robert Fox'
            className='w-full p-3 mt-1 border rounded-lg focus:outline-none focus:border-[#EB5B2A]'
          />
        </div>

        <div className='flex gap-4'>
          <div className='flex-1'>
            <label className='text-sm text-gray-600'>Expiry Date</label>
            <div className='p-3 border rounded-lg focus-within:border-[#EB5B2A]'>
              <CardExpiryElement
                options={{ style: customStyle }}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='flex-1'>
            <label className='text-sm text-gray-600'>CVC</label>
            <div className='p-3 border rounded-lg focus-within:border-[#EB5B2A]'>
              <CardCvcElement
                options={{ style: customStyle }}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>

      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
    </div>
  )
}

export default CheckoutForm
