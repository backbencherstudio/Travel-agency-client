import React, { useRef, useState, useContext, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";
import calender from "../../assets/img/tour-details/calender.svg";
// import { useBookingContext } from '../../Context/BookingContext/BookingContext'
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { createCheckout,checkAvailability } from "../../Apis/clientApi/ClientBookApi";
import Loading from "../../Shared/Loading";
import TourDatePicker from "./TourDatePicker";
import ReservetionConfirmation from "./ReservetaionConfirmation";
import FreeCancellation from "./FreeCancellation";
import {datePickerIcon,avatarIcon} from '../../../public/Icons'
import { useLocation } from "react-router-dom";
import { useBookingContext } from "~/Context/BookingContext/BookingContext";
const BookCard = ({
  details,
  renderStars,
  handleCheckAvailability,
  booking,
  cancelDesc,
  bookNowPayLaterDesc,
  handleBooking
}) => {
  const {updateBooking} = useBookingContext();
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
  const [adultTravelers, setAdultTravelers] = useState(details?.min_adults || 0);
  const [childTravelers, setChildTravelers] = useState(details?.min_children || 0);
  const [infantTravelers, setInfantTravelers] = useState(details?.min_infants || 0);
  const [totalTravelers, setTotalTravelers] = useState(0);
  const [showTravelerMenu, setShowTravelerMenu] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState("Number of people");
  const [selectedDate, setSelectedDate] = useState("");
  const [checkInCheckOutDate, setCheckInCheckOutDate] = useState(null);
  const [reservetionConfirmation, setReservetionConfirmation] = useState(false);
  const [reserved, setReseved] = useState(false);
  const [freeCancel, setFreeCancel] = useState(false);
  const path = useLocation();
  // Access user from AuthContext
  const { user } = useContext(AuthContext);

  const duration = details?.duration || 0;

  // console.log("deatils", details)

  // console.log("Path name:",location.pathname.split("/")[1])

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

    if (!selectedDate["start"] || totalTravelers <= 0) {
      console.log("Date : ",selectedDate)
      toast.error("Please select both check-in date and number of travellers.");
      return;
    }

    const bookingData = {
      package_id: details?.id,
      selected_date: selectedDate["start"],
      // end_date: checkInCheckOutDate[0].toLocaleDateString("en-US", {
      //   month: "short",
      //   day: "2-digit",
      //   year: "numeric",
      // }),
      adults_count: adultTravelers,
      children_count: childTravelers,
      infants_count: infantTravelers,
    };

    try {
      setLoading(true);
      document.body.style.overflow = "hidden";

      setTimeout(async () => {
        try {
          const response = await checkAvailability(bookingData);
          if(response?.success){
              handleBooking(selectedDate['start']);
              updateBooking("totalMember",adultTravelers+childTravelers+infantTravelers)
              updateBooking("bookingDate",new Date(selectedDate['start']))
              updateBooking("memberType",{
                adult: adultTravelers,
                child: childTravelers,
                infant: infantTravelers
              })
              updateBooking('package',{
                name:details.name,
                id:details.id,
                review:0.0,
                destination: `${details?.package_destinations?.[0]?.destination?.name},${details?.package_destinations?.[0]?.destination?.country?.name}`,
                duration: details?.duration,
                duration_type: details?.duration_type,
                price: details?.final_price
              })
              updateBooking('final_price',details?.final_price);
          }else{
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
    if (data[0]) {
      setCheckInCheckOutDate(data)
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

  const toggleTravelerMenu = () => {
    setNumberOfPeople(`${totalTravelers} Travelers`);
    setShowTravelerMenu((prev) => !prev);
    setOpenDatePicker(false);
    setTotalTravelers(1);
  };

  const handleAdultTravelersAdding = () => {
    setTotalTravelers((prevTotal) => {
      if (prevTotal < 10) {
        const newTotal = prevTotal + 1;
        setAdultTravelers((prevAdult) => {
          if (prevAdult < details?.max_adults) {
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
    if (adultTravelers > details?.min_adults) {
      setAdultTravelers((prev) => prev - 1);
      setTotalTravelers((prev) => prev - 1);
    }
  };

  const handleChildTravelersAdding = () => {
    if (childTravelers < details?.max_children) {
      setTotalTravelers((prev) => prev + 1);
      setChildTravelers((prev) => prev + 1);
    }
  };
  const handleChildTravelersRemove = () => {
    if (childTravelers > details?.min_children) {
      setChildTravelers((prev) => prev - 1);
      setTotalTravelers((prev) => prev - 1);
    }
  };

  const handleSelectedDate = (name, date) => {
    setSelectedDate(prev => ({ ...prev, [name]: date }));
    if(!path.pathname.includes('packages')){
      handleOpenDatePicker();
    }
  };

  const handleInfantTravelersAdding = () => {
    if (infantTravelers < details?.max_infants) {
      setTotalTravelers((prev) => prev + 1);
      setInfantTravelers((prev) => prev + 1);
    }
  };
  const handleInfantTravelersRemove = () => {
    if (infantTravelers > details?.min_infants) {
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
                {adultTravelers+childTravelers+infantTravelers} Travelers <span className="text-sm">X</span> $
                {details?.price}
              </div>
              <div className="text-[24px] font-semibold text-[#0F1416]">
                ${(details?.price * (adultTravelers+childTravelers+infantTravelers)).toFixed(2)}
              </div>
            </div>
          )}
        </div>
        <div className="text-[#000] text-xl font-semibold">
          Select Date and Travelers
        </div>
        <div>
          {/* Date Picker */}
          <div className="flex gap-4 flex-col sm:flex-row relative">
            <div
              className={`flex-1 flex border ${booking ? "justify-between" : ""
                } items-center gap-4 p-4 rounded-2xl border-[#e5e6e6] shadow-sm relative`}
            >
              {!booking && (
                <div
                  className="text-2xl cursor-pointer ml-2 w-fit"
                  onClick={handleOpenDatePicker}
                >
                  {datePickerIcon}
                </div>
              )}
              <button
              disabled={booking}
              onClick={handleOpenDatePicker}
              className={`${booking?"":"cursor-pointer"}`}
              >
                {!selectedDate["start"] ? (
                  <div className="text-sm sm:text-[16px] text-[#a6aaaccc]">Check-In</div>
                ) : (
                  <div className="text-sm sm:text-base">
                    {selectedDate["start"]?.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                )}
              </button>
              {booking && (
                <div className="text-2xl ml-2 w-fit">
                  {datePickerIcon}
                </div>
              )}
              
            </div>
            {openDatePicker && (
                <TourDatePicker
                  handleOpenDatePicker={handleOpenDatePicker}
                  handleSelectedDate={handleSelectedDate}
                  handleCheckInCheckOutDate={handleCheckInCheckOutDate}
                />
              )}
            {location.pathname.split("/")[1] === "cruises" && <div
              className={`flex-1 flex border ${booking ? "justify-between" : ""
                } items-center gap-4 p-4 rounded-2xl border-[#e5e6e6] shadow-sm relative`}
            >
              {!booking && (
                <div
                  className="text-2xl cursor-pointer ml-2 w-fit"
                  onClick={handleOpenDatePicker}
                >
                  {datePickerIcon}
                </div>
              )}
              <div
              onClick={handleOpenDatePicker}
              >
                {!selectedDate["end"] ? (
                  <div className="text-sm sm:text-[16px] text-[#a6aaaccc]">Check-Out</div>
                ) : (
                  <div className="text-sm sm:text-base">
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
                  {datePickerIcon}
                </div>
              )}
            </div>}
          </div>

          {/* Number of Traveleres */}
          <div className="flex border mt-4 items-center gap-4 p-4 rounded-2xl border-[#e5e6e6] shadow-sm relative">
            {!booking && (
              <div
                onClick={toggleTravelerMenu}
                className="text-2xl cursor-pointer ml-2 w-fit"
              >
                {avatarIcon}
              </div>
            )}

            <button disabled={booking} className={`flex justify-between items-center w-full ${booking?"":"cursor-pointer"}`} onClick={toggleTravelerMenu}>
              {showTravelerMenu ? (
                <div className="text-sm sm:text-[16px] cursor-pointer">
                  {totalTravelers} Travelers
                </div>
              ) : (
                <div
                  className={`${booking ? "text-[#0F1416]" : "text-[#a6aaaccc]"
                    } text-sm sm:text-[16px]`}
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.8356 5.46849C11.5769 5.79194 11.1049 5.84438 10.7815 5.58562L6.24997 1.96044L1.71849 5.58562C1.39505 5.84438 0.923077 5.79194 0.66432 5.46849C0.405562 5.14505 0.458004 4.67308 0.78145 4.41432L5.78145 0.414321C6.05536 0.19519 6.44458 0.19519 6.71849 0.414321L11.7185 4.41432C12.0419 4.67308 12.0944 5.14505 11.8356 5.46849Z"
                    fill="#0F1416"
                  />
                </svg>
              </div>
            </button>

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
                        Minimum: {details?.min_adults}, Maximum: {details?.max_adults}
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
                        Minimum: {details?.min_children}, Maximum: {details?.max_children}
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
                        Minimum: {details?.min_infants}, Maximum: {details?.max_infants}
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
                  className="flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w-full mt-2"
                >
                  Book Now
                </button>
              </Link>
              {location.pathname.split("/")[1] === "tours" && <button
                onClick={handleReservetionConfirmation}
                className="flex gap-2 items-center justify-center p-3 rounded-full text-[#0F1416] text-[16px] font-semibold w-full mt-2 border border-[#A5A5AB]"
              >
                Reserve Now & Pay Later
              </button>}
            </div>}
            {/* {location.pathname.split("/")[1] === "tours" && <div className="flex flex-col gap-4">
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
            </div>} */}
            <div></div>
          </div>
        )}
        {location.pathname.split("/")[1] === "tours" && booking && <div className="flex flex-col gap-4 text-[#49556D] bg-[#FDEFEAB2] p-4 rounded-xl">
          <div className="flex gap-[10px]">
            {/* <div className="relative w-[24px] h-[24px] text-white flex gap-[10px]">
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
            </div> */}
            <div>
              <p className="text-[#49556D] text-sm ">
                <span className="text-[#0F1416] underline cursor-pointer text-nowrap font-bold text-sm leading-5" onClick={() => setFreeCancel(true)}>
                  Free Cancellation
                </span>{" "}
                {cancelDesc}
              </p>
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
