import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useBookingContext } from "~/Context/BookingContext/BookingContext";
import toast from "react-hot-toast";

const CheckoutForm = ({ onCardDetailsChange, createBooking, clientSecret, bookingDetails }) => {
  const { updateBooking } = useBookingContext();
  const stripe = useStripe();
  const elements = useElements();
  
  const [cardName, setCardName] = useState("");
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [bookingCreated, setBookingCreated] = useState(false);

  const handleCardChange = (event) => {
    if (event.error) {
      setError(event.error.message);
      setIsCardComplete(false);
      onCardDetailsChange({
        isValid: false,
        error: event.error.message,
      });
    } else {
      setError(null);
      setIsCardComplete(event.complete);
      onCardDetailsChange({
        isValid: event.complete,
        error: null,
        name: cardName,
      });
    }
  };

  // Initialize booking when component mounts or when booking details change
  useEffect(() => {
    const initializeBooking = async () => {
      if (!bookingCreated && bookingDetails?.final_price > 0) {
        try {
          await createBooking();
          setBookingCreated(true);
        } catch (error) {
          toast.error("Failed to initialize payment");
        }
      }
    };

    initializeBooking();
  }, [bookingDetails, createBooking, bookingCreated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cardName.trim()) {
      toast.error("Please enter cardholder name");
      return;
    }

    if (!isCardComplete) {
      toast.error("Please complete your card details");
      return;
    }

    if (!stripe || !elements) {
      toast.error("Payment system not ready. Please try again.");
      return;
    }

    if (!clientSecret) {
      toast.error("Payment not initialized. Please try again.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Confirm card payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: cardName.trim(),
              email: "user@example.com", // Replace with actual user email
            },
          },
          return_url: `${window.location.origin}/payment-success`, // Add your success URL
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Handle successful payment
      if (paymentIntent.status === 'succeeded') {
        toast.success("Payment completed successfully!");
        
        // Update booking context with payment info
        updateBooking("cardInfo", {
          name: cardName,
          paymentIntentId: paymentIntent.id,
          status: paymentIntent.status,
        });

        updateBooking("payment_status", "succeeded");

        console.log("Payment successful:", paymentIntent);
        
        // Redirect or proceed to next step
        // window.location.href = '/payment-success';
        
      } else if (paymentIntent.status === 'requires_action') {
        // Handle 3D Secure authentication
        toast.info("Additional authentication required");
      } else {
        throw new Error(`Payment status: ${paymentIntent.status}`);
      }

    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message);
      toast.error(`Payment failed: ${err.message}`);
    } finally {
      setProcessing(false);
    }
  };

  // Check if form is valid for submission
  const isFormValid = cardName.trim() && isCardComplete && stripe && !processing && clientSecret;

  return (
    <div className="mt-4 space-y-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-[12px] text-[#0F1416] mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="John Doe"
            autoComplete="cc-name"
            className="w-full text-[16px] text-[#0F1416] p-3 border rounded-lg outline-none border-orange-500 focus:border-orange-600 transition-all duration-300"
            disabled={processing}
          />
        </div>

        <div className="mt-4">
          <label className="block text-[12px] text-[#0F1416] mb-2">
            Card Details
          </label>
          <div className="p-3 border rounded-lg border-orange-500 focus-within:border-orange-600 transition-all duration-300">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#0F1416',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                    fontFamily: 'Arial, sans-serif',
                  },
                  invalid: {
                    color: '#e63946',
                  },
                },
                hidePostalCode: true,
              }}
              onChange={handleCardChange}
              disabled={processing || !clientSecret}
            />
          </div>
        </div>

        {!clientSecret && (
          <div className="mt-3 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-sm">
            Initializing payment...
          </div>
        )}

        {/* Test Card Helper */}
        <div className="mt-3 p-3 bg-gray-100 rounded-lg">
          <p className="text-xs text-gray-600 mb-1 font-medium">Test Cards:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li><strong>4242 4242 4242 4242</strong> - Success</li>
            <li><strong>4000 0000 0000 0002</strong> - Decline</li>
            <li><strong>4000 0025 0000 3155</strong> - 3D Secure</li>
            <li>Any future date, any CVV</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full bg-orange-500 rounded-lg flex px-10 py-3 items-center justify-center text-white gap-2 text-[16px] font-medium mt-4 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {processing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            `Pay $${bookingDetails?.final_price?.toFixed(2) || "0.00"}`
          )}
        </button>
        
        {error && (
          <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;