import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

const ContactFrom = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    address: '',
    area: '',
    city: '',
    pinCode: '',
    state: '',
    country: ''
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()
  const formRef = useRef(null)
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
    const [hasStates, setHasStates] = useState(false)
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState({
    states: false,
    cities: false
  })




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
    const onSubmit = data => {
      toast.success('All fields validated successfully! Proceeding to payment.')
      console.log('Form Data:', data)
      setShowNewPart(true)
    }
  
    const onError = () => {
      toast.error('Please fill all required fields correctly.')
    }
    useEffect(() => {
      setValue('country', '') 
    }, [setValue])
  return (
    <div>
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
                  message: 'Enter a valid mobile number (10-15 digits)'
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
            <label className='text-[15px] text-[#0F1416]' htmlFor='address'>
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
            <label className='text-[15px] text-[#0F1416]' htmlFor='area'>
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
              <p className='text-red-500 text-sm mt-1'>{errors.area.message}</p>
            )}
          </div>
          <div className='flex flex-col'>
            <label className='text-[15px] text-[#0F1416]' htmlFor='country'>
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
              <label className='text-[15px] text-[#0F1416]' htmlFor='state'>
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
                  {loading.states ? 'Loading states...' : 'Select State'}
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
            <label className='text-[15px] text-[#0F1416]' htmlFor='city'>
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
            <label className='text-[15px] text-[#0F1416]' htmlFor='pinCode'>
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
  )
}

export default ContactFrom
