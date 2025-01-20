import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const ContactFrom = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    address1: '',
    address2: '',
    city: '',
    zip_code: '',
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

  useEffect(() => {
    fetchCountries()
  }, [])

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

  const onSubmit = async data => {
    try {
      if (!formData.country) {
        toast.error('Please select a country')
        return false // Add this to prevent form submission
      }

      const contactData = {
        phone_number: data.mobileNumber,
        address1: data.address1,
        address2: data.address2,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zip_code: formData.zip_code
      }

      // Only call onFormSubmit if all validations pass
      onFormSubmit(contactData)
      return true
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to submit contact details')
      return false
    }
  }

  const onError = () => {
    toast.error('Please fill all required fields correctly.')
  }

  useEffect(() => {
    setValue('country', '')
  }, [setValue])

  return (
    <div className='relative'>
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
            <label className='text-[15px] text-[#0F1416]' htmlFor='address1'>
              Address Line 1 <span className='text-red-600'>*</span>
            </label>
            <input
              type='text'
              {...register('address1', {
                required: 'Address is required'
              })}
              className='px-5 py-3 rounded-lg mt-3 border'
              placeholder='Enter Address Line 1'
            />
            {errors.address1 && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.address1.message}
              </p>
            )}
          </div>

          <div className='flex flex-col'>
            <label className='text-[15px] text-[#0F1416]' htmlFor='address2'>
              Address Line 2
            </label>
            <input
              type='text'
              {...register('address2')}
              className='px-5 py-3 rounded-lg mt-3 border'
              placeholder='Enter Address Line 2'
            />
          </div>

          <div className='flex flex-col relative'>
            <label className='text-[15px] text-[#0F1416]' htmlFor='country'>
              Country <span className='text-red-600'>*</span>
            </label>
            <select
              {...register('country', { required: true })}
              name='country'
              value={formData.country}
              onChange={e => {
                handleChange(e)
                setValue('country', e.target.value)
              }}
              className={`px-5 py-3 rounded-lg mt-3 border ${
                errors.country ? 'border-red-500' : 'border-zinc-300'
              } focus:outline-none focus:border-[#EB5B2A] appearance-none bg-white w-full`}
            >
              <option value=''>Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 mt-8'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
            {errors.country && (
              <p className='text-red-500 text-sm mt-1'>Country is required</p>
            )}
          </div>

          {hasStates && (
            <div className='flex flex-col relative'>
              <label className='text-[15px] text-[#0F1416]' htmlFor='state'>
                State
              </label>
              <select
                name='state'
                value={formData.state}
                onChange={handleChange}
                className='px-5 py-3 rounded-lg mt-3 border border-zinc-300 focus:outline-none focus:border-[#EB5B2A] appearance-none bg-white w-full'
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
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 mt-8'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          )}

          <div className='flex flex-col relative'>
            <label className='text-[15px] text-[#0F1416]' htmlFor='city'>
              City
            </label>
            <select
              name='city'
              value={formData.city}
              onChange={handleChange}
              className='px-5 py-3 rounded-lg mt-3 border border-zinc-300 focus:outline-none focus:border-[#EB5B2A] appearance-none bg-white w-full'
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
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 mt-8'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>

          <div className='flex flex-col'>
            <label className='text-[15px] text-[#0F1416]' htmlFor='zip_code'>
              ZIP Code
            </label>
            <input
              type='text'
              name='zip_code'
              placeholder='Enter ZIP Code'
              className='px-5 py-3 rounded-lg mt-3 border border-zinc-300 focus:outline-none focus:border-[#EB5B2A]'
              value={formData.zip_code}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactFrom
