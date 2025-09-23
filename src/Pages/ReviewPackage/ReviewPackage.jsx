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

function ReviewPackage() {
  const router = useNavigate();
  const { bookingDetails, updateBooking } = useBookingContext();
  const [travellers, setTravellers] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [travellersType, setTravellersType] = useState({});
  const [confirmationBookingPopup, setConfirmationBookingPopup] =
    useState(false);
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

  const handleCheckout = async () => {
    if (travellers.length !== bookingDetails?.totalMember) {
      toast.error("Add all travellers information.");
      return;
    }

    if(!bookingDetails?.package?.id){
      toast.error("Selected package not found!")
    }

    try {
      const res = await UserServices.createCheckout({
        package_id: bookingDetails?.package?.id,
        selected_date: bookingDetails?.bookingDate,
        adults_count: bookingDetails?.memberType?.adult,
        children_count: bookingDetails?.memberType?.child,
        infants_count: bookingDetails?.memberType?.infant,
        checkout_travellers: travellers?.map((tr) => ({
          full_name: tr.name,
          type: tr.type,
          age: Number(tr.age),
        })),
      });
      if (res?.success) {
        updateBooking("checkoutId", res?.data?.id);
        router(`/contactinfo/${id}`);
      } else {
        toast.error("Faild to checkout...");
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
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-10">
          <h1 className="text-[#0F1416] text-[40px] font-bold">
            Review Package
          </h1>

          <PackageDetails packageData={bookingDetails?.package} />

          <AddTravellers
            travellersType={travellersType}
            handleTravellers={handleTravellers}
          />

          {travellers.length >= 1 ? (
            <table className="border rounded-md">
              <thead>
                <tr className="border border-collapse">
                  <th className="text-start">Name</th>
                  <th className="text-start">Age</th>
                  <th className="text-start">Type</th>
                </tr>
              </thead>
              <tbody>
                {travellers.map((traveller, index) => (
                  <tr key={index}>
                    <td>{traveller?.name}</td>
                    <td>{traveller?.age}</td>
                    <td>{traveller?.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No travellers added yet.</p>
          )}
        </div>
        {!isProcessing ? (
          <button
            type="button"
            onClick={handleCheckout}
            className="flex gap-2 items-center justify-center px-3 py-2 bg-[#EB5B2A] rounded-full text-white text-base font-medium"
          >
            Checkout
          </button>
        ) : (
          <button
            type="button"
            disabled={isProcessing}
            className={`flex gap-2 items-center justify-center px-3 py-2 bg-[#EB5B2A] rounded-full text-white text-base font-medium ${!isProcessing?"opacity-50":""}`}
          >
            Processing...
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewPackage;
