import React, { useEffect, useRef, useState } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import circleIcon from '../../assets/img/tour-details/check-circle.svg';
import removeIcon from '../../assets/img/tour-details/remove-circle.svg';
import up from '../../assets/img/tour-details/direction-up.svg';
import down from '../../assets/img/tour-details/direction-down.svg';
import BookCard from './BookCard';

const Details = ({ details }) => {
    const [selectedImage, setSelectedImage] = useState();
    const [activeIndex, setActiveIndex] = useState(null);
    const contentRefs = useRef([]);

    useEffect(() => {
        setSelectedImage(details?.package_images[0]?.image_url)
    }, [details])
    
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#F0F4F9]">
            <div className="col-span-2 flex flex-col gap-5">
                <h1 className="text-3xl md:text-[40px] text-[#0F1416] font-semibold">{details?.name}</h1>
                <div className="grid grid-cols-3 gap-4 items-center justify-between">
                    <div className="border-r-2">
                        <p className="text-sm text-[#8993A0]">Review</p>
                        <div className="flex flex-col md:flex-row gap-1 md:items-center">
                            <div className="flex gap-1 items-center">
                                {renderStars(details?.reviews[0]?.rating_value || 0.0)}{' '}
                            </div>
                            <span className="text-xs md:text-base text-[#8993A0]">({details?.reviews?.length} reviews)</span>
                        </div>
                    </div>
                    <div className="grid justify-center border-r-2">
                        <p className="text-sm text-[#8993A0]">Days</p>
                        <p className="text-base font-medium text-[#0F1416]">{details?.duration} days</p>
                    </div>
                    <div className="grid justify-end">
                        <p className="text-sm text-[#8993A0]">Location</p>
                        <p className="text-base font-medium text-[#0F1416]">{details?.destination?.name}, {details?.destination?.country?.name}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {/* Show selected image */}
                    <div className="">
                        <img
                            src={selectedImage}
                            alt={selectedImage}
                            className="h-96 w-full object-cover rounded-xl"
                        />
                    </div>
                    {/* Grid images */}
                    <div className="grid grid-cols-4 gap-4">
                        {details?.package_images?.map((planimg) => (
                            <button
                                key={planimg?.id}
                                className={``}
                                onClick={() => handleShowImage(planimg?.image_url)}
                            >
                                <img
                                    src={planimg?.image_url}
                                    alt={planimg?.image_url}
                                    className={`h-20 md:h-40 w-full object-cover rounded-xl ${planimg?.image_url === selectedImage ? ' ring-blue-500 ring-2' : ''}`}
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-[30px]'>
                    <div className='flex flex-col gap-5 border-b pb-5'>
                        <h3 className='text-[40px] font-semibold text-[#0F1416]'>Overview</h3>
                        <p className='text-base font-normal text-[#0F1416] self-stretch'>{details?.description}</p>
                    </div>
                    <div className='flex flex-col gap-5 border-b pb-5'>
                        <h3 className='text-xl font-bold text-[#0F1416]'>Included/Excluded</h3>
                        <div className='grid grid-cols-2'>
                            <div className='flex flex-col gap-4'>
                                {details?.package_tags?.filter(tag => tag?.type === 'included').map((inc, index) => (
                                    <div key={index} className='flex gap-3'>
                                        <img src={circleIcon} alt="" />
                                        <p className='md:text-base text-[#0F1416]'>{inc?.tag?.name}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col gap-4'>
                                {details?.package_tags?.filter(tag => tag?.type === 'excluded').map((ex, index) => (
                                    <div key={index} className='flex gap-3'>
                                        <img src={removeIcon} alt="" />
                                        <p className='md:text-base text-[#0F1416]'>{ex?.tag?.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <h3 className='text-xl font-bold text-[#0F1416]'>Trip Plan</h3>
                        <div>
                            <div className="flex flex-col gap-5 ">
                                {details?.package_trip_plans?.map((plan, index) => (
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
                                        Day {index + 1}
                                    </h5>
                                    <img src={down} alt="" className={` text-gray-900 transition duration-500 ${ activeIndex === index ? "hidden" : "block" }`} />
                                    
                                    <div className='flex flex-col justify-center items-center pl-1'>
                                        <img src={up} alt="" className={` text-gray-900 transition duration-500 ${ activeIndex === index ? "block" : "hidden" }`} />
                                    </div>
                                   
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
                                        {plan?.description}
                                    </p>
                                    <img src={plan?.package_trip_plan_images[0]?.image_url} alt={plan?.package_trip_plan_images[0]?.image_url} className='max-h-[306px] w-full object-cover rounded-2xl' />
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
