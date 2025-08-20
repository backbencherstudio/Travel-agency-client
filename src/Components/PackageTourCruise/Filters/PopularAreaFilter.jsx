import React from "react";

const PopularAreaFilter = ({ selectedArea, onAreaChange }) => {
  const popularAreas = [
    "beach",
    "mountain",
    "city",
    "adventure",
    "thematicTours",
    "cultural",
    "historical",
    "personalizedTours",
  ];

  return (
    <div className="mt-4 flex flex-col gap-4">
      {popularAreas.map((area) => (
        <div key={area} className="flex items-center gap-3 justify-between">
          <div className="relative flex items-center gap-3">
            {/* Hidden radio input */}
            <input
              type="radio"
              id={area}
              name="popularArea"
              checked={selectedArea === area}
              onChange={() => onAreaChange(area)}
              className="peer hidden"
            />

            {/* Custom overlay with SVG */}
            <div
              onClick={() => onAreaChange(area)}
              className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer
                ${selectedArea === area ? "bg-[#f97316] border-[#f97316]" : "bg-white"}
              `}
            >
              {selectedArea === area && (
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

            {/* Label */}
            <label
              htmlFor={area}
              className="text-[#49556D] text-base cursor-pointer"
              onClick={() => onAreaChange(area)}
            >
              {area.charAt(0).toUpperCase() + area.slice(1)}
            </label>
          </div>

          {/* Optional count */}
          <span className="text-[#49556D]">999</span>
        </div>
      ))}
    </div>
  );
};

export default PopularAreaFilter;
