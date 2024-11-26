import React, { useRef, useState, useEffect } from "react";
import image from "../../assets/img/form-img/otp-img.png";
import logo from "../../assets/img/form-img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import SuccessPopup from "../../Components/Auth/SuccessPopUp";
import { useDispatch, useSelector } from "react-redux";
import { conformRegisterOtp } from "../../features/auth/authSlice";

const SignupOTP = () => {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [isPopupVisible, setPopupVisible] = useState(false);
    const inputRefs = useRef([]);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { signupLoading, signupError } = useSelector(
        (state) => state.authorization
    );

    // Handle change for each input
    const handleChange = (e, index) => {
        const { value } = e.target;

        if (/^\d$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        } else if (value === "") {

            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        }
    };


    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };


    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        const newOtp = [...otp];

        pastedData.split("").forEach((char, idx) => {
            if (/^\d$/.test(char)) {
                newOtp[idx] = char;
            }
        });

        setOtp(newOtp);


        const nextIndex = pastedData.length < 6 ? pastedData.length : 5;
        inputRefs.current[nextIndex]?.focus();
    };


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const otpValue = otp.join("");
            // setPopupVisible(true);
             
            console.log("Submitted OTP:", typeof (otpValue));

            const responce = await dispatch(conformRegisterOtp(otpValue));
            console.log(responce)
            // if (responce?.payload?.otp === "success") {
            //     navigate('/signupotp')
            // }
        } catch (error) {
            console.log(error)
        }
    };

    console.log(signupLoading, signupError)

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);



    return (
        <>
            <div className="flex flex-col lg:flex-row items-center">
                <div>
                    <img
                        src={image}
                        className="md:w-0 md:h-0 lg:h-[1024px] lg:w-[432px] xl:w-[732px] lg:rounded-r-[80px] object-cover max-h-screen"
                        alt=""
                    />
                </div>
                <div className="w-full xl:w-1/2 h-full p-6 md:p-0">
                    <div className="max-w-xl mx-auto">
                        <img src={logo} className="w-[89px] h-12" alt="" />
                    </div>
                    <div className="w-full max-w-xl mx-auto flex flex-col gap-8">
                        <div className="flex flex-col gap-3 mt-8">
                            <Link to="/forget-password" className="flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.5302 3.54975C15.8231 3.84264 15.8231 4.31752 15.5302 4.61041L9.01017 11.1304C8.53307 11.6075 8.53307 12.3926 9.01017 12.8697L15.5302 19.3897C15.8231 19.6826 15.8231 20.1575 15.5302 20.4504C15.2373 20.7433 14.7624 20.7433 14.4695 20.4504L7.94951 13.9304C6.88662 12.8675 6.88662 11.1326 7.94951 10.0697L14.4695 3.54975C14.7624 3.25685 15.2373 3.25685 15.5302 3.54975Z"
                                        fill="#0F1416"
                                    />
                                </svg>
                                <p className="text-base font-medium text-[#0F1416]">Back</p>
                            </Link>
                            <h2 className="text-[32px] font-bold text-[#101828]">Enter OTP</h2>

                            {
                                signupError && <h1 className="text-[red] text-[50px] ">{signupError} </h1>
                            }
                            {
                                signupLoading && <h1 className="text-[red] text-[50px] ">Loading... </h1>
                            }
                            <p className="text-[#475467] text-base">
                                We have shared a code on your registered email address napit.shill@example.com
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex justify-between gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        autoFocus={false}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                        className={`w-12 h-12 text-center text-lg font-semibold border rounded-md transition focus:ring-[#35AFF4] border-gray-300 ${digit ? "border-[#35AFF4]" : ""
                                            }`}
                                    />
                                ))}
                            </div>

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
            <SuccessPopup show={isPopupVisible} onClose={() => setPopupVisible(false)} />
        </>
    );
};

export default SignupOTP;
