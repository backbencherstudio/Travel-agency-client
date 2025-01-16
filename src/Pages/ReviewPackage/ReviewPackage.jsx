import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'

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

  const [rating, setRating] = useState(3)
  const [travelers, setTravelers] = useState([])
  const [showNewTravelerText, setShowNewTravelerText] = useState(false)
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState({
    states: false,
    cities: false
  })
  const [hasStates, setHasStates] = useState(false)

  // Fetch all countries on component mount
  useEffect(() => {
    fetchCountries()
  }, [])
  // const handleChange = e => {
  //   const { name, value } = e.target
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   })
  // }

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
    if (travelers.length === 0) {
      setShowNewTravelerText(true)
    }
    setTravelers([...travelers, { name: '', type: 'Adult' }])
  }

  const removeTraveler = index => {
    const updatedTravelers = travelers.filter((_, i) => i !== index)
    setTravelers(updatedTravelers)
    // Hide "New Traveler Details" if no travelers left
    if (updatedTravelers.length === 0) {
      setShowNewTravelerText(false)
    }
  }

  return (
    <div className='max-w-[1216px] mx-auto my-10  px-4 xl:px-0'>
      <div className='flex flex-col lg:flex-row justify-between gap-10'>
        <div className='w-full lg:w-8/12'>
          <div className=' flex flex-col gap-10'>
            <h1 className='text-[#0F1416] text-4xl font-bold'>
              Review Package
            </h1>

            {/*  */}
            <div className='bg-[#FDEFEA] p-5 rounded-lg'>
              <div className='flex items-center justify-between'>
                <h1 className='font-bold text-[#000E19]  text-xl sm:text-4xl '>
                  Beijing, China
                </h1>
                <div className='flex gap-1 sm:hidden'>
                  <p className='text-[#4A4C56] text-[14px] '>Review</p>
                  <div className='flex'>
                    <p className='flex gap-1'>
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`${
                            index < rating ? 'text-yellow-500' : 'text-gray-400'
                          }`}
                          size={20}
                        />
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex gap-5 sm:gap-16 lg:justify-start lg:gap-16 mt-5'>
                <div className='hidden sm:block'>
                  <p className='text-[#4A4C56] text-[14px] mb-3'>Review</p>
                  <div className='flex'>
                    <p className='flex gap-1'>
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`${
                            index < rating ? 'text-yellow-500' : 'text-gray-400'
                          }`}
                          size={20}
                        />
                      ))}
                    </p>
                  </div>
                </div>
                <div className='h-14 w-[1px] bg-gray-300 hidden sm:block'></div>
                <div className=''>
                  <p className='text-[#4A4C56] text-[14px] mb-3'>Days</p>
                  <p className='font-semibold'>6 days</p>
                </div>
                <div className='h-14 w-[1px] bg-gray-300'></div>
                <div>
                  <p className='text-[#4A4C56] text-[14px] mb-3'>Location</p>
                  <p className='font-semibold'>Beijing, China</p>
                </div>
              </div>

              <div className='flex items-center  mt-10 '>
                <div className='text-[#000E19]'>
                  <p className='whitespace-nowrap'>Aug 11, 2024</p>
                </div>
                <div className='relative flex items-center w-full max-w-xs mx-4'>
                  <div className='border-t border-dashed border border-gray-300 w-full'></div>
                  <div className='absolute left-1/2 -translate-x-1/2'>
                    <span className='bg-orange-500 text-white px-3 py-2 rounded-full text-sm'>
                      6D/5N
                    </span>
                  </div>
                </div>
                <div className='text-[#000E19]'>
                  <p className='whitespace-nowrap'>Aug 16, 2024</p>
                </div>
              </div>
            </div>

            <h4 className='text-[20px] text-[#0F1416] font-bold'>
              Please Enter Contact Details
            </h4>
            <form className='flex flex-col gap-7'>
              <div className='flex flex-col'>
                <label
                  className='text-[15px] text-[#0F1416]'
                  htmlFor='mobileNumber'
                >
                  Mobile Number
                </label>
                <input
                  type='text'
                  name='mobileNumber'
                  placeholder='Enter Mobile Number'
                  className=' px-5 py-3 rounded-lg mt-3 border border-zinc-300 focus:outline-none focus:border-[#EB5B2A]'
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-[15px] text-[#0F1416]' htmlFor='address'>
                  Flat, House no., Building, Company, Apartment
                </label>
                <input
                  type='text'
                  name='address'
                  placeholder='Enter Address'
                  className='px-5 py-3 rounded-lg mt-3 border border-zinc-300 focus:outline-none focus:border-[#EB5B2A] '
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-[15px] text-[#0F1416]' htmlFor='area'>
                  Area, Colony, Street, Sector, Village
                </label>
                <input
                  type='text'
                  name='area'
                  placeholder='Enter Area'
                  className='px-5 py-3 rounded-lg mt-3 border border-zinc-300 focus:outline-none focus:border-[#EB5B2A]'
                  value={formData.area}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-[15px] text-[#0F1416]' htmlFor='country'>
                  Country
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
                      Traveler {index + 1}
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

        <div className='w-full lg:w-4/12 h-fit px-5 shadow-lg border rounded-lg py-5 sticky top-10'>
          <h1 className='border-b text-[#0F1416] text-4xl font-bold pb-5'>
            $4700{' '}
            <span className='font-normal text-lg'>
              (Inclusive of All Taxes)
            </span>
          </h1>
          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                Total Basic Cost
              </h4>
              <p className='text-base text-[#0F1416] font-normal flex items-center gap-3'>
                <span>2500</span> <span>x</span> <span>2</span> Travelers
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>$5000</h4>
          </div>
          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <div className='flex flex-col gap-2 mb-2'>
                <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                  Coupon Discount
                </h4>
                <span className='bg-[#EB5B2A] text-white px-3 py-1 rounded-2xl w-fit text-[12px]'>
                  BESTOFFER50
                </span>
              </div>
              {/* <p className='text-base font-normal flex items-center gap-3'>
                <span>2500</span> <span>x</span> <span>2</span> Travelers
              </p> */}
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>-$350</h4>
          </div>
          <div className='flex items-start mt-5 border-b pb-5 justify-between'>
            <div>
              <h4 className='text-[#0F1416] text-[16px] font-bold pb-2'>
                Fee & Taxes
              </h4>
              <p className='text-base font-normal flex items-center gap-3'>
                <span>2500</span> <span>x</span> <span>2</span> Travelers
              </p>
            </div>
            <h4 className='text-[20px] text-[#0F1416] font-bold'>+$50</h4>
          </div>
          <button className='bg-[#EB5B2A] rounded-full px-6 py-3 text-white w-full mt-4 hover:bg-[#eb5a2ada] transform duration-300 '>
            Proceed To Payments
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewPackage
