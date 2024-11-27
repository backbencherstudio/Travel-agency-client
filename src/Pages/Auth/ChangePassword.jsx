import React from 'react'
import { useForm } from 'react-hook-form';
import image from "../../assets/img/form-img/otp-img.png";
import logo from '../../assets/img/form-img/logo.png';
import { Link } from "react-router-dom";

const ChangePassword = () => {
    const { register, handleSubmit, watch, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

  return (
    <>
    <div className='flex flex-col lg:flex-row items-center'>
        <div className='hidden md:block'>
            <img src={image} className='md:w-0 md:h-0 lg:h-[1024px] lg:w-[432px] xl:w-[732px] lg:rounded-r-[80px] object-cover max-h-screen' alt="" />
        </div>
        <div className="w-full xl:w-1/2 h-full p-6 lg:p-0">
          <div className="max-w-xl mx-auto ">
            <img src={logo} className="w-[89px] h-12" alt="" />
          </div>
          <div className="w-full max-w-xl mx-auto  flex flex-col gap-8">
            <div className="flex flex-col gap-3 mt-8">
                <Link to='/otp' className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.5302 3.54975C15.8231 3.84264 15.8231 4.31752 15.5302 4.61041L9.01017 11.1304C8.53307 11.6075 8.53307 12.3926 9.01017 12.8697L15.5302 19.3897C15.8231 19.6826 15.8231 20.1575 15.5302 20.4504C15.2373 20.7433 14.7624 20.7433 14.4695 20.4504L7.94951 13.9304C6.88662 12.8675 6.88662 11.1326 7.94951 10.0697L14.4695 3.54975C14.7624 3.25685 15.2373 3.25685 15.5302 3.54975Z" fill="#0F1416"/>
                    </svg>
                    <p className="text-base font-medium text-[#0F1416]">Back</p>   
                </Link>
                <h2 className="text-[32px] font-bold text-[#101828]">Change Password</h2>
                <p className="text-[#475467] text-base">Add a new password</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="new-password" className="block text-sm font-medium text-[#344054]">
                  New Password*
                </label>
                <input
                  type="password"
                  id="newPassword"
                  {...register("newPassword", { required: "New password is required" })}
                  className={`mt-1 px-3 py-2 w-full border rounded-lg ${
                    errors.newPassword ? "border-red-500" : "shadow-sm"
                  }`}
                  placeholder="New Password"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#344054]">
                    Confirm Password*
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", { 
                    required: "Confirm password is required", 
                    validate: (value) => value === watch('newPassword') || "Passwords do not match" 
                  })}
                  className={`mt-1 px-3 py-2 w-full border rounded-lg ${
                    errors.confirmPassword ? "border-red-500" : "shadow-sm"
                  }`}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
              {/* Submit Button */}
              <div className="flex flex-col gap-4 py-6">
                <button
                  type="submit"
                  className="w-full bg-[#EB5B2A] text-white text-base font-semibold py-2 px-4 rounded-full hover:bg-[#EB5B2A] transition"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
      </div>
    </div>
    </>
  )
}

export default ChangePassword