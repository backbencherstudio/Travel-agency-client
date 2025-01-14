import  { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa' 
import { AuthContext } from '../../../AuthProvider/AuthProvider'

const Password = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm()
  const { changePassword } = useContext(AuthContext);

  // Separate states for toggling visibility of Current and New Password
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Handle form submission
  const onSubmit = data => {
    console.log('Form Data:', data)
    changePassword(data);
    reset() // Clear the form after successful submission
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
        {/* Current Password */}
        <div>
          <label className='block mb-2 font-medium'>Current Password</label>
          <div className='relative'>
            <input
              type={showCurrentPassword ? 'text' : 'password'} 
              {...register('old_password', {
                required: 'Current Password is required'
              })}
              placeholder='Enter your Current Password'
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                errors.old_password ? 'border-red-500' : ''
              }`}
            />
            <span
              className='absolute right-3 top-3 cursor-pointer'
              onClick={() => setShowCurrentPassword(!showCurrentPassword)} 
            >
              {showCurrentPassword ? (
                <FaEyeSlash className='text-[#EB5B2A]' />
              ) : (
                <FaEye className='text-[#EB5B2A]' />
              )}
            </span>
          </div>
          {errors.currentPassword && (
            <span className='text-red-500 text-sm'>
              {errors.currentPassword.message}
            </span>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className='block mb-2 font-medium'>New Password</label>
          <div className='relative'>
            <input
              type={showNewPassword ? 'text' : 'password'} 
              {...register('new_password', {
                required: 'New Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long'
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message:
                    'Password must contain at least one letter, one number, and one special character'
                }
              })}
              placeholder='Enter your New Password'
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                errors.new_password ? 'border-red-500' : ''
              }`}
            />
            <span
              className='absolute right-3 top-3 cursor-pointer'
              onClick={() => setShowNewPassword(!showNewPassword)} // Toggle password visibility for new password
            >
              {showNewPassword ? (
                <FaEyeSlash className='text-[#EB5B2A]' />
              ) : (
                <FaEye className='text-[#EB5B2A]' />
              )}
            </span>
          </div>
          {errors.newPassword && (
            <span className='text-red-500 text-sm'>
              {errors.newPassword.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className='block mb-2 font-medium'>Confirm Password</label>
          <div className='relative'>
            <input
              type={showConfirmPassword ? 'text' : 'password'} // Toggle visibility
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: value =>
                  value === watch('new_password') || 'Passwords do not match'
              })}
              placeholder='Enter your Confirm Password'
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
            />
            <span
              className='absolute right-3 top-3 cursor-pointer'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
            >
              {showConfirmPassword ? (
                <FaEyeSlash className='text-[#EB5B2A]' />
              ) : (
                <FaEye className='text-[#EB5B2A]' />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <span className='text-red-500 text-sm'>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button
          type='submit'
          className='bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors'
        >
          Update Password
        </button>
      </form>
    </div>
  )
}

export default Password
