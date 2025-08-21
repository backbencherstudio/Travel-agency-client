import { useState } from "react";
import { downArrow, ticWithCircle, crossWithCircle, fullAvatarHandUp, searchIcon, locationIcon, flagIcon, watchIcon } from '../../../public/Icons'
import TravelerPhotos from "./TravelerPhotos";



export default function AdditionalInformation({ details, additionalInformation, tripPlan, TravellerPhotos, includeExclude, meetingData }) {
    const [isMeetingOpen, setIsMeetingOpen] = useState(false);
    const [isIncludedOpen, setIsIncludedOpen] = useState(false);
    const [showMoreInclude, setShowMoreInclude] = useState(3)
    const [showMoreExclude, setShowMoreExclude] = useState(3)
    const [travelerPhotoIsOpen, setTravelerPhotoIsOpen] = useState(0);

    const toggleIncluded = () => {
        setIsIncludedOpen((prev) => !prev);
    };

    const toggleMeeting = () => {
        setIsMeetingOpen((prev) => !prev);
    };
    const handleShowMoreIncludeExclude = () => {
        setShowMoreInclude(prev => {
            if (prev === 3) {
                return Object.entries(includeExclude).filter(([_, value]) => value).length
            } else {
                return 3
            }
        })
        setShowMoreExclude(prev => {
            if (prev === 3) {
                return Object.entries(includeExclude).filter(([_, value]) => !value).length
            } else {
                return 3
            }
        })
    }


    const displayTripPlan = (plan) => (
        <div
            key={plan.id}
            className="relative flex flex-col gap-1 border-l border-[#FDEFEA] pl-5 ml-4"
        >
            <div className="text-[18px] font-medium">{plan.title}</div>
            <p className="text-sm sm:text-base">{plan.body}</p>
            <div className="text-xs sm:text-sm text-[#475467]">
                <span>{plan.time} minutes </span>.
                <span> Admission Ticket {plan.fee}</span>
            </div>
            <div className="absolute -left-[17px] -top-[17px] bg-[#FDEFEA] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] flex items-center justify-center rounded-full text-[#EB5B2A] text-[20px] font-medium">
                {plan.id}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-5 border-b pb-5">
                <h3 className="text-[40px] font-semibold text-[#0F1416]">
                    Overview
                </h3>
                <p className="text-base font-normal text-[#0F1416] self-stretch">
                    {details?.description}
                </p>
            </div>
            {/* Include Exclude section */}
            <div className="flex flex-col gap-5 pb-5">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={toggleIncluded}
                >
                    <h3 className="text-lg sm:text-2xl font-bold text-[#0F1416]">
                        Included/Excluded
                    </h3>
                    <div
                        className={`${isIncludedOpen ? "rotate-180" : ""
                            } duration-300`}
                    >
                        {downArrow}
                    </div>
                </div>
                {isIncludedOpen && (
                    <div className="border border-[#A6AAAC33] p-4 rounded-xl flex flex-col gap-6">
                        <div className="flex justify-between text-[#0F1416]">
                            <div className="flex-1 flex flex-col gap-4">
                                {Object.entries(includeExclude)
                                    .filter(([_, value]) => value).slice(0, showMoreInclude) // Only show included items
                                    .map(([key], index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 text-base text-[#0F1416]"
                                        >
                                            <div>
                                                {ticWithCircle}
                                            </div>
                                            <div className="text-sm sm:text-base">
                                                {key}
                                            </div>
                                        </div> // Display only true values
                                    ))}
                            </div>
                            <div className="flex-1 flex flex-col gap-4">
                                {Object.entries(includeExclude)
                                    .filter(([_, value]) => !value).slice(0, showMoreExclude) // Only show Excluded items
                                    .map(([key], index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 text-base text-[#475467]"
                                        >
                                            <div>
                                                {crossWithCircle}
                                            </div>
                                            <div className="text-sm sm:text-base">
                                                {key}
                                            </div>
                                        </div> // Display only true values
                                    ))}
                            </div>
                        </div>
                        {Object.entries(includeExclude).length > 6 && Object.entries(includeExclude).length != showMoreExclude + showMoreInclude && <div className="w-full text-center">
                            <button
                                className="w-fit cursor-pointer text-orange-500 text-sm"
                                onClick={handleShowMoreIncludeExclude}
                            >
                                Show more ( +{Object.entries(includeExclude).length - 6} )
                            </button>
                        </div>}
                        {Object.entries(includeExclude).length > 6 && Object.entries(includeExclude).length === showMoreExclude + showMoreInclude && <div className="w-full text-center">
                            <button
                                className="w-fit cursor-pointer text-orange-500 text-sm"
                                onClick={handleShowMoreIncludeExclude}
                            >
                                Show Less
                            </button>
                        </div>}
                    </div>
                )}
            </div>
            {/* Meeting and Pickup section */}

            <div className="flex flex-col gap-5 pb-5 border-b border-[#a6aaac33]">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={toggleMeeting}
                >
                    <h3 className="text-lg sm:text-2xl font-bold text-[#0F1416]">
                        Meeting and Pickup
                    </h3>
                    <div
                        className={`${isMeetingOpen ? "rotate-180" : ""
                            } duration-300`}
                    >
                        {downArrow}
                    </div>
                </div>
                {isMeetingOpen && (
                    <div className="flex flex-col gap-4">
                        <div className="text-base text-[#0F1416]">
                            You can head directly to the meeting point, or request
                            pickup
                        </div>
                        <div className="p-4 border border-[#a6aaac33] rounded-xl">
                            <div className="flex flex-col sm:flex-row justify-between gap-6">
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-1">
                                            {fullAvatarHandUp}
                                            <h4 className="text-base font-medium">
                                                Pickup points
                                            </h4>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label
                                                htmlFor=""
                                                className="text-[#49556D] text-sm"
                                            >
                                                Select a pickup point
                                            </label>
                                            <div className="flex justify-between items-center border border-[#D2D2D5] rounded-xl p-2 sm:p-4">
                                                <input
                                                    type="text"
                                                    placeholder="Type of search"
                                                    className="placeholder:text-sm text-base placeholder:text-[#4A4C56] focus:outline-none"
                                                />
                                                {searchIcon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-base font-medium text-[#000]">
                                            Pickup details
                                        </h3>
                                        <div>
                                            <p className="text-sm font-normal text-[#49556D]">
                                                One person of our team will contact you to give
                                                you the time and more details of the pickup
                                                process one day before
                                            </p>
                                            <button className="flex gap-2 items-center text-base text-[#1D1F2C]">
                                                <span>Read more </span>
                                                {downArrow}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden sm:flex flex-col h-full relative jusitfy-center items-center">
                                    <div className="w-[2px] h-[320px] bg-[#DFE1E7]"></div>
                                    <p className="absolute top-1/2 -translate-y-1/2 text-base text-center text-[#475467] bg-white py-3">
                                        or
                                    </p>
                                </div>
                                <div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2 items-center">
                                            {locationIcon}
                                            <h3 className="text-[16px] font-medium text-[#0F1416] leading-[160%]">
                                                Meeting point
                                            </h3>
                                        </div>
                                        <div className="flex flex-col gap-[30px]">
                                            <p className="text-[14px] leading-[160%] text-[#49556D]">
                                                {meetingData.meetingPointDetails}
                                            </p>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-2 items-center">
                                                    <span className="underline cursor-pointer">
                                                        Open In Google Maps
                                                    </span>
                                                    <div className="-rotate-90">
                                                        {downArrow}
                                                    </div>
                                                </div>
                                                <div className="text-[14px] leading-[160%] text-[#49556D]">
                                                    Please arrive to this meeting point it you
                                                    select the option without transportation from
                                                    {meetingData.travelingCity} City.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <div>
                                        {flagIcon}
                                    </div>
                                    <p className="text-[16px] font-medium">End point</p>
                                </div>
                                <p className="text-[16px] leading-[160%] text-[#49556D]">
                                    This activity ends back at the meeting point
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    {watchIcon}
                                    <span className="text-[18px] text-[#0F1416] font-medium leading-[160%]">
                                        Start time
                                    </span>
                                </div>
                                <p className="text-[16px] leading-[160%] text-[#49556D]">
                                    Confirm time with the local provider in advance of your
                                    experience.
                                </p>
                                <div className="flex flex-col gap-[6px]">
                                    <div className="text-[18px] text-[#0F1416] leading-[160%] font-medium">
                                        Opening hours
                                    </div>
                                    <p className="text-sm font-medium text-[#0F1416]">
                                        {meetingData.startDate} - {meetingData.endDate}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 text-sm">
                                {meetingData.operatingDayAndTime?.map((day) => {
                                    const weekday = day[0]?.split("-");
                                    return (
                                        <h1 className="flex gap-1">
                                            <div className="">
                                                {weekday?.length === 1 ? (
                                                    <span className="text-[#49556D]">
                                                        {weekday[0]}
                                                    </span>
                                                ) : (
                                                    <div>
                                                        <span className="text-[#49556D]">
                                                            {weekday[0]}
                                                        </span>
                                                        {"-"}
                                                        <span>{weekday[1]}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <span> : </span>
                                            <span className="font-medium text-[#0F1416]">
                                                {day[1]}
                                            </span>
                                        </h1>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Addition information section */}

            {additionalInformation && (
                <div className="flex flex-col gap-[30px] border-b border-[#a6aaac33] pb-[30px]">
                    <div className="pb-[20px] border-b border-[#a6aaac33]">
                        <div className="flex flex-col gap-5 border rounded-2xl border-[#a6aaac33] p-4">
                            <div className="text-[#1D1F2C] text-[24px] font-medium ">
                                Additional Information
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {[0, 1].map((colIndex) => (
                                        <ul
                                            key={colIndex}
                                            className="flex-1 flex flex-col gap-3 list-disc pl-4"
                                        >
                                            {additionalInformation
                                                .filter((_, i) => i % 2 === colIndex)
                                                .slice(0, 6) // Show only first 6 items in total
                                                .map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="text-[16px] leading-[160%] text-[#1D1F2C]"
                                                    >
                                                        {item}
                                                    </li>
                                                ))}
                                        </ul>
                                    ))}
                                </div>
                                <div className="flex justify-between text-orange-500 text-xs sm:text-sm font-medium p-2">
                                    {additionalInformation.length > 6 && (
                                        <button>
                                            Show {additionalInformation.length - 6} more
                                        </button>
                                    )}
                                    <button>Supplied by Around 360</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-[30px]">
                        <div className="w-full h-[180px] sm:h-[270px] rounded-2xl">
                            {/* <StaticMap location="Dhaka, Bangladesh" /> */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2367.469642881246!2d90.39869322734249!3d23.778121523255784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76925717c2d%3A0xcb33cf344a80553!2sMohakhali%20Bus%20Stop!5e0!3m2!1sen!2sbd!4v1734754290833!5m2!1sen!2sbd"
                                style={{ border: 0, width: "100%", height: "100%" }}
                                allowFullScreen=""
                                loading="lazy"
                            />
                        </div>
                        <button className="px-[70px] sm:px-[180px] py-5 text-[16px] font-medium leading-[160%] bg-[#0E457D] text-white rounded-[100px]">
                            Show on map
                        </button>
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-5">
                <div className="pb-[80px] flex flex-col gap-4">
                    <div>
                        <div className={`${travelerPhotoIsOpen === 0 ? "hidden" : "block"} text-[#0F1416] text-[18px] font-medium flex justify-between  py-3 items-center border-b cursor-pointer duration-300`} onClick={() => setTravelerPhotoIsOpen(0)}>
                            <span>Day 1</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6.0026 1.08203V10.4154M1.33594 5.7487H10.6693" stroke="#0F1416" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        {travelerPhotoIsOpen === 0 && <TravelerPhotos travellerPhotos={TravellerPhotos} />}
                    </div>
                    <div>
                        <div className={`${travelerPhotoIsOpen === 1 ? "hidden" : "block"} text-[#0F1416] text-[18px] font-medium flex justify-between  py-3 items-center border-b cursor-pointer duration-300`} onClick={() => setTravelerPhotoIsOpen(1)}>
                            <span>Day 2</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6.0026 1.08203V10.4154M1.33594 5.7487H10.6693" stroke="#0F1416" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        {travelerPhotoIsOpen === 1 && <TravelerPhotos travellerPhotos={TravellerPhotos} />}
                    </div>
                    <div>
                        <div className={`${travelerPhotoIsOpen === 2 ? "hidden" : "block"} text-[#0F1416] text-[18px] font-medium flex justify-between  py-3 items-center border-b cursor-pointer duration-300`} onClick={() => setTravelerPhotoIsOpen(2)}>
                            <span>Day 3</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6.0026 1.08203V10.4154M1.33594 5.7487H10.6693" stroke="#0F1416" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        {travelerPhotoIsOpen === 2 && <TravelerPhotos travellerPhotos={TravellerPhotos} />}
                    </div>
                    <div>
                        <div className={`${travelerPhotoIsOpen === 3 ? "hidden" : "block"} text-[#0F1416] text-[18px] font-medium flex justify-between  py-3 items-center border-b cursor-pointer duration-300`} onClick={() => setTravelerPhotoIsOpen(3)}>
                            <span>Day 4</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M6.0026 1.08203V10.4154M1.33594 5.7487H10.6693" stroke="#0F1416" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        {travelerPhotoIsOpen === 3 && <TravelerPhotos travellerPhotos={TravellerPhotos} />}
                    </div>
                </div>
            </div>
        </div>
    )
}