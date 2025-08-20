const LanguageFilter = ({ languages, selectedLanguage, onLanguageChange }) => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {languages.map((language) => (
        <div key={language.id} className="relative flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedLanguage === language.id}
            onChange={() =>
              onLanguageChange(selectedLanguage === language.id ? null : language.id)
            }
            className="w-6 h-6 appearance-none border border-gray-300 rounded-full checked:bg-[#f97316] relative cursor-pointer"
          />

          {/* Overlay SVG */}
          {selectedLanguage === language.id && (
            <div className="absolute top-0 left-0 w-6 h-6 flex items-center justify-center pointer-events-none">
              <svg
                className="w-4 h-4 text-white"
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
          )}

          <p className="text-[#49556D]">{language.name}</p>
        </div>
      ))}
    </div>
  );
};

export default LanguageFilter;
