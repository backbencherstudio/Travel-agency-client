import React, { useRef, useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calender from "../../assets/img/tour-details/calender.svg";
// import { useBookingContext } from '../../Context/BookingContext/BookingContext'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { createCheckout } from "../../Apis/clientApi/ClientBookApi";
import Loading from "../../Shared/Loading";

const BookCard = ({ details, renderStars }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [extraServices, setExtraServices] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { setBookingDetails } = useBookingContext()
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const navigate = useNavigate();
  const [freeCancellation, setFreeCancellation] = useState(false);
  const [payLater, setPayLater] = useState(false);

  // Access user from AuthContext
  const { user } = useContext(AuthContext);

  const duration = details?.duration || 0;

  // console.log("deatils", details)

  // Get today's date
  const today = new Date();

  // Dynamically calculate max end date based on start date and duration
  const calculateMaxEndDate = (startDate) => {
    if (!startDate) return null;
    const maxEndDate = new Date(startDate);
    maxEndDate.setDate(startDate.getDate() + duration);
    return maxEndDate;
  };

  useEffect(() => {
    if (startDate) {
      const calculatedEndDate = calculateMaxEndDate(startDate);
      setEndDate(calculatedEndDate);
    }
  }, [startDate, duration]);

  const handleCheckboxChange = (service, isChecked) => {
    if (isChecked) {
      setExtraServices((prevState) => [
        ...prevState,
        { id: service?.extra_service?.id, name: service?.extra_service?.name },
      ]);
    } else {
      setExtraServices((prevState) =>
        prevState.filter((s) => s.id !== service?.extra_service?.id)
      );
    }
  };

  const handleFreeChancellation = () => {
    setFreeCancellation((prev) => !prev);
  };

  const handlePayLater = () => {
    setPayLater((prev) => !prev);
  };

  const handleBookNow = async () => {
    if (!user) {
      toast.error("You need to log in to proceed with booking.");
      navigate("/login");
      return;
    }

    if (user.type !== "user") {
      toast.error("Only users with a valid account type can book.");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    const bookingData = {
      package_id: details?.id,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      extra_services: extraServices.map((service) => ({
        id: service.id,
        name: service.name,
      })),
    };

    try {
      setLoading(true);
      document.body.style.overflow = "hidden";

      setTimeout(async () => {
        try {
          const response = await createCheckout(bookingData);
          if (response.errors) {
            toast.error(response.message || "Failed to complete booking.");
          } else {
            navigate(`/booking/${response?.data?.id}`);
          }
        } catch (error) {
          toast.error("An error occurred while processing your booking.");
        } finally {
          setLoading(false);
          document.body.style.overflow = "auto";
        }
      }, 500);
    } catch (error) {
      toast.error("An error occurred while processing your booking.");
      setLoading(false);
      document.body.style.overflow = "auto";
    }
  };

  const handleStartDateChange = (date) => {
    if (date < today) {
      toast.error("Start date cannot be in the past.");
      return;
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (date < startDate) {
      toast.error("End date cannot be before the start date.");
      return;
    }
    setEndDate(date);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <div className="flex flex-col gap-4 max-w-full shadow-[0px_5px_30px_0px_#00000014] p-6 rounded-xl">
        <h1 className="text-[40px] font-bold border-b border-b-[#A6AAAC33] pb-[15px]">
          ${details?.price}
          <span className="text-lg font-normal">/per person</span>
        </h1>
        <div className="text-[#000] text-xl font-semibold">
          Select Date and Travelers
        </div>
        <div>
          {/* Start Date Picker */}
          <div className="flex border items-center gap-4 p-4 rounded-md border-[#e5e6e6] shadow-sm">
            <div
              onClick={() => startDatePickerRef.current.setOpen(true)}
              className="text-2xl cursor-pointer ml-2 w-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <path
                  d="M3.25 7.5C3.25 5.29086 5.04086 3.5 7.25 3.5H17.25C19.4591 3.5 21.25 5.29086 21.25 7.5V18C21.25 20.2091 19.4591 22 17.25 22H7.25C5.04086 22 3.25 20.2091 3.25 18V7.5Z"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                />
                <path
                  d="M3.25 9H21.25"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8.25 2L8.25 5"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.25 2V5"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12.25" cy="15" r="1" fill="#0F1416" />
                <circle cx="16.25" cy="15" r="1" fill="#0F1416" />
                <circle cx="8.25" cy="15" r="1" fill="#0F1416" />
              </svg>
            </div>

            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={today}
              placeholderText="Start Date"
              className="outline-none w-full placeholder:text-[#b6b9bb] placeholder:text-base placeholder:font-normal"
              ref={startDatePickerRef}
            />
          </div>

          {/* End Date Picker */}
          <div className="flex border mt-4 items-center gap-4 p-4 rounded-md border-[#e5e6e6] shadow-sm">
            <div
              onClick={() => endDatePickerRef.current.setOpen(true)}
              className="text-2xl cursor-pointer ml-2 w-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
              >
                <path
                  d="M4.82757 14.4816C3.4128 15.324 -0.296635 17.0441 1.96266 19.1966C3.06631 20.248 4.29549 21 5.84087 21H14.6591C16.2045 21 17.4337 20.248 18.5373 19.1966C20.7966 17.0441 17.0872 15.324 15.6724 14.4816C12.3548 12.5061 8.14519 12.5061 4.82757 14.4816Z"
                  stroke="#1D1F2C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.75 5.5C14.75 7.98528 12.7353 10 10.25 10C7.76472 10 5.75 7.98528 5.75 5.5C5.75 3.01472 7.76472 1 10.25 1C12.7353 1 14.75 3.01472 14.75 5.5Z"
                  stroke="#1D1F2C"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={calculateMaxEndDate(startDate)}
              placeholderText="End Date"
              className="outline-none text-base w-full placeholder:text-[#b6b9bb] placeholder:text-base placeholder:font-normal"
              ref={endDatePickerRef}
              disabled={!startDate}
            />
          </div>

          {/* Extra Services */}
          {/* <div className='flex flex-col gap-4 mt-5'>
            <h4 className='text-xl font-bold text-[#0F1416]'>Extra Service</h4>
            {[
              ...new Map(
                details?.package_extra_services?.map(service => [
                  service?.extra_service?.id,
                  service
                ])
              ).values()
            ].map((service, index) => (
              <div key={index} className='flex items-center gap-3'>
                <input
                  type='checkbox'
                  onChange={e => handleCheckboxChange(service, e.target.checked)}
                />
                <p className='text-base font-normal text-[#49556D]'>
                  {service?.extra_service?.name} (${service?.extra_service?.price})
                </p>
              </div>
            ))}
          </div> */}
        </div>

        <button
          onClick={handleBookNow}
          className="flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w-full mt-2"
        >
          Check Availability
        </button>
        <div className="flex flex-col gap-4 text-[#49556D] bg-[#FDEFEAB2] p-4 rounded-xl">
          <div className="flex gap-[10px]">
            <div className="relative w-[24px] h-[24px] text-white flex gap-[10px]">
              <input
                type="checkbox"
                checked={freeCancellation}
                onChange={handleFreeChancellation}
                className="w-6 h-6 border-2 border-gray-400 rounded-full appearance-none checked:bg-[#14AE5C] checked:border-[#14AE5C] focus:outline-none"
              />
              <div
                className="absolute top-0 flex items-center justify-center"
                onClick={handleFreeChancellation}
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M20.285 6.709l-11.02 11.02-5.657-5.657 1.414-1.415 4.243 4.243L18.87 5.294l1.415 1.415z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-[#49556D] text-sm ">
                <span className="text-[#49556D] underline cursor-pointer text-nowrap font-bold text-sm leading-5">
                  Free Cancellation
                </span>{" "}
                up to 24 hours before the experience starts (local time)
              </p>
            </div>
          </div>
          <div className="flex gap-[10px]">
            <div className="relative w-[24px] h-[24px] text-white flex gap-[10px]">
              <input
                type="checkbox"
                checked={payLater}
                onChange={handlePayLater}
                className="w-6 h-6 border-2 border-gray-400 rounded-full appearance-none checked:bg-[#14AE5C] checked:border-[#14AE5C] focus:outline-none"
              />
              <div
                className="absolute top-0 flex items-center justify-center"
                onClick={handlePayLater}
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M20.285 6.709l-11.02 11.02-5.657-5.657 1.414-1.415 4.243 4.243L18.87 5.294l1.415 1.415z"
                  />
                </svg>
              </div>
            </div>
            <div>
              <span className="underline cursor-pointer text-[#49556D] text-nowrap text-sm font-bold">
                Book Now and Pay Leter
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
