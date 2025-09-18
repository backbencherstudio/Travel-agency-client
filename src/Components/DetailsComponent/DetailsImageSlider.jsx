import { shareIcon, loveIcon } from '../../../public/Icons';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import ImageModal from './ImageModal';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../Components/ui/carousel";

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

export default function DetailsImageSlider({ details, handleSharePhoto, selectedImage, handleUpdateReviewSlider }) {
    const [slidersWidth, setSlidersWidth] = useState(0);
    const [showImageModal, setShowImageModal] = useState(false);
    const [activeTab, setActiveTab] = useState('provider');
    const [modalImageIndex, setModalImageIndex] = useState(0);
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 310 && width < 374) {
                handleUpdateReviewSlider(1)
                setSlidersWidth(63);
            } else if (width <= 375) {
                handleUpdateReviewSlider(1)
                setSlidersWidth(75);
            } else if (width <= 425) {
                handleUpdateReviewSlider(1)
                setSlidersWidth(87);
            } else if (width >= 1000 && width <= 1280) {
                setSlidersWidth(151);
            } else {
                setSlidersWidth(163);
                handleUpdateReviewSlider(2)
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleImageClick = (state, index) => {
        setShowImageModal(state);
        setModalImageIndex(index);
    }


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


    return (
        <div className=' space-y-4'>
            <div className="w-full flex justify-between">
                <h1 className="text-xl sm:text-3xl md:text-[40px] text-[#0F1416] font-semibold pr-4">
                    {details?.name}
                </h1>
                <div className="flex items-center gap-3">
                    <div className="cursor-pointer" onClick={handleSharePhoto}>
                        {shareIcon}
                    </div>
                    <div className="cursor-pointer">
                        {loveIcon}
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
                        <span className="text-[10px] sm:text-xs md:text-base text-[#8993A0] text-nowrap">
                            ({details?.reviews?.length} reviews)
                        </span>
                    </div>}
                </div>
                <div className="grid justify-center border-r-2 border-l-2 border-[#a6aaac33]">
                    <p className="text-xs sm:text-sm text-[#8993A0]">Duration</p>
                    <p className="text-sm sm:text-base font-medium text-[#0F1416]">
                        {details?.duration} {details?.type === "tour"?"hours":"days"}
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
                            handleImageClick(true, 0)
                        }}
                    />
                    <div className="flex justify-end items-center gap-2">
                        <p className="text-sm text-[#0F1416]">
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
                <div className="relative overflow-hidden mx-auto">
                    <div className="w-full max-w-[85%] mx-auto">
                        <Carousel infinite loop>
                            <CarouselContent className="flex gap-2">
                                {details?.package_files?.map((planimg, index) => (
                                    <CarouselItem key={planimg.id} className=" basis-1/5">
                                        <div
                                            onClick={() => handleImageClick(true, index)}
                                            className="cursor-pointer"
                                        >
                                            {location.pathname.split("/")[1] === "cruises" ? (
                                                <img
                                                    src={planimg?.file}
                                                    alt="Image"
                                                    className="w-full aspect-square object-cover"
                                                />
                                            ) : (
                                                <img
                                                    src={planimg?.file_url}
                                                    alt="Image"
                                                    className="w-full aspect-video object-cover"
                                                />
                                            )}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {/* <CarouselPrevious /> */}
                            <CarouselNext />
                        </Carousel>
                    </div>
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
                </div>
            </div>
        </div>
    )
}