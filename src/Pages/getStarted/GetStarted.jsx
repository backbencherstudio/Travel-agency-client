import React from "react";
import image from "../../assets/getStarted/getStarted.png";
import logo from '../../assets/img/form-img/logo.png';
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const GetStarted = () => {
  const location = useLocation();
  const isVendor = location.pathname === '/become-a-vendor';

  return (
    <>
      <div className='flex flex-col lg:flex-row items-center'>
        <Helmet>
          <title>Around 360 - Get Started</title>
        </Helmet>

        {/* Left Image */}
        <div className='hidden md:block'>
          <img
            src={image}
            className='md:w-0 md:h-0 lg:h-[1024px] lg:w-[432px] xl:w-[732px] lg:rounded-r-[80px] object-cover max-h-screen'
            alt=""
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full xl:w-1/2 h-full p-6 md:p-0">
          <div className="max-w-xl mx-auto">
            <img src={logo} className="w-[89px] h-12" alt="" />
          </div>

          <div className="w-full max-w-xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-3 mt-8">
              <h2 className="text-[32px] font-bold text-[#101828]">
               Identity verification
              </h2>
              <p className="text-[#475467] text-base">How to verify your identity to keep the account safe for everyone:</p>
            </div>
 <div className="flex flex-row gap-6 mt-8">
              {/* Vertical Line & Circles */}
              <div className="flex flex-col items-center relative">
                {/* Line */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-1 h-[90%]   bg-[#EB5B2A] z-0"></div>
                {/* Step 1 */}
                <div className="relative z-10 top-2">
                  <div className="w-4 h-4 rounded-full border border-[#EB5B2A] bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="h-12"></div>
                {/* Step 2 */}
                <div className="relative z-10 top-[84px]">
                  <div className="w-4 h-4 rounded-full border border-[#EB5B2A] bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="h-12"></div>
                {/* Step 3 */}
                <div className="relative z-10 top-[136px]">
                  <div className="w-4 h-4 rounded-full border border-[#EB5B2A] bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
              </div>
              {/* Step Content */}
              <div className="flex flex-col gap-12">
                {/* Step 1 */}
                <div>
                  <h3 className="text-[#344054] text-lg font-medium  ">Show us a government-issued photo ID</h3>
                  <p className="text-[#667085] text-base mt-1">
                    We’ll check that the country where your ID is from matches the country in your profile.
                  </p>
                </div>
                {/* Step 2 */}
                <div>
                  <h3 className="text-[#344054] text-lg font-medium  ">Appear on camera</h3>
                  <p className="text-[#667085] text-base mt-1">
                    To show us it’s really you, take an automatic selfie or join a video chat.
                  </p>
                </div>
                {/* Step 3 */}
                <div>
                  <h3 className="text-[#344054] text-lg font-medium  ">Submit for identity review</h3>
                  <p className="text-[#667085] text-base mt-1">
                    If we can’t instantly verify you, we’ll start a manual review process.
                  </p>
                </div>
              </div>
            </div>
            {/* Form UI only */}
            <form>
              {/* Name Field */}
              {/* <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-[#344054]">
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 px-3 py-2 w-full border rounded-lg shadow-sm"
                  placeholder="Enter your name"
                />
              </div> */}

              {/* Email Field */}
              {/* <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-[#344054]">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 px-3 py-2 w-full border rounded-lg shadow-sm"
                  placeholder="Enter your email"
                />
              </div> */}

              {/* Password Field */}
              {/* <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-[#344054]">
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 px-3 py-2 w-full border rounded-lg shadow-sm"
                  placeholder="Create a password"
                />
              </div> */}

              {/* Submit Button and Link */}
              <div className="flex flex-col gap-4">
                <Link to='/scanner'>
                <button
                  type="button"
                  className="w-full bg-[#EB5B2A] text-white text-base font-semibold py-2 px-4 rounded-full hover:bg-[#EB5B2A] transition"
                >
                  Get started
                </button>

                </Link>
                <div className=" text-sm">
                  <p className="text-[#475467]">We encrypt your data and will securely share it With our Id verification partner.</p>
                  <Link to="#" className="text-[#EB5B2A] font-semibold"> Privacy Policy</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
