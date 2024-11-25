import React from "react";
import { useForm } from "react-hook-form";
import image from "../../assets/img/form-img/login-img.png";
import logo from '../../assets/img/form-img/logo.png';
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
    <div className='flex flex-col lg:flex-row items-center'>
        <div className=''>
            <img src={image} className='md:w-0 md:h-0 lg:h-[1024px] lg:w-[432px] xl:w-[732px] lg:rounded-r-[80px] object-cover max-h-screen' alt="" />
        </div>
        <div className="w-full xl:w-1/2 h-full p-6 md:p-0">
          <div className="max-w-xl mx-auto ">
            <img src={logo} className="w-[89px] h-12" alt="" />
          </div>
          <div className="w-full max-w-xl mx-auto  flex flex-col gap-8">
            <div className="flex flex-col gap-3 mt-8">
              <h2 className="text-[32px] font-bold text-[#101828]">Welcome back</h2>
              <p className="text-[#475467] text-base">Welcome back! Please enter your details.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="">
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
              <div className="flex justify-between py-6">
                <div className="flex gap-2">
                    <input type="checkbox" className="rounded-[4px] border border-[#D0D5DD]" />
                    <p className="text-sm text-[#344054] font-medium">Remember for 30 days</p>
                </div>
                <Link to='/forget-password' className="text-sm font-semibold text-[#EB5B2A]">Forget password</Link>
              </div>
              {/* Submit Button */}
              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  className="w-full bg-[#EB5B2A] text-white text-base font-semibold py-2 px-4 rounded-full hover:bg-[#EB5B2A] transition"
                >
                  Get started
                </button>
                <div className="flex gap-1 items-center justify-center text-sm">
                  <p className="text-[#475467]">Don’t have an account?</p>
                  <Link to='/signup' className="text-[#EB5B2A] font-semibold">Sign up</Link>
                </div>
              </div>
            </form>
          </div>
      </div>
    </div>
    </>
  );
}

export default Login