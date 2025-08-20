import React from 'react';
import Slider from 'react-slick';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const ReviewsSection = ({ details, showAllReviews, setShowAllReviews }) => {
  const NextReview = ({ onClick }) => (
    <div className="absolute bg-[#0E457D] text-white top-1/2 -right-[15px] p-3 transform -translate-y-1/2 z-10 cursor-pointer rounded-full" onClick={onClick}>
      <FaChevronRight />
    </div>
  );

  const PrevReview = ({ onClick }) => (
    <div className="absolute bg-[#F5F5F5] text-[#0E457D] top-1/2 -left-[15px] p-3 transform -translate-y-1/2 z-10 cursor-pointer rounded-full" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );

  return (
    <div>
      <Slider dots={false} infinite={true} speed={500} slidesToShow={2} slidesToScroll={1} nextArrow={<NextReview />} prevArrow={<PrevReview />}>
        {details?.reviews?.map((review) => (
          <div key={review.id} className="h-[180px] sm:min-h-[240px] p-6 flex flex-col rounded-2xl border border-[#a6aaac33]">
            <div className="flex gap-3 items-center">
              <div className="text-[16px] font-medium text-[#0F1416]">{review.userName}</div>
              <div className="text-[14px] text-[#8993A0]">({review.date})</div>
            </div>
            <div className="text-[#404C5C] text-xs sm:text-[20px] pt-4">{review.body}</div>
          </div>
        ))}
      </Slider>
      <div className="w-full flex justify-center">
        <button className="flex items-center gap-2 px-[18px] py-[12px] bg-orange-600 text-white rounded-full text-base" onClick={() => setShowAllReviews(!showAllReviews)}>
          <span>Read all reviews</span>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ReviewsSection;
