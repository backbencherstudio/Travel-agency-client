import React from "react";

function RatingFilter({ selectedRating, onRatingChange }) {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="flex flex-col gap-4">
      {ratings.map((rating) => (
        <div key={rating} className="relative flex items-center gap-3">
          {/* Hidden native radio */}
          <input
            type="radio"
            id={`rating-${rating}`}
            name="rating"
            checked={selectedRating === rating}
            onChange={() => onRatingChange(rating)}
            className="peer hidden"
          />

          {/* Custom circle overlay */}
          <div
            onClick={() => onRatingChange(rating)}
            className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer
              ${selectedRating === rating ? "bg-[#f97316] border-[#f97316]" : "bg-white"}
            `}
          >
            {selectedRating === rating && (
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M20.285 6.709l-11.02 11.02-5.657-5.657 1.414-1.415 4.243 4.243L18.87 5.294l1.415 1.415z"
                />
              </svg>
            )}
          </div>

          <label
            htmlFor={`rating-${rating}`}
            className="text-[#49556D] text-base cursor-pointer"
          >
            {rating} Star{rating > 1 ? "s" : ""}
          </label>
        </div>
      ))}

      {/* Any rating option */}
      <div className="relative flex items-center gap-3 mt-2">
        <input
          type="radio"
          id="rating-none"
          name="rating"
          checked={selectedRating === null}
          onChange={() => onRatingChange(null)}
          className="peer hidden"
        />

        <div
          onClick={() => onRatingChange(null)}
          className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer
            ${selectedRating === null ? "bg-[#f97316] border-[#f97316]" : "bg-white"}
          `}
        >
          {selectedRating === null && (
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M20.285 6.709l-11.02 11.02-5.657-5.657 1.414-1.415 4.243 4.243L18.87 5.294l1.415 1.415z"
              />
            </svg>
          )}
        </div>

        <label
          htmlFor="rating-none"
          className="text-[#49556D] text-base cursor-pointer"
        >
          Any rating
        </label>
      </div>
    </div>
  );
}

export default RatingFilter;
