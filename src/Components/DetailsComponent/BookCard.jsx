import React, { useRef, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calender from '../../assets/img/tour-details/calender.svg';

const BookCard = ({ details, renderStars }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [extraServices, setExtraServices] = useState({
        breakfast: false,
        allInclusive: false,
        dinner: false,
        lunch: false,
    });
    const startDatePickerRef = useRef(null);
    const endDatePickerRef = useRef(null);

    const handleCheckboxChange = (service) => {
        setExtraServices((prevState) => ({
            ...prevState,
            [service]: !prevState[service],
        }));
    };

  return (
    <div className='flex flex-col gap-4 max-w-full'>
        <h1 className='text-[40px] font-bold border-b border-b-[#e5e6e6] pb-[15px]'>${details?.price}<span className='text-lg font-normal'>/per person</span></h1>
        <div>
            {/* Start Date Picker */}
            <div className='flex border items-center justify-between p-2 rounded-md border-[#e5e6e6] shadow-sm'>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className='outline-none w-full placeholder:text-[#b6b9bb] placeholder:text-base placeholder:font-normal'
                    ref={startDatePickerRef} // Assign ref to the startDate DatePicker
                />
                {/* Calendar Icon for Start Date */}
                <img
                    src={calender}
                    onClick={() => startDatePickerRef.current.setOpen(true)} // Open the date picker when clicked
                    className='text-2xl cursor-pointer ml-2'
                />
            </div>

            {/* End Date Picker */}
            <div className='flex border mt-4 items-center justify-between p-2 rounded-md border-[#e5e6e6] shadow-sm'>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    className='outline-none w-full placeholder:text-[#b6b9bb] placeholder:text-base placeholder:font-normal'
                    ref={endDatePickerRef} // Assign ref to the endDate DatePicker
                />
                {/* Calendar Icon for End Date */}
                <img
                    src={calender} 
                    onClick={() => endDatePickerRef.current.setOpen(true)} // Open the date picker when clicked
                    className='text-2xl cursor-pointer ml-2'
                />
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <div className="flex gap-1 items-center">
                {renderStars(details?.rating)}{' '}
                <div className='flex items-center'>
                    <div className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.99984 1.16699C3.77809 1.16699 1.1665 3.77858 1.1665 7.00033C1.1665 10.2221 3.77809 12.8337 6.99984 12.8337C10.2216 12.8337 12.8332 10.2221 12.8332 7.00033C12.8332 3.77858 10.2216 1.16699 6.99984 1.16699ZM9.05902 9.05951C8.97385 9.14468 8.86184 9.18783 8.74984 9.18783C8.63784 9.18783 8.52582 9.14526 8.44065 9.05951L6.69065 7.30951C6.6084 7.22726 6.56234 7.11583 6.56234 7.00033V4.08366C6.56234 3.84216 6.75834 3.64616 6.99984 3.64616C7.24134 3.64616 7.43734 3.84216 7.43734 4.08366V6.81889L9.05902 8.44057C9.22994 8.61207 9.22994 8.88859 9.05902 9.05951Z" fill="#4A4C56"/>
                        </svg>
                    </div>
                    <p className="ms-1 text-sm  text-gray-600 dark:text-gray-400">{details.days} days</p>
                </div>
            </div>
            <div className='text-sm mt-1 text-[#EB5B2A]'>Cancellation Policy <span className='text-xs text-[#49556D]'>(Cancel within 24H)</span></div>
            <div className='flex flex-col gap-4'>
                <h4 className='text-xl font-bold text-[#0F1416]'>Extra Service</h4>
                {Object.entries(extraServices).map(([service, value]) => (
                    <div key={service} className='flex items-center gap-3'>
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={() => handleCheckboxChange(service)}
                        />
                        <p className='text-base font-normal text-[#49556D]'>
                            {service.charAt(0).toUpperCase() + service.slice(1).replace(/([A-Z])/g, ' $1')}
                        </p>
                    </div>
                ))}
            </div>
        </div>
        <button className='flex gap-2 items-center justify-center p-3 bg-[#EB5B2A] rounded-full text-white text-base font-medium w- mt-2'>
            Book Now
        </button>
    </div>
  )
}

export default BookCard