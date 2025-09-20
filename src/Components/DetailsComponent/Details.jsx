import React, { useEffect, useRef, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import BookCard from "./BookCard";
import CheckAvailability from "./CheckAvaiability";
import { FaArrowRight } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AllReviews from "./AllReviews";
import PostNewReview from "./PostNewReview";
import SharePhotos from "./SharePhotos";
import avatar from "../../assets/img/packages/banner.png";
import "./details.css";
import DetailsImageSlider from "./DetailsImageSlider";
import AdditionalInformation from "./AdditionalInformation";
import ReviewSlider from "./ReviewSlider";

//Icon imports

import {
  watchIcon,
  flagIcon,
  locationIcon,
  downArrow,
  crossWithCircle,
  ticWithCircle,
  fullAvatarHandUp,
  searchIcon,
} from "../../../public/Icons";

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
  const [imgTranslate, setImgTranslate] = useState(0);
  const [checkAvailabilityPopup, setCheckAvailabilityPopup] = useState(false);
  const [booking, setBooking] = useState(false);
  const [cancelDesc, setCancelDesc] = useState(
    "up to 24 hours before the experience starts (local time)"
  );
  const [bookNowPayLaterDesc, setBookNowPayLaterDesc] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [postNewReview, setPostNewReview] = useState(false);
  const [travelerPhotoIsOpen, setTravelerPhotoIsOpen] = useState(0);
  const [sharePhoto, setSharePhoto] = useState(false);
  const [reviewSlideNumber, setReviewSlideNumber] = useState(1);

  console.log("Include exlude : ", includeExclude);

  useEffect(() => {
    if (location.pathname.split("/")[1] === "cruises") {
      setSelectedImage(details?.package_files[0]?.file);
    } else {
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

  const handleUpdateReviewSlider = (num) => {
    setReviewSlideNumber(num);
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

  const reviews = [
    {
      avatar: avatar,
      user: {
        name: "Samantha Lau",
        user_name: "baleful_exorcism_76",
      },
      review: 4.5,
      description:
        "I stayed 5 night with my family(2 adult 2 child) for total 41k in the new house which is independent of the main house and other listing where the owner stays. I liked the house for peaceful and beautiful surrounding. The big yard with variety of flowers/fruits were loved my children. I truely appreciate the hosts for friendly and responsiveness. The home food especially veg were good. We used to cookat night. The kitchen is functional though more utensil would have been helpful.The breakfast is 0k. Though around Ikm away from the main town it's walkable.On the shortcoming I find climbing (60-70) stairs upto the house most difficultespecially with 7-8 luggages. Thanks to host who helped me in carrying. Besidesthat few listing items were missing like children books/toys, dining table, washingmachine, hair dryer, iron, toaster, blender, books etc.With 8k plus/night I find the listing bit over priced vs facilities. With responsiveand friendly hosts that's 0k I think.",
    },
    {
      avatar: avatar,
      user: {
        name: "Ajeet Bai",
        user_name: "baleful_exorcism_76",
      },
      review: 3,
      description:
        "The perfect mix of adventure and relaxation. Couldn’t have asked for a better experience!",
    },
    {
      avatar: avatar,
      user: {
        name: "Aishwarya Kumar",
        user_name: "redolent_cupcake_89",
      },
      review: 5,
      description:
        "A dream vacation come true. The attention to detail and unique spots made it unforgettable.",
    },
  ];

  const handleCheckAvailability = () => {
    setCheckAvailabilityPopup((prev) => !prev);
    // setBooking(true);
    // setCancelDesc("before 8:00 AM on Apr 28 (local time)")
    // setBookNowPayLaterDesc("until Apr 27");
  };

  const handleBooking = (startDate) => {
    // Format date without time
    const date = startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    // Format time separately if needed
    const time = startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    console.log("Selected date:", date, "Time:", time);

    // Calculate cancellation date (assuming it's 1 day before at 8:00 AM)
    const cancelDate = new Date(startDate);
    cancelDate.setDate(cancelDate.getDate() - 1);
    cancelDate.setHours(8, 0, 0, 0);

    const cancelDesc = `before ${cancelDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })} on ${cancelDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    })} (local time)`;

    // These would need to be defined in your component
    setBooking(true);
    setCancelDesc(cancelDesc);
    // setBookNowPayLaterDesc(`until ${cancelDate.toLocaleDateString(...)}`);
  };

  const handleTravelerPhotos = (index) => {
    setTravelerPhotoIsOpen(index);
  };

  const handlePostNewReview = () => {
    // console.log("New review")
    setPostNewReview((prev) => !prev);
    // setShowAllReviews(prev => !prev);
  };

  const handleSharePhoto = () => {
    setSharePhoto((prev) => !prev);
  };

  return (
    <div className={`pt-12`}>
      <div className="flex flex-col lg:flex-row w-full sm:gap-6 bg-[#fff] items-center lg:items-start p-4">
        <div className="w-full lg:max-w-[640px] max-w-[700px] xl:max-w-[700px] flex flex-col gap-5">
          <DetailsImageSlider
            details={details}
            handleSharePhoto={handleSharePhoto}
            selectedImage={selectedImage}
            handleUpdateReviewSlider={handleUpdateReviewSlider}
            handleShowImage={handleShowImage}
          />
          <AdditionalInformation
            details={details}
            additionalInformation={details?.package_additional_info}
            tripPlan={tripPlan}
            TravellerPhotos={TravellerPhotos}
            meetingData={meetingData}
          />
        </div>
        <div className="bg-white rounded-2xl max-h-fit max-w-full w-full">
          <BookCard
            details={details}
            renderStars={renderStars}
            handleCheckAvailability={handleCheckAvailability}
            booking={booking}
            cancelDesc={cancelDesc}
            handleBooking={handleBooking}
            bookNowPayLaterDesc={bookNowPayLaterDesc}
          />
        </div>
      </div>
      {/* Top rated reviews */}

      {details?.reviews[0] && (
        <div>
          <div className="flex items-center justify-between p-4">
            <h2 className="text-[#1D1F2C] text-5xl font-bold">
              Top-Rated Reviews
            </h2>
            <div className="text-orange-500 flex items-center gap-1">
              <FaStar />
              <span className="text-[#0F1416]">
                {details?.reviews[0]?.rating_value || 0.0}
              </span>
              <span className="text-[#0F1416] underline">
                ({details?.reviews?.length} reviews)
              </span>
            </div>
          </div>
          <ReviewSlider
            details={details}
            reviewSlideNumber={reviewSlideNumber}
          />
        </div>
      )}

      {checkAvailabilityPopup && (
        <div className="top-0 left-0 z-[99] w-screen h-screen bg-[#000e1999] overflow-hidden fixed flex items-center justify-center backdrop-blur-[2px]">
          <CheckAvailability
            handleCheckAvailability={handleCheckAvailability}
          />
        </div>
      )}
      {showAllReviews && (
        <div className="inset-0 z-[99] h-screen bg-[#000e1999] overflow-hidden overflow-y-scroll fixed backdrop-blur-[2px] flex justify-end hide-scrollbar">
          <AllReviews
            handleShowAllReview={handleShowAllReview}
            handlePostNewReview={handlePostNewReview}
            reviews={reviews}
          />
        </div>
      )}
      {postNewReview && (
        <div className="inset-0 z-[99] h-screen bg-[#000e1999] overflow-hidden overflow-y-scroll fixed backdrop-blur-[2px] flex items-center justify-center hide-scrollbar">
          <PostNewReview
            handlePostNewReview={handlePostNewReview}
            handleShowAllReview={handleShowAllReview}
            reviews={reviews}
          />
        </div>
      )}
      {sharePhoto && (
        <div className="inset-0 z-[99] h-screen bg-[#000e1999] overflow-hidden overflow-y-scroll fixed backdrop-blur-[2px] flex items-center justify-center hide-scrollbar">
          <SharePhotos
            img={selectedImage}
            title={details?.name}
            handleSharePhoto={handleSharePhoto}
          />
        </div>
      )}
    </div>
  );
};

export default Details;
