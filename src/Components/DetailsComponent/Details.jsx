import React, { useEffect, useRef, useState } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import circleIcon from '../../assets/img/tour-details/check-circle.svg';
import removeIcon from '../../assets/img/tour-details/remove-circle.svg';
import up from '../../assets/img/tour-details/direction-up.svg';
import down from '../../assets/img/tour-details/direction-down.svg';
import sharerIcon from '../../assets/img/sharer.svg';
import BookCard from './BookCard';
import { LuMessageSquareMore } from 'react-icons/lu';
import { Tooltip } from '@mui/material';
import { toast } from 'react-toastify';
import { CrossIcon } from 'lucide-react';

const Details = ({ details }) => {
    const [selectedImage, setSelectedImage] = useState();
    const [activeIndex, setActiveIndex] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false);
    const contentRefs = useRef([]);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [isIncludedExcludedOpen, setIsIncludedExcludedOpen] = useState(false);
    const [showAllIncluded, setShowAllIncluded] = useState(false);
    const [showAllExcluded, setShowAllExcluded] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [activeTab, setActiveTab] = useState('provider'); // 'provider' or 'traveler'
    const [modalImageIndex, setModalImageIndex] = useState(0);

    const images = activeTab === 'provider' ? details?.package_files || [] : []; // Add traveler photos if available

    useEffect(() => {
        setSelectedImage(details?.package_files[0]?.file_url)
    }, [details])

    const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };
    console.log('tour', details);

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

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = details?.name || 'Check out this tour!';

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard');
                break;
            default:
                setShowShareMenu(!showShareMenu);
        }
    }

    const showMoreIncludedExcluded = () => {
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-[#F0F4F9]">
            <div className="col-span-2 flex flex-col gap-5">
                <div className='flex flex-col md:flex-row gap-3 justify-between md:items-center'>
                    <h1 className="text-3xl md:text-[40px] text-[#0F1416] font-semibold">{details?.name}</h1>
                    <div className='flex flex-row gap-3 items-center relative'>
                        <div className="relative">
                            <img src={sharerIcon} className='cursor-pointer' alt="sharer" onClick={() => handleShare()} />
                            {showShareMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <button onClick={() => handleShare('facebook')} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                                        </svg>
                                        Facebook
                                    </button>
                                    <button onClick={() => handleShare('twitter')} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                                        </svg>
                                        Twitter
                                    </button>
                                    <button onClick={() => handleShare('linkedin')} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        LinkedIn
                                    </button>
                                    <button onClick={() => handleShare('whatsapp')} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        WhatsApp
                                    </button>
                                    <button onClick={() => handleShare('copy')} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                        Copy Link
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* Favourite Button */}
                        <button
                            className=''
                            onClick={(e) => {
                                e.preventDefault();
                                // Add your favourite logic here
                                setIsFavourite(!isFavourite)
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill={`${isFavourite ? 'currentColor' : 'none'}`}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-red-500 transition-colors duration-300"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
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
                        <p className="text-base font-medium text-[#0F1416]">
                            <span className='text-blue-500'>{details?.package_destinations[0]?.destination?.name}</span>
                            <span className='text-blue-500'>{details?.package_destinations[1] && `, ${details?.package_destinations[1]?.destination?.name}`}, </span>
                            <span className='text-blue-500'>{details?.package_destinations[0]?.destination?.country?.name}</span>
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
                            className="h-96 w-full object-cover rounded-xl"
                        />
                        <div className='flex justify-end items-center gap-2'>
                            <LuMessageSquareMore />
                            <p className='text-sm text-[#0F1416]'>
                                Offered in: {details?.package_languages[0]?.language?.name}
                                {details?.package_languages?.length > 1 && (
                                    <Tooltip
                                        title={
                                            <div className=''>
                                                {details?.package_languages
                                                    .slice(1)
                                                    .map(lang => lang?.language?.name)
                                                    .join(', ')
                                                }
                                            </div>
                                        }
                                    >
                                        <button className='text-blue-500 ml-1'>
                                            and {details?.package_languages?.length - 1} more
                                        </button>
                                    </Tooltip>
                                )}
                            </p>
                        </div>
                    </div>
                    {/* Grid images */}
                    <div className="grid grid-cols-4 gap-4">
                        {details?.package_files?.slice(0, 3).map((planimg, index) => (
                            <button
                                key={planimg?.id}
                                className={``}
                                onClick={() => { setShowImageModal(true); setModalImageIndex(index); }}
                            >
                                <img
                                    src={planimg?.file_url}
                                    alt={planimg?.file_url}
                                    className={`h-20 md:h-40 w-full object-cover rounded-xl ${planimg?.file_url === selectedImage ? ' ring-blue-500 ring-2' : ''}`}
                                />
                            </button>
                        ))}
                        {details?.package_files?.length > 3 && (
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
                        )}
                    </div>
                    {showImageModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#232a2f]">

                            <div className='py-4'>
                                {/* Close Button */}
                                <button onClick={() => setShowImageModal(false)} className="absolute top-4 right-4 text-gray-400 text-2xl">
                                    <span className='flex items-center px-2 bg-gray-100 rounded-full'>&times;</span>
                                </button>
                            </div>
                            <div className="relative w-full h-full max-w-7xl flex flex-col justify-between items-center">
                                {/* Tabs */}
                                <div className="flex justify-center mb-4">
                                    <button
                                        className={`px-4 py-2 ${activeTab === 'provider' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
                                        onClick={() => setActiveTab('provider')}
                                    >
                                        Provider photos ({details?.package_files?.length})
                                    </button>
                                    <button
                                        className={`px-4 py-2 ${activeTab === 'traveler' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
                                        onClick={() => setActiveTab('traveler')}
                                    >
                                        Traveler photos (0)
                                    </button>
                                </div>
                                {/* Main Image */}
                                <div className="relative flex items-center justify-center w-full">
                                    {/* Left Arrow */}
                                    <button
                                        className="absolute left-0 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full"
                                        onClick={() => setModalImageIndex((modalImageIndex - 1 + images.length) % images.length)}
                                    >
                                        &#8592;
                                    </button>
                                    <img
                                        src={images[modalImageIndex]?.file_url}
                                        alt=""
                                        className="max-h-[400px] rounded-xl mx-auto"
                                    />
                                    {/* Right Arrow */}
                                    <button
                                        className="absolute right-0 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full"
                                        onClick={() => setModalImageIndex((modalImageIndex + 1) % images.length)}
                                    >
                                        &#8594;
                                    </button>
                                </div>
                                <div>
                                    {/* Photo count */}
                                    <div className="text-white mt-2 text-right">{modalImageIndex + 1}/{images.length}</div>
                                    {/* Thumbnails */}
                                    <div className="flex gap-2 mt-4">
                                        {images.map((img, idx) => (
                                            <img
                                                key={img.file_url}
                                                src={img.file_url}
                                                alt=""
                                                className={`h-24 w-24 object-cover rounded cursor-pointer ${idx === modalImageIndex ? 'ring-2 ring-white' : ''}`}
                                                onClick={() => setModalImageIndex(idx)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col gap-[30px]'>
                    <div className='flex flex-col gap-5 border-b pb-5'>
                        <h3 className='text-[40px] font-semibold text-[#0F1416]'>Overview</h3>
                        <p className='text-base font-normal text-[#0F1416] self-stretch'>{details?.description}</p>
                    </div>
                    <div className='flex flex-col gap-5 border-b pb-5'>
                        <div className="flex flex-col gap-5">
                            <button
                                className="flex items-center justify-between text-left w-full"
                                onClick={() => setIsIncludedExcludedOpen(!isIncludedExcludedOpen)}
                            >
                                <h3 className='text-xl font-bold text-[#0F1416]'>Included/Excluded</h3>
                                <img
                                    src={down}
                                    alt=""
                                    className={`w-6 h-6 transition duration-500 ${isIncludedExcludedOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                        </div>
                        <div
                            className={`grid grid-cols-2 overflow-hidden transition-all duration-300 ease-in-out shadow-inner rounded-2xl ${isIncludedExcludedOpen ? "p-4 max-h-full" : "max-h-0"}`}
                        >
                            <div className='flex flex-col gap-4'>
                                {details?.package_tags?.filter(tag => tag?.type === 'included').slice(0, showAllIncluded ? undefined : 3).map((inc, index) => (
                                    <div key={index} className='flex gap-3'>
                                        <img src={circleIcon} alt="" />
                                        <p className='md:text-base text-[#0F1416]'>{inc?.tag?.name}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col gap-4'>
                                {details?.package_tags?.filter(tag => tag?.type === 'excluded').slice(0, showAllExcluded ? undefined : 3).map((ex, index) => (
                                    <div key={index} className='flex gap-3'>
                                        <img src={removeIcon} alt="" />
                                        <p className='md:text-base text-[#0F1416]'>{ex?.tag?.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {details?.package_tags?.filter(tag => tag?.type === 'included').length > 3 && (
                            <button
                                className='text-[#EB5B2A] text-sm text-center'
                                onClick={() => setShowAllIncluded(!showAllIncluded)}
                            >
                                {showAllIncluded ? 'Show less' : `See more (+${details?.package_tags?.filter(tag => tag?.type === 'included').length - 3})`}
                            </button>
                        )}
                        {details?.package_tags?.filter(tag => tag?.type === 'excluded').length > 3 && (
                            <button
                                className='text-[#EB5B2A] text-sm text-center'
                                onClick={() => setShowAllExcluded(!showAllExcluded)}
                            >
                                {showAllExcluded ? 'Show less' : `See more (+${details?.package_tags?.filter(tag => tag?.type === 'excluded').length - 3})`}
                            </button>
                        )}
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
                                                className={`${activeIndex === index ? "" : "border-b pb-3"
                                                    } w-full text-lg font-bold text-[#0F1416]`}
                                            >
                                                Day {index + 1}
                                            </h5>
                                            <img
                                                src={down}
                                                alt=""
                                                className={`w-6 h-6 transition duration-500 ${activeIndex === index ? "rotate-180" : ""}`}
                                            />

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
