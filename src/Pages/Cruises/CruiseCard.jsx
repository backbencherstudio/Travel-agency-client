import { useState } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import cardImg from "../../assets/img/Cruise/card-img.png"
import Details from '../../Components/DetailsComponent/Details';

const CruiseCard = ({ cruise, lovedPackages,
    handleLovedPackages,
    specialOffer,specialPrice=99.9 }) => {
    // console.log('cruise', cruise)
    // Function to render stars based on rating
    const [truncateDescription, setTruncateDescription] = useState(70);
    const [isFavourite, setIsFavourite] = useState(false)
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {

                stars.push(<FaStar key={i} className="text-orange-500" />);
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {

                stars.push(<FaStarHalfAlt key={i} className="text-orange-500" />);
            } else {
                // Empty star
                stars.push(<FaRegStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div key={cruise?.id} className="relative grid md:grid-cols-2 gap-6 bg-white shadow-md border border-slate-200 rounded-[10px] p-6">
            <div className="relative w-full h-full overflow-hidden text-white rounded-2xl">
                <img src={cardImg} alt="card-image" className='h-full object-cover' />
                {/* <img src={cruise?.package_images[0]?.image_url} alt="card-image" /> */}
            </div>
            <div className='flex flex-col gap-4 justify-center'>
                <div className="">
                    <div className='flex items-center gap-1'>
                        <div className="flex gap-1 items-center mb-5 bg-[#0E457D] text-white text-xs font-medium me-2 px-3 py-[6px] rounded-full border border-[#90A9C3] dark:bg-gray-700 dark:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path
                                    d="M6.00024 0C3.60387 0 1.6543 1.94958 1.6543 4.34592C1.6543 7.31986 5.54349 11.6858 5.70908 11.8702C5.86461 12.0434 6.13616 12.0431 6.29141 11.8702C6.45699 11.6858 10.3462 7.31986 10.3462 4.34592C10.3461 1.94958 8.39659 0 6.00024 0ZM6.00024 6.53248C4.79457 6.53248 3.81371 5.55159 3.81371 4.34592C3.81371 3.14025 4.79459 2.15939 6.00024 2.15939C7.20589 2.15939 8.18675 3.14027 8.18675 4.34595C8.18675 5.55162 7.20589 6.53248 6.00024 6.53248Z"
                                    fill="white"
                                />
                            </svg>
                            {cruise?.package_destinations[0]?.destination?.name}, {cruise?.package_destinations[0]?.destination?.country?.name}
                        </div>
                        <div className="mb-5 bg-[#0E457D] text-white text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#90A9C3] dark:bg-gray-700 dark:text-gray-300">
                            Hotel + All inclusive
                        </div>
                    </div>
                    <Link to={`${cruise?.id}`} className="mb-2 text-[#1D1F2C] text-xl font-bold hover:text-blue-500">
                        {cruise?.name}
                    </Link>
                    <p className="text-[#4A4C56] text-sm leading-normal font-normal">
                        {cruise?.description.slice(0, truncateDescription)}...
                        <span className=' text-blue-500 cursor-pointer' onClick={() => setTruncateDescription(prev => prev === 70 ? cruise?.description?.length : 70)}>{truncateDescription === 70 ? "Read more" : "Read Less"}</span>
                    </p>
                    <div className='flex items-center gap-2 mt-3'>
                        {/* <p className=' text-sm'>{cruise?.reviews[0]?.rating_value}</p> */}
                        <p className=' text-sm'>{4.0}</p>
                        <div className="flex gap-1 items-center">
                            {/* {renderStars(cruise?.reviews[0]?.rating_value)} */}
                            {renderStars(4)}
                        </div>
                        <div className='flex items-center'>
                            <div className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.99984 1.16699C3.77809 1.16699 1.1665 3.77858 1.1665 7.00033C1.1665 10.2221 3.77809 12.8337 6.99984 12.8337C10.2216 12.8337 12.8332 10.2221 12.8332 7.00033C12.8332 3.77858 10.2216 1.16699 6.99984 1.16699ZM9.05902 9.05951C8.97385 9.14468 8.86184 9.18783 8.74984 9.18783C8.63784 9.18783 8.52582 9.14526 8.44065 9.05951L6.69065 7.30951C6.6084 7.22726 6.56234 7.11583 6.56234 7.00033V4.08366C6.56234 3.84216 6.75834 3.64616 6.99984 3.64616C7.24134 3.64616 7.43734 3.84216 7.43734 4.08366V6.81889L9.05902 8.44057C9.22994 8.61207 9.22994 8.88859 9.05902 9.05951Z" fill="#4A4C56" />
                                </svg>
                            </div>
                            <p className="ms-1 text-sm  text-gray-600 dark:text-gray-400">{cruise?.duration}</p>
                        </div>
                    </div>
                    {/* <div className='text-sm mt-1 text-[#EB5B2A]'>Cancellation Policy <span className='text-xs text-[#49556D]'>({cruise?.cancellation_policy?.policy})</span></div> */}
                </div>
                <div className=''>
                    <hr />
                </div>
                <div className="flex items-center justify-between">
                    <div className="">
                        <div className='text-xs'>Starting From</div>
                        {!specialOffer[cruise.id] && (
                            <div className="text-xl text-[#0E457D] font-bold">
                                ${cruise?.price}
                            </div>
                        )}
                        {specialOffer[cruise.id] && (
                            <div>
                                <span className="text-[20px] font-bold text-orange-500 pr-1">
                                    ${specialPrice}
                                </span>
                                <span className="text-xs text-[#0E457D]">
                                    /<del>{cruise?.price}</del>
                                </span>
                            </div>
                        )}
                    </div>
                    <Link to={`${cruise?.id}`} className='flex justify-between items-center gap-1 px-4 py-[10px] border border-[#0E457D] hover:bg-[#7aa6d3] hover:border-none rounded-full shadow-md text-[#0E457D] hover:text-white'>
                        <div className='text-sm '>View Details</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <path d="M3.66699 8H13.0003" stroke="#0E457D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.3335 3.33301L13.0002 7.99967L8.3335 12.6663" stroke="#0E457D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
            {specialOffer[cruise?.id] && <div className={`absolute ${location.pathname.split("/")[1] === "cruises"? "top-9 left-9":"top-4 left-4"} bg-orange-500 text-white px-3 py-[6px] rounded-md text-sm font-medium`}>
                Special Offer
            </div>}
            {/* // )} */}
            {/* Favourite Button */}
            <button
                className='absolute top-4 right-4 transition-colors duration-300'
                onClick={(e) => {
                    e.preventDefault();
                    // Add your favourite logic here
                    setIsFavourite(!isFavourite)
                }}
            >
                {isFavourite ?<svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                    <path d="M3.1449 1.85515C6.12587 0.0266241 8.8001 0.755371 10.4156 1.96861C10.6814 2.1682 10.8638 2.3048 10.9996 2.39704C11.1354 2.3048 11.3178 2.1682 11.5836 1.96861C13.1991 0.755371 15.8734 0.0266242 18.8543 1.85515C20.9156 3.11952 22.0754 5.7606 21.6684 8.79511C21.2595 11.8443 19.2859 15.2929 15.1063 18.3865C13.6549 19.4614 12.5897 20.2503 10.9996 20.2503C9.40955 20.2503 8.34433 19.4614 6.89294 18.3865C2.71334 15.2929 0.739756 11.8443 0.330808 8.79511C-0.0761763 5.7606 1.08365 3.11952 3.1449 1.85515Z" fill="#EB5B2A" />
                </svg>:
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                    <path d="M4.1449 2.35515C7.12587 0.526624 9.8001 1.25537 11.4156 2.46861C11.6814 2.6682 11.8638 2.8048 11.9996 2.89704C12.1354 2.8048 12.3178 2.6682 12.5836 2.46861C14.1991 1.25537 16.8734 0.526624 19.8543 2.35515C21.9156 3.61952 23.0754 6.2606 22.6684 9.29511C22.2595 12.3443 20.2859 15.7929 16.1063 18.8865C14.6549 19.9614 13.5897 20.7503 11.9996 20.7503C10.4095 20.7503 9.34433 19.9614 7.89294 18.8865C3.71334 15.7929 1.73976 12.3443 1.33081 9.29511C0.923824 6.2606 2.08365 3.61952 4.1449 2.35515Z" stroke="#EB5B2A" stroke-width="1.5" stroke-linecap="round" />
                </svg>}
            </button>
        </div>
    );
}

export default CruiseCard