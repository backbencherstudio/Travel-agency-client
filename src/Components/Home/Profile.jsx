import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Modal, Rating, Stack } from '@mui/material'; // Ensure you have these installed
import { CalendarToday } from '@mui/icons-material'; // Material UI Calendar Icon
import avatar from '../../assets/img/avatar/avatar-3.png'; // Replace with your actual avatar path
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Correct import
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import AuthApis from '../../Apis/AuthApis';
import moment from 'moment/moment';
import EmailVerifyOtp from '../ChangeEmail/EmailVerifyOtp';
import EmailChangeApis from '../../Apis/EmailChangeApis';
import Loading from '../../Shared/Loading';
import Swal from 'sweetalert2';
import AccountConvertApis from '../../Apis/clientApi/AccountConvertApis';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState();
  const [avatar, setAvatar] = useState();
  const [newEmail, setNewEmail] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [apiLoading, setApiapiLoading] = useState(false);
  const { user, loading, fetchUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValue('name', user?.name);
      setValue('email', user?.email);
      setValue('phone_number', user?.phone_number);
      setValue('address', user?.address);
      setValue('gender', user?.gender);
      setValue('date_of_birth', moment(user?.date_of_birth).format('YYYY-MM-DD'));
      setAvatar(user?.avatar_url);
    }
  }, [user])

  const onSubmit = async (data) => {
    console.log(data);
    setApiapiLoading(true);
    setNewEmail(data?.email);
    const form = new FormData();
    form.append('image', imageFile);
    Object.keys(data).forEach((key) => {
      form.append(key, data[key]);
    });
    const res = await AuthApis.update(form);
    if (res?.success) {
      setApiapiLoading(false);
      if (data?.email !== user?.email) {
        const sendOtpRes = await EmailChangeApis.send({email: data?.email})
        if (sendOtpRes?.success) {
          setIsModalOpen(true);
        }
      }
    }
    // Handle form submission, e.g., send data to the server
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      setImageFile(file);
    }
  }

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleVendorConvert = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to convert your account to vendor',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, convert it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await AccountConvertApis.convertToVendor();
        if (res?.success) {
          fetchUserInfo();
          Swal.fire({
            title: 'Success',
            text: 'Your account has been converted to vendor',
            icon: 'success'
          })
          setTimeout(() => {
            navigate('/dashboard')
          }, 500)
        }
      }
    })
  }

  console.log('imageFile', imageFile)
  console.log('NewEmail', newEmail)

  return (
    <div className="max-w-[1216px] mx-auto my-24 p-8 bg-[#fffdfd] rounded-3xl border-2 border-[#eaedf1]">
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="top grid grid-cols-12 gap-4">
            {/* User Avatar and Ratings */}
            <div className="first col-span-12 md:col-span-2 flex flex-col items-center">
              <div className="flex flex-col items-center">
                <label htmlFor="fileInput" className="cursor-pointer">
                  <img
                    src={avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} // Placeholder for default image
                    alt="User Avatar"
                    className="w-52 h-52 md:h-28 lg:h-36 xl:h-44 rounded-full object-cover mb-4"
                  />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden" // Hide the input element
                />
              </div>
              <input
                id="name"
                {...register('name', { required: "Name is required" })}
                className="w-full text-sm font-medium text-center mb-[3px] focus:outline-none bg-transparent" disabled
              />
              {/* <h1 className="text-xl font-medium text-center mb-[3px]">Ralph Edwards</h1> */}
              {/* <div className="rating flex justify-center mb-1">
                <Stack spacing={1}>
                  <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                </Stack>
              </div>
              <p className="text-sm font-normal text-center">15 Reviews</p> */}
            </div>

            {/* User Profile Form */}
            <div className="second md:col-span-10 col-span-12">
              <h1 className="font-semibold text-lg mb-6">User Profile</h1>
              <div className="boxes grid md:grid-cols-10 w-full md:gap-4">
                
                {/* Profile Name */}
                <div className="h-auto px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex flex-col justify-start items-start">
                  <label className="text-[#a1a1a1] text-sm font-normal mb-[3px]" htmlFor="name">Profile Name</label>
                  <input
                    id="name"
                    {...register('name', { required: "Name is required" })}
                    className="w-full bg-gray-50 text-[#030b09] text-sm font-normal focus:outline-none"
                  />
                  {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                </div>
                
                {/* Email Address */}
                <div className="h-auto px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex flex-col justify-start items-start">
                  <label className="text-[#a1a1a1] text-sm font-normal mb-[3px]" htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Invalid email address"
                      }
                    })}
                    className="w-full bg-gray-50 text-[#030b09] text-sm font-normal focus:outline-none"
                  />
                  {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                </div>
                
                {/* Mobile Number */}
                <div className="h-auto px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex flex-col justify-start items-start">
                  <label className="text-[#a1a1a1] text-sm font-normal mb-[3px]" htmlFor="phone_number">Mobile Number</label>
                  <input
                  type='phone'
                    id="phone_number"
                    {...register('phone_number', { required: "Mobile number is required" })}
                    className="w-full bg-gray-50 text-[#030b09] text-sm font-normal focus:outline-none"
                  />
                  {errors.phone_number && <span className="text-red-500 text-xs mt-1">{errors.phone_number.message}</span>}
                </div>
                
                {/* Address */}
                <div className="h-auto px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex flex-col justify-start items-start">
                  <label className="text-[#a1a1a1] text-sm font-normal mb-[3px]" htmlFor="address">Address</label>
                  <input
                    id="address"
                    {...register('address', { required: "Address is required" })}
                    className="w-full bg-gray-50 text-[#030b09] text-sm font-normal focus:outline-none"
                  />
                  {errors.address && <span className="text-red-500 text-xs mt-1">{errors.address.message}</span>}
                </div>
                
                {/* Join Date (Non-Editable) */}
                <div className="h-auto px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-3 w-full flex flex-col justify-start items-start">
                  <label className="text-[#a1a1a1] text-sm font-normal mb-[3px]">Join Date</label>
                  <p className="text-[#030b09] text-sm font-normal">12 March 2024</p>
                </div>
                
                {/* Gender */}
                <div className="h-auto px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-4 w-full flex flex-col justify-start items-start">
                  <label className="text-[#a1a1a1] text-sm font-normal mb-[3px]" htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    {...register('gender', { required: "Gender is required" })}
                    className="w-full bg-gray-50 text-[#030b09] text-sm font-normal focus:outline-none"
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <span className="text-red-500 text-xs mt-1">{errors.gender.message}</span>}
                </div>
                
                {/* Date Of Birth (Editable with Calendar Icon) */}
                <div className="h-auto px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-3 w-full flex flex-col justify-start items-start relative">
                  <label className="text-[#a1a1a1] text-sm font-normal mb-[3px]" htmlFor="date_of_birth">Date Of Birth</label>
                  <input
                    id="date_of_birth"
                    type="date"
                    {...register('date_of_birth', { required: "Date of Birth is required" })}
                    className="w-full bg-gray-50 text-[#030b09] text-sm font-normal focus:outline-none pr-8"
                  />

                  {errors.date_of_birth && <span className="text-red-500 text-xs mt-1">{errors.date_of_birth.message}</span>}
                </div>

                
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#f97316] text-white rounded hover:bg-[#f17c28] transition"
                >
                  {apiLoading ? 'apiLoading...' : 'Update Profile'}
                </button>
              </div>
              {user?.type !== 'vendor' && (
                <div className='flex flex-col justify-center items-center gap-2 mt-8'>
                  <p>Do you want to be a vendor?</p>
                  <button onClick={handleVendorConvert} className='flex flex-row items-center gap-2 text-sm font-normal bg-orange-500 text-white px-4 py-2 rounded-md'>
                    Convert your account to Vendor
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      )}
      <Modal open={isModalOpen} onClose={handleModalToggle}>
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
          <EmailVerifyOtp email={newEmail} setIsModalOpen={setIsModalOpen} />
        </Box>
      </Modal>
    </div>
  );
};

export default UserProfile;