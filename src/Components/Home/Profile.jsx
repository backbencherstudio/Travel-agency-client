import React from 'react';
import { useForm } from 'react-hook-form';
import { Rating, Stack } from '@mui/material'; // Ensure you have these installed
import { CalendarToday } from '@mui/icons-material'; // Material UI Calendar Icon
import avatar from '../../assets/img/avatar/avatar-3.png'; // Replace with your actual avatar path
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Correct import

const UserProfile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      profileName: 'Esther Howard',
      email: 'esther.h@demo.com',
      mobile: '(208) 555-0112',
      address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
      joinDate: '2024-03-12',
      gender: 'Male',
      dob: '1999-01-12',
    }
  });

  const onSubmit = data => {
    console.log(data);
    // Handle form submission, e.g., send data to the server
  };

  return (
    <div className="userData max-w-[1216px] mx-auto my-24 p-8 bg-[#fffdfd] rounded-3xl border-2 border-[#eaedf1]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="top grid grid-cols-12 gap-4">
          {/* User Avatar and Ratings */}
          <div className="first col-span-12 md:col-span-2 flex flex-col items-center">
            <img src={avatar} alt="User Avatar" className="w-[200px] rounded-full object-cover mb-4" />
            <h1 className="text-xl font-medium text-center mb-[3px]">Ralph Edwards</h1>
            <div className="rating flex justify-center mb-1">
              <Stack spacing={1}>
                <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
              </Stack>
            </div>
            <p className="text-sm font-normal text-center">15 Reviews</p>
          </div>

          {/* User Profile Form */}
          <div className="second md:col-span-10 col-span-12">
            <h1 className="font-semibold text-lg mb-6">User Profile</h1>
            <div className="boxes grid md:grid-cols-10 w-full md:gap-4">
              
              {/* Profile Name */}
              <div className="h-auto px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex flex-col justify-start items-start">
                <label className="text-[#a1a1a1] text-sm font-normal mb-[3px]" htmlFor="profileName">Profile Name</label>
                <input
                  id="profileName"
                  {...register('profileName', { required: "Profile Name is required" })}
                  className="w-full bg-gray-50 text-[#030b09] text-sm font-normal focus:outline-none"
                />
                {errors.profileName && <span className="text-red-500 text-xs mt-1">{errors.profileName.message}</span>}
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
                <label className="text-[#a1a1a1] text-sm font-normal mb-[3px]" htmlFor="mobile">Mobile Number</label>
                <input
                  id="mobile"
                  {...register('mobile', { required: "Mobile number is required" })}
                  className="w-full bg-gray-50 text-[#030b09] text-sm font-normal focus:outline-none"
                />
                {errors.mobile && <span className="text-red-500 text-xs mt-1">{errors.mobile.message}</span>}
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
                <label className="text-[#a1a1a1] text-sm font-normal mb-[3px]" htmlFor="dob">Date Of Birth</label>
                <input
                  id="dob"
                  type="date"
                  {...register('dob', { required: "Date of Birth is required" })}
                  className="w-full bg-gray-50 text-[#030b09] text-sm font-normal focus:outline-none pr-8 hide-native-datepicker"
                />

                {errors.dob && <span className="text-red-500 text-xs mt-1">{errors.dob.message}</span>}
              </div>

              
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#f97316] text-white rounded hover:bg-[#f17c28] transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;