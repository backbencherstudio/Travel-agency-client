import { useState, useEffect } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function MyDatePicker({ selected, handleStartDateChange, startDate, endDate, minDate, ref }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDay, setStartDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkIn,setCheckIn] = useState("");
  const [checkOut,setCheckOut] = useState("");

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
    console.log(selectedDate)
    if(date.getDate() >= new Date().getDate() || date.getMonth() > new Date().getMonth()){
      setSelectedDate(date)
    }else{
      setSelectedDate(prev=> prev)
    }
  }

  return (
    <div className="absolute top-[58px] right-0 bg-white z-[2] shadow-md rounded-3xl p-[32px] w-[700px] flex flex-col gap-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <div className="text-[20px] text-[#0F1416] font-semibold">{1} Days</div>
          <span className="text-[16px] text-[#070707]">{selectedDate?.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          })}</span>
        </div>
        <div className="flex">
          <div className="flex items-center gap-8 px-4 py-3 border border-orange-500 rounded-xl translate-x-2 bg-white">
            <div>
              <h3 className="text-[#0F1416] text-[14px] font-medium">Check-In</h3>
              <h3 className="text-[#070707] text-[14px] font-semibold">{"April 11, 2025"}</h3>
            </div>
            <button className="text-[#475467] text-xl p-1">
              <IoMdClose />
            </button>
          </div>
          <div className="flex items-center gap-8 px-4 py-3 border border-[#D2D2D5] rounded-xl">
            <div>
              <h3 className="text-[#0F1416] text-[14px] font-medium">Check-In</h3>
              <h3 className="text-[#070707] text-[14px] font-semibold">{"April 11, 2025"}</h3>
            </div>
            <button className="text-[#475467] text-xl p-1">
              <IoMdClose />
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between text-[22.8px]">
          <button onClick={handlePrevMonth} className="text-[#1A1A1A9C] w-[54.15px] h-[54.15px] flex items-center justify-center">
            <FaChevronLeft />
          </button>
          <div>
            {currentDate.toLocaleDateString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </div>

          <button onClick={handleNextMonth} className="text-orange-500 w-[54.15px] h-[54.15px] flex items-center justify-center">
            <FaChevronRight />
          </button>
        </div>
        <div className="flex flex-wrap">
          {
            daysNames.map(day => (
              <div key={day} className="w-[14.28%] h-[90.81px] text-center text-[22.8px] flex items-center justify-center">
                <span>{day}</span>
              </div>
            ))
          }
        </div>
        <div className="flex flex-wrap">
          {
            Array.from({ length: startDay }).map((_, index) => (
              <div key={index} className="w-[14.28%] h-[90.81px] text-center text-[22.8px]"></div>
            ))
          }
          {daysInMonth.map((day, index) => (
            <div key={day}
              className={`w-[14.28%] h-[90.81px] text-center text-[22.8px] text-[#1a1a1a9c] flex items-center justify-center cursor-pointer`}
              onClick={() => handleDateClick(day)}
            >
              {day.getDate() >= new Date().getDate()  && <span className={`w-[70%] h-[70%] flex items-center justify-center rounded-full ${selectedDate?.getDate() === day.getDate() && selectedDate.getMonth() === currentDate.getMonth() ? " bg-[#EB5B2A] text-white" : "text-[#EB5B2A]"}`}
              >{day.getDate()}</span>}
              {day.getDate() < new Date().getDate() && day.getMonth() === new Date().getMonth() && <del className={`w-[70%] h-[70%] flex items-center justify-center rounded-full text-[#1A1A1A9C]`}
              >{day.getDate()}</del>}
              {day.getDate() < new Date().getDate() && day.getMonth() != new Date().getMonth() && <div className={`w-[70%] h-[70%] flex items-center justify-center rounded-full ${day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth() ? "bg-slate-100" : ""} ${selectedDate?.getDate() === day.getDate() ? " bg-[#EB5B2A] text-white" : "text-[#EB5B2A]"}`}>{day.getDate()}</div>}
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center gap-5">
          <div className="text-[16px] underline cursor-pointer">Clear dates</div>
          <div className="bg-[#0E457D] text-white px-[24px] py-[10px] rounded-xl">Close</div>
        </div>
      </div>

    </div>
  )
}