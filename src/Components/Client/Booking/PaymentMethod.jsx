import React, { useEffect, useState } from "react";
import { useBookingContext } from "~/Context/BookingContext/BookingContext";
import { UserServices } from "~/userServices/user.services";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Initialize Stripe with your publishable key (make sure this is your actual publishable key)
const stripePromise = loadStripe(
  `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`
);

// Stripe Payment Form Component
const StripePaymentForm = ({
  clientSecret,
  bookingDetails,
  onCreateBooking,
}) => {
  const router = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: bookingDetails?.customerName || "Customer",
              email: bookingDetails?.customerEmail || "customer@example.com",
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        toast.error(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        // Handle successful payment here
        console.log("Payment succeeded:", paymentIntent);
        setTimeout(() => {
          toast.dismiss();
          router("/user-dashboard/tour-management");
        }, 1000);
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        fontFamily: "Inter, sans-serif",
      },
    },
  };

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <div className="border border-gray-300 rounded-md p-3">
              <CardNumberElement options={cardElementOptions} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <div className="border border-gray-300 rounded-md p-3">
                <CardExpiryElement options={cardElementOptions} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVC
              </label>
              <div className="border border-gray-300 rounded-md p-3">
                <CardCvcElement options={cardElementOptions} />
              </div>
            </div>
          </div>
        </div>

        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}

        <button
          type="submit"
          disabled={!stripe || isProcessing || !clientSecret}
          className="w-full bg-[#EB5B2A] text-white py-3 px-4 rounded-md font-medium hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isProcessing
            ? "Processing..."
            : `Pay $${bookingDetails?.final_price || "0.00"}`}
        </button>
      </form>
    </div>
  );
};

const PaymentMethod = () => {
  const router = useNavigate();
  const { bookingDetails, updateBooking } = useBookingContext();
  const [selectedMethod, setSelectedMethod] = useState("stripe");
  const [clientSecret, setClientSecret] = useState("");
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);

  // Handle payment method selection change
  const handleMethodChange = async (method) => {
    setSelectedMethod(method);

    if (method === "stripe") {
      await createBooking();
    }
  };

  // Create booking and get client secret
  const createBooking = async () => {
    if (clientSecret) return; // Don't create if already exists

    setIsCreatingBooking(true);
    try {
      const res = await UserServices.createBooking({
        checkout_id: bookingDetails?.checkoutId,
        booking_type: "book",
        payment_method: {
          type: selectedMethod,
          data: {
            amount: Math.round(bookingDetails?.final_price), // Convert to cents
            currency: "usd",
          },
        },
      });

      if (res?.success) {
        setClientSecret(res?.data?.client_secret);
        return res.data;
      } else {
        toast.error(res?.message);
        return null;
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create booking");
      return null;
    } finally {
      setIsCreatingBooking(false);
    }
  };

  // Create booking when component mounts if stripe is selected
  useEffect(() => {
    if (selectedMethod === "stripe" && !clientSecret) {
      createBooking();
    }
  }, [selectedMethod]);

  useEffect(() => {
    if (bookingDetails && !bookingDetails?.package?.id) {
      router("/tours");
    }
  }, [bookingDetails]);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#EB5B2A",
      colorBackground: "#ffffff",
      colorText: "#0F1416",
      fontFamily: "Inter, sans-serif",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row p-5">
      <Toaster position="top-right" />
      <div className="p-6 flex-1">
        <h2 className="text-[40px] font-bold mb-4 text-[#0F1416]">
          Payment Method
        </h2>
        <p className="mb-6 text-[#0F1416] text-[20px] font-bold">
          Select a payment method
        </p>
        <div className="space-y-4">
          {/* Card Payment */}
          <div
            className={`rounded-lg cursor-pointer border border-gray-200 p-4 ${
              selectedMethod === "stripe" ? "border-[#EB5B2A] bg-orange-50" : ""
            }`}
            onClick={() => handleMethodChange("stripe")}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                checked={selectedMethod === "stripe"}
                onChange={() => handleMethodChange("stripe")}
                className="accent-[#EB5B2A]"
              />
              <span className="font-bold text-[#0F1416] text-[20px]">
                Debit/Credit Card
              </span>
            </div>

            {/* Stripe Payment Form */}
            {selectedMethod === "stripe" && (
              <div className="mt-4">
                {isCreatingBooking && !clientSecret ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EB5B2A] mx-auto"></div>
                    <p className="text-gray-600 mt-2">Setting up payment...</p>
                  </div>
                ) : clientSecret ? (
                  <Elements stripe={stripePromise} options={options}>
                    <StripePaymentForm
                      clientSecret={clientSecret}
                      bookingDetails={bookingDetails}
                      onCreateBooking={createBooking}
                    />
                  </Elements>
                ) : (
                  <div className="text-red-600">
                    Failed to initialize payment
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Other payment methods */}
          <div
            className={`py-4 border-b rounded-lg cursor-pointer border-[#a6aaac33] ${
              selectedMethod === "googlepay"
                ? "border-[#EB5B2A] bg-orange-50"
                : ""
            }`}
            onClick={() => handleMethodChange("googlepay")}
          >
            <div className="flex items-center gap-3 px-4">
              <input
                type="radio"
                checked={selectedMethod === "googlepay"}
                onChange={() => handleMethodChange("googlepay")}
                className="accent-[#EB5B2A] w-3 h-3"
              />
              <span className="font-medium text-[18px]">Google Pay</span>
            </div>
          </div>

          <div
            className={`py-4 border-b rounded-lg cursor-pointer border-[#a6aaac33] ${
              selectedMethod === "applepay"
                ? "border-[#EB5B2A] bg-orange-50"
                : ""
            }`}
            onClick={() => handleMethodChange("applepay")}
          >
            <div className="flex items-center gap-3 px-4">
              <input
                type="radio"
                checked={selectedMethod === "applepay"}
                onChange={() => handleMethodChange("applepay")}
                className="accent-[#EB5B2A] w-3 h-3"
              />
              <span className="font-medium text-[18px]">Apple Pay</span>
            </div>
          </div>

          <div
            className={`py-4 border-b rounded-lg cursor-pointer border-[#a6aaac33] ${
              selectedMethod === "paypal" ? "border-[#EB5B2A] bg-orange-50" : ""
            }`}
            onClick={() => handleMethodChange("paypal")}
          >
            <div className="flex items-center gap-3 px-4">
              <input
                type="radio"
                checked={selectedMethod === "paypal"}
                onChange={() => handleMethodChange("paypal")}
                className="accent-[#EB5B2A] w-3 h-3"
              />
              <span className="font-medium text-[18px]">PayPal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="w-full lg:w-4/12 h-fit px-6 lg:shadow-gray-200 lg:shadow-xl border rounded-lg py-5 lg:sticky static top-[90px]">
        <div className="flex justify-between items-center">
          <h1 className="border-b text-[#0F1416] text-4xl font-bold pb-5">
            $
            {bookingDetails?.final_price ||
              (
                bookingDetails?.package?.price * bookingDetails?.totalMember
              ).toFixed(2)}{" "}
            <span className="font-normal text-[16px]">
              (Inclusive of All Taxes)
            </span>
          </h1>
        </div>
        <div className="flex items-start mt-5 border-b pb-5 justify-between">
          <div>
            <h4 className="text-[#0F1416] text-[16px] font-bold pb-2">
              Total Basic Cost
            </h4>
            <p className="text-base text-[#0F1416] font-normal flex items-center gap-3">
              <span>${bookingDetails?.package?.price || "0"}</span>
              <span>x</span>
              <span>{bookingDetails?.totalMember}</span> Travellers
            </p>
          </div>
          <h4 className="text-[20px] text-[#0F1416] font-bold">
            $
            {(
              bookingDetails?.totalMember *
              (bookingDetails?.package?.price || 0)
            ).toFixed(2)}
          </h4>
        </div>

        <div className="flex items-start mt-5 border-b pb-5 justify-between">
          <div>
            <h4 className="text-[#0F1416] text-[16px] font-bold pb-2">
              Fee & Taxes
            </h4>
            <p className="text-base text-[#0F1416] font-normal flex items-center gap-3">
              <span>${"0"}</span>
              <span>x</span>
              <span>{bookingDetails?.totalMember}</span> Travellers
            </p>
          </div>
          <h4 className="text-[20px] text-[#0F1416] font-bold">
            +$
            {(bookingDetails?.totalMember * 0).toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
