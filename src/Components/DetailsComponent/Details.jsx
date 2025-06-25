import React, { useEffect, useRef, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import circleIcon from "../../assets/img/tour-details/check-circle.svg";
import removeIcon from "../../assets/img/tour-details/remove-circle.svg";
import up from "../../assets/img/tour-details/direction-up.svg";
import down from "../../assets/img/tour-details/direction-down.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BookCard from "./BookCard";
import CheckAvailability from "./CheckAvaiability";
import testImg from "../../assets/img/packages/banner.png";
import { LuMessageSquareMore } from "react-icons/lu";
import { Tooltip } from "@mui/material";
import { Image } from "lucide-react";
import { FaArrowRight } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ImageModal from "./ImageModal";
import StaticMap from '../../Shared/StaticMap'

const Details = ({
  details,
  includeExclude,
  tripPlan,
  meetingData,
  additionalInformation,
  mapImgPackage,
  TravellerPhotos,
  topReviews,
}) => {
  const [selectedImage, setSelectedImage] = useState();
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);
  const [imgTranslate, setImgTranslate] = useState(0);
  const [isIncludedOpen, setIsIncludedOpen] = useState(false);
  const [checkAvailabilityPopup, setCheckAvailabilityPopup] = useState(false);
  const [booking, setBooking] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeTab, setActiveTab] = useState('provider'); // 'provider' or 'traveler'
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [cancelDesc, setCancelDesc] = useState("up to 24 hours before the experience starts (local time)");
  const [bookNowPayLaterDesc, setBookNowPayLaterDesc] = useState("")
  const [showMoreInclude, setShowMoreInclude] = useState(3)
  const [showMoreExclude, setShowMoreExclude] = useState(3)
  useEffect(() => {
    if(location.pathname.split("/")[1] === "cruises"){
      setSelectedImage(details?.package_files[0]?.file);
    }else{
      setSelectedImage(details?.package_files[0]?.file_url);
    }
  }, [details]);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

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

  const handleShowImageLeft = () => {
    console.log(imgTranslate);
    if (imgTranslate === 0) {
      setImgTranslate(178);
    } else {
      setImgTranslate((prev) => {
        if (prev >= (details.package_files.length - 4) * 178) {
          return 0;
        } else {
          return prev * 2;
        }
      });
    }
  };

  const toggleIncluded = () => {
    setIsIncludedOpen((prev) => !prev);
  };

  const toggleMeeting = () => {
    setIsMeetingOpen((prev) => !prev);
  };

  const [slidersWidth, setSlidersWidth] = useState(0);
  const [reviewSlideNumber, setReviewSlideNumber] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 321 && width < 374) {
        setReviewSlideNumber(1);
        setSlidersWidth(63);
      } else if (width <= 375) {
        setReviewSlideNumber(1);
        setSlidersWidth(75);
      } else if (width <= 425) {
        setReviewSlideNumber(1);
        setSlidersWidth(87);
      } else if (width >= 1000 && width <= 1280) {
        setSlidersWidth(151);
      } else {
        setSlidersWidth(163);
        setReviewSlideNumber(2);
      }
    };

    // Run once on mount
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const NextArrow = ({ onClick }) => {
    return (
      <div
        className={`absolute select-none text-white flex flex-col items-center justify-center gap-1 sm:w-[163px]  h-[60px] sm:h-[163px] top-0 right-[10px] z-[1] bg-[#00000061] rounded-2xl cursor-pointer`}
        style={{ width: `${slidersWidth}px`, height: `${slidersWidth}` }}
        onClick={onClick}
      >
        <div className="sm:px-[10px] px-[5px] sm:py-[12px] py-[7px] border-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
          >
            <path
              d="M12.7503 5L0.750244 5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.00027 8.75C9.00027 8.75 12.7502 5.98817 12.7502 4.99997C12.7503 4.01177 9.00024 1.25 9.00024 1.25"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-[10px] sm:text-sm font-medium">Show more</span>
      </div>
    );
  };

  const NextReview = ({ onClick }) => {
    return (
      <div
        className="absolute bg-[#0E457D] text-white top-1/2 -right-[15px] p-3 transform -translate-y-1/2 z-10 cursor-pointer rounded-full"
        onClick={onClick}
      >
        <FaChevronRight />
      </div>
    );
  };

  const PrevReview = ({ onClick }) => {
    return (
      <div
        className="absolute bg-[#F5F5F5] text-[#0E457D] top-1/2 -left-[15px] p-3 transform -translate-y-1/2 z-10 cursor-pointer rounded-full"
        onClick={onClick}
      >
        <FaChevronLeft />
      </div>
    );
  };

  const setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: reviewSlideNumber,
    slidesToScroll: 1,
    nextArrow: <NextReview />,
    prevArrow: <PrevReview />,
  };

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

  const handleCheckAvailability = () => {
    setCheckAvailabilityPopup((prev) => !prev);
    setBooking(true);
    setCancelDesc("before 8:00 AM on Apr 28 (local time)")
    setBookNowPayLaterDesc("until Apr 27");
  };


  const handleShowMoreIncludeExclude = () => {
    setShowMoreInclude(prev => {
      if(prev === 3){
        return Object.entries(includeExclude).filter(([_, value]) => value).length
      }else{
        return 3
      }
    })
    setShowMoreExclude(prev => {
      if(prev === 3){
        return Object.entries(includeExclude).filter(([_, value]) => !value).length
      }else{
        return 3
      }
    })
  }

  return (
    <div className="pb-[80px]">
      <div className="flex flex-col lg:flex-row w-full sm:gap-6 bg-[#fff] items-center lg:items-start">
        <div className="w-full lg:max-w-[640px] max-w-[700px] xl:max-w-[700px] flex flex-col gap-5">
          <div className="w-full flex justify-between">
            <h1 className="text-xl sm:text-3xl md:text-[40px] text-[#0F1416] font-semibold">
              {details?.name}
            </h1>
            <div className="flex items-center gap-3">
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 21"
                  fill="none"
                  className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px]"
                >
                  <path
                    d="M19.6427 6.03168L17.8957 4.51461C16.6371 3.42153 16.1437 2.83352 15.4621 3.04139C14.6122 3.30059 14.892 4.93609 14.892 5.48824C13.5706 5.48824 12.1968 5.38661 10.8943 5.59836C6.59453 6.29742 5.25 9.35663 5.25 12.6525C6.46697 11.9065 7.68274 11.0746 9.1454 10.7289C10.9712 10.2973 13.0103 10.5032 14.892 10.5032C14.892 11.0554 14.6122 12.6909 15.4621 12.9501C16.2344 13.1856 16.6371 12.5699 17.8957 11.4769L19.6427 9.95981C20.7142 9.02926 21.25 8.56398 21.25 7.99574C21.25 7.4275 20.7142 6.96223 19.6427 6.03168Z"
                    stroke="#49556D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.81758 1C5.95735 1.00694 3.93594 1.10152 2.64411 2.39073C1.25 3.78202 1.25 6.02125 1.25 10.4997C1.25 14.9782 1.25 17.2174 2.6441 18.6087C4.03821 20 6.28198 20 10.7695 20C15.2571 20 17.5009 20 18.895 18.6087C19.8656 17.64 20.1604 16.2603 20.25 14"
                    stroke="#49556D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 22"
                  fill="none"
                  className="w-[18px] h-[18px] sm:w-[24px] sm:h-[24px]"
                >
                  <path
                    d="M4.3949 2.35515C7.37587 0.526624 10.0501 1.25537 11.6656 2.46861C11.9314 2.6682 12.1138 2.8048 12.2496 2.89704C12.3854 2.8048 12.5678 2.6682 12.8336 2.46861C14.4491 1.25537 17.1234 0.526624 20.1043 2.35515C22.1656 3.61952 23.3254 6.2606 22.9184 9.29511C22.5095 12.3443 20.5359 15.7929 16.3563 18.8865C14.9049 19.9614 13.8397 20.7503 12.2496 20.7503C10.6595 20.7503 9.59433 19.9614 8.14294 18.8865C3.96334 15.7929 1.98976 12.3443 1.58081 9.29511C1.17382 6.2606 2.33365 3.61952 4.3949 2.35515Z"
                    stroke="#EB5B2A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-center justify-between">
            <div className="">
              <p className="text-xs sm:text-sm text-[#8993A0]">Review</p>
              {details?.reviews && <div className="flex flex-col md:flex-row gap-1 md:items-center">
                <div className="flex gap-1 items-center">
                  {renderStars(details?.reviews[0]?.rating_value || 0.0)}{" "}
                </div>
                <span className="text-[10px] sm:text-xs md:text-base text-[#8993A0]">
                  ({details?.reviews?.length} reviews)
                </span>
              </div>}
            </div>
            <div className="grid justify-center border-r-2 border-l-2 border-[#a6aaac33]">
              <p className="text-xs sm:text-sm text-[#8993A0]">Days</p>
              <p className="text-sm sm:text-base font-medium text-[#0F1416]">
                {details?.duration} days
              </p>
            </div>
            <div className="grid justify-end">
              <p className="text-sm sm:text-base text-[#8993A0]">Location</p>
              <p className="text-sm sm:text-base font-medium text-[#0F1416]">
                <span className="">
                  {details?.package_destinations[0]?.destination?.name}
                </span>
                <span className="">
                  {details?.package_destinations[1] &&
                    `, ${details?.package_destinations[1]?.destination?.name}`}
                  ,{" "}
                </span>
                <span className="">
                  {details?.package_destinations[0]?.destination?.country?.name}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {/* Show selected image */}
            <div className="flex flex-col gap-2">
              <img
                // src={testImg}
                src={selectedImage}
                alt={selectedImage}
                className="w-full h-[300px] sm:h-[390px] sm:w-[700px] object-cover rounded-xl cursor-pointer"
                onClick={() => {
                  setShowImageModal(true);
                  setModalImageIndex(0);
                }}
              />
              <div className="flex justify-end items-center gap-2">
                {/* <LuMessageSquareMore /> */}
                <p className="text-sm text-[#0F1416]">
                  {/* Offered in: {details?.package_languages[0]?.language?.name} */}
                  {details?.package_languages?.length > 1 && (
                    <Tooltip
                      title={
                        <div className="">
                          {details?.package_languages
                            .slice(1)
                            .map((lang) => lang?.language?.name)
                            .join(", ")}
                        </div>
                      }
                    >
                      <button className="text-blue-500 ml-1">
                        and {details?.package_languages?.length - 1} more
                      </button>
                    </Tooltip>
                  )}
                </p>
              </div>
            </div>
            {/* Grid images */}
            <div className="relative overflow-hidden">
              {/* <div className={`w-max flex gap-4`}>
                {details?.package_files?.map((planimg) => (
                  <button
                    key={planimg?.id}
                    className={`w-[163px] h-[163px]`}
                    onClick={() => handleShowImage(planimg?.file_url)}
                  >
                    <img
                      src={planimg?.file_url}
                      alt={planimg?.file_url}
                      className={`w-full h-full object-cover rounded-xl ${
                        planimg?.file_url === selectedImage
                          ? " ring-blue-500 ring-2"
                          : ""
                      }`}
                    />
                  </button>
                ))}
              </div> */}
              <Slider {...setting}>
                {details?.package_files?.map((planimg, index) => (
                  <div
                    key={planimg.id}
                    className="sm:w-[163px] w-[63px] sm:h-[163px] h-[60px] rounded-2xl overflow-hidden"
                    onClick={() => {
                      setShowImageModal(true);
                      setModalImageIndex(index);
                    }}
                  >
                    {location.pathname.split("/")[1] === "cruises"?<img
                      src={planimg?.file}
                      alt="Image"
                      className="w-full h-full object-cover"
                    /> : <img
                      src={planimg?.file_url}
                      alt="Image"
                      className="w-full h-full object-cover"
                    />}
                  </div>
                ))}
              </Slider>
              {showImageModal && (
                <ImageModal
                  showImageModal={showImageModal}
                  setShowImageModal={setShowImageModal}
                  images={details?.package_files}
                  modalImageIndex={modalImageIndex}
                  setModalImageIndex={setModalImageIndex}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  details={details}
                />
              )}
              {/* <div
                className="absolute select-none text-white flex flex-col items-center justify-center gap-1 w-[163px] h-[163px] top-0 right-0 z-[1] bg-[#00000061] rounded-2xl cursor-pointer"
                onClick={handleShowImageLeft}
              >
                <div className="px-[10px] py-[12px] border-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                  >
                    <path
                      d="M12.7503 5L0.750244 5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.00027 8.75C9.00027 8.75 12.7502 5.98817 12.7502 4.99997C12.7503 4.01177 9.00024 1.25 9.00024 1.25"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">Show more</span>
              </div> */}
            </div>
          </div>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                  >
                    <path
                      d="M1.24976 1.50005L7.2498 7.5L13.2498 1.5"
                      stroke="#1D1F2C"
                      strokeWidth="1.5"
                      strokeMiterlimit="16"
                    />
                  </svg>
                </div>
              </div>
              {isIncludedOpen && (
                // <div className='grid grid-cols-2'>
                //     <div className={`flex flex-col ${details?.package_tags?.filter(tag => tag?.type === 'included').length ? "gap-4" : ""}`}>
                //         {details?.package_tags?.filter(tag => tag?.type === 'included').map((inc, index) => (
                //             <div key={index} className='flex gap-3'>
                //                 <img src={circleIcon} alt="" />
                //                 <p className='md:text-base text-[#0F1416]'>{inc?.tag?.name}</p>
                //             </div>
                //         ))}
                //     </div>
                //     <div className={`flex flex-col ${details?.package_tags?.filter(tag => tag?.type === 'excluded').length ? "gap-4" : ""}`}>
                //         {details?.package_tags?.filter(tag => tag?.type === 'excluded').map((ex, index) => (
                //             <div key={index} className='flex gap-3'>
                //                 <img src={removeIcon} alt="" />
                //                 <p className='md:text-base text-[#0F1416]'>{ex?.tag?.name}</p>
                //             </div>
                //         ))}
                //     </div>
                // </div>
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="none"
                                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
                              >
                                <g clip-path="url(#clip0_5033_45319)">
                                  <path
                                    d="M6.66675 9.99935L8.77898 11.9004C9.13857 12.224 9.69724 12.1744 9.99425 11.7926L13.3334 7.49935M10.0001 18.3327C14.6025 18.3327 18.3334 14.6017 18.3334 9.99935C18.3334 5.39698 14.6025 1.66602 10.0001 1.66602C5.39771 1.66602 1.66675 5.39698 1.66675 9.99935C1.66675 14.6017 5.39771 18.3327 10.0001 18.3327Z"
                                    stroke="#14AE5C"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_5033_45319">
                                    <rect width="20" height="20" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <div className="text-sm sm:text-base">
                              {key}
                            </div>
                          </div> // Display only true values
                        ))}
                      {/* {details?.package_files?.length > 3 && (
                        <button
                          className="relative h-20 md:h-40 w-full"
                          onClick={() => setShowImageModal(true)}
                        >
                          <img
                            src={details?.package_files[3]?.file_url}
                            alt="More images"
                            className="h-20 md:h-40 w-full object-cover rounded-xl opacity-75"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                            <span className="text-white font-medium">+{details?.package_files?.length - 3} more</span>
                          </div>
                        </button>
                      )} */}
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                      {Object.entries(includeExclude)
                        .filter(([_, value]) => !value).slice(0,showMoreExclude) // Only show Excluded items
                        .map(([key], index) => (
                          <div
                            key={index}
                            className="flex gap-2 text-base text-[#475467]"
                          >
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 21 20"
                                fill="none"
                                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
                              >
                                <path
                                  d="M13.1384 12.3564L8.42431 7.64233M8.42431 12.3564L13.1384 7.64233M10.7813 18.3327C15.3837 18.3327 19.1147 14.6017 19.1147 9.99935C19.1147 5.39698 15.3837 1.66602 10.7813 1.66602C6.17896 1.66602 2.448 5.39698 2.448 9.99935C2.448 14.6017 6.17896 18.3327 10.7813 18.3327Z"
                                  stroke="#777980"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                  >
                    <path
                      d="M1.24976 1.50005L7.2498 7.5L13.2498 1.5"
                      stroke="#1D1F2C"
                      strokeWidth="1.5"
                      strokeMiterlimit="16"
                    />
                  </svg>
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M9.90039 5.1C9.90039 5.37578 9.95471 5.64885 10.0602 5.90364C10.1658 6.15842 10.3205 6.38992 10.5155 6.58492C10.7105 6.77993 10.942 6.93461 11.1968 7.04015C11.4515 7.14568 11.7246 7.2 12.0004 7.2C12.2762 7.2 12.5492 7.14568 12.804 7.04015C13.0588 6.93461 13.2903 6.77993 13.4853 6.58492C13.6803 6.38992 13.835 6.15842 13.9405 5.90364C14.0461 5.64885 14.1004 5.37578 14.1004 5.1C14.1004 4.54305 13.8791 4.0089 13.4853 3.61508C13.0915 3.22125 12.5573 3 12.0004 3C11.4434 3 10.9093 3.22125 10.5155 3.61508C10.1216 4.0089 9.90039 4.54305 9.90039 5.1Z"
                                fill="#0E457D"
                              />
                              <path
                                d="M18.7494 4C18.7478 5.21787 18.3597 6.40379 17.6408 7.38686C16.9219 8.36992 15.9095 9.09935 14.7494 9.47V20.5C14.7494 20.6989 14.6704 20.8897 14.5297 21.0303C14.3891 21.171 14.1983 21.25 13.9994 21.25C13.8005 21.25 13.6097 21.171 13.4691 21.0303C13.3284 20.8897 13.2494 20.6989 13.2494 20.5V16H10.7494V20.5C10.7494 20.6989 10.6704 20.8897 10.5297 21.0303C10.3891 21.171 10.1983 21.25 9.99938 21.25C9.80047 21.25 9.6097 21.171 9.46905 21.0303C9.3284 20.8897 9.24938 20.6989 9.24938 20.5V10.3L8.98938 10.54C8.53938 10.98 8.33938 11.41 8.03938 12.05L7.66938 12.84L6.66938 14.84C6.57921 15.0177 6.42214 15.1523 6.23273 15.2142C6.13894 15.2448 6.04003 15.2567 5.94166 15.2491C5.84328 15.2415 5.74737 15.2146 5.65938 15.17C5.48168 15.0798 5.34709 14.9228 5.2852 14.7333C5.22331 14.5439 5.23921 14.3377 5.32938 14.16L6.32938 12.16L6.60938 11.58C6.92938 10.86 7.26938 10.13 7.92938 9.48C8.30874 9.08481 8.76579 8.77241 9.27176 8.56245C9.77773 8.35249 10.3217 8.24951 10.8694 8.26L12.9994 8.25C15.3394 8.25 17.2494 6.35 17.2494 4C17.2494 3.80109 17.3284 3.61032 17.469 3.46967C17.6097 3.32902 17.8005 3.25 17.9994 3.25C18.1983 3.25 18.3891 3.32902 18.5297 3.46967C18.6704 3.61032 18.7494 3.80109 18.7494 4Z"
                                fill="#0E457D"
                              />
                            </svg>
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="none"
                                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2.29175 9.58268C2.29175 13.6098 5.55634 16.8743 9.58342 16.8743C13.6105 16.8743 16.8751 13.6098 16.8751 9.58268C16.8751 5.55561 13.6105 2.29102 9.58342 2.29102C5.55634 2.29102 2.29175 5.55561 2.29175 9.58268ZM9.58342 18.1243C4.86598 18.1243 1.04175 14.3001 1.04175 9.58268C1.04175 4.86525 4.86598 1.04102 9.58342 1.04102C14.3008 1.04102 18.1251 4.86525 18.1251 9.58268C18.1251 11.7164 17.3427 13.6675 16.0491 15.1645L18.7754 17.8907C19.0194 18.1348 19.0194 18.5305 18.7754 18.7746C18.5313 19.0187 18.1356 19.0187 17.8915 18.7746L15.1653 16.0484C13.6682 17.342 11.7172 18.1243 9.58342 18.1243Z"
                                  fill="#1D1F2C"
                                />
                              </svg>
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="9"
                                viewBox="0 0 14 9"
                                fill="none"
                              >
                                <path
                                  d="M1.24976 1.50005L7.2498 7.5L13.2498 1.5"
                                  stroke="#1D1F2C"
                                  strokeWidth="1.5"
                                  strokeMiterlimit="16"
                                />
                              </svg>
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="18"
                              viewBox="0 0 16 18"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7.99992 0.0410156C3.96695 0.0410156 0.708252 3.34162 0.708252 7.3999C0.708252 9.72888 1.63694 11.5456 3.41874 13.1246C4.57797 14.1519 6.66037 16.336 7.46627 17.6579C7.57791 17.841 7.77567 17.9541 7.99012 17.9575C8.20458 17.9609 8.40578 17.854 8.52311 17.6745C9.3811 16.3615 11.433 14.142 12.5811 13.1246C14.3629 11.5456 15.2916 9.72888 15.2916 7.3999C15.2916 3.34162 12.0329 0.0410156 7.99992 0.0410156ZM8.02922 10.2493C9.64005 10.2493 10.9459 8.94351 10.9459 7.33268C10.9459 5.72185 9.64005 4.41602 8.02922 4.41602C6.41838 4.41602 5.11255 5.72185 5.11255 7.33268C5.11255 8.94351 6.41838 10.2493 8.02922 10.2493Z"
                                fill="#0E457D"
                              />
                            </svg>
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
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="6"
                                  height="12"
                                  viewBox="0 0 6 12"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.531506 0.414376C0.20806 0.673133 0.155619 1.1451 0.414376 1.46855L4.03956 6.00003L0.414375 10.5315C0.155618 10.855 0.208059 11.3269 0.531505 11.5857C0.854952 11.8444 1.32692 11.792 1.58568 11.4685L5.58568 6.46855C5.80481 6.19464 5.80481 5.80542 5.58568 5.53151L1.58568 0.531506C1.32692 0.20806 0.854953 0.155619 0.531506 0.414376Z"
                                    fill="#0F1416"
                                  />
                                </svg>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.83268 1.67578H4.79935C4.63359 1.67578 4.47462 1.74163 4.35741 1.85884C4.2402 1.97605 4.17435 2.13502 4.17435 2.30078V7.09245H4.16602V11.2591H4.17435V17.7091C4.17435 17.8749 4.2402 18.0338 4.35741 18.1511C4.47462 18.2683 4.63359 18.3341 4.79935 18.3341C4.96511 18.3341 5.12408 18.2683 5.24129 18.1511C5.3585 18.0338 5.42435 17.8749 5.42435 17.7091V11.6674H9.22435L9.89935 12.9924C10.0077 13.2008 10.2327 13.3341 10.4577 13.3341H15.2077C15.541 13.3341 15.8243 13.0508 15.8243 12.7091V3.96745C15.8243 3.80169 15.7585 3.64272 15.6413 3.52551C15.5241 3.4083 15.3651 3.34245 15.1993 3.34245H10.841L10.1743 2.01745C10.1202 1.91473 10.0385 1.82913 9.93839 1.77025C9.83829 1.71138 9.72378 1.68155 9.60768 1.68411H4.85768H4.83268V1.67578ZM9.99935 10.5591C10.066 10.6174 10.1243 10.6841 10.166 10.7674L10.841 12.0924H14.5743V7.09245H9.99935V4.39245C9.95959 4.3501 9.92594 4.30242 9.89935 4.25078L9.23268 2.92578H5.41602V7.09245H9.99935V10.5591Z"
                              fill="#0E457D"
                            />
                          </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M12.75 8.5C12.75 8.30109 12.671 8.11032 12.5303 7.96967C12.3897 7.82902 12.1989 7.75 12 7.75C11.8011 7.75 11.6103 7.82902 11.4697 7.96967C11.329 8.11032 11.25 8.30109 11.25 8.5V12.5C11.25 12.7 11.33 12.89 11.47 13.03L14.97 16.53C15.0387 16.6037 15.1215 16.6628 15.2135 16.7038C15.3055 16.7448 15.4048 16.7668 15.5055 16.7686C15.6062 16.7704 15.7062 16.7518 15.7996 16.7141C15.893 16.6764 15.9778 16.6203 16.049 16.549C16.1203 16.4778 16.1764 16.393 16.2141 16.2996C16.2518 16.2062 16.2704 16.1062 16.2686 16.0055C16.2668 15.9048 16.2448 15.8055 16.2038 15.7135C16.1628 15.6215 16.1037 15.5387 16.03 15.47L12.75 12.19V8.5Z"
                            fill="#0E457D"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2.5C9.34784 2.5 6.8043 3.55357 4.92893 5.42893C3.05357 7.3043 2 9.84784 2 12.5C2 15.1522 3.05357 17.6957 4.92893 19.5711C6.8043 21.4464 9.34784 22.5 12 22.5C14.6522 22.5 17.1957 21.4464 19.0711 19.5711C20.9464 17.6957 22 15.1522 22 12.5C22 9.84784 20.9464 7.3043 19.0711 5.42893C17.1957 3.55357 14.6522 2.5 12 2.5ZM3.5 12.5C3.5 10.2457 4.39553 8.08365 5.98959 6.48959C7.58365 4.89553 9.74566 4 12 4C14.2543 4 16.4163 4.89553 18.0104 6.48959C19.6045 8.08365 20.5 10.2457 20.5 12.5C20.5 14.7543 19.6045 16.9163 18.0104 18.5104C16.4163 20.1045 14.2543 21 12 21C9.74566 21 7.58365 20.1045 5.98959 18.5104C4.39553 16.9163 3.5 14.7543 3.5 12.5Z"
                            fill="#0E457D"
                          />
                        </svg>
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
                      {/* <h1>
                        <span className="text-[#49556D]">Friday : </span>
                        <span className="font-medium text-[#0F1416]">
                          6:00 AM - 11:30 PM
                        </span>
                      </h1>
                      <h1>
                        <span className="text-[#49556D]">Saturday : </span>
                        <span className="font-medium text-[#0F1416]">
                          7:00 AM - 11:30 PM
                        </span>
                      </h1>
                      <h1>
                        <span className="text-[#49556D]">Sunday : </span>
                        <span className="font-medium text-[#0F1416]">
                          7:00 AM - 10:00 PM
                        </span>
                      </h1> */}
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

            {/* Trip plan */}
            {/* <div className='flex flex-col gap-5'>
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
                                                className={`${activeIndex === index ? "" : "border-b pb-3"
                                                    } w-full text-lg font-bold text-[#0F1416]`}
                                            >
                                                Day {index + 1}
                                            </h5>
                                            <img src={down} alt="" className={` text-gray-900 transition duration-500 ${activeIndex === index ? "hidden" : "block"}`} />

                                            <div className='flex flex-col justify-center items-center pl-1'>
                                                <img src={up} alt="" className={` text-gray-900 transition duration-500 ${activeIndex === index ? "block" : "hidden"}`} />
                                            </div>

                                        </button>
                                        <div
                                            ref={(el) => (contentRefs.current[index] = el)}
                                            className={`flex flex-col gap-5 overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? "max-h-full" : "max-h-0"
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
                    </div> */}
            <div className="flex flex-col gap-5">
              <div className="pt-[30px] flex flex-col gap-5 text-[#0F1416]">
                <div className="text-[24px] font-semibold">Trip Plan</div>
                {tripPlan.length <= 3
                  ? tripPlan.map((plan) => displayTripPlan(plan))
                  : tripPlan.splice(0, 3).map((plan = displayTripPlan(plan)))}
              </div>
              {tripPlan.length > 3 && (
                <div className="text-[14px] font-medium text-orange-500">
                  Show {tripPlan.length - 3} more stops
                </div>
              )}
              <div className="pb-[80px]">
                <h3 className="pb-5 text-[18px] font-semibold text-[#0F1416]">Traveler Photos:</h3>
                <div className="flex flex-col sm:flex-row gap-2 relative">
                  {TravellerPhotos.length >= 1 && (
                    <div className="flex-1 relative">
                      <img
                        src={TravellerPhotos[0]}
                        alt="Travel video"
                        className="w-full h-full object-cover rounded-xl"
                      ></img>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[10px] bg-[#FFFFFFCC] rounded-full cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="14"
                          viewBox="0 0 12 14"
                          fill="none"
                        >
                          <path
                            d="M11.1679 7.63448C10.9029 8.64175 9.65 9.35352 7.14431 10.7771C4.72204 12.1532 3.5109 12.8413 2.53488 12.5647C2.13135 12.4503 1.76369 12.2332 1.46718 11.934C0.75 11.2104 0.75 9.80695 0.75 7C0.75 4.19305 0.75 2.78957 1.46718 2.06599C1.76369 1.76683 2.13135 1.54966 2.53488 1.43532C3.5109 1.15874 4.72204 1.84681 7.14431 3.22294C9.65 4.64648 10.9029 5.35825 11.1679 6.36552C11.2774 6.78129 11.2774 7.21871 11.1679 7.63448Z"
                            stroke="#EB5B2A"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="flex-1 flex gap-2 overflow-hidden">
                    <div className="w-1/2 flex h-full flex-col gap-2">
                      {TravellerPhotos.length >= 2 && (
                        <div>
                          <img
                            src={TravellerPhotos[1]}
                            alt="Travel Photo"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      )}
                      {TravellerPhotos.length >= 3 && (
                        <div>
                          <img
                            src={TravellerPhotos[2]}
                            alt="Travel Photo"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      )}
                    </div>
                    <div className="w-1/2 flex h-full flex-col gap-2">
                      {TravellerPhotos.length >= 4 && (
                        <div>
                          <img
                            src={TravellerPhotos[3]}
                            alt="Travel Photo"
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      )}
                      {TravellerPhotos.length >= 5 && (
                        <div
                          className={`w-full ${window.innerWidth <= 325
                            ? "h-[127px]"
                            : window.innerWidth <= 380
                              ? "h-[151px]"
                              : window.innerWidth <= 450
                                ? "h-[174.48px]"
                                : "h-[151.48px]"
                            } max-w-full relative`}
                        >
                          <img
                            src={TravellerPhotos[4]}
                            alt="Travel Photo"
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <div
                            className={`absolute top-0 select-none text-white flex flex-col items-center justify-center gap-1 ${window.innerWidth <= 325
                              ? "h-[127px]"
                              : window.innerWidth <= 450
                                ? "h-[174.48px]"
                                : "h-[151.48px]"
                              } w-full bottom-0 right-0 z-[1] bg-[#00000061] rounded-2xl cursor-pointer overflow-hidden`}
                            onClick={handleShowImageLeft}
                          >
                            <div className="px-[10px] py-[12px] border-2 rounded-full">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="10"
                                viewBox="0 0 14 10"
                                fill="none"
                              >
                                <path
                                  d="M12.7503 5L0.750244 5"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.00027 8.75C9.00027 8.75 12.7502 5.98817 12.7502 4.99997C12.7503 4.01177 9.00024 1.25 9.00024 1.25"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <span className="text-sm font-medium">
                              Show more
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl max-h-fit max-w-full w-full">
          <BookCard
            details={details}
            renderStars={renderStars}
            handleCheckAvailability={handleCheckAvailability}
            booking={booking}
            cancelDesc={cancelDesc}
            bookNowPayLaterDesc={bookNowPayLaterDesc}
          />
        </div>
      </div>
      {/* Top rated reviews */}

      <div className="flex flex-col gap-12 pt-10">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h3 className="text-xl sm:text-[48px] text-[#1D1F2C] font-bold">
            Top-Rated Reviews
          </h3>
          <div className="flex gap-2 text-[#0F1416] text-lg sm:text-[24px] font-medium items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="sm:w-[24px] sm:h-[24px] w-[18px] h-[18px]"
            >
              <path
                d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                fill="#EB5B2A"
              />
            </svg>
            <div>
              <span>{4.8}</span> .{" "}
              <span className="underline">{368} Reviews</span>
            </div>
          </div>
        </div>
        <div>
          <Slider {...settings}>
            {topReviews.map((review) => (
              <div
                key={review.id}
                className="h-[180px] sm:min-h-[240px] p-6 flex flex-col rounded-2xl border border-[#a6aaac33]"
              >
                <div className="flex gap-3 items-center">
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="sm:w-[24px] sm:h-[24px] w-[18px] h-[18px]"
                    >
                      <path
                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                        fill="#EB5B2A"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="sm:w-[24px] sm:h-[24px] w-[18px] h-[18px]"
                    >
                      <path
                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                        fill="#EB5B2A"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="sm:w-[24px] sm:h-[24px] w-[18px] h-[18px]"
                    >
                      <path
                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                        fill="#EB5B2A"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="sm:w-[24px] sm:h-[24px] w-[18px] h-[18px]"
                    >
                      <path
                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                        fill="#EB5B2A"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="sm:w-[24px] sm:h-[24px] w-[18px] h-[18px]"
                    >
                      <path
                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                        fill="#EB5B2A"
                      />
                    </svg>
                  </div>
                  <div className="text-sm sm:text-[16px] text-center sm:text-start text-[#475467]">
                    <span>{review.userName}</span> . <span>{review.date}</span>
                  </div>
                </div>
                <div className="text-[#404C5C] text-xs sm:text-[20px] pt-4 tracking[0.1px]">
                  {review.body}
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-full flex justify-center">
          <button className="flex items-center gap-2 px-[18px] py-[12px] bg-orange-600 text-white rounded-full text-base">
            <span>Read all reviews </span>
            <FaArrowRight />
          </button>
        </div>
      </div>
      {checkAvailabilityPopup && (
        <div className="top-0 left-0 z-[99] w-screen h-screen bg-[#000e1999] overflow-hidden fixed flex items-center justify-center backdrop-blur-[2px]">
          <CheckAvailability
            handleCheckAvailability={handleCheckAvailability}
          />
        </div>
      )}
    </div>
  );
};

export default Details;
