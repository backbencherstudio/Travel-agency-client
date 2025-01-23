import React, { useState } from 'react'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'

const CheckoutForm = ({ onCardDetailsChange }) => {
    const stripe = useStripe();
    const elements = useElements();
  
    const [cardName, setCardName] = useState('');
    const [error, setError] = useState(null);
  
    const handleCardNameChange = (e) => {
      setCardName(e.target.value);
      validateCardDetails();
    };
  
    const validateCardDetails = async () => {
      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) return;
  
      const cardInfo = await stripe.createToken(cardElement);
      if (cardInfo.error) {
        setError(cardInfo.error.message);
        onCardDetailsChange({ isValid: false, error: cardInfo.error.message });
      } else {
        onCardDetailsChange({
          isValid: true,
          error: null,
          card_number: cardInfo.token.card.last4, 
          expiry_date: `${cardInfo.token.card.exp_month}/${cardInfo.token.card.exp_year}`,
          cvc: cardInfo.token.card.cvc_check ? 'Valid' : 'Invalid',
          name: cardName,
        });
      }
    };
  
    const handleInputChange = async (event) => {
      validateCardDetails();
    };
  
    const customStyle = {
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
    };
  
    return (
      <div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-gray-600">Card Number</label>
            <div className="p-3 border rounded-lg focus-within:border-[#EB5B2A]">
              <CardNumberElement
                options={{ style: customStyle }}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              value={cardName}
              onChange={handleCardNameChange}
              placeholder="Cardholder Name"
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:border-[#EB5B2A]"
            />
          </div>
  
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Expiry Date</label>
              <div className="p-3 border rounded-lg focus-within:border-[#EB5B2A]">
                <CardExpiryElement
                  options={{ style: customStyle }}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600">CVC</label>
              <div className="p-3 border rounded-lg focus-within:border-[#EB5B2A]">
                <CardCvcElement
                  options={{ style: customStyle }}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
  
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    );
  };
  
  export default CheckoutForm;
  
