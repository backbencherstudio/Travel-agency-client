import React from "react";

const MealPlanFilter = ({ selectedMealPlan, onMealPlanChange }) => {
  const mealPlan = ["breakfast", "allInclusive", "dinner", "lunch"];

  return (
    <div className="mt-4 flex flex-col gap-4">
      {mealPlan.map((meal) => (
        <div key={meal} className="relative flex items-center gap-3">
          {/* Hidden native radio for accessibility */}
          <input
            type="radio"
            id={meal}
            name="mealPlan"
            checked={selectedMealPlan === meal}
            onChange={() => onMealPlanChange(meal)}
            className="peer hidden"
          />

          {/* Custom overlay with SVG */}
          <div
            onClick={() => onMealPlanChange(meal)}
            className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer
              ${selectedMealPlan === meal ? "bg-[#f97316] border-[#f97316]" : "bg-white"}
            `}
          >
            {selectedMealPlan === meal && (
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

          {/* Label clickable */}
          <label
            htmlFor={meal}
            className="text-[#49556D] text-base cursor-pointer"
            onClick={() => onMealPlanChange(meal)}
          >
            {meal.charAt(0).toUpperCase() + meal.slice(1)} included
          </label>
        </div>
      ))}
    </div>
  );
};

export default MealPlanFilter;
