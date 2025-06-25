import React, { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from "lodash";

import { CiSearch } from "react-icons/ci";
import { FaRegCalendarAlt, FaStar } from "react-icons/fa";
// import package1 from "../../assets/img/travel-packages/package-1.png";
// import package2 from "../../assets/img/travel-packages/package-2.png";
// import package3 from "../../assets/img/travel-packages/package-3.png";
import ClientPackageApis from "../../Apis/clientApi/ClientPackageApis";
import Loading from "../../Shared/Loading";
import { useLocation } from "react-router-dom";
// import CruiseCard from '../../Pages/Cruises/CruiseCard';
import { useTravelData } from "../../Context/TravelDataContext/TravelDataContext";
import ClientLanguageApis from "../../Apis/clientApi/ClientLanguageApis";
import TourCard from "../../Pages/Tours/TourCard";

function PackageTourCruise({ getPackagesData, pageLoading, currentPage }) {
  const location = useLocation();
  console.log("PackageTourCruise : ", location.pathname);
  const { destinations, cancellationPolicies } = useTravelData();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isCancellationOpen, setIsCancellationOpen] = useState(true);
  const [isResidenceOpen, setResidenceOpen] = useState(false);
  const [isDestinationOpen, setDestinationOpen] = useState(false);
  const [isMealPlanOpen, setMealPlanOpen] = useState(false);
  const [isPopularAreaOpen, setPopularAreaOpen] = useState(false);
  const [maxBudget, setMaxBudget] = useState(5000);
  const [minBudget, setMinBudget] = useState(0);
  const [searchDestination, setSearchDestination] = useState("");
  const [queryParam, setQueryParam] = useState("");
  const [ratingFilters, setRatingFilters] = useState({
    fiveStars: false,
    fourStars: false,
    threeStars: false,
    twoStars: false,
    oneStar: false,
  });
  const [isFreeCancellation, setIsFreeCancellation] = useState({});
  const [selectedDestinations, setSelectedDestinations] = useState({});
  const [language, setLanguage] = useState({});
  const [selectedResidences, setSelectedResidences] = useState({
    resort: false,
    hotel: false,
    villa: false,
    apartment: false,
    privateVacationHome: false,
    guesthouse: false,
    houseboat: false,
  });
  const [availableResidences, setAvailableResidences] = useState([
    "resort",
    "hotel",
    "villa",
    "apartment",
    "privateVacationHome",
    "guesthouse",
    "houseboat",
  ]);
  console.log("selectedResidences : ", selectedResidences);
  const [selectedMealPlans, setSelectedMealPlans] = useState({
    breakfast: false,
    allInclusive: false,
    dinner: false,
    lunch: false,
  });
  const [mealPlan, setMealPlan] = useState([
    "breakfast",
    "allInclusive",
    "dinner",
    "lunch",
  ]);
  const [selectedPopularAreas, setSelectedPopularAreas] = useState({
    beach: false,
    mountain: false,
    city: false,
    adventure: false,
    thematicTours: false,
    cultural: false,
    historical: false,
    personalizedTours: false,
  });
  const [popularAreas, setPopularAreas] = useState([
    "beach",
    "mountain",
    "city",
    "adventure",
    "thematicTours",
    "cultural",
    "historical",
    "personalizedTours",
  ]);
  const isCruiseRoute = location.pathname.includes("cruises");
  const isPackageRoute = location.pathname.includes("packages");
  const isSearchResultsRoute = location.pathname.includes("search-results");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [lovedPackages, setLovedPackages] = useState({});
  const [specialOffer, setSpecialOffer] = useState({
    cm6lxw87f0001pjvknqzcxiq2: true,
    cm6lxwpfj0005pjvk0553err9: false,
  });
  const searchParams = new URLSearchParams(location.search);
  // console.log('searchParams', searchParams)
  // console.log('isCruiseRoute', isCruiseRoute)
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 5000,
  });
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState({});
  const itemsPerPage = 6;

  // console.log('destinations', destinations)
  // console.log('cancellationPolicies', cancellationPolicies)
  // console.log('priceRange', priceRange)

  const minPrice = 0;
  const maxPrice = 5000;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get("q");
    const startDateParam = params.get("selectedDate");

    if (queryParam) {
      setQueryParam(queryParam);
    }

    if (startDateParam) {
      setStartDate(new Date(startDateParam));
    }
  }, [location.search]);

  // Create a debounced version of setPriceRange
  const debouncedSetPriceRange = useRef(
    debounce((newPriceRange) => {
      setPriceRange(newPriceRange);
    }, 100) // 500ms delay
  ).current;

  // Add this debounced function near your other state declarations
  const debouncedSearch = useRef(
    debounce((value) => {
      setSearchDestination(value);
    }, 500) // 500ms delay
  ).current;

  // Add function to fetch languages
  const fetchLanguages = async () => {
    try {
      const response = await ClientLanguageApis.getLanguages();
      if (response.success) {
        setLanguages(response.data);
        // Initialize selectedLanguages state with all languages set to false
        const initialSelectedLanguages = response.data.reduce((acc, lang) => {
          acc[lang.id] = false;
          return acc;
        }, {});
        setSelectedLanguages(initialSelectedLanguages);
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  // Fetch languages on component mount
  useEffect(() => {
    fetchLanguages();
  }, []);

  const applyFilters = async () => {
    // console.log('queryParam', queryParam)
    setLoading(true);
    try {
      const formattedStartDate = startDate
        ? startDate.toISOString().split("T")[0]
        : "";
      const formattedEndDate = endDate
        ? endDate.toISOString().split("T")[0]
        : "";

      // Construct filter parameters
      const filterParams = {
        q: queryParam || "",
        duration_start: formattedStartDate,
        duration_end: formattedEndDate,
        budget_start: priceRange.min,
        budget_end: priceRange.max,
        ratings: Object.entries(ratingFilters)
          .filter(([_, value]) => value)
          .map(([key]) => key),
        policies: Object.entries(isFreeCancellation)
          .filter(([_, value]) => value)
          .map(([key]) => key),
        destinations: Object.entries(selectedDestinations)
          .filter(([_, value]) => value)
          .map(([key]) => key),
        residences: Object.entries(selectedResidences)
          .filter(([_, value]) => value)
          .map(([key]) => key),
        mealPlans: Object.entries(selectedMealPlans)
          .filter(([_, value]) => value)
          .map(([key]) => key),
        popularAreas: Object.entries(selectedPopularAreas)
          .filter(([_, value]) => value)
          .map(([key]) => key),
        searchQuery: searchDestination,
        languages: Object.entries(selectedLanguages)
          .filter(([_, value]) => value)
          .map(([key]) => key),
      };

      // Update URL with all filter parameters
      const params = new URLSearchParams(location.search);
      Object.entries(filterParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            params.set(key, value.join(","));
          } else {
            params.delete(key);
          }
        } else if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      navigate(`${location.pathname}?${params.toString()}`, { replace: true });

      // Make API call with filters
      const res = await ClientPackageApis.all(
        `${
          isCruiseRoute
            ? "cruise"
            : isPackageRoute
            ? "package"
            : isSearchResultsRoute
            ? ""
            : "tour"
        }`,
        filterParams
      );
      // console.log('filterParams', filterParams)

      if (res.success) {
        setPackages(res?.data);
        getPackagesData(res?.data);
      }
    } catch (err) {
      setError("Failed to fetch filtered packages");
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [
    startDate,
    endDate,
    priceRange,
    ratingFilters,
    isFreeCancellation,
    selectedDestinations,
    selectedResidences,
    selectedMealPlans,
    selectedPopularAreas,
    searchDestination,
    selectedLanguages,
    queryParam,
  ]);

  const handleDateChange = (date, isStart) => {
    if (isStart) {
      setStartDate(date);
      if (endDate && date > endDate) {
        setEndDate(null);
      }
    } else {
      if (!startDate) {
        // Don't allow setting end date without start date
        return;
      }
      if (date < startDate) {
        // Don't allow end date before start date
        return;
      }
      setEndDate(date);
    }
  };

  const handleRatingChange = (stars) => {
    setRatingFilters((prev) => ({
      ...prev,
      [`${stars}`]: !prev[`${stars}`],
    }));
  };

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange.max - 100);
    debouncedSetPriceRange({
      ...priceRange,
      min: value,
    });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange.min + 100);
    debouncedSetPriceRange({
      ...priceRange,
      max: value,
    });
  };

  const handleLovedPackages = (packageId, value) => {
    setLovedPackages((prev) => ({
      ...prev,
      [packageId]: value,
    }));
  };

  const leftPosition =
    ((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100;
  const rightPosition =
    ((maxPrice - priceRange.max) / (maxPrice - minPrice)) * 100;

  const toggleDuration = () => setIsDurationOpen((prev) => !prev);
  const toggleBudget = () => setIsBudgetOpen((prev) => !prev);
  const toggleRating = () => setIsRatingOpen((prev) => !prev);
  const toggleCancellation = () => setIsCancellationOpen((prev) => !prev);
  const toggleResidence = () => setResidenceOpen((prev) => !prev);
  const toggleMealPlan = () => setMealPlanOpen((prev) => !prev);
  const togglePopularArea = () => setPopularAreaOpen((prev) => !prev);
  const toggleDestination = () => setDestinationOpen((prev) => !prev);

  // Clean up the debounced function on component unmount
  useEffect(() => {
    return () => {
      debouncedSetPriceRange.cancel();
      debouncedSearch.cancel();
    };
  }, [debouncedSetPriceRange, debouncedSearch]);

  // console.log('packages', packages)
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = packages.slice(indexOfFirstItem, indexOfLastItem);
  useEffect(() => {
    const lovedPackagesList = {};
    currentItems.map((item) => {
      lovedPackagesList[item.id] = false;
    });
    setLovedPackages((prevState) => ({
      ...prevState,
      ...lovedPackagesList,
    }));
  }, []);
  console.log("Current Items : ", currentItems);

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="px-4 xl:px-0 pt-10 xl:pt-20 flex items-start justify-start lg:gap-6 flex-col lg:flex-row">
        {/* Filter Section */}
        <div className="p-6 lg:sticky top-10 lg:max-w-[300px] mb-6 lg:mb-0 bg-white  rounded-xl shadow-md  flex flex-col  w-full gap-3">
          {/* Search Input */}
          <div className="flex gap-2 border items-center py-2 px-5 rounded-md">
            <CiSearch className="text-3xl" />
            <input
              className="outline-none w-full"
              type="text"
              placeholder="Search Destination"
              defaultValue={searchDestination}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </div>

          {/* Duration Section */}
          <div>
            <h5
              className="flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer"
              onClick={toggleDuration}
            >
              Durations
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d={
                    isDurationOpen
                      ? "M7 10.5L12 14.5L17 10.5"
                      : "M17 14.5L12 10.5L7 14.5"
                  }
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>

            {isDurationOpen && (
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <div>
                    {/* Start Date Picker */}
                    <div className="flex border items-center justify-between p-2 rounded-md border-[#C1D0E5] shadow-sm">
                      {/* Calendar Icon for Start Date */}

                      <div
                        onClick={() => startDatePickerRef.current.setOpen(true)} // Open the date picker when clicked
                        className="text-2xl cursor-pointer mr-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3 7.5C3 5.29086 4.79086 3.5 7 3.5H17C19.2091 3.5 21 5.29086 21 7.5V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V7.5Z"
                            stroke="#0F1416"
                            stroke-width="1.5"
                          />
                          <path
                            d="M3 9H21"
                            stroke="#0F1416"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M8 2L8 5"
                            stroke="#0F1416"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16 2V5"
                            stroke="#0F1416"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <circle cx="12" cy="15" r="1" fill="#0F1416" />
                          <circle cx="16" cy="15" r="1" fill="#0F1416" />
                          <circle cx="8" cy="15" r="1" fill="#0F1416" />
                        </svg>
                      </div>

                      <DatePicker
                        selected={startDate}
                        onChange={(date) => handleDateChange(date, true)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Check-In"
                        className="outline-none w-full text-end lg:text-start font-light"
                        ref={startDatePickerRef} // Assign ref to the startDate DatePicker
                      />
                    </div>

                    {/* End Date Picker */}
                    <div className="flex border mt-4 items-center justify-between p-2 rounded-md border-[#C1D0E5] shadow-sm">
                      {/* Calendar Icon for End Date */}
                      <div
                        // Open the date picker when clicked
                        className="text-2xl cursor-pointer mr-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3 7.5C3 5.29086 4.79086 3.5 7 3.5H17C19.2091 3.5 21 5.29086 21 7.5V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V7.5Z"
                            stroke="#0F1416"
                            stroke-width="1.5"
                          />
                          <path
                            d="M3 9H21"
                            stroke="#0F1416"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M8 2L8 5"
                            stroke="#0F1416"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16 2V5"
                            stroke="#0F1416"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <circle cx="12" cy="15" r="1" fill="#0F1416" />
                          <circle cx="16" cy="15" r="1" fill="#0F1416" />
                          <circle cx="8" cy="15" r="1" fill="#0F1416" />
                        </svg>
                      </div>

                      <DatePicker
                        selected={endDate}
                        onChange={(date) => handleDateChange(date, false)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="Check-Out"
                        className="outline-none text-end lg:text-start font-light w-full"
                        ref={endDatePickerRef} // Assign ref to the endDate DatePicker
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Budget Section */}
          <div className="">
            <h5
              className="flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer"
              onClick={toggleBudget}
            >
              Budget
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d={
                    isBudgetOpen
                      ? "M7 10.5L12 14.5L17 10.5"
                      : "M17 14.5L12 10.5L7 14.5"
                  }
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>

            {isBudgetOpen && (
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  {/* Budget Range Slider */}
                  <div className="relative h-2 mb-8">
                    <div className="flex justify-between mb5 text-sm text-gray-500">
                      <span>${minPrice.toLocaleString()}</span>
                      <span>${maxPrice.toLocaleString()}</span>
                    </div>

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
                      onChange={handleMinChange}
                      className="absolute w-full h-full appearance-none bg-transparent pointer-events-none"
                      style={{
                        WebkitAppearance: "none",
                        zIndex: 3,
                      }}
                    />

                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange.max}
                      onChange={handleMaxChange}
                      className="absolute w-full h-full appearance-none bg-transparent pointer-events-none"
                      style={{
                        WebkitAppearance: "none",
                        zIndex: 4,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rating Section */}
          <div>
            <h5
              className="flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer"
              onClick={toggleRating}
            >
              Ratings
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d={
                    isRatingOpen
                      ? "M7 10.5L12 14.5L17 10.5"
                      : "M17 14.5L12 10.5L7 14.5"
                  }
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>

            {isRatingOpen && (
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div
                      key={stars}
                      className="flex gap-[10px] items-center justify-between"
                    >
                      <div className="flex gap-2">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={ratingFilters[stars] || false}
                            onChange={() => handleRatingChange(stars)}
                            className="w-6 h-6"
                          />
                          {ratingFilters[stars] && (
                            <div
                              className="absolute top-0 w-6 h-6 bg-black text-green-500 rounded"
                              onClick={() => handleRatingChange(stars)}
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
                        </div>
                        <div className="flex gap-[1px]">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              className={`text-xl ${
                                index < stars
                                  ? "text-[#ffb127]"
                                  : "text-[#a6aaac33]"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {"(999)"}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Cancellation Section */}
          <div>
            <h5
              className="flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer"
              onClick={toggleCancellation}
            >
              Free Cancellation options
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d={
                    isCancellationOpen
                      ? "M7 10.5L12 14.5L17 10.5"
                      : "M17 14.5L12 10.5L7 14.5"
                  }
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>

            {isCancellationOpen && (
              <div
                className={`${
                  cancellationPolicies.length ? "mt-4" : ""
                } flex flex-col gap-4`}
              >
                <div className="flex flex-col items-start gap-3">
                  {cancellationPolicies.map((policy) => (
                    <div
                      key={policy.id}
                      className="relative flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={isFreeCancellation[policy.id] || false}
                        onChange={() =>
                          setIsFreeCancellation((prevState) => ({
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
                            setIsFreeCancellation((prevState) => ({
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
            )}
          </div>
          {/* Destination Section */}
          <div>
            <h5
              className="flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer"
              onClick={toggleDestination}
            >
              Popular Destination
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d={
                    isDestinationOpen
                      ? "M7 10.5L12 14.5L17 10.5"
                      : "M17 14.5L12 10.5L7 14.5"
                  }
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>

            {isDestinationOpen && (
              <div
                className={`flex flex-col gap-4 ${
                  destinations.length ? "mt-4" : ""
                }`}
              >
                {destinations?.map((destination) => (
                  <div
                    key={destination.id}
                    className="relative flex items-center gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDestinations[destination.id] || false}
                      onChange={() =>
                        setSelectedDestinations((prevState) => ({
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
                          setSelectedDestinations((prevState) => ({
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
            )}
          </div>
          {/* residence Section */}
          <div>
            <h5
              className="flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer"
              onClick={toggleResidence}
            >
              Type of residence
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d={
                    isResidenceOpen
                      ? "M7 10.5L12 14.5L17 10.5"
                      : "M17 14.5L12 10.5L7 14.5"
                  }
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>

            {isResidenceOpen && (
              <div
                className={`flex flex-col gap-4 ${
                  availableResidences.length ? "mt-4" : ""
                }`}
              >
                {availableResidences.map((residence) => (
                  <div className="relative flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedResidences[residence]}
                      onChange={() =>
                        setSelectedResidences((prevState) => ({
                          ...prevState,
                          [residence]: !prevState[residence],
                        }))
                      }
                      className="w-6 h-6"
                    />

                    {selectedResidences[residence] && (
                      <div
                        className="absolute top-0 w-6 h-6 bg-black text-green-500 rounded"
                        onClick={() =>
                          setSelectedResidences((prevState) => ({
                            ...prevState,
                            [residence]: !prevState[residence],
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

                    <p className="text-[#49556D] text-base">
                      {residence.charAt(0).toUpperCase() + residence.slice(1)}{" "}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Meal Plan Section */}
          <div>
            <h5
              className="flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer"
              onClick={toggleMealPlan}
            >
              Meal plans available
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d={
                    isMealPlanOpen
                      ? "M7 10.5L12 14.5L17 10.5"
                      : "M17 14.5L12 10.5L7 14.5"
                  }
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>

            {isMealPlanOpen && (
              <div className="mt-4 flex flex-col gap-4">
                {mealPlan.map((meal) => (
                  <div key={meal} className="relative flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedMealPlans[meal]}
                      onChange={() =>
                        setSelectedMealPlans((prevState) => ({
                          ...prevState,
                          [meal]: !prevState[meal], // toggle the correct key
                        }))
                      }
                      className="w-[24px] h-[24px]"
                    />

                    {selectedMealPlans[meal] && (
                      <div
                        className="absolute top-0 w-6 h-6 bg-black text-green-500 rounded"
                        onClick={() =>
                          setSelectedMealPlans((prevState) => ({
                            ...prevState,
                            [meal]: !prevState[meal], // toggle the correct key
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
                    <p className="text-[#49556D]">
                      {meal.charAt(0).toUpperCase() + meal.slice(1)} included{" "}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Popular Area Section */}
          <div>
            <h5
              className="flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer"
              onClick={togglePopularArea}
            >
              Popular Area
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d={
                    isPopularAreaOpen
                      ? "M7 10.5L12 14.5L17 10.5"
                      : "M17 14.5L12 10.5L7 14.5"
                  }
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>

            {isPopularAreaOpen && (
              <div className="mt-4 flex flex-col gap-4">
                {popularAreas.map((area) => (
                  <div className="flex items-center gap-3  justify-between">
                    <div className="relative flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedPopularAreas[area]}
                        onChange={() =>
                          setSelectedPopularAreas((prevState) => ({
                            ...prevState,
                            [area]: !prevState[area],
                          }))
                        }
                        className="w-[24px] h-[24px]"
                      />
                      {selectedPopularAreas[area] && (
                        <div
                          className="absolute top-0 w-6 h-6 bg-black text-green-500 rounded"
                          onClick={() =>
                            setSelectedPopularAreas((prevState) => ({
                              ...prevState,
                              [area]: !prevState[area],
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
                      <p className="text-[#49556D]">
                        {area.charAt(0).toUpperCase() + area.slice(1)}{" "}
                      </p>
                    </div>{" "}
                    <span className="text-[#49556D]">{"999"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Language Section */}
          <div>
            <h5
              className="flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer"
              onClick={() => setLanguageOpen(!isLanguageOpen)}
            >
              Languages
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d={
                    isLanguageOpen
                      ? "M7 10.5L12 14.5L17 10.5"
                      : "M17 14.5L12 10.5L7 14.5"
                  }
                  stroke="#0F1416"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h5>

            {isLanguageOpen && (
              <div className="mt-4 flex flex-col gap-4">
                {languages.map((language) => (
                  <div
                    key={language.id}
                    className="relative flex items-center gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLanguages[language.id] || false}
                      onChange={() =>
                        setSelectedLanguages((prevState) => ({
                          ...prevState,
                          [language.id]: !prevState[language.id],
                        }))
                      }
                      className="w-[24px] h-[24px]"
                    />
                    {selectedLanguages[language.id] && (
                      <div
                        className="absolute top-0 w-6 h-6 bg-black text-green-500 rounded"
                        onClick={() =>
                          setSelectedLanguages((prevState) => ({
                            ...prevState,
                            [language.id]: !prevState[language.id],
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
                    <p className="text-[#49556D]">{language.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <div className="w-full">
            <Loading />
          </div>
        ) : (
          <div className="animate-from-middle w-full lg:w-10/12">
            {/* Tour Display Section */}
            <div className="">
              {error && <div className="text-red-500">{error}</div>}
              {isCruiseRoute ? (
                <div className="flex flex-col gap-6">
                  {/* {packages.map((cruise) => (
                                        <CruiseCard key={cruise.id} cruise={cruise} />
                                    ))} */}
                </div>
              ) : (
                <>
                  <div
                    className={`grid grid-cols-1 ${location.pathname === "/tours"? "":"md:grid-cols-2 lg:grid-cols-2"} gap-6 transition-opacity duration-300 ${
                      pageLoading ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    {pageLoading ? (
                      // Show loading skeleton or spinner while changing pages
                      <div className="col-span-2 flex justify-center items-center">
                        <Loading />
                      </div>
                    ) : (
                      currentItems.map((tour) => (
                        <TourCard
                          key={tour.id}
                          tour={tour}
                          isPackageRoute={isPackageRoute}
                          lovedPackages={lovedPackages}
                          specialOffer={specialOffer}
                          handleLovedPackages={handleLovedPackages}
                        />
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PackageTourCruise;