import { useState } from "react";

const FilterSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <h5
        className="flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d={isOpen ? "M7 10.5L12 14.5L17 10.5" : "M17 14.5L12 10.5L7 14.5"}
            stroke="#0F1416"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </h5>
      {isOpen && children}
    </div>
  );
};

export default FilterSection;