import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from "react";

const DateRangeFilter = ({ startDate, endDate, onDateChange }) => {
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex border items-center justify-between p-2 rounded-md border-[#C1D0E5] shadow-sm">
            <div
              onClick={() => startDatePickerRef.current.setOpen(true)}
              className="text-2xl cursor-pointer mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 7.5C3 5.29086 4.79086 3.5 7 3.5H17C19.2091 3.5 21 5.29086 21 7.5V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V7.5Z"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 9H21"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 2L8 5"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V5"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="15" r="1" fill="#0F1416" />
                <circle cx="16" cy="15" r="1" fill="#0F1416" />
                <circle cx="8" cy="15" r="1" fill="#0F1416" />
              </svg>
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => onDateChange(date, true)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Check-In"
              className="outline-none w-full text-end lg:text-start font-light"
              ref={startDatePickerRef}
            />
          </div>

          <div className="flex border mt-4 items-center justify-between p-2 rounded-md border-[#C1D0E5] shadow-sm">
            <div
              onClick={() => endDatePickerRef.current.setOpen(true)}
              className="text-2xl cursor-pointer mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 7.5C3 5.29086 4.79086 3.5 7 3.5H17C19.2091 3.5 21 5.29086 21 7.5V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V7.5Z"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 9H21"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 2L8 5"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V5"
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="15" r="1" fill="#0F1416" />
                <circle cx="16" cy="15" r="1" fill="#0F1416" />
                <circle cx="8" cy="15" r="1" fill="#0F1416" />
              </svg>
            </div>
            <DatePicker
              selected={endDate}
              onChange={(date) => onDateChange(date, false)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Check-Out"
              className="outline-none text-end lg:text-start font-light w-full"
              ref={endDatePickerRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;