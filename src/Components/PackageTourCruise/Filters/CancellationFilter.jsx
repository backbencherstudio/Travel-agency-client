const CancellationFilter = ({ cancellationPolicies, isFreeCancellation, onCancellationChange }) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex flex-col items-start gap-3">
        {cancellationPolicies.map((policy) => (
          <div key={policy.id} className="relative flex items-center gap-2">
            <input
              type="checkbox"
              checked={isFreeCancellation[policy.id] || false}
              onChange={() =>
                onCancellationChange((prevState) => ({
                  ...prevState,
                  [policy.id]: !prevState[policy.id],
                }))
              }
              className="w-6 h-6"
            />
            {isFreeCancellation[policy.id] && (
              <div
                className="absolute top-0 w-6 h-6 bg-black text-green-500 rounded"
                onClick={() =>
                  onCancellationChange((prevState) => ({
                    ...prevState,
                    [policy.id]: !prevState[policy.id],
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
            <p>{policy.policy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancellationFilter;