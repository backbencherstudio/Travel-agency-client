import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function TourCard({ tour }) {
    console.log(tour);

    // Function to render stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
               
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
            } else {
                // Empty star
                stars.push(<FaRegStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={tour.images[0]} alt={tour.name} className="max-w-[518px]h-48 object-cover" />
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
                <div className="flex items-center mb-4">
                    {renderStars(tour.rating)} {/* Display rating with stars */}
                    <span className="ml-2 text-sm text-gray-600">{tour.rating.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">${tour.pricePerPerson} / person</span>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TourCard;
