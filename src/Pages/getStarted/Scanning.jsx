import React from "react";
import image from "../../assets/getStarted/getStarted.png";
import logo from '../../assets/img/form-img/logo.png';
import qrCode from '../../assets/getStarted/qr-code.png'
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Scanning = () => {
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
              Scan QR Code to Verify on Mobile
              </h2>
              <p className="text-[#475467] text-base">Scan this QR code with your mobile device to complete verification</p>
            </div>

            <div className=" flex flex-col items-center justify-center">
                <img src={qrCode} alt="qr-code" />
                <p className=" text-[#475467] text-base mt-6">Scan with your mobile device's camera</p>
            </div>
 
            {/* Form UI only */}
            <div>
              
              <div className="flex flex-col gap-4">
                <Link to='/'>
                <button
                  type="button"
                  className="w-full bg-[#EB5B2A] text-white text-base font-semibold py-2 px-4 rounded-full hover:bg-[#EB5B2A] transition"
                >
                 Continue
                </button>
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scanning;
