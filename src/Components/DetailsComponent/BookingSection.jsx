import React from 'react';
import BookCard from './BookCard';

const BookingSection = ({ details, renderStars, handleCheckAvailability, booking, cancelDesc, bookNowPayLaterDesc }) => {
  return (
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
  );
};

export default BookingSection;
