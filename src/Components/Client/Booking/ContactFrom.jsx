import React from 'react'

const ContactFrom = () => {
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
