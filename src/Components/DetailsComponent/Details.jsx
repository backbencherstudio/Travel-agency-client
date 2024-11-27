import React, { useRef, useState } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import circleIcon from '../../assets/img/tour-details/check-circle.svg';
import removeIcon from '../../assets/img/tour-details/remove-circle.svg';
import up from '../../assets/img/tour-details/direction-up.svg';
import down from '../../assets/img/tour-details/direction-down.svg';
import BookCard from './BookCard';

const Details = ({ details }) => {
    const [selectedImage, setSelectedImage] = useState(details?.locationImage);
    const [activeIndex, setActiveIndex] = useState(null);
    const contentRefs = useRef([]);

    const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
    };
    // console.log('tour', tour);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<FaStar key={i} className="text-orange-500" />);
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                stars.push(<FaStarHalfAlt key={i} className="text-orange-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    const handleShowImage = (image) => {
        setSelectedImage(image); // Update the selected image
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6 bg-[#F0F4F9]">
            <div className="col-span-2 flex flex-col gap-5">
                <h1 className="text-3xl md:text-[40px] text-[#0F1416] font-semibold">{details?.title}</h1>
                <div className="grid grid-cols-3 items-center justify-between">
                    <div className="border-r-2">
                        <p className="text-sm text-[#8993A0]">Review</p>
                        <div className="flex gap-1 items-center">
                            {renderStars(details?.rating)}{' '}
                            <span className="text-xs md:text-base text-[#8993A0]">(1214 reviews)</span>
                        </div>
                    </div>
                    <div className="grid justify-center border-r-2">
                        <p className="text-sm text-[#8993A0]">Days</p>
                        <p className="text-base font-medium text-[#0F1416]">{details?.days} days</p>
                    </div>
                    <div className="grid justify-end">
                        <p className="text-sm text-[#8993A0]">Location</p>
                        <p className="text-base font-medium text-[#0F1416]">{details?.location}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {/* Show selected image */}
                    <div className="">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="h-96 w-full object-cover rounded-xl"
                        />
                    </div>
                    {/* Grid images */}
                    <div className="grid grid-cols-4 gap-4">
                        {details?.tourPlan?.map((planimg) => (
                            <button
                                key={planimg.day}
                                className={``}
                                onClick={() => handleShowImage(planimg.locationImage)}
                            >
                                <img
                                    src={planimg.locationImage}
                                    alt=""
                                    className={`h-20 md:h-40 w-full object-cover rounded-xl ${planimg.locationImage === selectedImage ? ' ring-blue-500 ring-2' : ''}`}
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-[30px]'>
                    <div className='flex flex-col gap-5 border-b pb-5'>
                        <h3 className='text-[40px] font-semibold text-[#0F1416]'>Overview</h3>
                        <p className='text-base font-normal text-[#0F1416] self-stretch'>{details.overview}</p>
                    </div>
                    <div className='flex flex-col gap-5 border-b pb-5'>
                        <h3 className='text-xl font-bold text-[#0F1416]'>Included/Excluded</h3>
                        <div className='grid grid-cols-2'>
                            <div className='flex flex-col gap-4'>
                                {details.include.map((inc, index) => (
                                    <div key={index} className='flex gap-3'>
                                        <img src={circleIcon} alt="" />
                                        <p className='md:text-base text-[#0F1416]'>{inc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col gap-4'>
                                {details.exclude.map((ex, index) => (
                                    <div key={index} className='flex gap-3'>
                                        <img src={removeIcon} alt="" />
                                        <p className='md:text-base text-[#0F1416]'>{ex}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <h3 className='text-xl font-bold text-[#0F1416]'>Trip Plan</h3>
                        <div>
                            <div className="flex flex-col gap-5 ">
                                {details.tourPlan.map((plan, index) => (
                                <div
                                    key={index}
                                    className="hs-accordion"
                                >
                                    <button
                                    className="flex items-center justify-between text-left w-full"
                                    onClick={() => toggleFAQ(index)}
                                    >
                                    <h5
                                        className={`${
                                        activeIndex === index ? "" : "border-b pb-3"
                                        } w-full text-lg font-bold text-[#0F1416]`}
                                    >
                                        Day {plan.day}
                                    </h5>
                                    <img src={down} alt="" className={` text-gray-900 transition duration-500 ${ activeIndex === index ? "hidden" : "block" }`} />
                                    {/* <svg
                                        className={`w-6 h-6 text-gray-900 transition duration-500 ${
                                        activeIndex === index ? "hidden" : "block"
                                        }`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M6 12H18M12 18V6"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        ></path>
                                    </svg> */}
                                    <div className='flex flex-col justify-center items-center pl-1'>
                                        <img src={up} alt="" className={` text-gray-900 transition duration-500 ${ activeIndex === index ? "block" : "hidden" }`} />
                                    </div>
                                    {/* <svg
                                        className={`w-6 h-6 text-gray-900 transition duration-500 ${
                                        activeIndex === index ? "block" : "hidden"
                                        }`}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M6 12H18"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        ></path>
                                    </svg> */}
                                    </button>
                                    <div
                                    ref={(el) => (contentRefs.current[index] = el)}
                                    className={`flex flex-col gap-5 overflow-hidden transition-all duration-300 ease-in-out ${
                                        activeIndex === index ? "max-h-full" : "max-h-0"
                                    }`}
                                    style={{
                                        height: activeIndex === index ? contentRefs.current[index]?.scrollHeight : 0,
                                    }}
                                    >
                                    <p className="text-[#0F1416] text-base font-normal mt-4">
                                        {plan.tourDescription}
                                    </p>
                                    <img src={plan.locationImage} alt="" className='max-h-[306px] w-full object-cover rounded-2xl' />
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl max-h-fit max-w-full col-span-2 lg:col-span-1 xl:col-span-0">
                <BookCard details={details} renderStars={renderStars} />
            </div>
        </div>
    );
};

export default Details;
