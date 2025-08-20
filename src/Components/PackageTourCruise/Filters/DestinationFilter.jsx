const DestinationFilter = ({ destinations, selectedDestinations, onDestinationChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {destinations?.map((destination) => (
        <div key={destination.id} className="relative flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedDestinations[destination.id] || false}
            onChange={() =>
              onDestinationChange((prevState) => ({
                ...prevState,
                [destination.id]: !prevState[destination.id],
              }))
            }
            className="w-6 h-6"
          />
          {selectedDestinations[destination.id] && (
            <div
              className="absolute top-0 w-6 h-6 bg-black text-green-500 rounded"
              onClick={() =>
                onDestinationChange((prevState) => ({
                  ...prevState,
                  [destination.id]: !prevState[destination.id],
                }))
              }
            >
              <div className="w-6 h-6 bg-[#813217] text-white rounded flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M20.285 6.709l-11.02 11.02-5.657-5.657 1.414-1.415 4.243 4.243L18.87 5.294l1.415 1.415z"
                  />
                </svg>
              </div>
            </div>
          )}
          <p className="text-[#49556D]">{destination.name} </p>
        </div>
      ))}
    </div>
  );
};

export default DestinationFilter;