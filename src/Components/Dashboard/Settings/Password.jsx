import React from 'react'
import { useForm } from 'react-hook-form'

const Password = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  // Handle form submission
  const onSubmit = data => {
    console.log('Form Data:', data)
    reset({
      companyName: '',
      email: '',
      phoneNumber: ''
    })
  }
  return (
    <div className='p-4 sm:p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-2 text-[#080613]'>
          Update Password
        </h2>
        <p className='text-[#687588] text-sm'>
          Change your password below to secure your account
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-6 text-[#1D1F2C]'
      >
        <div>
          <label className='block mb-2 font-medium'>Current Password</label>
          <input
            type='text'
            {...register('currentPassword', {
              required: 'Current Password is required'
            })}
            placeholder='Enter your Current Passworde'
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
              errors.companyName ? 'border-red-500' : ''
            }`}
          />
          {errors.companyName && (
            <span className='text-red-500 text-sm'>
              {errors.companyName.message}
            </span>
          )}
        </div>
        <div>
          <label className='block mb-2 font-medium'>New Password</label>
          <input
            type='text'
            {...register('newPassword', {
              required: 'New Password is required'
            })}
            placeholder='Enter your New Password'
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
              errors.companyName ? 'border-red-500' : ''
            }`}
          />
          {errors.companyName && (
            <span className='text-red-500 text-sm'>
              {errors.companyName.message}
            </span>
          )}
        </div>
        <div>
          <label className='block mb-2 font-medium'>Confirm Password</label>
          <input
            type='text'
            {...register('confirmPassword', {
              required: 'Confirm Password is required'
            })}
            placeholder='Enter your Confirm Password'
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
              errors.companyName ? 'border-red-500' : ''
            }`}
          />
          {errors.companyName && (
            <span className='text-red-500 text-sm'>
              {errors.companyName.message}
            </span>
          )}
        </div>

        {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block mb-2 font-medium'>Email Address</label>
            <input
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
              placeholder='Type your email'
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <span className='text-red-500 text-sm'>
                {errors.email.message}
              </span>
            )}
          </div>
        </div> */}

        <button
          type='submit'
          className='bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Password
