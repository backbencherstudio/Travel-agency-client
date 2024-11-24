import React, { useState, useEffect, useRef } from "react";

export default function DatePicker({ setSelectedDate, selectedDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const datepickerRef = useRef(null);

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    // Empty slots before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`}></div>);
    }

    // Days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const dayString = day.toLocaleDateString("en-US");
      let className =
        "flex items-center justify-center cursor-pointer w-[46px] h-[46px] rounded-full text-dark-3 dark:text-dark-6 hover:bg-primary hover:text-white";

      if (selectedDate === dayString) {
        className += " bg-primary text-white dark:text-white";
      }

      daysArray.push(
        <div
          key={i}
          className={className}
          data-date={dayString}
          onClick={() => handleDayClick(dayString)}
        >
          {i}
        </div>
      );
    }

    return daysArray;
  };

  const handleDayClick = (selectedDay) => {
    setSelectedDate(selectedDay);
    setIsOpen(false); // Close the date picker after selecting a date
  };

  const toggleDatepicker = () => {
    setIsOpen(!isOpen);
  };

  const updateInput = () => {
    return selectedDate || "";
  };

  const handleDocumentClick = (e) => {
    if (datepickerRef.current && !datepickerRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  
  return (
    <section className="bg-white dark:bg-dark">
      <div className="container">
        <div className="flex">
          <div className="w-full">
            <div className="">
              <div className="relative" ref={datepickerRef}>
                <div className="relative flex items-center">
                  <input
                    id="datepicker"
                    type="text"
                    placeholder="Select a date"
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-full px-4 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow cursor-pointer"
                    value={updateInput()}
                    onClick={toggleDatepicker}
                    readOnly
                  />

                  <span
                    className="absolute right-0 cursor-pointer pr-4 text-dark-5"
                    onClick={toggleDatepicker}
                  >
                    <svg
                      className="fill-current stroke-current pr-1"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.29635 5.15354L2.29632 5.15357L2.30055 5.1577L7.65055 10.3827L8.00157 10.7255L8.35095 10.381L13.701 5.10603L13.701 5.10604L13.7035 5.10354C13.722 5.08499 13.7385 5.08124 13.7499 5.08124C13.7613 5.08124 13.7778 5.08499 13.7963 5.10354C13.8149 5.12209 13.8187 5.13859 13.8187 5.14999C13.8187 5.1612 13.815 5.17734 13.7973 5.19552L8.04946 10.8433L8.04945 10.8433L8.04635 10.8464C8.01594 10.8768 7.99586 10.8921 7.98509 10.8992C7.97746 10.8983 7.97257 10.8968 7.96852 10.8952C7.96226 10.8929 7.94944 10.887 7.92872 10.8721L2.20253 5.2455C2.18478 5.22733 2.18115 5.2112 2.18115 5.19999C2.18115 5.18859 2.18491 5.17209 2.20346 5.15354C2.222 5.13499 2.2385 5.13124 2.2499 5.13124C2.2613 5.13124 2.2778 5.13499 2.29635 5.15354Z"
                        fill=""
                        stroke=""
                      />
                    </svg>
                  </span>
                </div>

                {isOpen && (
                  <div
                    id="datepicker-container"
                    className="w-[282px] md:w-[350px] shadow-datepicker grid absolute md:right-0 mr-4 mt-2 rounded-xl z-10 border border-stroke bg-white pt-5 dark:border-dark-3 dark:bg-dark-2"
                  >
                    <div className="flex items-center justify-between px-5">
                      <button
                        id="prevMonth"
                        className="rounded-md px-2 py-2 text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-dark"
                        onClick={() =>
                          setCurrentDate(
                            new Date(
                              currentDate.setMonth(currentDate.getMonth() - 1)
                            )
                          )
                        }
                      >
                        &lt;
                      </button>

                      <div
                        id="currentMonth"
                        className="text-lg font-medium text-dark-3 dark:text-white"
                      >
                        {currentDate.toLocaleString("default", {
                          month: "long",
                        })}{" "}
                        {currentDate.getFullYear()}
                      </div>

                      <button
                        id="nextMonth"
                        className="rounded-md px-2 py-2 text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-dark"
                        onClick={() =>
                          setCurrentDate(
                            new Date(
                              currentDate.setMonth(currentDate.getMonth() + 1)
                            )
                          )
                        }
                      >
                        &gt;
                      </button>
                    </div>

                    <div className="mb-4 mt-6 grid grid-cols-7 gap-2 px-5">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-sm font-medium text-secondary-color"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>

                    <div
                      id="days-container"
                      className="mt-2 grid grid-cols-7 gap-y-0.5 px-5"
                    >
                      {renderCalendar()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
