import { useState, useEffect } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function TourDatePicker({ handleOpenDatePicker, handleSelectedDate, handleCheckInCheckOutDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDay, setStartDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [checkInCheckOut, setCheckInCheckOut] = useState(true);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDaysInMonth(days);
    const startDay = new Date(year, month, 1).getDay();
    setStartDay(startDay);

  }, [currentDate])




  const daysNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const handlePrevMonth = () => {
    if (currentDate.getMonth() !== new Date().getMonth()) {
      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    }
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  }

  const handleDateClick = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset to midnight for safe comparison
    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    if (selected >= today) {
      setSelectedDate(selected);

      if (checkInCheckOut) {
        // Setting Check-In
        if (checkOut && selected <= checkOut) {
          setCheckIn(selected);
          handleSelectedDate(selected);
          setCheckInCheckOut(false);
        } else if (!checkOut) {
          setCheckIn(selected);
          handleSelectedDate(selected);
          setCheckInCheckOut(false);
        }
      } else {
        // Setting Check-Out
        if (checkIn && selected >= checkIn) {
          setCheckOut(selected);
          handleSelectedDate(selected);
        } else {
          console.log("Check-Out must be after Check-In");
        }
      }
    } else {
      // If user selects a past date
      console.log("You cannot select a past date");
    }
  };


  const handleCheckIn = () => {
    setCheckInCheckOut(true)
  }

  const handleCheckOut = () => {
    setCheckInCheckOut(false);
  }

  const handleClearDate = () => {
    setCheckIn(null)
    setCheckOut(null)
    setSelectedDate(null)
    handleSelectedDate(null)
    setCheckInCheckOut(true)
  }

  const clearCheckIn = () => {
    setCheckIn(null)
    setSelectedDate(null)
    setCheckInCheckOut(true)
  }

  const clearCheckOut = () => {
    setCheckOut(null)
    setCheckInCheckOut(false)
  }

  return (
    <div className="absolute top-[58px] right-1/2 md:right-0 translate-x-1/2 md:translate-x-0 bg-white z-[20] shadow-2xl lg:shadow-md rounded-3xl p-[10px] lg:p-[32px] w-[320px] lg:w-[700px] flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-0 w-full">
        <div className="flex flex-col lg:gap-3">
          <div className="text-[20px] text-[#0F1416] font-semibold">{`${checkOut?.getDate() && checkIn?.getDate() ? checkOut?.getDate() - checkIn?.getDate() + 1 : 0}`} Days</div>
          <span className="text-[16px] text-[#070707]">{checkIn ? checkIn.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          }) : "Select Date"}</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 w-full md:w-fit">
          <div className={`flex items-center justify-between px-4 py-3 border ${checkInCheckOut ? "border-orange-500" : "border-[#D2D2D5]"} rounded-xl lg:translate-x-2 bg-white cursor-default`} onClick={handleCheckIn}>
            <div>
              <h3 className="text-[#0F1416] text-[14px] font-medium">Check-In</h3>
              <h3 className="text-[#070707] text-[14px] font-semibold">{checkIn ? checkIn.toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              }) : "Select Date"}</h3>
            </div>
            <button className="text-[#475467] text-xl p-1" onClick={clearCheckIn}>
              <IoMdClose />
            </button>
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
            <button className="text-[#475467] text-xl p-1" onClick={clearCheckOut}>
              <IoMdClose />
            </button>
          </div>
        </div>
      </div>
      <div className="">
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
          {daysInMonth.map((day, index) => (
            <div key={day}
              className={`w-[14.28%] h-[42.5px] lg:h-[90.81px] text-center text-base lg:text-[22.8px] text-[#1a1a1a9c] flex items-center justify-center cursor-pointer`}
              onClick={() => handleDateClick(day)}
            >
              {day.getDate() >= new Date().getDate() && <span className={`w-[70%] h-[70%] flex items-center justify-center rounded-full ${selectedDate?.getDate() === day.getDate() && selectedDate.getMonth() === currentDate.getMonth() ? " bg-[#EB5B2A] text-white" : "text-[#EB5B2A]"}`}
              >{day.getDate()}</span>}
              {day.getDate() < new Date().getDate() && day.getMonth() === new Date().getMonth() && <del className={`w-[70%] h-[70%] flex items-center justify-center rounded-full text-[#1A1A1A9C]`}
              >{day.getDate()}</del>}
              {day.getDate() < new Date().getDate() && day.getMonth() != new Date().getMonth() && <div className={`w-[70%] h-[70%] flex items-center justify-center rounded-full ${day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth() ? "bg-slate-100" : ""} ${selectedDate?.getDate() === day.getDate() ? " bg-[#EB5B2A] text-white" : "text-[#EB5B2A]"}`}>{day.getDate()}</div>}
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center gap-5">
          <div className="text-sm lg:text-[16px] underline cursor-pointer" onClick={handleClearDate}>Clear dates</div>
          <div className="bg-[#0E457D] text-white px-[18px] lg:px-[24px] py-[6px] lg:py-[10px] rounded-xl cursor-pointer" onClick={() => { handleOpenDatePicker(); handleCheckInCheckOutDate([checkIn, checkOut]) }}>Close</div>
        </div>
      </div>

    </div>
  )
}