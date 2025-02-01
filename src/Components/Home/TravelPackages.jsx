import React from 'react';
import package1 from "../../assets/img/travel-packages/package-1.png";
import package2 from "../../assets/img/travel-packages/package-2.png";
import package3 from "../../assets/img/travel-packages/package-3.png";
import { Link } from 'react-router-dom';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
// import timer from "../../assets/img/package-3.png";
import { useTravelData } from '../../Context/TravelDataContext/TravelDataContext';

const TravelPackages = () => {
    const { homeData } = useTravelData();
    // console.log("homeData", homeData);

    
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

// console.log(homeData.)
  return (
    <div className='max-w-[1216px] mx-auto px-5 2xl:px-0'>
        <div className='text-2xl md:text-5xl font-bold text-center'>Exclusive Travel Packages</div>
        <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center gap-5 mb-8 pt-12'>
            {homeData?.packages?.map(tour => (
                <Link to={`/packages/${tour?.id}`} key={tour?.id}>
                    <div className="relative flex flex-col my-6 bg-white group shadow-md hover:shadow-lg hover:border-orange-500 transform duration-300 border border-slate-200 rounded-lg">
                        <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                            <img src={tour?.package_files[0]?.file_url} alt={tour?.package_files[0]?.file_url} />
                        </div>
                        <div className="p-4">
                            <div className='flex items-center gap-1'>
                                <div className="mb-5 bg-[#E7ECF2] text-[#0E457D] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#90A9C3] dark:bg-gray-700 dark:text-gray-300">
                                    Family Package
                                </div>
                                <div className="mb-5 bg-[#E7ECF2] text-[#0E457D] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#90A9C3] dark:bg-gray-700 dark:text-gray-300">
                                    {tour?.package_tags?.length > 0 ? `${tour?.package_tags[0]?.tag?.name} + All inclusive` : 'No inclusive'}
                                </div>
                            </div>
                            <Link to={`/packages/${tour?.id}`} className="mb-2 text-[#1D1F2C] text-xl font-bold line-clamp-2 group-hover:text-blue-500 transform duration-300">
                                {tour?.name}
                            </Link>
                            <p className="text-[#4A4C56] text-sm leading-normal font-normal">
                                {tour?.description?.split(' ').slice(0, 10).join(' ')}...
                                <Link to={`/packages/${tour?.id}`} className='text-blue-500'>Read more</Link>
                            </p>
                            <div className='flex justify-between items-center gap-2 mt-3'>
                                <div className='flex items-center gap-2'>
                                    <p className='mt-[2px] text-xs'>{tour?.average_rating ? Number(tour?.average_rating).toFixed(1) : 0}</p>
                                    <div className="flex gap-1 items-center">
                                        {renderStars(tour?.average_rating ? tour?.average_rating : 0)}
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <div className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.99984 1.16699C3.77809 1.16699 1.1665 3.77858 1.1665 7.00033C1.1665 10.2221 3.77809 12.8337 6.99984 12.8337C10.2216 12.8337 12.8332 10.2221 12.8332 7.00033C12.8332 3.77858 10.2216 1.16699 6.99984 1.16699ZM9.05902 9.05951C8.97385 9.14468 8.86184 9.18783 8.74984 9.18783C8.63784 9.18783 8.52582 9.14526 8.44065 9.05951L6.69065 7.30951C6.6084 7.22726 6.56234 7.11583 6.56234 7.00033V4.08366C6.56234 3.84216 6.75834 3.64616 6.99984 3.64616C7.24134 3.64616 7.43734 3.84216 7.43734 4.08366V6.81889L9.05902 8.44057C9.22994 8.61207 9.22994 8.88859 9.05902 9.05951Z" fill="#4A4C56"/>
                                        </svg>
                                    </div>
                                    <p className="ms-1 text-[11px]  text-[#1D1F2C]">{tour?.duration} days</p>
                                </div>
                                <div className="flex items-center ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M6.00024 0C3.60387 0 1.6543 1.94958 1.6543 4.34592C1.6543 7.31986 5.54349 11.6858 5.70908 11.8702C5.86461 12.0434 6.13616 12.0431 6.29141 11.8702C6.45699 11.6858 10.3462 7.31986 10.3462 4.34592C10.3461 1.94958 8.39659 0 6.00024 0ZM6.00024 6.53248C4.79457 6.53248 3.81371 5.55159 3.81371 4.34592C3.81371 3.14025 4.79459 2.15939 6.00024 2.15939C7.20589 2.15939 8.18675 3.14027 8.18675 4.34595C8.18675 5.55162 7.20589 6.53248 6.00024 6.53248Z" fill="#4A4C56"/>
                                        </svg>
                                    </div>
                                    <p className="ms-1 text-[11px]  text-[#1D1F2C]">{tour?.package_destinations[0]?.destination?.name}, {tour?.package_destinations[0]?.destination?.country?.name}</p>
                                </div>
                            </div>
                            <div className='text-sm mt-1 text-[#0068EF]'>{tour?.cancellation_policy?.policy} <span className='text-xs text-[#49556D]'>(Cancel within 24H)</span></div>
                        </div>
                        <div className='px-4'>
                            <hr />
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="">
                                <div className='text-xs'>Starting From</div>
                                <div className='text-xl text-[#0E457D] font-bold'>${tour?.price}</div>
                            </div>
                            <button className='flex justify-between items-center gap-1 px-4 py-[10px] border border-[#0E457D] hover:bg-[#7aa6d3] hover:border-none rounded-full shadow-md text-[#0E457D] hover:text-white'>
                                <Link to={`/packages/${tour?.id}`} className='text-sm '>Book Now</Link>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path d="M3.66699 8H13.0003" stroke="#0E457D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.3335 3.33301L13.0002 7.99967L8.3335 12.6663" stroke="#0E457D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div> 
                </Link>
            ))}
        </div>
        <div className='grid justify-center'>
            <Link to={'/packages'} className='flex gap-2 items-center justify-center group  hover:bg-transparent hover:text-orange-500 hover:shadow-lg transform duration-300 px-5 py-3 bg-[#D65326] rounded-full text-white text-base'>
                View All Package
                <svg xmlns="http://www.w3.org/2000/svg" className='group-hover:stroke-orange-500 duration-300' width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M4.6665 10H16.3332" stroke="white" className='duration-300 group-hover:stroke-orange-500' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5 4.16699L16.3333 10.0003L10.5 15.8337" stroke="white" className='duration-300 group-hover:stroke-orange-500' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Link>
        </div>
    </div>
  )
}

export default TravelPackages