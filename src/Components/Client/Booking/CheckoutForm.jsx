import React, { useState, useRef, useEffect } from 'react'
import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

const CheckoutForm = ({ onCardDetailsChange }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardName, setCardName] = useState('');
  const [error, setError] = useState(null);
  const cardElementRef = useRef(null);
  const initialRenderRef = useRef(true);

  useEffect(() => {
    if (initialRenderRef.current && elements) {
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElementRef.current = cardElement;
        initialRenderRef.current = false;
        onCardDetailsChange({
          isValid: true,
          cardElement: cardElement
        });
      }
    }
  }, [elements, onCardDetailsChange]);

  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  };

  const handleCardChange = async (event) => {
    if (event.error) {
      setError(event.error.message);
      onCardDetailsChange({ 
        isValid: false, 
        error: event.error.message 
      });
    } else {
      setError(null);
      onCardDetailsChange({ 
        isValid: event.complete, 
        error: null,
        name: cardName
      });
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block text-sm text-gray-600 mb-2">Card Details</label>
        <div className="p-3 border rounded-lg focus-within:border-[#EB5B2A] transition-all duration-300">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#333',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#e63946',
                },
              },
            }}
            onChange={handleCardChange}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2">Name on Card</label>
        <input
          type="text"
          value={cardName}
          onChange={handleCardNameChange}
          placeholder="Cardholder Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#EB5B2A] transition-all duration-300"
        />
      </div>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default CheckoutForm;