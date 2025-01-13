import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import image from "../../../assets/img/form-img/login-img.png";
import logo from '../../../assets/img/form-img/logo.png';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthApis from "../../../Apis/AuthApis";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors, isLoading } } = useForm();
  const [resMessage, setResMessage] = useState();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const onSubmit = async (data) => {
    // const res = await AuthApis.login(data);
    // if (res.success) {
    //   // console.log('res', res)
    //   localStorage.token = res.authorization.token;
    //     // window.location.reload();
    //     toast.success(res.message)
    //     navigate('/')
    //   } else {
    //     console.log('res', res)
    //     toast.error(res.message.message)
    //     setResMessage(res);
    //     setTimeout(() => {
    //         setResMessage('');
    //     }, 5000);
    // }
     try {
      await login({
        email: data.email,
        password: data.password
      })
      // toast.success('Loging Successful.');
      const role = localStorage.getItem('role');
      // console.log('token', token)
      setTimeout(() => {
        if (role === 'admin') {
          navigate('/dashboard')
        } else {
          navigate('/');
        }
      }, 500);
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      toast.error('Login failed. Please try again.');
    } 
  };

  return (
    <>
    <div className='my-24 xl:my-40'>
        {/* <div className='hidden md:block'>
            <img src={image} className='md:w-0 md:h-0 lg:h-[1024px] lg:w-[432px] xl:w-[732px] lg:rounded-r-[80px] object-cover max-h-screen' alt="" />
        </div> */}
        <div className="w-full h-full p-6 md:p-0">
          <div className="max-w-xl mx-auto ">
            <Link to="/">
              <img src={logo} className="w-[89px] h-12" alt="" />
            </Link>
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
              {resMessage && resMessage.message.statusCode === 401 && (
                  <p className="text-red-500 mb-4">{resMessage.message.message}</p>
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

export default AdminLogin