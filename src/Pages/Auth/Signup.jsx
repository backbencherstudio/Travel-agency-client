import React, { useState } from "react";
import { useForm } from "react-hook-form";
import image from "../../assets/img/form-img/signup-img.png";
import logo from '../../assets/img/form-img/logo.png';
import { Link, useNavigate } from "react-router-dom";
import AuthApis from "../../Apis/AuthApis";
import { toast } from "react-toastify";

const Signup = () => {
  const { register, handleSubmit, formState: { errors, isLoading } } = useForm();
  const [resMessage, setResMessage] = useState();
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
      console.log('data', data)
      const res = await AuthApis.save(data);
      console.log('res', res)
      if (res.success) {
        toast.success(res.message);
        navigate(`/otp/${data.email}`)
      } else {
        setResMessage(res);
        toast.error(res.message.message[0]);
        setTimeout(() => {
          setResMessage();
        }, 4000)
      }
  };

  return (
    <>
    <div className='flex flex-col lg:flex-row items-center'>
        <div className='hidden md:block'>
            <img src={image} className='md:w-0 md:h-0 lg:h-[1024px] lg:w-[432px] xl:w-[732px] lg:rounded-r-[80px] object-cover max-h-screen' alt="" />
        </div>
        <div className="w-full xl:w-1/2 h-full p-6 md:p-0">
          <div className="max-w-xl mx-auto ">
            <img src={logo} className="w-[89px] h-12" alt="" />
          </div>
          <div className="w-full max-w-xl mx-auto  flex flex-col gap-8">
            <div className="flex flex-col gap-3 mt-8">
              <h2 className="text-[32px] font-bold text-[#101828]">Create New Account</h2>
              <p className="text-[#475467] text-base">Please enter details</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-[#344054]">
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  className={`mt-1 px-3 py-2 w-full border rounded-lg ${
                    errors.name ? "border-red-500" : "shadow-sm"
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#344054]">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: "Email is required" })}
                  className={`mt-1 px-3 py-2 w-full border rounded-lg ${
                    errors.email ? "border-red-500" : "shadow-sm"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-[#344054]">
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", { required: "Password is required" })}
                  className={`mt-1 px-3 py-2 w-full border rounded-lg ${
                    errors.password ? "border-red-500" : "shadow-sm"
                  }`}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>
              
              {resMessage && resMessage.statusCode === 401 && (
                  <p className="text-red-500 mb-4">{resMessage.message}</p>
              )}
              {/* Submit Button */}
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className="w-full bg-[#EB5B2A] text-white text-base font-semibold py-2 px-4 rounded-full hover:bg-[#EB5B2A] transition"
                >
                  {isLoading ? 'Get started...' : 'Get started'}
                </button>
                <div className="flex gap-1 items-center justify-center text-sm">
                  <p className="text-[#475467]">Already have an account?</p>
                  <Link to="/login" className="text-[#EB5B2A] font-semibold">Log in</Link>
                </div>
              </div>
            </form>
          </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
