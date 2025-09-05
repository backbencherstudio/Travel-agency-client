import { useState, useEffect } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom"; // Added import for useLocation
import toast,{Toaster} from "react-hot-toast";

export default function AddPackageDatePicker({ handleOpenDatePicker, handleSelectedDate, handleCheckInCheckOutDate }) {
  const location = useLocation(); // Use hook to get location
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nextCurrentDate, setNextCurrentDate] = useState(() => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });

  const [daysInMonth, setDaysInMonth] = useState([]);
  const [daysInNextMonth, setDaysInNextMonth] = useState([])
  const [startDay, setStartDay] = useState(0);
  const [nextMonthStartDay, setNextMonthStartDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [checkInCheckOut, setCheckInCheckOut] = useState(true);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];

    const nextMonthYear = nextCurrentDate.getFullYear();
    const nextMonth = nextCurrentDate.getMonth();
    const nextDate = new Date(nextMonthYear, nextMonth, 1);
    const nextMonthDays = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    while (nextDate.getMonth() === nextMonth) {
      nextMonthDays.push(new Date(nextDate));
      nextDate.setDate(nextDate.getDate() + 1);
    }

    setDaysInMonth(days);
    setDaysInNextMonth(nextMonthDays);
    const startDay = new Date(year, month, 1).getDay();
    const nextMonthStartDay = new Date(nextMonthYear, nextMonth, 1).getDay();
    setStartDay(startDay);
    setNextMonthStartDay(nextMonthStartDay);

  }, [currentDate, nextCurrentDate]) // Added nextCurrentDate to dependency array




  const daysNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    
    // Don't allow going before current month
    const current = new Date();
    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth();
    
    if (prevMonth.getFullYear() > currentYear || 
        (prevMonth.getFullYear() === currentYear && prevMonth.getMonth() >= currentMonth)) {
      setCurrentDate(prevMonth);
      
      const nextMonth = new Date(prevMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setNextCurrentDate(nextMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
    
    const nextNextMonth = new Date(nextMonth);
    nextNextMonth.setMonth(nextNextMonth.getMonth() + 1);
    setNextCurrentDate(nextNextMonth);
  }

  const handleDateClick = (date) => {
    console.log("Date click ,",date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    if (selected < today) {
      toast.error("You cannot select a past date");
      return;
    }

    if (checkInCheckOut) {
      // Handling Check-In selection
      if (!checkOut || selected <= checkOut) {
        setCheckIn(selected);
        handleSelectedDate("start", selected);
        setCheckInCheckOut(false);
        
        // If checkOut exists but is before the new checkIn, clear checkOut
        if (checkOut && selected > checkOut) {
          setCheckOut(null);
          handleSelectedDate("end", null);
        }
      } else {
        console.log("Check-In must be before Check-Out");
      }
    } else {
      // Handling Check-Out selection
      if (checkIn && selected >= checkIn) {
        setCheckOut(selected);
        handleSelectedDate("end", selected);
        setCheckInCheckOut(true);
      } else if (!checkIn) {
        // If no checkIn selected yet, set checkIn first
        setCheckIn(selected);
        handleSelectedDate("start", selected);
        setCheckInCheckOut(false);
      } else {
        console.log("Check-Out must be after Check-In");
      }
    }
    
    setSelectedDate(selected);
  };



  const handleCheckIn = () => {
    setCheckInCheckOut(true)
  }

  const handleCheckOut = () => {
    if (checkIn) {
      setCheckInCheckOut(false);
    } else {
      setCheckInCheckOut(true);
    }
  }

  const handleClearDate = () => {
    setCheckIn(null)
    setCheckOut(null)
    setSelectedDate(null)
    handleSelectedDate("start",null)
    handleSelectedDate("end",null)
    setCheckInCheckOut(true)
  }

  const clearCheckIn = () => {
    setCheckIn(null)
    handleSelectedDate("start", null)
    setCheckInCheckOut(true)
    
    // If checkOut exists but no checkIn, clear checkOut too
    if (checkOut && !checkIn) {
      setCheckOut(null);
      handleSelectedDate("end", null);
    }
  }

  const clearCheckOut = () => {
    setCheckOut(null)
    handleSelectedDate("end", null)
    setCheckInCheckOut(false)
  }

  // Helper function to check if a date is in the selected range
  const isDateInRange = (date) => {
    if (!checkIn || !checkOut) return false;
    
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    
    return normalizedDate >= checkIn && normalizedDate <= checkOut;
  }

  // Helper function to check if a date is the checkIn or checkOut date
  const isCheckInOrOut = (date) => {
    if (!checkIn && !checkOut) return false;
    
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    
    return (checkIn && normalizedDate.getTime() === checkIn.getTime()) || 
           (checkOut && normalizedDate.getTime() === checkOut.getTime());
  }

  return (
    <div className={`absolute top-[58px] right-1/2 md:right-0 translate-x-1/2 md:translate-x-0 bg-white z-[120] shadow-2xl lg:shadow-md rounded-3xl p-[10px] lg:p-[32px] w-[320px] ${location.pathname.split("/")[1] === "cruise" ? "lg:w-[1000px] xl:w-[1125px]" : "lg:w-[700px]"} md:w-[450px] flex-col gap-8 flex`}>
      <div className="flex flex-col lg:flex-row bg-white items-center justify-between gap-2 lg:gap-0 w-full">
        <div className="flex flex-col lg:gap-3">
            <div className="text-[20px] text-[#0F1416] text-center lg:text-start font-semibold">{checkOut && checkIn ? `${Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24)) + 1}` : "0"} Days/{checkOut && checkIn ? `${Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24))}` : "0"} Night</div>
          <span className="text-[16px] text-[#070707] text-center">{checkIn ? checkIn.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          }) : "Select Date"}</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 w-full lg:w-fit bg-white">
          <div className={`flex items-center justify-between px-4 py-3 border ${checkInCheckOut ? "border-orange-500" : "border-[#D2D2D5]"} rounded-xl lg:translate-x-2 bg-white cursor-default`} onClick={handleCheckIn}>
            <div>
              <h3 className="text-[#0F1416] text-[14px] font-medium">Check-In</h3>
              <h3 className="text-[#070707] text-[14px] font-semibold">{checkIn ? checkIn.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              }) : "Select Date"}</h3>
            </div>
            {checkIn && (
              <button className="text-[#475467] text-xl p-1" onClick={clearCheckIn}>
                <IoMdClose />
              </button>
            )}
          </div>
          <div className={`flex items-center justify-between px-4 py-3 border ${!checkInCheckOut ? "border-orange-500" : "border-[#D2D2D5]"} rounded-xl cursor-default`} onClick={handleCheckOut}>
            <div>
              <h3 className="text-[#0F1416] text-[14px] font-medium">Check-Out</h3>
              <h3 className="text-[#070707] text-[14px] font-semibold">{checkOut ? checkOut.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              }) : "Select Date"}</h3>
            </div>
            {checkOut && (
              <button className="text-[#475467] text-xl p-1" onClick={clearCheckOut}>
                <IoMdClose />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={`flex ${location.pathname.split("/")[1] === "cruise" ? "gap-20":""} bg-white`}>
        <div className="flex-1 lg:flex flex-col justify-between">
          <div className="flex items-center justify-between text-base lg:text-[22.8px]">
            <button onClick={handlePrevMonth} className="text-[#1A1A1A9C] w-[34.15px] h-[34.15px] lg:w-[54.15px] lg:h-[54.15px] flex items-center justify-center">
              <FaChevronLeft />
            </button>
            <div>
              {currentDate.toLocaleDateString('default', { month: 'long' })}{' '}
              {currentDate.getFullYear()}
            </div>

            <button onClick={handleNextMonth} className="text-orange-500 w-[34.15px] h-[34.15px] lg:w-[54.15px] lg:h-[54.15px] flex items-center justify-center">
              <FaChevronRight />
            </button>
          </div>
          <div className="flex flex-wrap">
            {
              daysNames.map(day => (
                <div key={day} className="w-[14.28%] h-[50px] lg:h-[90.81px] text-center text-sm lg:text-[22.8px] flex items-center justify-center">
                  <span>{day}</span>
                </div>
              ))
            }
          </div>
          <div className="flex flex-wrap">
            {
              Array.from({ length: startDay }).map((_, index) => (
                <div key={index} className="w-[14.28%] h-[50px] lg:h-[90.81px] text-center text-[22.8px]"></div>
              ))
            }
            {daysInMonth.map((day, index) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const dayDate = new Date(day);
              dayDate.setHours(0, 0, 0, 0);
              const isPast = dayDate < today;
              const isSelected = isCheckInOrOut(day);
              const isInRange = isDateInRange(day);
              
              return (
                <div key={index}
                  className={`w-[14.28%] h-[42.5px] lg:h-[90.81px] text-center text-base lg:text-[22.8px] flex items-center justify-center cursor-pointer ${isPast ? "text-[#1A1A1A9C]" : "text-[#1a1a1a]"} ${isInRange ? "bg-orange-100" : ""}`}
                  onClick={() => !isPast && handleDateClick(day)}
                >
                  {isPast ? (
                    <del className="w-[70%] h-[70%] flex items-center justify-center rounded-full">
                      {day.getDate()}
                    </del>
                  ) : (
                    <span className={`w-[70%] h-[70%] flex items-center justify-center rounded-full ${isSelected ? "bg-[#EB5B2A] text-white" : "hover:bg-orange-200"}`}>
                      {day.getDate()}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-end items-center gap-5 mt-4">
            <div className="text-sm lg:text-[16px] underline cursor-pointer" onClick={handleClearDate}>Clear dates</div>
            <div className="bg-[#0E457D] text-white px-[18px] lg:px-[24px] py-[6px] lg:py-[10px] rounded-xl cursor-pointer" onClick={() => { handleOpenDatePicker(); handleCheckInCheckOutDate([checkIn, checkOut]) }}>Close</div>
          </div>
        </div>
        {location.pathname.split("/")[1] === "cruise" && (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-base lg:text-[22.8px]">
                <button onClick={handlePrevMonth} className="text-[#1A1A1A9C] w-[34.15px] h-[34.15px] lg:w-[54.15px] lg:h-[54.15px] flex items-center justify-center">
                  <FaChevronLeft />
                </button>
                <div>
                  {nextCurrentDate.toLocaleDateString('default', { month: 'long' })}{' '}
                  {nextCurrentDate.getFullYear()}
                </div>

                <button onClick={handleNextMonth} className="text-orange-500 w-[34.15px] h-[34.15px] lg:w-[54.15px] lg:h-[54.15px] flex items-center justify-center">
                  <FaChevronRight />
                </button>
              </div>
              <div className="flex flex-wrap">
                {
                  daysNames.map(day => (
                    <div key={day} className="w-[14.28%] h-[50px] lg:h-[90.81px] text-center text-sm lg:text-[22.8px] flex items-center justify-center">
                      <span>{day}</span>
                    </div>
                  ))
                }
              </div>
              <div className="flex flex-wrap">
                {
                  Array.from({ length: nextMonthStartDay }).map((_, index) => (
                    <div key={index} className="w-[14.28%] h-[50px] lg:h-[90.81px] text-center text-[22.8px]"></div>
                  ))
                }
                {daysInNextMonth.map((day, index) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const dayDate = new Date(day);
                  dayDate.setHours(0, 0, 0, 0);
                  const isPast = dayDate < today;
                  const isSelected = isCheckInOrOut(day);
                  const isInRange = isDateInRange(day);
                  
                  return (
                    <div key={index}
                      className={`w-[14.28%] h-[42.5px] lg:h-[90.81px] text-center text-base lg:text-[22.8px] flex items-center justify-center cursor-pointer ${isPast ? "text-[#1A1A1A9C]" : "text-[#1a1a1a]"} ${isInRange ? "bg-orange-100" : ""}`}
                      onClick={() => !isPast && handleDateClick(day)}
                    >
                      {isPast ? (
                        <del className="w-[70%] h-[70%] flex items-center justify-center rounded-full">
                          {day.getDate()}
                        </del>
                      ) : (
                        <span className={`w-[70%] h-[70%] flex items-center justify-center rounded-full ${isSelected ? "bg-[#EB5B2A] text-white" : "hover:bg-orange-200"}`}>
                          {day.getDate()}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end items-center gap-5 mt-4">
              <div className="text-sm lg:text-[16px] underline cursor-pointer" onClick={handleClearDate}>Clear dates</div>
              <div className="bg-[#0E457D] text-white px-[18px] lg:px-[24px] py-[6px] lg:py-[10px] rounded-xl cursor-pointer" onClick={() => { handleOpenDatePicker(); handleCheckInCheckOutDate([checkIn, checkOut]) }}>Close</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}