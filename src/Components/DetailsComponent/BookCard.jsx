import React, { useRef, useState, useContext, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";
import calender from "../../assets/img/tour-details/calender.svg";
// import { useBookingContext } from '../../Context/BookingContext/BookingContext'
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { createCheckout } from "../../Apis/clientApi/ClientBookApi";
import Loading from "../../Shared/Loading";
import TourDatePicker from "./TourDatePicker";
import ReservetionConfirmation from "./ReservetaionConfirmation";
import FreeCancellation from "./FreeCancellation";
const BookCard = ({
  details,
  renderStars,
  handleCheckAvailability,
  booking,
  cancelDesc,
  bookNowPayLaterDesc
}) => {
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
  const [adultTravelers, setAdultTravelers] = useState(1);
  const [childTravelers, setChildTravelers] = useState(0);
  const [infantTravelers, setInfantTravelers] = useState(0);
  const [totalTravelers, setTotalTravelers] = useState(1);
  const [showTravelerMenu, setShowTravelerMenu] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState("Number of people");
  const [selectedDate, setSelectedDate] = useState("");
  const [checkInCheckOutDate, setCheckInCheckOutDate] = useState(null);
  const [reservetionConfirmation, setReservetionConfirmation] = useState(false);
  const [reserved, setReseved] = useState(false);
  const [freeCancel, setFreeCancel] = useState(false);
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

  const handleOpenDatePicker = () => {
    setOpenDatePicker((prev) => !prev);
    setShowTravelerMenu(false);
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

    if (!checkInCheckOutDate || !totalTravelers) {
      toast.error("Please select both start and end dates.");
      return;
    }

    const bookingData = {
      package_id: details?.id,
      start_date: checkInCheckOutDate[0].toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      end_date: checkInCheckOutDate[0].toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      totalTravelers: totalTravelers,
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
            // navigate(`/booking/${response?.data?.id}`);
            handleCheckAvailability();
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

  const handleCheckInCheckOutDate = (data) => {
    setCheckInCheckOutDate(data);
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

  const toggleTravelerMenu = () => {
    setNumberOfPeople(`${totalTravelers} Travelers`);
    setShowTravelerMenu((prev) => !prev);
    setOpenDatePicker(false);
  };

  const handleAdultTravelersAdding = () => {
    setTotalTravelers((prevTotal) => {
      if (prevTotal < 10) {
        const newTotal = prevTotal + 1;
        setAdultTravelers((prevAdult) => {
          if (prevAdult < 10) {
            return prevAdult + 1;
          }
          return prevAdult;
        });
        return newTotal;
      }
      return prevTotal;
    });
  };
  const handleAdultTravelersRemove = () => {
    if (adultTravelers > 1) {
      setAdultTravelers((prev) => prev - 1);
      setTotalTravelers((prev) => prev - 1);
    }
  };

  const handleChildTravelersAdding = () => {
    if (totalTravelers < 10) {
      setTotalTravelers((prev) => prev + 1);
      setChildTravelers((prev) => prev + 1);
    }
  };
  const handleChildTravelersRemove = () => {
    if (childTravelers > 0) {
      setChildTravelers((prev) => prev - 1);
      setTotalTravelers((prev) => prev - 1);
    }
  };

  const handleSelectedDate = (name,date) => {
    console.log(selectedDate)
    setSelectedDate(prev => ({...prev,[name]:date}));
  };

  const handleInfantTravelersAdding = () => {
    if (totalTravelers < 10 && infantTravelers < 2) {
      setTotalTravelers((prev) => prev + 1);
      setInfantTravelers((prev) => prev + 1);
    }
  };
  const handleInfantTravelersRemove = () => {
    if (infantTravelers > 0) {
      setInfantTravelers((prev) => prev - 1);
      setTotalTravelers((prev) => prev - 1);
    }
  };


  const handleReservetionConfirmation = () => {
    setReservetionConfirmation(prev => !prev);
    setReseved(true)
  }


  const handleFreeCancellation = () => {
    setFreeCancel(false);
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <div className="flex flex-col gap-4 max-w-full shadow-[0px_5px_30px_0px_#00000014] p-6 rounded-xl">
        <div className="text-[40px] font-bold border-b border-b-[#A6AAAC33] pb-[15px]">
          <div>
            ${details?.price}
            <span className="text-lg font-normal">/per person</span>
          </div>
          {booking && (
            <div className="flex justify-between items-center">
              <div className="text-[18px] text-[#475467] font-medium">
                {totalTravelers} Travelers <span className="text-sm">X</span> $
                {details?.price}
              </div>
              <div className="text-[24px] font-semibold text-[#0F1416]">
                ${details?.price * totalTravelers}
              </div>
            </div>
          )}
        </div>
        <div className="text-[#000] text-xl font-semibold">
          Select Date and Travelers
        </div>
        <div>
          {/* Date Picker */}
          <div className="flex gap-4">
            <div
              className={`flex-1 flex border ${booking ? "justify-between" : ""
                } items-center gap-4 p-4 rounded-2xl border-[#e5e6e6] shadow-sm relative`}
            >
              {!booking && (
                <div
                  className="text-2xl cursor-pointer ml-2 w-fit"
                  onClick={handleOpenDatePicker}
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
              )}
              <div>
                {!selectedDate ? (
                  <div className="text-[16px] text-[#a6aaaccc]">Check-In</div>
                ) : (
                  <div>
                    {selectedDate["start"]?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
              {booking && (
                <div className="text-2xl ml-2 w-fit">
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
              )}
            </div>
            <div
              className={`flex-1 flex border ${booking ? "justify-between" : ""
                } items-center gap-4 p-4 rounded-2xl border-[#e5e6e6] shadow-sm relative`}
            >
              {!booking && (
                <div
                  className="text-2xl cursor-pointer ml-2 w-fit"
                  onClick={handleOpenDatePicker}
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
              )}
              <div>
                {!selectedDate ? (
                  <div className="text-[16px] text-[#a6aaaccc]">Check-Out</div>
                ) : (
                  <div>
                    {selectedDate["end"]?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
              {booking && (
                <div className="text-2xl ml-2 w-fit">
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
              )}

              {openDatePicker && (
                <TourDatePicker
                  handleOpenDatePicker={handleOpenDatePicker}
                  handleSelectedDate={handleSelectedDate}
                  handleCheckInCheckOutDate={handleCheckInCheckOutDate}
                />
              )}
            </div>
          </div>

          {/* Number of Traveleres */}
          <div className="flex border mt-4 items-center gap-4 p-4 rounded-2xl border-[#e5e6e6] shadow-sm relative">
            {!booking && (
              <div
                onClick={toggleTravelerMenu}
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
            )}

            <div className="flex justify-between items-center w-full">
              {showTravelerMenu ? (
                <div className="text-[16px] cursor-pointer">
                  {totalTravelers} Travelers
                </div>
              ) : (
                <div
                  className={`${booking ? "text-[#0F1416]" : "text-[#a6aaaccc]"
                    } text-[16px]`}
                >
                  {numberOfPeople}
                </div>
              )}
              <div
                className={`${showTravelerMenu ? "rotate-180" : ""
                  } w-[24px] flex items-center justify-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.8356 5.46849C11.5769 5.79194 11.1049 5.84438 10.7815 5.58562L6.24997 1.96044L1.71849 5.58562C1.39505 5.84438 0.923077 5.79194 0.66432 5.46849C0.405562 5.14505 0.458004 4.67308 0.78145 4.41432L5.78145 0.414321C6.05536 0.19519 6.44458 0.19519 6.71849 0.414321L11.7185 4.41432C12.0419 4.67308 12.0944 5.14505 11.8356 5.46849Z"
                    fill="#0F1416"
                  />
                </svg>
              </div>
            </div>

            {/* Travelers dropdown section */}

            {showTravelerMenu && (
              <div className="absolute z-[1] top-[58px] left-0 flex flex-col gap-6 bg-white w-full rounded-xl shadow-md px-4 py-5">
                <div className="flex flex-col gap-6">
                  <div className="text-xs sm:text-[16px] leading-[160%] text-[#58677D]">
                    You can select up to 10 travelers total.
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-[2px]">
                      <div className="text-[#000] text-xs sm:text-[18px] font-medium">
                        Adults (Age 12-80)
                      </div>
                      <div className="text-[10px] sm:text-[14px] text-[#4A4C56]">
                        Minimum: 1, Maximum: 10
                      </div>
                    </div>
                    <div className="flex gap-[10px] items-center">
                      <div
                        className="text-sm sm:text-[16px] text-[#A6AAAC] border leading-none w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={handleAdultTravelersRemove}
                      >
                        -
                      </div>
                      <div className="text-base sm:text-[20px] text-[#0F1416] w-[25px] text-center">
                        {adultTravelers}
                      </div>
                      <div
                        className="text-sm sm:text-[16px] text-[#0D3F72] border leading-none w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={handleAdultTravelersAdding}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-[2px]">
                      <div className="text-[#000] text-xs sm:text-[18px] font-medium">
                        Child (Age 4-11)
                      </div>
                      <div className="text-[10px] sm:text-[14px] text-[#4A4C56]">
                        Minimum: 0, Maximum: 9
                      </div>
                    </div>
                    <div className="flex gap-[10px] items-center">
                      <div
                        className="text-sm sm:text-[16px] text-[#A6AAAC] border leading-none w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={handleChildTravelersRemove}
                      >
                        -
                      </div>
                      <div className="text-base sm:text-[20px] text-[#0F1416] w-[25px] text-center">
                        {childTravelers}
                      </div>
                      <div
                        className="text-sm sm:text-[16px] text-[#0D3F72] border leading-none w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={handleChildTravelersAdding}
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-[2px]">
                      <div className="text-[#000] text-xs sm:text-[18px] font-medium">
                        Infant (Age 0-3)
                      </div>
                      <div className="text-[10px] sm:text-[14px] text-[#4A4C56]">
                        Minimum: 0, Maximum: 2
                      </div>
                    </div>
                    <div className="flex gap-[10px] items-center">
                      <div
                        className="text-sm sm:text-[16px] text-[#A6AAAC] border leading-none w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={handleInfantTravelersRemove}
                      >
                        -
                      </div>
                      <div className="text-base sm:text-[20px] text-[#0F1416] w-[25px] text-center">
                        {infantTravelers}
                      </div>
                      <div
                        className="text-sm sm:text-[16px] text-[#0D3F72] border leading-none w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] rounded-full flex items-center justify-center cursor-pointer"
                        onClick={handleInfantTravelersAdding}
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div
                    className="text-[#0E457D] text-sm sm:text-base underline cursor-pointer"
                    onClick={toggleTravelerMenu}
                  >
                    Close
                  </div>
                </div>
              </div>
            )}
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

        {!booking ? (
          <button
            onClick={handleBookNow}
            className="flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w-full mt-2"
          >
            Check Availability
          </button>
        ) : (
          <div className="flex flex-col gap-5">
            {reserved ? <div
              className="flex gap-2 items-center justify-center p-3 rounded-full text-[#4A4C56] text-[16px] font-medium w-full mt-2 border bg-[#E9E9EA]"
            >
              Reserved
            </div> : <div className="flex flex-col gap-5">
              <Link to={`/booking/${details?.id}`}>
                <button
                  onClick={handleBookNow}
                  className="flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w-full mt-2"
                >
                  Book Now
                </button>
              </Link>
              <button
                onClick={handleReservetionConfirmation}
                className="flex gap-2 items-center justify-center p-3 rounded-full text-[#0F1416] text-[16px] font-semibold w-full mt-2 border border-[#A5A5AB]"
              >
                Reserve Now & Pay Later
              </button>
            </div>}
            <div className="flex flex-col gap-4">
              <h2 className="text-[#000] text-[20px] font-semibold">
                FullTour+Leaning Tower Tickets
              </h2>
              <p className="text-[#0F1416] text-[14px] ">
                Tuscany in One Day Sightseeing Tour with pre-booked tickets to
                climb the Leaning Tower in Pisa - TOUR IS ONLY IN ENGLISH!!!!!
              </p>
              <div className="text-[#EB5B2A] text-[16px] bg-[#FDEFEA] w-fit px-2 py-1 rounded-lg select-none">
                8:00 AM
              </div>
            </div>
            <div></div>
          </div>
        )}
        {!location.pathname === "/tours" && <div className="flex flex-col gap-4 text-[#49556D] bg-[#FDEFEAB2] p-4 rounded-xl">
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
                <span className="text-[#0F1416] underline cursor-pointer text-nowrap font-bold text-sm leading-5" onClick={() => setFreeCancel(true)}>
                  Free Cancellation
                </span>{" "}
                {cancelDesc}
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
              <span className="underline cursor-pointer text-[#0F1416] text-nowrap text-sm font-bold">
                Book Now and Pay Leter
              </span>{" "}
              {bookNowPayLaterDesc}
            </div>
          </div>
        </div>}
        {reservetionConfirmation && <div className="top-0 left-0 z-[99] w-screen h-screen bg-[#00000099] overflow-hidden fixed flex items-center justify-center backdrop-blur-[2px]">
          <ReservetionConfirmation handleReservetionConfirmation={handleReservetionConfirmation} />
        </div>}
        {freeCancel && <div className="top-0 left-0 z-[99] w-screen h-screen bg-[#00000099] overflow-hidden fixed flex items-center justify-center backdrop-blur-[2px]">
          <FreeCancellation handleFreeCancellation={handleFreeCancellation} />
        </div>}
      </div>
    </>
  );
};

export default BookCard;
