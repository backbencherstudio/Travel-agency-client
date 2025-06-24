import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Delete } from "lucide-react";

function TourCard({
  tour,
  isPackageRoute,
  lovedPackages,
  handleLovedPackages,
  specialOffer,
  specialPrice = 300
}) {
  console.log("Rating : ",tour?.reviews[0]?.rating_value)
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false)
  console.log("Tour Data : ", tour);
  console.log("Tour id : ", tour.id);
  // console.log("isPackageRoute", isPackageRoute)
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

  const truncateDescription = (description, wordLimit) => {
    if (!description) return { truncatedText: "", isTruncated: false };
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return {
        truncatedText: words.slice(0, wordLimit).join(" ") + "...",
        isTruncated: true,
      };
    }
    return { truncatedText: description, isTruncated: false };
  };

  const { truncatedText, isTruncated } = truncateDescription(
    tour?.description,
    10
  );

  const handleBookNow = () => {
    if (isPackageRoute) {
      navigate(`/packages/${tour?.id}`);
    } else {
      navigate(`/tours/${tour?.id}`);
    }
  };

  return (
    <div
      key={tour?.id}
      className="relative flex flex-col bg-white shadow-md border border-slate-200 rounded-[10px]"
    >
      <div className="relative h-56 overflow-hidden text-white rounded-t-[10px]">
        <LazyLoadImage
          src={tour?.package_files?.[0]?.file_url || ""}
          alt={tour?.package_files?.[0]?.file_url || "Tour image"}
          effect="blur"
          className="w-full h-full object-cover"
        />
        {/* Special Offer Badge */}
        {/* {tour?.is_special_offer && ( */}
        <div className='absolute top-4 left-4 bg-orange-500 text-white px-3 py-[6px] rounded text-sm font-medium'>
          Special Offer
        </div>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
      <div className="flex-1 flex flex-col justify-between">
        <div className="p-4">
          <div className="flex items-center gap-1">
            <div className="flex gap-1 items-center mb-5 bg-[#0E457D] text-white text-xs font-medium me-2 px-3 py-[6px] rounded-full border border-[#90A9C3] dark:bg-gray-700 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M6.00024 0C3.60387 0 1.6543 1.94958 1.6543 4.34592C1.6543 7.31986 5.54349 11.6858 5.70908 11.8702C5.86461 12.0434 6.13616 12.0431 6.29141 11.8702C6.45699 11.6858 10.3462 7.31986 10.3462 4.34592C10.3461 1.94958 8.39659 0 6.00024 0ZM6.00024 6.53248C4.79457 6.53248 3.81371 5.55159 3.81371 4.34592C3.81371 3.14025 4.79459 2.15939 6.00024 2.15939C7.20589 2.15939 8.18675 3.14027 8.18675 4.34595C8.18675 5.55162 7.20589 6.53248 6.00024 6.53248Z"
                  fill="white"
                />
              </svg>
              {tour?.package_destinations[0]?.destination?.name}
              {tour?.package_destinations[1] &&
                `, ${tour?.package_destinations[1]?.destination?.name}`}
              , {tour?.package_destinations[0]?.destination?.country?.name}
            </div>
            <div className="mb-5 bg-[#0E457D] text-white text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#90A9C3] dark:bg-gray-700 dark:text-gray-300">
              Hotel + All inclusive
            </div>
          </div>
          <Link
            to={`${tour?.id}`}
            className="mb-2 text-[#1D1F2C] text-xl font-bold trans hover:text-blue-500"
          >
            {tour?.name}
          </Link>
          <p className="text-[#4A4C56] text-sm leading-normal font-normal">
            {truncatedText}
            {isTruncated && (
              <button onClick={handleBookNow} className="text-blue-500">
                Read more
              </button>
            )}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <p className=" text-sm text-[#1D1F2C]">
              {tour?.reviews[0]?.rating_value ? `${tour.reviews[0].rating_value}` : "0.0"}
            </p>
            <div className="flex gap-1 items-center">
              {renderStars(tour?.reviews[0]?.rating_value)}
            </div>
            <div className="flex items-center">
              <div className="ms-1 text-sm font-medium text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.99984 1.16699C3.77809 1.16699 1.1665 3.77858 1.1665 7.00033C1.1665 10.2221 3.77809 12.8337 6.99984 12.8337C10.2216 12.8337 12.8332 10.2221 12.8332 7.00033C12.8332 3.77858 10.2216 1.16699 6.99984 1.16699ZM9.05902 9.05951C8.97385 9.14468 8.86184 9.18783 8.74984 9.18783C8.63784 9.18783 8.52582 9.14526 8.44065 9.05951L6.69065 7.30951C6.6084 7.22726 6.56234 7.11583 6.56234 7.00033V4.08366C6.56234 3.84216 6.75834 3.64616 6.99984 3.64616C7.24134 3.64616 7.43734 3.84216 7.43734 4.08366V6.81889L9.05902 8.44057C9.22994 8.61207 9.22994 8.88859 9.05902 9.05951Z"
                    fill="#4A4C56"
                  />
                </svg>
              </div>
              <p className="ms-1 text-[14px] leading-[160%]  text-[#1D1F2C] dark:text-[#1D1F2C]">
                {tour?.duration} days
              </p>
            </div>
          </div>
          <div className="text-sm mt-1 text-[#EB5B2A]">
            Cancellation Policy{" "}
            <span className="text-xs text-[#49556D]">
              ({tour?.cancellation_policy?.policy})
            </span>
          </div>
        </div>
        <div>
          <div className="px-4">
            <hr />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="">
              <div className="text-xs leading-4">Starting From</div>
              {!specialOffer[tour.id] && <div className="text-xl text-[#0E457D] font-bold">
                ${tour?.price}
              </div>}
              {specialOffer[tour.id] &&<div>
                <span className="text-[20px] font-bold text-orange-500 pr-1">${specialPrice}</span>
                <span className="text-xs text-[#0E457D]">/<del>{tour?.price}</del></span>
              </div>}
            </div>
            <button
              onClick={handleBookNow}
              className="flex justify-between items-center gap-1 px-4 py-[10px] border border-[#0E457D] hover:bg-[#7aa6d3] hover:border-none rounded-full shadow-md text-[#0E457D] hover:text-white"
            >
              <div className="text-sm ">Book Now</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M3.66699 8H13.0003"
                  stroke="#0E457D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.3335 3.33301L13.0002 7.99967L8.3335 12.6663"
                  stroke="#0E457D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className='px-4'>
        <hr />
      </div>
      <div className='flex items-center justify-between p-4'>
        <div className=''>
          <div className='text-xs'>Starting From</div>
          <div className='flex items-center gap-2'>
            <div className='text-xl text-[#0E457D] font-bold'>${tour?.price}</div>
            {tour?.price && <p className='text-xs text-[#0E457D] mt-1'>/ <span className='text-xs line-through '>{tour?.price * 1.5}</span></p>}
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => handleLovedPackages(tour.id, !lovedPackages[tour.id])}
        >
          {lovedPackages[tour.id] ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
            >
              <path
                d="M3.1449 1.35515C6.12587 -0.473376 8.8001 0.255371 10.4156 1.46861C10.6814 1.6682 10.8638 1.8048 10.9996 1.89704C11.1354 1.8048 11.3178 1.6682 11.5836 1.46861C13.1991 0.255371 15.8734 -0.473376 18.8543 1.35515C20.9156 2.61952 22.0754 5.2606 21.6684 8.29511C21.2595 11.3443 19.2859 14.7929 15.1063 17.8865C13.6549 18.9614 12.5897 19.7503 10.9996 19.7503C9.40955 19.7503 8.34433 18.9614 6.89294 17.8865C2.71334 14.7929 0.739756 11.3443 0.330808 8.29511C-0.0761763 5.2606 1.08365 2.61952 3.1449 1.35515Z"
                fill="#EB5B2A"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
            >
              <path
                d="M4.1449 2.35515C7.12587 0.526624 9.8001 1.25537 11.4156 2.46861C11.6814 2.6682 11.8638 2.8048 11.9996 2.89704C12.1354 2.8048 12.3178 2.6682 12.5836 2.46861C14.1991 1.25537 16.8734 0.526624 19.8543 2.35515C21.9156 3.61952 23.0754 6.2606 22.6684 9.29511C22.2595 12.3443 20.2859 15.7929 16.1063 18.8865C14.6549 19.9614 13.5897 20.7503 11.9996 20.7503C10.4095 20.7503 9.34433 19.9614 7.89294 18.8865C3.71334 15.7929 1.73976 12.3443 1.33081 9.29511C0.923824 6.2606 2.08365 3.61952 4.1449 2.35515Z"
                stroke="#EB5B2A"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export default TourCard;