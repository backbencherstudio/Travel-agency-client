import React, { useEffect, useRef, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'
import { getCheckoutById } from '../../Apis/clientApi/ClientBookApi'
import { useParams } from 'react-router-dom'
import Confetti from 'react-confetti'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import PaymentMethod from '../../Components/Client/Booking/PaymentMethod'
import PackageDetails from '../../Components/Client/Booking/PackageDetails'
// import ContactFrom from '../../Components/Client/Booking/ContactFrom'

function ReviewPackage () {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    address: '',
    area: '',
    city: '',
    pinCode: '',
    state: '',
    country: ''
  })

  const formRef = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  // discount coupon
  const data = [
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
    }
  ]

  const [travelers, setTravelers] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [showNewTravelerText, setShowNewTravelerText] = useState(false)
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState({
    states: false,
    cities: false
  })
  const [hasStates, setHasStates] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupons, setAppliedCoupons] = useState([])
  const [checkoutData, setCheckoutData] = useState(null)
  const [error, setError] = useState('')
  const { id } = useParams()
  const [showConfetti, setShowConfetti] = useState(false)
  const [showNewPart, setShowNewPart] = useState(false)
  useEffect(() => {
    const fetchCheckoutData = async () => {
      setLoading(true)
      try {
        const data = await getCheckoutById(id)
        console.log('API Response:', data)
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

    if (id) {
      fetchCheckoutData()
    }
  }, [id])

  // Calculate total price dynamically
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

    const calculatedTotalPrice =
      travelerCount * basePrice + 200 * travelerCount - totalDiscount

    setTotalPrice(calculatedTotalPrice)
  }, [travelers, appliedCoupons, checkoutData])

  // console.log('API Response:', checkoutData)

  // Fetch all countries on component mount
  useEffect(() => {
    fetchCountries()
  }, [])

  // Fetch countries from API
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries'
      )
      const data = await response.json()
      if (data.data) {
        setCountries(data.data.map(country => country.country))
      }
    } catch (error) {
      console.error('Error fetching countries:', error)
    }
  }

  // Fetch states when country changes
  const fetchStates = async country => {
    if (!country) return

    setLoading(prev => ({ ...prev, states: true }))
    try {
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries/states',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ country })
        }
      )
      const data = await response.json()
      if (data.data?.states) {
        setStates(data.data.states.map(state => state.name))
        setHasStates(data.data.states.length > 0)
      } else {
        setStates([])
        setHasStates(false)
      }
    } catch (error) {
      console.error('Error fetching states:', error)
      setStates([])
      setHasStates(false)
    } finally {
      setLoading(prev => ({ ...prev, states: false }))
    }
  }

  // Fetch cities based on country and state
  const fetchCities = async (country, state = null) => {
    if (!country) return

    setLoading(prev => ({ ...prev, cities: true }))
    try {
      const endpoint = state
        ? 'https://countriesnow.space/api/v0.1/countries/state/cities'
        : 'https://countriesnow.space/api/v0.1/countries/cities'

      const body = state ? { country, state } : { country }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      const data = await response.json()
      if (data.data) {
        setCities(data.data)
      }
    } catch (error) {
      console.error('Error fetching cities:', error)
      setCities([])
    } finally {
      setLoading(prev => ({ ...prev, cities: false }))
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Handle cascading updates
    if (name === 'country') {
      fetchStates(value)
      fetchCities(value)
      setFormData(prev => ({
        ...prev,
        [name]: value,
        state: '',
        city: ''
      }))
    } else if (name === 'state') {
      fetchCities(formData.country, value)
      setFormData(prev => ({
        ...prev,
        [name]: value,
        city: ''
      }))
    }
  }

  const handleTravelerChange = (index, e) => {
    const { name, value } = e.target
    const updatedTravelers = [...travelers]
    updatedTravelers[index][name] = value
    setTravelers(updatedTravelers)
  }

  const addTraveler = () => {
    setTravelers(prevTravelers => [
      ...prevTravelers,
      { name: '', type: 'Adult' }
    ])
    if (!showNewTravelerText) {
      setShowNewTravelerText(true)
    }
  }

  const removeTraveler = index => {
    const updatedTravelers = travelers.filter((_, i) => i !== index)
    setTravelers(updatedTravelers)
    if (updatedTravelers.length === 0) {
      setShowNewTravelerText(false)
    }
  }

  // coupon vaidation

  const applyCoupon = () => {
    const enteredCode = couponCode.trim()

    // Find the matching coupon
    const coupon = data.find(c => c.name === enteredCode)

    // Validate the coupon
    if (!coupon) {
      toast.error('Coupon not found or invalid')
      return
    }

    // Check if the coupon is already applied
    if (appliedCoupons.some(c => c.name === enteredCode)) {
      toast.error(`Coupon ${enteredCode} has already been used.`)
      return
    }

    // Additional validation (e.g., expiration date, usage limits, etc.)
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

    // Apply the coupon
    setAppliedCoupons(prevCoupons => [...prevCoupons, coupon])
    setCouponCode('')
    setShowConfetti(true)
    toast.success(`Coupon ${coupon.name} applied successfully!`)

    setTimeout(() => setShowConfetti(false), 4000)
  }

  const removeCoupon = code => {
    setAppliedCoupons(appliedCoupons.filter(coupon => coupon !== code))
  }

  // if (loading) return <div>Loading...</div>
  // if (error) return <div>Error: {error}</div>

  const onSubmit = data => {
    toast.success('All fields validated successfully! Proceeding to payment.')
    console.log('Form Data:', data)
    setShowNewPart(true)
  }

  const onError = () => {
    toast.error('Please fill all required fields correctly.')
  }
  useEffect(() => {
    setValue('country', '') // Initialize default country value
  }, [setValue])

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    }
  }

  return (
    <div className='max-w-[1216px] mx-auto my-10  px-4 xl:px-0'>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className='flex flex-col lg:flex-row justify-between gap-10'>
        {showNewPart ? (
          <>
            <div>
              <PaymentMethod />
            </div>
          </>
        ) : (
          <>
            <div className='w-full lg:w-8/12'>
              <div className=' flex flex-col gap-10'>
                <h1 className='text-[#0F1416] text-4xl font-bold'>
                  Review Package
                </h1>

                {/* Details package  */}
                <PackageDetails checkoutData={checkoutData} />

                {/* input user deatils  */}
                {/* <ContactFrom
                  formRef={formRef}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  onError={onError}
                  register={register}
                  errors={errors}
                  formData={formData}
                  handleChange={handleChange}
                  countries={countries}
                  states={states}
                  cities={cities}
                  hasStates={hasStates}
                  loading={loading}
                /> */}

                <div>
                  <h4 className='text-[20px] text-[#0F1416] font-bold mb-5'>
                    Please Enter Contact Details
                  </h4>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit, onError)}
                    className='flex flex-col gap-7'
                  >
                    <div className='flex flex-col'>
                      <label
                        className='text-[15px] text-[#0F1416]'
                        htmlFor='mobileNumber'
                      >
                        Mobile Number <span className='text-red-600'>*</span>
                      </label>
                      <input
                        type='text'
                        {...register('mobileNumber', {
                          required: 'Mobile number is required',
                          pattern: {
                            value: /^[0-9]{10,15}$/,
                            message:
                              'Enter a valid mobile number (10-15 digits)'
                          }
                        })}
                        className='px-5 py-3 rounded-lg mt-3 border'
                        placeholder='Enter Mobile Number'
                      />
                      {errors.mobileNumber && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.mobileNumber.message}
                        </p>
                      )}
                    </div>

                    <div className='flex flex-col'>
                      <label
                        className='text-[15px] text-[#0F1416]'
                        htmlFor='address'
                      >
                        Flat, House no., Building, Company, Apartment{' '}
                        <span className='text-red-600'>*</span>
                      </label>
                      <input
                        type='text'
                        {...register('address', {
                          required: 'Address is required'
                        })}
                        className='px-5 py-3 rounded-lg mt-3 border'
                        placeholder='Enter Address'
                      />
                      {errors.address && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    <div className='flex flex-col'>
                      <label
                        className='text-[15px] text-[#0F1416]'
                        htmlFor='area'
                      >
                        Area, Colony, Street, Sector, Village{' '}
                        <span className='text-red-600'>*</span>
                      </label>
                      <input
                        type='text'
                        {...register('area', {
                          required: 'Area is required'
                        })}
                        className='px-5 py-3 rounded-lg mt-3 border'
                        placeholder='Enter Area'
                      />
                      {errors.area && (
                        <p className='text-red-500 text-sm mt-1'>
                          {errors.area.message}
                        </p>
                      )}
                    </div>
                    <div className='flex flex-col'>
                      <label
                        className='text-[15px] text-[#0F1416]'
                        htmlFor='country'
                      >
                        Country <span className='text-red-600'>*</span>
                      </label>
                      <select
                        name='country'
                        value={formData.country}
                        onChange={handleChange}
                        className='px-5 py-3 rounded-lg mt-3 border border-zinc-300 focus:outline-none focus:border-[#EB5B2A]'
                      >
                        <option value=''>Select Country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    {hasStates && (
                      <div className='flex flex-col'>
                        <label
                          className='text-[15px] text-[#0F1416]'
                          htmlFor='state'
                        >
                          State
                        </label>
                        <select
                          name='state'
                          value={formData.state}
                          onChange={handleChange}
                          className='px-5 py-3 rounded-lg mt-3 border border-zinc-300 focus:outline-none focus:border-[#EB5B2A]'
                          disabled={loading.states || !formData.country}
                        >
                          <option value=''>
                            {loading.states
                              ? 'Loading states...'
                              : 'Select State'}
                          </option>
                          {states.map((state, index) => (
                            <option key={index} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className='flex flex-col'>
                      <label
                        className='text-[15px] text-[#0F1416]'
                        htmlFor='city'
                      >
                        City
                      </label>
                      <select
                        name='city'
                        value={formData.city}
                        onChange={handleChange}
                        className='px-5 py-3 rounded-lg mt-3 border border-zinc-300 focus:outline-none focus:border-[#EB5B2A]'
                        disabled={
                          loading.cities ||
                          !formData.country ||
                          (hasStates && !formData.state)
                        }
                      >
                        <option value=''>
                          {loading.cities ? 'Loading cities...' : 'Select City'}
                        </option>
                        {cities.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='flex flex-col'>
                      <label
                        className='text-[15px] text-[#0F1416]'
                        htmlFor='pinCode'
                      >
                        Pin Code
                      </label>
                      <input
                        type='text'
                        name='pinCode'
                        placeholder='Enter Pin/Zip Code'
                        className='px-5 py-3 rounded-lg mt-3 border border-zinc-300 focus:outline-none focus:border-[#EB5B2A] '
                        value={formData.pinCode}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* Add Traveler  */}
              <div className=''>
                <h1 className='text-xl font-semibold mt-10'>Add Traveler</h1>

                <div className='my-5'>
                  {showNewTravelerText && (
                    <h1 className='text-3xl  font-bold mt-10 text-[#0F1416]'>
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
                          Traveler {index + 2} {/* Default is Traveler 1 */}
                        </h2>
                        <button
                          className='ml-3 text-red-600 hover:text-red-800'
                          onClick={() => removeTraveler(index)}
                        >
                          <FiTrash2 size={24} />
                        </button>
                      </div>
                      <div className='flex flex-col '>
                        <label className='text-sm font-medium'>Name</label>
                        <input
                          type='text'
                          name='name'
                          placeholder='Enter Full Name'
                          value={traveler.name}
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

        {/* price section  */}
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
                </span>{' '}
                <span>x</span> <span>{travelers.length + 1}</span> Travelers
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
                        {coupon.name} -{' '}
                        {coupon.amount_type === 'percentage'
                          ? `${coupon.amount}%`
                          : `$${coupon.amount}`}
                        <button
                          onClick={() =>
                            setAppliedCoupons(prevCoupons =>
                              prevCoupons.filter((_, i) => i !== index)
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
                -${(appliedCoupons.length * 350).toFixed(2)}
              </h4>
            </div>
            <div className='flex gap-2 mt-2'>
              <input
                type='text'
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                className='border px-2 py-1 text-[14px] rounded-md  border-zinc-300 focus:outline-none focus:border-green-600'
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
                <span>$200</span> <span>x</span>{' '}
                <span>{travelers.length + 1}</span> Travelers
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>
              +${(200 * (travelers.length + 1)).toFixed(2)}{' '}
            </h4>
          </div>

          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                Coupon Discount
              </h4>
              <p className='text-base font-normal flex items-center gap-3'>
                <span>$350</span> <span>x</span>{' '}
                <span>{appliedCoupons.length}</span> Coupons
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>
              -${(appliedCoupons.length * 350).toFixed(2)}
            </h4>
          </div>

          {showNewPart ? (
            <button className='flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w-full mt-2'>
              Payment
            </button>
          ) : (
            <button
              onClick={handleButtonClick}
              className='flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w-full mt-2'
            >
              Proceed to Payment
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewPackage
