import React, { useContext, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import { CiSearch } from 'react-icons/ci';
import { FaRegCalendarAlt, FaStar } from 'react-icons/fa';
// import TourCard from '../../Pages/Tours/tourCard';
// import package1 from "../../assets/img/travel-packages/package-1.png";
// import package2 from "../../assets/img/travel-packages/package-2.png";
// import package3 from "../../assets/img/travel-packages/package-3.png";
import ClientPackageApis from '../../Apis/clientApi/ClientPackageApis';
import Loading from '../../Shared/Loading';
import { useLocation } from 'react-router-dom';
// import CruiseCard from '../../Pages/Cruises/CruiseCard';
import { useTravelData } from '../../Context/TravelDataContext/TravelDataContext';
import ClientLanguageApis from '../../Apis/clientApi/ClientLanguageApis';

function PackageTourCruise() {
    const { destinations, cancellationPolicies } = useTravelData();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDurationOpen, setIsDurationOpen] = useState(false);
    const [isBudgetOpen, setIsBudgetOpen] = useState(false);
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [isCancellationOpen, setIsCancellationOpen] = useState(false);
    const [isResidenceOpen, setResidenceOpen] = useState(false);
    const [isDestinationOpen, setDestinationOpen] = useState(false);
    const [isMealPlanOpen, setMealPlanOpen] = useState(false);
    const [isPopularAreaOpen, setPopularAreaOpen] = useState(false);
    const [maxBudget, setMaxBudget] = useState(5000);
    const [minBudget, setMinBudget] = useState(0);
    const [searchDestination, setSearchDestination] = useState('');
    const [queryParam, setQueryParam] = useState('');
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
    const [selectedMealPlans, setSelectedMealPlans] = useState({
        breakfast: false,
        allInclusive: false,
        dinner: false,
        lunch: false,
    });
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
    const location = useLocation();
    const isCruiseRoute = location.pathname.includes('cruises');
    const isPackageRoute = location.pathname.includes('packages');
    const isSearchResultsRoute = location.pathname.includes('search-results');
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    console.log('searchParams', searchParams)
    // console.log('isCruiseRoute', isCruiseRoute)
    const [priceRange, setPriceRange] = useState({
        min: 0,
        max: 10000
    });
    const [isLanguageOpen, setLanguageOpen] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState({});

    console.log('destinations', destinations)
    console.log('cancellationPolicies', cancellationPolicies)
    // console.log('priceRange', priceRange)

    const minPrice = 0;
    const maxPrice = 10000;

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get('q');
        const startDateParam = params.get('selectedDate');
        
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
            console.error('Error fetching languages:', error);
        }
    };

    // Fetch languages on component mount
    useEffect(() => {
        fetchLanguages();
    }, []);

    const applyFilters = async () => {
        console.log('queryParam', queryParam)
        setLoading(true);
        try {
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';
            
            // Construct filter parameters
            const filterParams = {
                q: queryParam || '',
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
                        params.set(key, value.join(','));
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
                `${isCruiseRoute ? 'cruise' : isPackageRoute ? 'package' : isSearchResultsRoute ? '' : 'tour'}`,
                filterParams
            );
            console.log('filterParams', filterParams)

            if (res.success) {
                setPackages(res?.data);
            }
        } catch (err) {
            setError('Failed to fetch filtered packages');
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
        queryParam
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
        setRatingFilters(prev => ({
            ...prev,
            [`${stars}`]: !prev[`${stars}`]
        }));
    };

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), priceRange.max - 100);
        debouncedSetPriceRange({
            ...priceRange,
            min: value
        });
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), priceRange.min + 100);
        debouncedSetPriceRange({
            ...priceRange,
            max: value
        });
    };

    const leftPosition = ((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100;
    const rightPosition = ((maxPrice - priceRange.max) / (maxPrice - minPrice)) * 100;

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

    return (
        <div className='max-w-[1200px] mx-auto'>
            <div className='px-4 xl:px-0 py-10 xl:py-20 flex items-start justify-start lg:gap-6 flex-col lg:flex-row'>
                {/* Filter Section */}
                <div className='p-6 sticky top-10 lg:max-w-[300px] mb-6 lg:mb-0 bg-white  rounded-xl shadow-md  flex flex-col  w-full gap-3'>
                    {/* Search Input */}
                    <div className='flex gap-2 border items-center py-2 px-5 rounded-md'>
                        <CiSearch className='text-3xl' />
                        <input
                            className='outline-none w-full'
                            type='text'
                            placeholder='Search Destination'
                            defaultValue={searchDestination}
                            onChange={(e) => debouncedSearch(e.target.value)}
                        />

                    </div>

                    {/* Duration Section */}
                    <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer'
                            onClick={toggleDuration}
                        >
                            Duration
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <path
                                    d={isDurationOpen ? 'M7 10.5L12 14.5L17 10.5' : 'M17 14.5L12 10.5L7 14.5'}
                                    stroke="#0F1416"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </h5>

                        {isDurationOpen && (
                            <div className='mt-4 flex flex-col gap-4'>
                                <div className='flex flex-col gap-3'>
                                    <div>
                                        {/* Start Date Picker */}
                                        <div className='flex border items-center justify-between p-2 rounded-md border-[#C1D0E5] shadow-sm'>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => handleDateChange(date, true)}
                                                selectsStart
                                                startDate={startDate}
                                                endDate={endDate}
                                                placeholderText="Start Date"
                                                className='outline-none w-full'
                                                ref={startDatePickerRef} // Assign ref to the startDate DatePicker
                                            />
                                            {/* Calendar Icon for Start Date */}
                                            <FaRegCalendarAlt
                                                onClick={() => startDatePickerRef.current.setOpen(true)} // Open the date picker when clicked
                                                className='text-2xl cursor-pointer ml-2'
                                            />
                                        </div>

                                        {/* End Date Picker */}
                                        <div className='flex border mt-4 items-center justify-between p-2 rounded-md border-[#C1D0E5] shadow-sm'>
                                            <DatePicker
                                                selected={endDate}
                                                onChange={(date) => handleDateChange(date, false)}
                                                selectsEnd
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                                placeholderText="End Date"
                                                className='outline-none w-full'
                                                ref={endDatePickerRef} // Assign ref to the endDate DatePicker
                                            />
                                            {/* Calendar Icon for End Date */}
                                            <FaRegCalendarAlt
                                                onClick={() => endDatePickerRef.current.setOpen(true)} // Open the date picker when clicked
                                                className='text-2xl cursor-pointer ml-2'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Budget Section */}
                    <div className=''>
                        <h5
                            className='flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer'
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
                                    d={isBudgetOpen ? 'M7 10.5L12 14.5L17 10.5' : 'M17 14.5L12 10.5L7 14.5'}
                                    stroke="#0F1416"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </h5>

                        {isBudgetOpen && (
                            <div className='mt-4 flex flex-col gap-4'>
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
                                                right: `${rightPosition}%`
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
                                                WebkitAppearance: 'none',
                                                zIndex: 3
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
                                                WebkitAppearance: 'none',
                                                zIndex: 4
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
                            className='flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer'
                            onClick={toggleRating}
                        >
                            Rating
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="25"
                                viewBox="0 0 24 25"
                                fill="none"
                            >
                                <path
                                    d={isRatingOpen ? 'M7 10.5L12 14.5L17 10.5' : 'M17 14.5L12 10.5L7 14.5'}
                                    stroke="#0F1416"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </h5>

                        {isRatingOpen && (
                            <div className='mt-4 flex flex-col gap-4'>
                                <div className='flex flex-col gap-3'>
                                    {[5, 4, 3, 2, 1].map((stars) => (
                                        <div key={stars} className='flex gap-[10px] items-center justify-between'>
                                            <div className='flex gap-2'>
                                                <input
                                                    type="checkbox"
                                                    checked={ratingFilters[stars] || false}
                                                    onChange={() => handleRatingChange(stars)}
                                                />
                                                <div className='flex gap-[1px]'>
                                                    {[...Array(5)].map((_, index) => (
                                                        <FaStar
                                                            key={index}
                                                            className={`text-xl ${
                                                                index < stars ? 'text-[#ffb127]' : 'text-[#a6aaac33]'
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
                            className='flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer'
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
                                    d={isCancellationOpen ? 'M7 10.5L12 14.5L17 10.5' : 'M17 14.5L12 10.5L7 14.5'}
                                    stroke="#0F1416"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </h5>

                        {isCancellationOpen && (
                            <div className='mt-4 flex flex-col gap-4'>
                                <div className='flex flex-col items-start gap-3'>
                                    {cancellationPolicies.map((policy) => (
                                        <div key={policy.id} className='flex items-center gap-2'>
                                            <input
                                                type="checkbox"
                                                checked={isFreeCancellation[policy.id] || false}
                                                onChange={() => setIsFreeCancellation((prevState) => ({
                                                    ...prevState,
                                                    [policy.id]: !prevState[policy.id],
                                                }))}
                                                
                                            />
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
                            className='flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer'
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
                                    d={isDestinationOpen ? 'M7 10.5L12 14.5L17 10.5' : 'M17 14.5L12 10.5L7 14.5'}
                                    stroke="#0F1416"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </h5>

                        {isDestinationOpen && (
                            <div className='mt-4 flex flex-col gap-4'>
                                {destinations?.map((destination) => (
                                    <div key={destination.id} className='flex items-center gap-3'>
                                        <input
                                            type="checkbox"
                                            checked={selectedDestinations[destination.id] || false}
                                            onChange={() =>
                                                setSelectedDestinations((prevState) => ({
                                                    ...prevState,
                                                    [destination.id]: !prevState[destination.id],
                                                }))
                                            }
                                    />
                                        <p className='text-[#49556D]'>{destination.name} </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* residence Section */}
                    {/* <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer'
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
                                    d={isResidenceOpen ? 'M7 10.5L12 14.5L17 10.5' : 'M17 14.5L12 10.5L7 14.5'}
                                    stroke="#0F1416"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </h5>

                        {isResidenceOpen && (
                            <div className='mt-4 flex flex-col gap-4'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                    
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                resort: !prevState.resort,
                                            }))
                                        }
                                    />

                                    <p className='text-[#49556D]'>Resort </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                    
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                hotel: !prevState.hotel,
                                            }))
                                        }
                                    />
                                    <p className='text-[#49556D]'>Hotel </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                    
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                villa: !prevState.villa,
                                            }))
                                        }
                                    />
                                    <p className='text-[#49556D]'>Villa </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                    
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                apartment: !prevState.apartment,
                                            }))
                                        }
                                    /> <p className='text-[#49556D]'>Apartment </p>
                                </div>
                                <div className='flex items-center gap-3'>

                                    <input
                                        type="checkbox"
                                    
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                privateVacationHome: !prevState.privateVacationHome,
                                            }))
                                        }
                                    />
                                    <p className='text-[#49556D]'>Private vacation home </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                    
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                guesthouse: !prevState.guesthouse,
                                            }))
                                        }
                                    />
                                    <p className='text-[#49556D]'>Guesthouse </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                    
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                houseboat: !prevState.houseboat,
                                            }))
                                        }
                                    />
                                    <p className='text-[#49556D]'>Houseboat </p>
                                </div>
                            </div>
                        )}
                    </div> */}
                    {/* Meal Plan Section */}
                    {/* <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer'
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
                                    d={isMealPlanOpen ? 'M7 10.5L12 14.5L17 10.5' : 'M17 14.5L12 10.5L7 14.5'}
                                    stroke="#0F1416"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </h5>

                        {isMealPlanOpen && (
                            <div className='mt-4 flex flex-col gap-4'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                    
                                        onChange={() =>
                                            setSelectedMealPlans((prevState) => ({
                                                ...prevState,
                                                breakfast: !prevState.breakfast,
                                            }))
                                        }
                                    />

                                    <p className='text-[#49556D]'>Breakfast included </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                    
                                        onChange={() =>
                                            setSelectedMealPlans((prevState) => ({
                                                ...prevState,
                                                allInclusive: !prevState.allInclusive,
                                            }))
                                        }
                                    />
                                    <p className='text-[#49556D]'>All inclusive </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                    
                                        onChange={() =>
                                            setSelectedMealPlans((prevState) => ({
                                                ...prevState,
                                                dinner: !prevState.dinner,
                                            }))
                                        }
                                    />
                                    <p className='text-[#49556D]'>Dinner included </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                    
                                        onChange={() =>
                                            setSelectedMealPlans((prevState) => ({
                                                ...prevState,
                                                lunch: !prevState.lunch,
                                            }))
                                        }
                                    /> <p className='text-[#49556D]'>Lunch included </p>
                                </div>

                            </div>
                        )}
                    </div> */}
                    {/* Popular Area Section */}
                    {/* <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer'
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
                                    d={isPopularAreaOpen ? 'M7 10.5L12 14.5L17 10.5' : 'M17 14.5L12 10.5L7 14.5'}
                                    stroke="#0F1416"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </h5>

                        {isPopularAreaOpen && (
                            <div className='mt-4 flex flex-col gap-4'>
                                <div className='flex items-center gap-3  justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                        
                                            onChange={() =>
                                                setSelectedPopularAreas((prevState) => ({
                                                    ...prevState,
                                                    beach: !prevState.beach,
                                                }))
                                            }
                                        />

                                        <p className='text-[#49556D]'>Beach   </p>
                                    </div> <span className='text-[#49556D]'>{"999"}</span>
                                </div>
                                <div className='flex items-center gap-3  justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                        
                                            onChange={() =>
                                                setSelectedPopularAreas((prevState) => ({
                                                    ...prevState,
                                                    mountain: !prevState.mountain,
                                                }))
                                            }
                                        />

                                        <p className='text-[#49556D]'>Mountain   </p>
                                    </div> <span className='text-[#49556D]'>{"999"}</span>
                                </div>
                                <div className='flex items-center gap-3  justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                        
                                            onChange={() =>
                                                setSelectedPopularAreas((prevState) => ({
                                                    ...prevState,
                                                    city: !prevState.city,
                                                }))
                                            }
                                        /> <p className='text-[#49556D]'>City   </p>
                                    </div> <span className='text-[#49556D]'>{"999"}</span>
                                </div>
                                <div className='flex items-center gap-3  justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                        
                                            onChange={() =>
                                                setSelectedPopularAreas((prevState) => ({
                                                    ...prevState,
                                                    adventure: !prevState.adventure,
                                                }))
                                            }
                                        />
                                        <p className='text-[#49556D]'>Adventure   </p>
                                    </div> <span className='text-[#49556D]'>{"999"}</span>
                                </div>
                                <div className='flex items-center gap-3  justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                        
                                            onChange={() =>
                                                setSelectedPopularAreas((prevState) => ({
                                                    ...prevState,
                                                    thematicTours: !prevState.thematicTours,
                                                }))
                                            }
                                        /> <p className='text-[#49556D]'>Thematic Tours   </p>
                                    </div> <span className='text-[#49556D]'>{"999"}</span>
                                </div>
                                <div className='flex items-center gap-3  justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                        
                                            onChange={() =>
                                                setSelectedPopularAreas((prevState) => ({
                                                    ...prevState,
                                                    cultural: !prevState.cultural,
                                                }))
                                            }
                                        /> <p className='text-[#49556D]'>Cultural   </p>
                                    </div> <span className='text-[#49556D]'>{"999"}</span>
                                </div>
                                <div className='flex items-center gap-3  justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                        
                                            onChange={() =>
                                                setSelectedPopularAreas((prevState) => ({
                                                    ...prevState,
                                                    historical: !prevState.historical,
                                                }))
                                            }
                                        />
                                        <p className='text-[#49556D]'>Historical   </p>
                                    </div> <span className='text-[#49556D]'>{"999"}</span>
                                </div>
                                <div className='flex items-center gap-3  justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                            onChange={() =>
                                                setSelectedPopularAreas((prevState) => ({
                                                    ...prevState,
                                                    personalizedTours: !prevState.personalizedTours,
                                                }))
                                            }
                                        />
                                        <p className='text-[#49556D]'>Personalized Tours  </p>
                                    </div> <span className='text-[#49556D]'>{"999"}</span>
                                </div>
                            </div>
                        )}
                    </div> */}
                    {/* Language Section */}
                    <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b pb-2 justify-between items-center cursor-pointer'
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
                                    d={isLanguageOpen ? 'M7 10.5L12 14.5L17 10.5' : 'M17 14.5L12 10.5L7 14.5'}
                                    stroke="#0F1416"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </h5>

                        {isLanguageOpen && (
                            <div className='mt-4 flex flex-col gap-4'>
                                {languages.map((language) => (
                                    <div key={language.id} className='flex items-center gap-3'>
                                        <input
                                            type="checkbox"
                                            checked={selectedLanguages[language.id] || false}
                                            onChange={() =>
                                                setSelectedLanguages((prevState) => ({
                                                    ...prevState,
                                                    [language.id]: !prevState[language.id],
                                                }))
                                            }
                                        />
                                        <p className='text-[#49556D]'>{language.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {loading ? 
                (
                    <div className='w-full'><Loading /></div>
                ) : (
                    <div className='animate-from-middle w-full lg:w-10/12'>
                        {/* Tour Display Section */}
                        <div className=''>
                            {error && <div className="text-red-500">{error}</div>}
                            {isCruiseRoute ? (
                                <div className='flex flex-col gap-6'>
                                    {/* {packages.map((cruise) => (
                                        <CruiseCard key={cruise.id} cruise={cruise} />
                                    ))} */}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    {packages.map((tour) => (
                                        <TourCard key={tour.id} tour={tour} isPackageRoute={isPackageRoute} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div> 
        </div >
    );
}

export default PackageTourCruise;
