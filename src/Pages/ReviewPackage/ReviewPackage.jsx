import React, { useContext, useEffect, useState } from 'react'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'
import {
  createBookingFromCheckout,
  getCheckoutById,
  updateCheckout
} from '../../Apis/clientApi/ClientBookApi'
import { useParams } from 'react-router-dom'
import Confetti from 'react-confetti'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import PaymentMethod from '../../Components/Client/Booking/PaymentMethod'
import PackageDetails from '../../Components/Client/Booking/PackageDetails'
import ContactFrom from '../../Components/Client/Booking/ContactFrom'
import Loading from '../../Shared/Loading'
import {
  applyCouponApi,
  deleteCouponApi
} from '../../Apis/clientApi/ClientCouponApis'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider'
import { Helmet } from 'react-helmet-async'

function ReviewPackage () {
  const {
    formState: { errors }
  } = useForm()

  const [travelers, setTravelers] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [showNewTravelerText, setShowNewTravelerText] = useState(false)
  const [loading, setLoading] = useState({
    states: false,
    cities: false
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupons, setAppliedCoupons] = useState([])
  const [checkoutData, setCheckoutData] = useState(null)
  const [error, setError] = useState('')
  const { id } = useParams()
  const [showConfetti, setShowConfetti] = useState(false)
  const [showNewPart, setShowNewPart] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    isValid: false,
    error: null
  })
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const [newTraveler, setNewTraveler] = useState(null)
  const { user } = useContext(AuthContext)
  const [editingFirstTraveler, setEditingFirstTraveler] = useState(false)

  // Initialize first traveler with user data
  useEffect(() => {
    if (user?.name) {
      setTravelers([
        {
          full_name: user.name,
          type: 'Adult',
          isEditing: false
        }
      ])
    }
  }, [user])

  useEffect(() => {
    // Check localStorage for payment state for this checkout ID
    const paymentState = localStorage.getItem(`payment_state_${id}`)
    if (paymentState) {
      setShowNewPart(JSON.parse(paymentState))
    }
  }, [id])

  // fetch checkout data
  const fetchCheckoutData = async () => {
    setLoading(true)
    try {
      const data = await getCheckoutById(id)
      if (data.errors) {
        setError(data.message || 'An error occurred while fetching data.')
      } else {
        setCheckoutData(data)
        // Set applied coupons from temp_redeems
        if (data?.data?.checkout?.temp_redeems?.length > 0) {
          const coupons = data.data.checkout.temp_redeems.map(redeem => ({
            ...redeem.coupon,
            temp_redeem_id: redeem.id
          }))
          setAppliedCoupons(coupons)
        }

        // Set travelers from checkout_travellers, excluding the main traveler
        if (data?.data?.checkout?.checkout_travellers?.length > 1) {
          const additionalTravelers = data.data.checkout.checkout_travellers
            .slice(1)
            .map(traveler => ({
              full_name: traveler.full_name,
              type: traveler.type
            }))
          setTravelers(prev => {
            // Keep first traveler (user) and add additional travelers
            return [prev[0], ...additionalTravelers]
          })
          setShowNewTravelerText(additionalTravelers.length > 0)
        }
      }
    } catch (err) {
      console.error('API Error:', err)
      setError('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchCheckoutData()
    }
  }, [id])

  // console.log('checkoutData', checkoutData)

  useEffect(() => {
    const basePrice =
      checkoutData?.data?.checkout?.checkout_items?.[0]?.package?.price || 0
    const travelerCount = travelers.length

    const sortedCoupons = [...appliedCoupons].sort((a, b) => {
      const aAmount =
        a.amount_type === 'percentage'
          ? parseFloat(a.amount)
          : (parseFloat(a.amount) / basePrice) * 100
      const bAmount =
        b.amount_type === 'percentage'
          ? parseFloat(b.amount)
          : (parseFloat(b.amount) / basePrice) * 100
      return bAmount - aAmount
    })

    let remainingPrice = basePrice * travelerCount

    // Apply coupon discounts sequentially
    sortedCoupons.forEach(coupon => {
      if (remainingPrice > 0) {
        const couponAmount = parseFloat(coupon.amount)
        if (coupon.amount_type === 'percentage') {
          const discount = (remainingPrice * couponAmount) / 100
          remainingPrice -= discount
        } else if (coupon.amount_type === 'fixed') {
          remainingPrice -= couponAmount
        }
      }
    })

    // Ensure price doesn't go below 0
    remainingPrice = Math.max(0, remainingPrice)

    const extraServicesTotal =
      (checkoutData?.data?.checkout?.checkout_extra_services?.reduce(
        (total, service) => {
          return total + Number(service.extra_service.price)
        },
        0
      ) || 0) * travelerCount

    const calculatedTotal = remainingPrice + extraServicesTotal

    setTotalPrice(calculatedTotal)
  }, [travelers.length, appliedCoupons, checkoutData])

  // Handle input changes for the new traveler
  const handleNewTravelerChange = e => {
    const { name, value } = e.target
    setNewTraveler(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle first traveler edit
  const handleFirstTravelerEdit = () => {
    setEditingFirstTraveler(true)
    setNewTraveler({
      full_name: travelers[0].full_name,
      type: travelers[0].type
    })
  }

  // Save first traveler edits
  const saveFirstTravelerEdit = () => {
    if (newTraveler?.full_name?.trim()) {
      setTravelers(prev => [{ ...newTraveler }, ...prev.slice(1)])
      setEditingFirstTraveler(false)
      setNewTraveler(null)
    } else {
      toast.error('Please enter a valid name for the traveler')
    }
  }

  // Cancel first traveler edit
  const cancelFirstTravelerEdit = () => {
    setEditingFirstTraveler(false)
    setNewTraveler(null)
  }

  // Save the new traveler and add to the list
  const saveNewTraveler = () => {
    if (newTraveler?.full_name?.trim()) {
      setTravelers(prev => [...prev, newTraveler])
      setNewTraveler(null)
    } else {
      alert('Please enter a valid name for the traveler')
    }
  }

  // Cancel adding a new traveler
  const cancelNewTraveler = () => {
    setNewTraveler(null)
  }

  // Remove traveler
  const removeTraveler = index => {
    // Don't allow removing the first traveler (user)
    if (index === 0) return
    setTravelers(prev => prev.filter((_, i) => i !== index))
  }

  // Apply coupon
  const applyCoupon = async () => {
    const enteredCode = couponCode.trim()

    if (!enteredCode) {
      toast.error('Please enter a coupon code.')
      return
    }

    const basePrice =
      checkoutData?.data?.checkout?.checkout_items?.[0]?.package?.price || 0
    const currentDiscount = appliedCoupons.reduce((total, coupon) => {
      if (coupon.amount_type === 'percentage') {
        return total + parseFloat(coupon.amount)
      }
      return total + (parseFloat(coupon.amount) / basePrice) * 100
    }, 0)

    if (currentDiscount >= 100) {
      toast.error('Maximum discount has already been applied')
      return
    }

    try {
      const response = await applyCouponApi(id, {
        code: enteredCode
      })

      if (response.success && response.data) {
        const newCoupon = response.data[0]
        const newCouponDiscount =
          newCoupon.amount_type === 'percentage'
            ? parseFloat(newCoupon.amount)
            : (parseFloat(newCoupon.amount) / basePrice) * 100

        if (currentDiscount + newCouponDiscount > 100) {
          toast.error(
            'Cannot apply this coupon as it would exceed 100% discount'
          )
          return
        }

        setAppliedCoupons(prev => [...prev, newCoupon])
        setCouponCode('')
        setShowConfetti(true)
        toast.success(
          response.message || `Coupon ${enteredCode} applied successfully!`
        )
        setTimeout(() => setShowConfetti(false), 4000)

        fetchCheckoutData()
      } else {
        toast.error(response.message || 'Failed to apply the coupon.')
      }
    } catch (error) {
      console.error('Error applying coupon:', error)
      toast.error(
        error.message || 'An error occurred while applying the coupon.'
      )
    }
  }

  // Delete coupon
  const deleteCoupon = async (couponId, tempRedeemId) => {
    try {
      const response = await deleteCouponApi(id, tempRedeemId)
      if (response.success) {
        setAppliedCoupons(prev => prev.filter(coupon => coupon.id !== couponId))
        toast.success('Coupon removed successfully')
        fetchCheckoutData()
      } else {
        toast.error(response.message || 'Failed to remove coupon')
      }
    } catch (error) {
      console.error('Error deleting coupon:', error)
      toast.error('Failed to remove coupon')
    }
  }

  const handleContactFormSubmit = async contactData => {
    setIsProcessing(true)
    try {
      const travelersArray = [
        ...travelers.map(traveler => ({
          full_name: traveler.full_name,
          type: traveler.type
        }))
      ]

      const checkoutPayload = {
        booking_travellers: JSON.stringify(travelersArray),
        coupons: JSON.stringify(appliedCoupons.map(coupon => coupon.id)),
        phone_number: contactData.phone_number,
        address1: contactData.address1,
        address2: contactData.address2,
        city: contactData.city,
        zip_code: contactData.zip_code,
        state: contactData.state,
        country: contactData.country
      }

      const response = await updateCheckout(id, checkoutPayload)

      if (response.errors) {
        toast.error(response.message || 'Failed to update checkout details')
        return
      }

      setTimeout(() => {
        setIsProcessing(false)
        setShowNewPart(true)
        // Save payment state to localStorage
        localStorage.setItem(`payment_state_${id}`, JSON.stringify(true))
      }, 500)
    } catch (error) {
      console.error('Error updating checkout details:', error)
      toast.error('Failed to update checkout details')
      setIsProcessing(false)
    }
  }

  // Payment Method

  const handleCardDetailsChange = details => {
    setCardDetails(details)
  }

  // Payment Method
  const handlePayment = async () => {
    if (!stripe || !elements) {
      toast.error('Stripe has not been initialized properly.')
      return
    }

    if (!cardDetails.isValid) {
      toast.error(cardDetails.error || 'Please fill in valid card details.')
      return
    }

    setProcessing(true)

    try {
      // Step 1: Validate checkout details
      const checkoutResponse = await updateCheckout(id)

      if (checkoutResponse.errors) {
        toast.error(
          checkoutResponse.message || 'Failed to update checkout details.'
        )
        setProcessing(false)
        return
      }

      // Step 2: Create booking from checkout
      const bookingResponse = await createBookingFromCheckout(id)

      if (bookingResponse.errors) {
        toast.error(bookingResponse.message || 'Failed to create booking.')
        setProcessing(false)
        return
      }

      const clientSecret = bookingResponse.data?.client_secret
      if (!clientSecret) {
        toast.error(reponse.error)
        setProcessing(false)
        return
      }

      // Step 3: Confirm payment using Stripe
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        toast.error(response.error)
        setProcessing(false)
        return
      }

      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: cardDetails.name || 'Unknown'
          }
        })
      if (paymentMethodError) {
        toast.error(`Payment method error: ${paymentMethodError.message}`)
        setProcessing(false)
        return
      }

      // Step 4: Confirm payment using Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id
        }
      )

      if (error) {
        console.error('Payment failed:', error)
        toast.error(`Payment failed: ${error.message}`)
        setProcessing(false)
        return
      }

      if (paymentIntent.status === 'succeeded') {
        toast.success(
          `Payment succeeded for a total of $${totalPrice.toFixed(2)}!`
        )

        // Clear payment state from localStorage
        localStorage.removeItem(`payment_state_${id}`)

        // Reset CardElement
        elements.getElement(CardElement)?.clear()

        // Redirect to the success page with additional payment details
        const successParams = new URLSearchParams({
          amount: totalPrice.toFixed(2),
          payment_id: paymentIntent.id,
          status: 'success',
          timestamp: new Date().toISOString()
        })
        window.location.href = `/success/${id}?${successParams.toString()}`
      }

      setProcessing(false)
    } catch (error) {
      console.error('Error during booking or payment processing:', error)
      toast.error('Failed to process the booking. Please try again.')
      setProcessing(false)
      // window.location.href = `/payment-error/${id}`
    }
  }

  const handleBackToReview = () => {
    setShowNewPart(false)
    // Update localStorage when going back to review
    localStorage.setItem(`payment_state_${id}`, JSON.stringify(false))
  }

  return (
    <div className='max-w-[1216px] mx-auto my-10 px-4 xl:px-0'>
      <Helmet>
        <title>Around 360 - Review Package</title>
      </Helmet>
      {showConfetti && (
        <div className='fixed inset-0 z-50'>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
      {isProcessing && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
          <Loading />
        </div>
      )}
      <div className='flex flex-col lg:flex-row justify-between gap-10'>
        {showNewPart ? (
          <>
            <div className='w-full lg:w-8/12'>
              <PaymentMethod
                onCardDetailsChange={handleCardDetailsChange}
                onBack={handleBackToReview}
              />
            </div>
          </>
        ) : (
          <>
            <div className='w-full lg:w-8/12'>
              <div className='flex flex-col gap-10'>
                <h1 className='text-[#0F1416] text-4xl font-bold'>
                  Review Package
                </h1>

                <PackageDetails checkoutData={checkoutData} />

                <ContactFrom
                  checkoutData={checkoutData}
                  onFormSubmit={handleContactFormSubmit}
                />
              </div>

              <div>
                <h1 className='text-xl font-semibold mt-10'>Travelers</h1>

                {/* List of travelers */}
                <div className='my-5'>
                  {travelers.map((traveler, index) => (
                    <div
                      key={index}
                      className='flex items-center gap-4 border rounded-lg p-4 mb-3'
                    >
                      {index === 0 && editingFirstTraveler ? (
                        <div className='flex-1'>
                          <h2 className='text-lg font-semibold mb-3'>
                            Edit First Traveler
                          </h2>
                          <label className='text-sm font-medium'>Name</label>
                          <input
                            type='text'
                            name='full_name'
                            placeholder='Enter Full Name'
                            value={newTraveler?.full_name || ''}
                            onChange={handleNewTravelerChange}
                            className='border rounded px-4 py-2 mt-1 w-full'
                          />
                          <label className='text-sm font-medium mt-3 block'>
                            Traveler Type
                          </label>
                          <select
                            name='type'
                            value={newTraveler?.type || 'Adult'}
                            onChange={handleNewTravelerChange}
                            className='border rounded px-4 py-2 mt-1 w-full'
                          >
                            <option value='Adult'>Adult</option>
                            <option value='Child'>Child</option>
                          </select>
                          <div className='flex gap-4 mt-4'>
                            <button
                              onClick={saveFirstTravelerEdit}
                              className='bg-green-600 text-white px-3 py-1 rounded-md'
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelFirstTravelerEdit}
                              className='bg-red-600 text-white px-3 py-1 rounded-md'
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <p className='font-semibold'>
                              Traveler {index + 1}
                            </p>
                            <p className='text-gray-700'>
                              {traveler.full_name}
                            </p>
                            <p className='text-sm text-gray-500'>
                              {traveler.type}
                            </p>
                          </div>
                          {index === 0 ? (
                            <button
                              onClick={handleFirstTravelerEdit}
                              className='ml-auto text-blue-600 hover:text-blue-800'
                            >
                              Edit
                            </button>
                          ) : (
                            <button
                              onClick={() => removeTraveler(index)}
                              className='ml-auto text-red-600 hover:text-red-800'
                            >
                              <FiTrash2 size={24} />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Form for adding a new traveler */}
                {newTraveler && !editingFirstTraveler ? (
                  <div className='flex flex-col border rounded-lg p-4 mb-3'>
                    <h2 className='text-lg font-semibold mb-3'>New Traveler</h2>
                    <label className='text-sm font-medium'>Name</label>
                    <input
                      type='text'
                      name='full_name'
                      placeholder='Enter Full Name'
                      value={newTraveler.full_name || ''}
                      onChange={handleNewTravelerChange}
                      className='border rounded px-4 py-2 mt-1'
                    />
                    <label className='text-sm font-medium mt-3'>
                      Traveler Type
                    </label>
                    <select
                      name='type'
                      value={newTraveler.type || 'Adult'}
                      onChange={handleNewTravelerChange}
                      className='border rounded px-4 py-2 mt-1'
                    >
                      <option value='Adult'>Adult</option>
                      <option value='Child'>Child</option>
                    </select>
                    <div className='flex gap-4 mt-4'>
                      <button
                        onClick={saveNewTraveler}
                        className='bg-green-600 text-white px-3 py-1 rounded-md'
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelNewTraveler}
                        className='bg-red-600 text-white px-3 py-1 rounded-md'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  !editingFirstTraveler && (
                    <button
                      onClick={() =>
                        setNewTraveler({ full_name: '', type: 'Adult' })
                      }
                      className='bg-[#EB5B2A] hover:bg-[#eb5a2ae4] transform duration-300 px-7 py-3 rounded-full text-white flex items-center gap-2 mt-4'
                    >
                      <FiPlusCircle className='text-xl' />
                      Add Traveler
                    </button>
                  )
                )}
              </div>
            </div>
          </>
        )}

        <div className='w-full lg:w-4/12 h-fit px-5 shadow-lg border rounded-lg py-5 sticky top-10'>
          <h1 className='border-b text-[#0F1416] text-4xl font-bold pb-5'>
            ${totalPrice.toFixed(2)}{' '}
            <span className='font-normal text-[16px]'>
              (Inclusive of All Taxes)
            </span>
          </h1>
          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                Total Basic Cost
              </h4>
              <p className='text-base text-[#0F1416] font-normal flex items-center gap-3'>
                <span>
                  $
                  {checkoutData?.data?.checkout?.checkout_items?.[0]?.package
                    ?.price || '0'}
                </span>
                <span>x</span>
                <span>{travelers.length}</span> Travelers
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>
              $
              {(
                travelers.length *
                (checkoutData?.data?.checkout?.checkout_items?.[0]?.package
                  ?.price || 0)
              ).toFixed(2)}
            </h4>
          </div>
          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                Extra Services (Per Person)
              </h4>
              {checkoutData?.data?.checkout?.checkout_extra_services?.map(
                (service, index) => (
                  <p
                    key={index}
                    className='text-base text-[#0F1416] font-normal flex items-center gap-3'
                  >
                    {service.extra_service.name} ($
                    {service.extra_service.price} x {travelers.length})
                  </p>
                )
              )}
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>
              $
              {(
                (checkoutData?.data?.checkout?.checkout_extra_services?.reduce(
                  (total, service) => {
                    return total + Number(service.extra_service.price)
                  },
                  0
                ) || 0) * travelers.length
              ).toFixed(2)}
            </h4>
          </div>

          <div className='flex flex-col mt-5 border-b pb-5'>
            <div className='flex justify-between items-start'>
              <div>
                <h4 className='text-[#0F1416] text-[16px] font-bold'>
                  Coupon Discount
                </h4>

                {appliedCoupons.length > 0 && (
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {appliedCoupons.map((coupon, index) => (
                      <span
                        key={index}
                        className='flex items-center bg-green-600 text-white px-2 py-1 rounded-2xl w-fit text-[11px]'
                      >
                        {coupon.code}
                        {/* ({coupon.amount_type === 'percentage' ? `${coupon.amount}%` : `$${coupon.amount}`}) */}
                        <button
                          onClick={() =>
                            deleteCoupon(coupon.id, coupon.temp_redeem_id)
                          }
                          className='ml-1 text-[14px] '
                        >
                          <RxCross2 className='text-md ' />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h4 className='text-[20px] text-[#0F1416] font-bold'>
                -$
                {(
                  (checkoutData?.data?.checkout?.checkout_items?.[0]?.package
                    ?.price || 0) *
                    travelers.length -
                  totalPrice +
                  (checkoutData?.data?.checkout?.checkout_extra_services?.reduce(
                    (total, service) =>
                      total + Number(service.extra_service.price),
                    0
                  ) || 0) *
                    travelers.length
                ).toFixed(2)}
              </h4>
            </div>
            <div className='flex gap-2 mt-2'>
              <input
                type='text'
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                className='border px-2 py-1 text-[14px] rounded-md border-zinc-300 focus:outline-none focus:border-green-600'
                placeholder='Enter coupon code'
              />
              <button
                onClick={applyCoupon}
                className='bg-green-600 text-white px-3 py-1 rounded-md text-[14px]'
              >
                Apply
              </button>
            </div>
          </div>

          {/* <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                Fee & Taxes
              </h4>
              <p className='text-base font-normal flex items-center gap-3'>
                <span>${checkoutData?.data?.fees || 0}</span>
                <span>x</span>
                <span>{travelers.length}</span> Travelers
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>
              +$
              {(
                (checkoutData?.data?.fees || 0) *
                travelers.length
              ).toFixed(2)}
            </h4>
          </div> */}

          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                Coupon Discount
              </h4>
              <p className='text-base font-normal flex items-center gap-3'>
                {appliedCoupons.map((coupon, index) => (
                  <span key={index} className='text-[16px]'>
                    {coupon.amount_type === 'percentage'
                      ? `${coupon.amount}% off`
                      : `$${coupon.amount} off`}
                    {index < appliedCoupons.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>
              -$
              {(
                (checkoutData?.data?.checkout?.checkout_items?.[0]?.package
                  ?.price || 0) *
                  travelers.length -
                totalPrice +
                (checkoutData?.data?.checkout?.checkout_extra_services?.reduce(
                  (total, service) =>
                    total + Number(service.extra_service.price),
                  0
                ) || 0) *
                  travelers.length
              ).toFixed(2)}
            </h4>
          </div>

          {showNewPart ? (
            <>
              <button
                onClick={handlePayment}
                className='flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w-full mt-2'
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Payment'}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                const form = document.querySelector('form')
                if (form) {
                  form.dispatchEvent(
                    new Event('submit', { cancelable: true, bubbles: true })
                  )
                }
              }}
              disabled={isProcessing}
              className='flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w-full mt-2'
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewPackage
