import React from "react";

const ResidenceTypeFilter = ({ selectedResidence, onResidenceChange }) => {
  const availableResidences = [
    "resort",
    "hotel",
    "villa",
    "apartment",
    "privateVacationHome",
    "guesthouse",
    "houseboat",
  ];

  return (
    <div className="flex flex-col gap-4">
      {availableResidences.map((residence) => (
        <div key={residence} className="relative flex items-center gap-3">
          {/* Hidden native radio */}
          <input
            type="radio"
            id={residence}
            name="residence"
            checked={selectedResidence === residence}
            onChange={() => onResidenceChange(residence)}
            className="peer hidden"
          />

          {/* Custom circle overlay */}
          <div
            onClick={() => onResidenceChange(residence)}
            className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer
              ${selectedResidence === residence ? "bg-[#f97316] border-[#f97316]" : "bg-white"}
            `}
          >
            {selectedResidence === residence && (
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
            htmlFor={residence}
            className="text-[#49556D] text-base cursor-pointer"
          >
            {residence.charAt(0).toUpperCase() + residence.slice(1)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ResidenceTypeFilter;
