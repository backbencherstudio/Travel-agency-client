import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

if ("pk_test_51QFpATLEvlBZD5dJaha6mJPocvY5x6EoeWDg3DVjMIFdAwRzxN6sNlimMO6xW3hk3a7STUMQtVi6vb2NWu1Vc46c000l8Y7yha" === undefined) {
  throw new Error(
    'VITE_STRIPE_PUBLISHABLE_KEY is not set in the environment variables'
  );
}


const stripePromise = loadStripe("pk_test_51QFpATLEvlBZD5dJaha6mJPocvY5x6EoeWDg3DVjMIFdAwRzxN6sNlimMO6xW3hk3a7STUMQtVi6vb2NWu1Vc46c000l8Y7yha");


const PaymentMethod = ({ onCardDetailsChange, onPaymentMethodChange }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({});

  // Handle changes in card details
  const handleCardDetailsChange = (details) => {
    setCardDetails(details);
    onCardDetailsChange(details);
  };

  // Handle payment method selection change
  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    onPaymentMethodChange(method); 
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
      <p className="text-gray-600 mb-6">Select a payment method</p>

      <div className="space-y-4">
        {/* Card Payment */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'card' ? 'border-[#EB5B2A]' : 'border-gray-200'
          }`}
          onClick={() => handleMethodChange('card')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={selectedMethod === 'card'}
              onChange={() => handleMethodChange('card')}
              className="accent-[#EB5B2A]"
            />
            <span className="font-medium">Debit/Credit Card</span>
          </div>

          {selectedMethod === 'card' && (
            <Elements stripe={stripePromise}>
              <CheckoutForm onCardDetailsChange={handleCardDetailsChange} />
            </Elements>
          )}
        </div>

        {/* Google Pay */}
        {/* <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'googlepay'
              ? 'border-[#EB5B2A]'
              : 'border-gray-200'
          }`}
          onClick={() => handleMethodChange('googlepay')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={selectedMethod === 'googlepay'}
              onChange={() => handleMethodChange('googlepay')}
              className="accent-[#EB5B2A]"
            />
            <span className="font-medium">Google Pay</span>
          </div>
        </div> */}

        {/* PayPal */}
        {/* <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'paypal' ? 'border-[#EB5B2A]' : 'border-gray-200'
          }`}
          onClick={() => handleMethodChange('paypal')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={selectedMethod === 'paypal'}
              onChange={() => handleMethodChange('paypal')}
              className="accent-[#EB5B2A]"
            />
            <span className="font-medium">PayPal</span>
          </div>
        </div> */}

        {/* Cash on Delivery */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedMethod === 'cod' ? 'border-[#EB5B2A]' : 'border-gray-200'
          }`}
          onClick={() => handleMethodChange('cod')}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              checked={selectedMethod === 'cod'}
              onChange={() => handleMethodChange('cod')}
              className="accent-[#EB5B2A]"
            />
            <span className="font-medium">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
