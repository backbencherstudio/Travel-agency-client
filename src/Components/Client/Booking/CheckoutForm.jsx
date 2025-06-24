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
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvvNumber, setCvvNumber] = useState('');
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
        <label className="block text-[12px] text-[#0F1416] mb-2">Card Number</label>
        <div className="rounded-lg transition-all duration-300">
          {/* <CardElement 
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
          /> */}
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardChange}
            placeholder="xxxx xxxx xxxx xxxx"
            className="w-full text-[16px] text-[#0F1416] p-3 border rounded-lg outline-none border-orange-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-[12px] text-[#0F1416] mb-2">Card Name</label>
        <input
          type="text"
          value={cardName}
          onChange={handleCardNameChange}
          placeholder="Cardholder Name"
          className="w-full text-[16px] text-[#0F1416] p-3 border rounded-lg outline-none border-orange-500"
        />
      </div>
      <div className='flex gap-4'>
        <div className='flex-1'>
          <label className="block text-[12px] text-[#0F1416] mb-2">Expiry Date</label>
          <input
            type="text"
            value={expiryDate}
            onChange={handleCardNameChange}
            placeholder="00/00"
            className="w-full text-[16px] text-[#0F1416] p-3 border rounded-lg outline-none border-orange-500 transition-all duration-300"
          />
        </div>
        <div className='flex-1'>
          <label className="block text-[12px] text-[#0F1416] mb-2">CVV</label>
          <input
            type="text"
            value={cvvNumber}
            onChange={handleCardNameChange}
            placeholder="***"
            className="w-full text-[16px] text-[#0F1416] p-3 border rounded-lg outline-none border-orange-500 transition-all duration-300"
          />
        </div>
      </div>
      <button className='bg-orange-500 rounded-full flex px-[16px] py-[20px] items-center justify-center w-full text-white gap-2 text-[16px] font-medium'>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
          <path d="M12.5 8V16M16.5 12H8.5M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        Add New Card
      </button>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default CheckoutForm;