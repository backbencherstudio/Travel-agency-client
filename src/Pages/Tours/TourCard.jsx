import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function TourCard({ tour }) {
    console.log(tour);

    // Function to render stars based on rating
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
        <div className="flex flex-col items-center gap-4 pb-5 flex-1 rounded-lg bg-white shadow-md  ">
            <img src={tour.images[0]} alt={tour.name} className=" rounded-t-lg object-cover" />
            <div className="p-4">
                <div className="flex items-center gap-5">
                    <p className="text-xs mb-2 flex items-center py-2 w-fit px-5 bg-[#0E457D] text-white rounded-full gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                                d="M6.00024 0C3.60387 0 1.6543 1.94958 1.6543 4.34592C1.6543 7.31986 5.54349 11.6858 5.70908 11.8702C5.86461 12.0434 6.13616 12.0431 6.29141 11.8702C6.45699 11.6858 10.3462 7.31986 10.3462 4.34592C10.3461 1.94958 8.39659 0 6.00024 0ZM6.00024 6.53248C4.79457 6.53248 3.81371 5.55159 3.81371 4.34592C3.81371 3.14025 4.79459 2.15939 6.00024 2.15939C7.20589 2.15939 8.18675 3.14027 8.18675 4.34595C8.18675 5.55162 7.20589 6.53248 6.00024 6.53248Z"
                                fill="white"
                            />
                        </svg>
                        {tour.location}
                    </p>
                    <p className="text-xs mb-2 flex items-center py-2 w-fit px-5 bg-[#0E457D] text-white rounded-full gap-2">
                        {"Hotel + All inclusive"}
                    </p>
                </div>
                <h3
                    style={{
                        color: "#1D1F2C",
                        fontFamily: "Inter",
                        fontSize: "20px",
                        fontStyle: "normal",
                        marginBottom: "8px",
                        fontWeight: 700,
                        lineHeight: "130%",
                        letterSpacing: "0.1px",
                    }}
                >
                    {tour.name}
                </h3>
                <p
                    style={{
                        color: "#4A4C56",
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "140%",
                        letterSpacing: "0.07px",
                    }}
                    className="text-gray-700 mb-4"
                >
                    {tour.overview}
                </p>
                <div className="flex items-center mb-4 gap-2">
                    <div className='flex items-center gap-1'>  <span className="ml-2 mr-2 font-medium text-sm text-gray-600">{tour.rating.toFixed(1)}</span>
                        <div className='flex items-center gap-[2px]'>{renderStars(tour.rating)}</div></div>
                    <div className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.00033 1.16699C3.77858 1.16699 1.16699 3.77858 1.16699 7.00033C1.16699 10.2221 3.77858 12.8337 7.00033 12.8337C10.2221 12.8337 12.8337 10.2221 12.8337 7.00033C12.8337 3.77858 10.2221 1.16699 7.00033 1.16699ZM9.05951 9.05951C8.97434 9.14468 8.86233 9.18783 8.75033 9.18783C8.63833 9.18783 8.52631 9.14526 8.44114 9.05951L6.69114 7.30951C6.60889 7.22726 6.56283 7.11583 6.56283 7.00033V4.08366C6.56283 3.84216 6.75883 3.64616 7.00033 3.64616C7.24183 3.64616 7.43783 3.84216 7.43783 4.08366V6.81889L9.05951 8.44057C9.23043 8.61207 9.23043 8.88859 9.05951 9.05951Z" fill="#4A4C56" />
                        </svg> <span>{tour.days} days</span>
                    </div>
                </div>
                <p><span className='text-orange-500'>Cancellation Policy</span> ( {tour.cancellationPolicy}  )</p>
                <hr className='my-4' />
                <div className="flex justify-between items-center">
                    <div>
                        <h4>Starting Form</h4>
                        <span className="text-lg font-medium">${tour.pricePerPerson} / person</span>
                    </div>

                    <button class="flex px-4 py-2 justify-center items-center gap-1.5 rounded-full border border-blue-600 shadow-xs">
                        Book Now <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3.33301 8H12.6663" stroke="#0E457D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 3.33301L12.6667 7.99967L8 12.6663" stroke="#0E457D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TourCard;
