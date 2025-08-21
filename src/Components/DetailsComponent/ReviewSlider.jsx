import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../Components/ui/carousel";

import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { GoDotFill  } from "react-icons/go";

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

const ReviewSlider = ({ details, reviewSlideNumber }) => {
    return (
        <div className="w-full p-4 max-w-[90%] mx-auto">
            <Carousel>
                <CarouselContent className="flex py-5 px-2 space-x-4 w-full">
                    {details?.reviews?.map((review, index) => (
                        <CarouselItem key={index} className="justify-stretch lg:basis-1/2">
                            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 h-full">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        {renderStars(review?.rating_value)}
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">{review?.user?.name} <GoDotFill /></div>
                                    <div className="text-sm text-gray-500">{review.created_at.split("T")[0]}</div>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="transition-all" />
                <CarouselNext className="transition-all" />
            </Carousel>
        </div>
    );
};

export default ReviewSlider;
