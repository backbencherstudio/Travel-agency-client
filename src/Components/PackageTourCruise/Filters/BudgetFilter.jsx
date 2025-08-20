const BudgetFilter = ({ priceRange, minPrice, maxPrice, onPriceChange }) => {
  const leftPosition = ((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100;
  const rightPosition = ((maxPrice - priceRange.max) / (maxPrice - minPrice)) * 100;

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div>
        <div className="flex justify-between mb5 text-sm text-gray-500">
          <span>${minPrice.toLocaleString()}</span>
          <span>${maxPrice.toLocaleString()}</span>
        </div>

        <div className="relative h-2 mb-8">
          <div className="absolute mt-[2px] w-full h-[5px] bg-gray-200 rounded-full" />
          <div
            className="absolute mt-[2px] h-[5px] bg-orange-500 rounded-full"
            style={{
              left: `${leftPosition}%`,
              right: `${rightPosition}%`,
            }}
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange.min}
            onChange={(e) => onPriceChange("min", e.target.value)}
            className="absolute w-full h-full appearance-none bg-transparent pointer-events-none"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange.max}
            onChange={(e) => onPriceChange("max", e.target.value)}
            className="absolute w-full h-full appearance-none bg-transparent pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetFilter;