import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiImageOn } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import WebsiteInfoApis from '../../../Apis/WebsiteInfoApis';
import AuthApis from '../../../Apis/AuthApis';
import EmailVerifyOtp from '../../ChangeEmail/EmailVerifyOtp';
import { Box, Modal } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const CompanyInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm()
  const { user } = useContext(AuthContext);
  const [newFile, setNewFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [loading, setLoading] = useState(true)
  // const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const res = await WebsiteInfoApis.get();
    console.log('res', res)
    if (res?.success) {
      setValue('name', res?.data?.name);
      setValue('email', res?.data?.email);
      setValue('phone_number', res?.data?.phone_number);
      setValue('address', res?.data?.address);
      setValue('logo', res?.data?.logo);
      setImagePreview(res?.data?.logo_url)
    }
  }

  // Handle image upload
  const handleImageUpload = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setNewFile(file)
        setImageError(false)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle image deletion (clear the selected image)
  const handleImageDelete = () => {
    setImagePreview(null)
    setValue('logo', null)
  }

  // Handle form submission
  const onSubmit = async (data) => {
    if (!imagePreview) {
      setImageError(true)
      return
    }
    const form = new FormData();
    form.append('logo', newFile);
    // form.append('logo', newFile);
     // Append other data fields to FormData
    Object.keys(data).forEach((key) => {
      form.append(key, data[key]);
    });

    console.log('FormData Entries:');
    for (let pair of form.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
    if (user?.type === 'admin') {
      const res = await WebsiteInfoApis.save(form);
      if (res?.success) {
        setLoading(false);
        // Reset form after submission
        reset()
        setImagePreview(null)
        setImageError(false)
        fetchData();
      }
    } else {
      const res = await AuthApis.update(form);
      if (res?.success) {
        setLoading(false);
        // Reset form after submission
        reset()
        setImagePreview(null)
        setImageError(false)
        fetchData();
      }

    }
  }

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className='flex-1 p-6'>
       <Helmet>
        <title>Around 360 - Company Info</title>
      </Helmet>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold mb-2 text-[#080613]'>
          Manage Company Information
        </h2>
        <p className='text-[#687588] text-sm'>
          Update Your Company's Information Here
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-6 text-[#1D1F2C]'
      >
        <div>
          <label className='block mb-2 font-medium'>Company Name</label>
          <input
            type='text'
            {...register('name', {
              required: 'Name is required'
            })}
            placeholder='Enter name'
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
              errors.name ? 'border-red-500' : ''
            }`}
          />
          {errors.name && (
            <span className='text-red-500 text-sm'>
              {errors.name.message}
            </span>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
          <div>
            <label className='block mb-2 font-medium'>Phone Number</label>
            <input
              type='tel'
              {...register('phone_number', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: 'Phone number must be 10 or 11 digits'
                }
              })}
              placeholder='Enter your phone number'
              onInput={e => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '')
              }}
              className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                errors.phone_number ? 'border-red-500' : ''
              }`}
            />
            {errors.phone_number && (
              <span className='text-red-500 text-sm'>
                {errors.phone_number.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className='block mb-2 font-medium'>Address</label>
          <input
            type='text'
            {...register('address', { required: 'Address is required' })}
            placeholder='Type your address'
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
              errors.address ? 'border-red-500' : ''
            }`}
          />
          {errors.address && (
            <span className='text-red-500 text-sm'>
              {errors.address.message}
            </span>
          )}
        </div>

        <div>
          <label className='block mb-2 font-medium'>Upload {user?.type === 'admin' ? 'logo' : 'Image'}</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='hidden'
            id='logoUpload'
          />
          <label
            htmlFor='logoUpload'
            className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-400 transition-colors block'
          >
            {imagePreview ? (
              <div className='flex flex-col items-center gap-2'>
                <div className='relative'>
                  <img
                    src={imagePreview}
                    alt={imagePreview}
                    className='w-32 h-32 object-contain'
                  />
                  <button
                    type='button'
                    onClick={handleImageDelete}
                    className='absolute top-0 right-0 text-red-500'
                  >
                    <IoMdClose size={20} />
                  </button>
                </div>
                <span className='text-sm text-gray-500'>
                  Click to change {user?.type === 'admin' ? 'logo' : 'image'}
                </span>
              </div>
            ) : (
              <p className='flex justify-center gap-2 items-center'>
                <CiImageOn className='text-xl' />
                <span className='text-gray-500'>Choose file</span>
              </p>
            )}
          </label>
          {imageError && (
            <span className='text-red-500 text-sm'>Please upload a {user?.type === 'admin' ? 'logo' : 'image'}</span>
          )}
        </div>

        <button
          type='submit'
          className='bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors'
        >
          Submit
        </button>
      </form>
      {/* <Modal open={isModalOpen} onClose={handleModalToggle}>
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            p: 4,
            mx: 'auto',
            my: '10%',
            borderRadius: 2,
            boxShadow: 24,
            outline: 'none',
          }}
        >
          <EmailVerifyOtp />
        </Box>
      </Modal> */}
    </div>
  )
}

export default CompanyInfo
