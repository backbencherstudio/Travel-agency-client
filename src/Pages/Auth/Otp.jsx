import React, { useState } from "react";
import { useForm } from "react-hook-form";
import image from "../../assets/img/form-img/otp-img.png";
import logo from '../../assets/img/form-img/logo.png';
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import SuccessPopup from "../../Components/Auth/SuccessPopUp";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";

const Otp = () => {
    const { register, handleSubmit, setFocus, formState: { errors } } = useForm();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [verifyData, setVerifyData] = useState({});
    const { email } = useParams();
    const location = useLocation();

    const getQueryParams = () => {
        const searchParams = new URLSearchParams(location.search);
        return Object.fromEntries(searchParams.entries());
    };

    const queryParams = getQueryParams();
    console.log('queryParams', queryParams.changePassword)
    console.log('email', email)
    const onSubmit = async (data) => {
        const otp = Object.values(data).join('');
        setVerifyData({ otp: otp, email: email });
        console.log("Entered OTP:", otp);
        const res = await axiosClient.post(`/api/auth/verify-email`, {email: email, token: otp})
        if (res.success) {
            toast.success(res.message.message);
        }
        setPopupVisible(true);
    };
    console.log('verifyData', verifyData)
    const handleKeyUp = (e, index) => {
        if (e.target.value.length === 1 && index < 5) {
            setFocus(`otp${index + 1}`);
        }
    };

    return (
        <>
            <div className='flex flex-col lg:flex-row items-center'>
                <div className="hidden md:block">
                    <img src={image} className='md:w-0 md:h-0 lg:h-[1024px] lg:w-[432px] xl:w-[732px] lg:rounded-r-[80px] object-cover max-h-screen' alt="" />
                </div>
                <div className="w-full xl:w-1/2 h-full p-6 md:p-0">
                    <div className="max-w-xl mx-auto">
                        <img src={logo} className="w-[89px] h-12" alt="" />
                    </div>
                    <div className="w-full max-w-xl mx-auto flex flex-col gap-8">
                        <div className="flex flex-col gap-3 mt-8">
                            <Link to='/forget-password' className="flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.5302 3.54975C15.8231 3.84264 15.8231 4.31752 15.5302 4.61041L9.01017 11.1304C8.53307 11.6075 8.53307 12.3926 9.01017 12.8697L15.5302 19.3897C15.8231 19.6826 15.8231 20.1575 15.5302 20.4504C15.2373 20.7433 14.7624 20.7433 14.4695 20.4504L7.94951 13.9304C6.88662 12.8675 6.88662 11.1326 7.94951 10.0697L14.4695 3.54975C14.7624 3.25685 15.2373 3.25685 15.5302 3.54975Z" fill="#0F1416"/>
                                </svg>
                                <p className="text-base font-medium text-[#0F1416]">Back</p>   
                            </Link>
                            <h2 className="text-[32px] font-bold text-[#101828]">Enter OTP</h2>
                            <p className="text-[#475467] text-base">We have shared a code on your registered email address napit.shill@example.com</p>
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
                                Verify OTP
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <SuccessPopup show={isPopupVisible} onClose={() => setPopupVisible(false)} queryParams={queryParams} verifyData={verifyData} />
        </>
    );
};

export default Otp;
