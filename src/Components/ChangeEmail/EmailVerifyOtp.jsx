import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SuccessPopup from "../../Components/Auth/SuccessPopUp";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";

const EmailVerifyOtp = ({ email, setIsModalOpen }) => {
    const { register, handleSubmit, setFocus, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);

    // console.log('email', email)
    const onSubmit = async (data) => {
        const otp = Object.values(data).join('');
        // console.log("Entered OTP:", otp);
        const res = await axiosClient.post(`/api/auth/change-email`, {email: email, token: otp})
        // console.log('res', res)
        if (res?.data?.success) {
            toast.success(res?.data?.message);
            setIsModalOpen(false);
        }
        // setPopupVisible(true);
    };
    
    const handleKeyUp = (e, index) => {
        if (e.target.value.length === 1 && index < 5) {
            setFocus(`otp${index + 1}`);
        }
    };
  return (
    <div>
        <div className='flex flex-col'>
            <div className="w-full h-full">
                <div className="w-full flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-[32px] font-bold text-[#101828]">Enter OTP</h2>
                        <p className="text-[#475467] text-base">We have send an otp in your email<span className="text-xs">({email})</span>. Enter the otp to verify the new email</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                        <div className="flex justify-between gap-2">
                            {[...Array(6)].map((_, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    maxLength="1"
                                    {...register(`otp${index}`, { required: true })}
                                    onKeyUp={(e) => handleKeyUp(e, index)}
                                    className={`w-12 h-12 text-center text-lg font-semibold border rounded-md focus:ring-2 focus:ring-blue-500 ${
                                        errors[`otp${index}`] ? "border-red-500" : "border-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                        {Object.keys(errors).length > 0 && (
                            <p className="text-red-500 text-sm">All OTP fields are required.</p>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-[#EB5B2A] text-white text-base font-semibold py-2 px-4 rounded-full hover:bg-[#EB5B2A] transition"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmailVerifyOtp