import React, { useEffect, useState } from 'react'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'
import {
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

function ReviewPackage () {
  const {
    formState: { errors }
  } = useForm()

  const discountCoupons = [
    {
      id: 'cm5s2pg810000wv5osq7wk41c',
      name: 'Coupon20$',
      description: 'this is discount',
      amount_type: 'fixed',
      amount: 20,
      max_uses: 15,
      max_uses_per_user: 2,
      starts_at: '2025-01-01T00:00:00.000Z',
      expires_at: '2026-01-01T00:00:00.000Z',
      min_type: 'amount',
      min_amount: 20,
      min_quantity: 5,
      created_at: '2025-01-11T11:00:00.000Z',
      updated_at: '2025-01-11T11:00:00.000Z'
    },
    {
      id: 'cm5s2pg810000wv5osq7wk41c',
      name: 'Coupon20',
      description: 'this is discount',
      amount_type: 'percentage',
      amount: 20,
      max_uses: 15,
      max_uses_per_user: 2,
      starts_at: '2025-01-01T00:00:00.000Z',
      expires_at: '2026-01-01T00:00:00.000Z',
      min_type: 'amount',
      min_amount: 20,
      min_quantity: 5,
      created_at: '2025-01-11T11:00:00.000Z',
      updated_at: '2025-01-11T11:00:00.000Z'
    }
  ]

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

  const fetchCheckoutData = async () => {
    setLoading(true)
    try {
      const data = await getCheckoutById(id)
      if (data.errors) {
        setError(data.message || 'An error occurred while fetching data.')
      } else {
        setCheckoutData(data)
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

  useEffect(() => {
    const basePrice =
      checkoutData?.data?.checkout?.checkout_items?.[0]?.package?.price || 0
    const travelerCount = travelers.length + 1
    let totalDiscount = 0

    appliedCoupons.forEach(coupon => {
      if (coupon.amount_type === 'percentage') {
        totalDiscount += (basePrice * travelerCount * coupon.amount) / 100
      } else if (coupon.amount_type === 'fixed') {
        totalDiscount += coupon.amount
      }
    })

    const calculatedTotal = travelerCount * basePrice + 200 * travelerCount - totalDiscount
    setTotalPrice(calculatedTotal)
  }, [travelers.length, appliedCoupons, checkoutData])

  const addTraveler = () => {
    setTravelers(prev => [...prev, { full_name: '', type: 'Adult', email: '' }])
    setShowNewTravelerText(true)
  }

  const handleTravelerChange = (index, e) => {
    const { name, value } = e.target
    setTravelers(prev => {
      const updated = [...prev]
      updated[index] = {
        ...updated[index],
        [name]: value
      }
      return updated
    })
  }

  const removeTraveler = index => {
    setTravelers(prev => {
      const updated = prev.filter((_, i) => i !== index)
      if (updated.length === 0) {
        setShowNewTravelerText(false)
      }
      return updated
    })
  }

  const applyCoupon = () => {
    const enteredCode = couponCode.trim()
    const coupon = discountCoupons.find(c => c.name === enteredCode)

    if (!coupon) {
      toast.error('Coupon not found or invalid')
      return
    }

    if (appliedCoupons.some(c => c.name === enteredCode)) {
      toast.error(`Coupon ${enteredCode} has already been used.`)
      return
    }

    const currentDate = new Date()
    const startsAt = new Date(coupon.starts_at)
    const expiresAt = new Date(coupon.expires_at)

    if (currentDate < startsAt) {
      toast.warn(
        `Coupon is not valid yet. It starts on ${startsAt.toLocaleDateString()}`
      )
      return
    }

    if (currentDate > expiresAt) {
      toast.warn(
        `Coupon has expired. It expired on ${expiresAt.toLocaleDateString()}`
      )
      return
    }

    setAppliedCoupons(prev => [...prev, coupon])
    setCouponCode('')
    setShowConfetti(true)
    toast.success(`Coupon ${coupon.name} applied successfully!`)

    setTimeout(() => setShowConfetti(false), 4000)
  }

  const removeCoupon = code => {
    setAppliedCoupons(prev => prev.filter(coupon => coupon !== code))
  }

  const handleContactFormSubmit = async contactData => {
    setIsProcessing(true)
    try {
      const travelersArray = [
        {
          full_name: 'Main Traveler',
          type: 'Adult'
        },
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
      }, 500)
    } catch (error) {
      console.error('Error updating checkout details:', error)
      toast.error('Failed to update checkout details')
      setIsProcessing(false)
    }
  }

  const handleBackToReview = () => {
    setShowNewPart(false)
  }

  return (
    <div className='max-w-[1216px] mx-auto my-10 px-4 xl:px-0'>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
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
              <PaymentMethod onBack={handleBackToReview}/>
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

                <ContactFrom onFormSubmit={handleContactFormSubmit} />
              </div>

              <div className=''>
                <h1 className='text-xl font-semibold mt-10'>Add Traveler</h1>

                <div className='my-5'>
                  {showNewTravelerText && (
                    <h1 className='text-3xl font-bold mt-10 text-[#0F1416]'>
                      New Traveler Details
                    </h1>
                  )}
                </div>
                <div className='flex flex-col gap-5'>
                  {travelers.map((traveler, index) => (
                    <div
                      key={index}
                      className='flex flex-col border rounded-lg p-4 mb-3'
                    >
                      <div className='flex items-center justify-between'>
                        <h2 className='text-lg font-semibold mb-3'>
                          Traveler {index + 2}
                        </h2>
                        <button
                          className='ml-3 text-red-600 hover:text-red-800'
                          onClick={() => removeTraveler(index)}
                        >
                          <FiTrash2 size={24} />
                        </button>
                      </div>
                      <div className='flex flex-col'>
                        <label className='text-sm font-medium'>Name</label>
                        <input
                          type='text'
                          name='full_name'
                          placeholder='Enter Full Name'
                          value={traveler.full_name}
                          className='border rounded px-4 py-2 mt-1'
                          onChange={e => handleTravelerChange(index, e)}
                        />
                        <label className='text-sm font-medium mt-3'>
                          Traveler Type
                        </label>
                        <select
                          name='type'
                          value={traveler.type}
                          className='border rounded px-4 py-2 mt-1'
                          onChange={e => handleTravelerChange(index, e)}
                        >
                          <option value='Adult'>Adult</option>
                          <option value='Child'>Child</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className='bg-[#EB5B2A] hover:bg-[#eb5a2ae4] transform duration-300 px-7 py-3 rounded-full text-white flex items-center gap-2 mt-4'
                  onClick={addTraveler}
                  type='button'
                >
                  <FiPlusCircle className='text-xl' />
                  Add Traveler
                </button>
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
                <span>{travelers.length + 1}</span> Travelers
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>
              $
              {(
                (travelers.length + 1) *
                (checkoutData?.data?.checkout?.checkout_items?.[0]?.package
                  ?.price || 0)
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
                        className='flex items-center bg-green-600 text-white px-2 py-1 rounded-2xl w-fit text-[10px]'
                      >
                        {coupon.name}
                        <button
                          onClick={() =>
                            setAppliedCoupons(prev =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                          className='ml-2 text-[12px] font-bold'
                        >
                          <RxCross2 className='text-md' />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <h4 className='text-[20px] text-[#0F1416] font-bold'>
                -$
                {appliedCoupons
                  .reduce((total, coupon) => {
                    const basePrice =
                      checkoutData?.data?.checkout?.checkout_items?.[0]?.package
                        ?.price || 0
                    const travelerCount = travelers.length + 1
                    return (
                      total +
                      (coupon.amount_type === 'percentage'
                        ? (basePrice * travelerCount * coupon.amount) / 100
                        : coupon.amount)
                    )
                  }, 0)
                  .toFixed(2)}
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

          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                Fee & Taxes
              </h4>
              <p className='text-base font-normal flex items-center gap-3'>
                <span>$200</span>
                <span>x</span>
                <span>{travelers.length + 1}</span> Travelers
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>
              +${(200 * (travelers.length + 1)).toFixed(2)}
            </h4>
          </div>

          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                Coupon Discount
              </h4>
              <p className='text-base font-normal flex items-center gap-3'>
                <span>
                  {appliedCoupons.length === 0
                    ? '0'
                    : appliedCoupons.map((coupon, index) => (
                        <span key={index} className='text-[16px]'>
                          {coupon.amount_type === 'percentage'
                            ? `${coupon.amount}%`
                            : `$${coupon.amount}`}
                        </span>
                      ))}
                </span>
                <span>x</span>
                <span>{appliedCoupons.length}</span> Coupons
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>
              -$
              {appliedCoupons
                .reduce((total, coupon) => {
                  const basePrice =
                    checkoutData?.data?.checkout?.checkout_items?.[0]?.package
                      ?.price || 0
                  const travelerCount = travelers.length + 1
                  return (
                    total +
                    (coupon.amount_type === 'percentage'
                      ? (basePrice * travelerCount * coupon.amount) / 100
                      : coupon.amount)
                  )
                }, 0)
                .toFixed(2)}
            </h4>
          </div>

          {showNewPart ? (
            <button className='flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w-full mt-2'>
              Payment
            </button>
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
