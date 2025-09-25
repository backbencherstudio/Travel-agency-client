import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Confetti from "react-confetti";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import PackageDetails from "../../Components/Client/Booking/PackageDetails";
import AddTravellers from "~/Components/Client/Booking/AddTravellers";
import ContactFrom from "../../Components/Client/Booking/ContactFrom";
import Loading from "../../Shared/Loading";
import ConfirmBooking from "../../Components/Client/Booking/ConfirmBooking";
import { useBookingContext } from "~/Context/BookingContext/BookingContext";
import { UserServices } from "~/userServices/user.services";
import { useNavigate } from "react-router-dom";
import ApplyCoupon from "~/Components/Client/Booking/ApplyCoupon";

function ContactInfo() {
  const router = useNavigate();
  const { bookingDetails, updateBooking } = useBookingContext();
  const [travellers, setTravellers] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [travellersType, setTravellersType] = useState({});
  const [applyCouponPopup, setApplyCouponPopup] =
    useState(false);
  const [couponCode,setCouponCode] = useState('');
  const { id } = useParams();
  const {
    formState: { errors },
  } = useForm();
  const [coupon, setCoupon] = useState({
    id: null,
    code: "",
    name: "",
    amount: "",
    amount_type: "",
    discount_amount: 0,
  });

  const handleCouponCode = (code) =>{
    setCouponCode(code);
    setApplyCouponPopup(false);
    handleApplyCoupon();
  }

  // Update traveller state
  const handleTravellers = useCallback((data) => {
    setTravellers((prev) => [
      ...prev,
      { name: data?.name, age: data?.age, type: data?.type?.value },
    ]);
    setTravellersType((prev) => {
      const updated = { ...prev };
      updated[data?.type?.value] = (updated[data?.type?.value] || 0) - 1;
      return updated;
    });
  }, []);

  // Set travellers type when booking details change
  useEffect(() => {
    setTravellersType(bookingDetails?.memberType);
  }, [bookingDetails]);


  const handleApplyCoupon = async () => {
    try {
      const res = await UserServices?.applyCoupon(
        { code: couponCode },
        bookingDetails?.checkoutId
      );
      if (res?.success) {
        updateBooking("final_price", res?.data?.final_price);
        updateBooking("discount_amount", res?.data?.discount_amount);
        setCoupon(res?.data?.applied_coupons[0]);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
      if(bookingDetails && !bookingDetails?.package?.id){
        router('/tours')
      }
    },[bookingDetails])

  return (
    <div className="max-w-[1216px] mx-auto my-10 px-4 xl:px-0">
      <Toaster position="top-right" />
      <Helmet>
        <title>Around 360 - Review Package</title>
      </Helmet>
      {showConfetti && (
        <div className="fixed inset-0 z-50">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <div className="flex flex-col-reverse lg:flex-row justify-between gap-10">
          <div className="flex flex-col gap-10">
            <ContactFrom
              packageData={bookingDetails?.package}
              setIsProcessing={()=>setIsProcessing(prev => !prev)}
              onFormSubmit={(data) => {
                updateBooking("contactInfo", data);
                router('/payment-method')
                setIsProcessing(false);
              }}
            />
        </div>

        <div className="w-full lg:w-4/12 h-fit px-6 lg:shadow-gray-200 lg:shadow-xl border rounded-lg py-5 lg:sticky top-[90px]">
          <div className="flex lg:flex-col justify-between items-center gap-4 lg:gap-2 border-b lg:pb-5">
            <h1 className=" text-[#0F1416] text-4xl font-bold pb-5 lg:pb-0">
              ${bookingDetails?.package?.price}{" "}
              <span className="font-normal text-[16px]">
                (Inclusive of All Taxes)
              </span>
            </h1>

            {!coupon?.id && (
              <button
                type="button"
                className="flex gap-2 items-center justify-center px-3 py-2 bg-[#EB5B2A] rounded-full text-white text-base font-medium lg:w-full"
                onClick={()=> setApplyCouponPopup(prev => !prev)}
              >
                Apply coupon
              </button>
            )}
          </div>

          <div className="flex items-start mt-5 border-b pb-5 justify-between">
            <div>
              <h4 className="text-[#0F1416] text-[16px] font-bold pb-2">
                Total Basic Cost
              </h4>
              <p className="text-base text-[#0F1416] font-normal flex items-center gap-3">
                <span>${bookingDetails?.package?.price || "0"}</span>
                <span>x</span>
                <span>{bookingDetails?.totalMember}</span> Travellers
              </p>
            </div>
            <h4 className="text-[20px] text-[#0F1416] font-bold">
              $
              {(
                bookingDetails?.totalMember *
                (bookingDetails?.package?.price || 0)
              ).toFixed(2)}
            </h4>
          </div>

          {coupon?.id !== null && (
            <div className="flex items-start mt-5 border-b pb-5 justify-between">
              <div>
                <div>
                  <h4 className="text-[#0F1416] text-[16px] font-bold pb-2">
                    Coupon Discount
                  </h4>
                </div>
                <div className="w-fit py-[6px] px-[10px] text-white bg-orange-500 rounded-full text-[12px] text-center tracking-[0.06px] leading-[132%]">
                  {coupon?.name}
                </div>
              </div>
              <h4 className="text-[20px] text-[#0F1416] font-bold">
                -$
                {coupon?.discount_amount}
              </h4>
            </div>
          )}

          <div className="flex items-start mt-5 border-b pb-5 justify-between">
            <div>
              <h4 className="text-[#0F1416] text-[16px] font-bold pb-2">
                Fee & Taxes
              </h4>
              <p className="text-base text-[#0F1416] font-normal flex items-center gap-3">
                <span>${"0"}</span>
                <span>x</span>
                <span>{bookingDetails?.totalMember}</span> Travellers
              </p>
            </div>
            <h4 className="text-[20px] text-[#0F1416] font-bold">
              +${(bookingDetails?.totalMember * 0).toFixed(2)}
            </h4>
          </div>
        </div>
      </div>

      {applyCouponPopup && (
        <div className="top-0 left-0 z-[99] w-screen h-screen bg-[#000e1999] overflow-hidden fixed flex items-center justify-center backdrop-blur-[2px]">
          <ApplyCoupon handleCouponCode={(code)=>handleCouponCode(code)} handleClosePoup={()=>setApplyCouponPopup(prev => !prev)}/>
        </div>
      )}
    </div>
  );
}

export default ContactInfo;
