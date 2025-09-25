'use client'

import { useState } from "react";
import toast from "react-hot-toast";
import { RiCoupon3Fill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";

export default function ApplyCoupon({handleCouponCode,handleClosePoup}) {
    const [code,setCode] = useState('');

    const handleCoupon=()=>{
        if(!code){
            toast.error('Please enter a valid code.');
            return;
        }
        handleCouponCode(code);
    }
  return (
    <div className="bg-white rounded-xl p-6 flex flex-col gap-5 relative">
        <button type="button" onClick={handleClosePoup} className="absolute top-2 left-2 text-2xl text-[#EB5B2A]">
            <IoMdCloseCircle />
        </button>
      <div className="w-full flex flex-col gap-5 items-center justify-center">
        <div className="p-[11px] bg-[#f4afaf1a] rounded-full">
          <div className="p-[11px] bg-[#f4afaf33] rounded-full">
            <div className="bg-[#EB5B2A] w-16 h-16 flex items-center justify-center rounded-full text-white text-3xl">
              <RiCoupon3Fill />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[30px] w-full">
          <div className="text-center flex flex-col gap-[10px]">
            <input
              type="text"
              value={code}
              onChange={(e)=> setCode(e.target.value)}
              className="border border-orange-200 rounded-md min-w-[300px] px-2 py-2 outline-none"
              placeholder="Enter coupon code"
            />
          </div>
          <button type="button" onClick={handleCoupon} className="py-3 px-4 w-full text-center text-[#FFF] text-[16px] font-semibold bg-orange-500 rounded-full cursor-pointer">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
