import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CiSearch } from 'react-icons/ci';
import { FaRegCalendarAlt, FaStar } from 'react-icons/fa';

function AllTours() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isDurationOpen, setIsDurationOpen] = useState(false);
    const [isBudgetOpen, setIsBudgetOpen] = useState(false);
    const [isRatingOpen, setIsRatingOpen] = useState(false);
    const [isCancellationOpen, setIsCancellationOpen] = useState(false);
    const [isResidenceOpen, setResidenceOpen] = useState(false);
    const [isMealPlanOpen, setMealPlanOpen] = useState(false);
    const [isPopularAreaOpen, setPopularAreaOpen] = useState(false);
    const [budget, setBudget] = useState(5000); // Default budget set to 5000 

    const toggleDuration = () => setIsDurationOpen((prev) => !prev);
    const toggleBudget = () => setIsBudgetOpen((prev) => !prev);
    const toggleRating = () => setIsRatingOpen((prev) => !prev);
    const toggleCancellation = () => setIsCancellationOpen((prev) => !prev);
    const toggleResidence = () => setResidenceOpen((prev) => !prev);
    const toggleMealPlan = () => setMealPlanOpen((prev) => !prev);
    const togglePopularArea = () => setPopularAreaOpen((prev) => !prev);

    const handleBudgetChange = (e) => {
        setBudget(e.target.value); // Update budget state
    };

    const sliderStyle = {
        background: `linear-gradient(to right, rgba(235, 91, 42, 1) ${budget / 50}%, rgba(224, 224, 224, 1) ${budget / 50}%)`,
    };


    const [searchDestination, setSearchDestination] = useState('');
    console.log(budget); // This will print the selected budget value
    const [ratingFilters, setRatingFilters] = useState({
        fiveStars: false,
        fourStars: false,
        threeStars: false,
        twoStars: false,
        oneStar: false,
    });
    const handleRatingChange = (rating) => {
        setRatingFilters((prevState) => ({
            ...prevState,
            [rating]: !prevState[rating],
        }));
    };
    console.log(ratingFilters); // This will print the selected ratings as true/false
    const [isFreeCancellation, setIsFreeCancellation] = useState(false);

    console.log(isFreeCancellation); // This will print true or false
    const [selectedResidences, setSelectedResidences] = useState({
        indonesia: false,
        bali: false,
        iceland: false,
        japan: false,
        italy: false,
        paris: false,
    });
    console.log(selectedResidences); // This will print the selected residences
    const [selectedMealPlans, setSelectedMealPlans] = useState({
        breakfast: false,
        allInclusive: false,
        dinner: false,
        lunch: false,
    });
    console.log(selectedMealPlans); // This will print the selected meal plans
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
    console.log(selectedPopularAreas); // This will print the selected popular areas


    const [tours, setTours] = useState([]);
    const [filters, setFilters] = useState({
        location: '',
        budget: 5000,
        startDate: null,
        endDate: null,
        page: 1,
        limit: 10,
        ratingFilters: { 5: false, 4: false, 3: false, 2: false, 1: false },
    });

    const [totalPages, setTotalPages] = useState(0);

    const applyFilters = async () => {
        setLoading(true);
    
        const queryParams = new URLSearchParams();
    
        if (filters.location) queryParams.append('location', filters.location);
        if (filters.budget) queryParams.append('budget', filters.budget);
        if (filters.page) queryParams.append('page', filters.page);
        if (filters.limit) queryParams.append('limit', filters.limit);
    
        // Add rating filters to query string
        Object.keys(filters.ratingFilters).forEach((rating) => {
          if (filters.ratingFilters[rating]) {
            queryParams.append('ratingFilters[' + rating + ']', true);
          }
        });
    
        try {
          const response = await fetch(`http://localhost:5000/api/tours?${queryParams.toString()}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch tours');
          }
    
          const data = await response.json();
          setTours(data.tours);  // Set filtered tours
          setLoading(false);
        } catch (err) {
          setError(err.message);  // Handle any error
          setLoading(false);
        }
      };

    // Call applyFilters whenever filters change
    useEffect(() => {
        applyFilters();
    }, [filters]);

    return (
        <div className='container mx-auto'>
            <div className='py-20'>
                {/* Filter Section */}
                <div className='p-6 bg-white w-fit rounded-xl shadow-md min-w-[300px] flex flex-col gap-3'>
                    {/* Search Input */}
                    <div className='flex gap-2 border items-center py-2 px-5 rounded-md'>
                        <CiSearch className='text-3xl' />
                        <input
                            className='outline-none w-full'
                            type='text'
                            placeholder='Search Destination'
                            value={searchDestination}
                            onChange={(e) => setSearchDestination(e.target.value)}
                        />

                    </div>

                    {/* Duration Section */}
                    <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b-2 pb-2 justify-between items-center cursor-pointer'
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
                                    <div className='flex border items-center justify-between p-2 rounded-md border-[#C1D0E5] shadow-sm'>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            placeholderText="Start Date"
                                            className='outline-none w-full'
                                        />
                                        <FaRegCalendarAlt className='text-2xl' />
                                    </div>
                                    <div className='flex border items-center justify-between p-2 rounded-md border-[#C1D0E5] shadow-sm'>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            placeholderText="End Date"
                                            className='outline-none w-full'
                                        />
                                        <FaRegCalendarAlt className='text-2xl' />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Budget Section */}
                    <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b-2 pb-2 justify-between items-center cursor-pointer'
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
                                    <div className="flex items-center justify-between text-sm text-black">
                                        <span>$0</span>
                                        <span>$5000</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="5000"
                                        step="100"
                                        value={budget}
                                        onChange={handleBudgetChange}
                                        style={sliderStyle} // Dynamic background color based on the budget
                                        className="w-full h-1 rounded-lg appearance-none cursor-pointer text-white"
                                    />
                                    <p className="text-center mt-2 text-gray-700 font-medium">
                                        ${budget}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Rating Section */}
                    <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b-2 pb-2 justify-between items-center cursor-pointer'
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
                                    <div className='flex gap-[10px] items-center justify-between'>
                                        <div className='flex gap-2'>
                                            <input
                                                type="checkbox"
                                                checked={ratingFilters.fiveStars}
                                                onChange={() => handleRatingChange('fiveStars')}
                                            />

                                            <div className='flex gap-[1px]'>
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#ffb127]' />
                                            </div>
                                        </div>
                                        {"(999)"}
                                    </div>


                                    <div className='flex gap-[10px] items-center justify-between'>
                                        <div className='flex gap-2'>
                                            <input
                                                type="checkbox"
                                                checked={ratingFilters.fourStars}
                                                onChange={() => handleRatingChange('fourStars')}
                                            />

                                            <div className='flex gap-[1px]'>
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#a6aaac33]' />
                                            </div>
                                        </div>
                                        {"(999)"}
                                    </div>


                                    <div className='flex gap-[10px] items-center justify-between'>
                                        <div className='flex gap-2'>
                                            <input
                                                type="checkbox"
                                                checked={ratingFilters.threeStars}
                                                onChange={() => handleRatingChange('threeStars')}
                                            />

                                            <div className='flex gap-[1px]'>
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#a6aaac33]' />
                                                <FaStar className='text-xl text-[#a6aaac33]' />
                                            </div>
                                        </div>
                                        {"(999)"}
                                    </div>


                                    <div className='flex gap-[10px] items-center justify-between'>
                                        <div className='flex gap-2'>
                                            <input
                                                type="checkbox"
                                                checked={ratingFilters.twoStars}
                                                onChange={() => handleRatingChange('twoStars')}
                                            />

                                            <div className='flex gap-[1px]'>
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#a6aaac33]' />
                                                <FaStar className='text-xl text-[#a6aaac33]' />
                                                <FaStar className='text-xl text-[#a6aaac33]' />
                                            </div>
                                        </div>
                                        {"(999)"}
                                    </div>


                                    <div className='flex gap-[10px] items-center justify-between'>
                                        <div className='flex gap-2'>
                                            <input
                                                type="checkbox"
                                                checked={ratingFilters.oneStar}
                                                onChange={() => handleRatingChange('oneStar')}
                                            />

                                            <div className='flex gap-[1px]'>
                                                <FaStar className='text-xl text-[#ffb127]' />
                                                <FaStar className='text-xl text-[#a6aaac33]' />
                                                <FaStar className='text-xl text-[#a6aaac33]' />
                                                <FaStar className='text-xl text-[#a6aaac33]' />
                                                <FaStar className='text-xl text-[#a6aaac33]' />
                                            </div>
                                        </div>
                                        {"(999)"}
                                    </div>


                                </div>
                            </div>
                        )}
                    </div>
                    {/* Cancellation Section */}
                    <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b-2 pb-2 justify-between items-center cursor-pointer'
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
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                        checked={isFreeCancellation}
                                        onChange={() => setIsFreeCancellation((prev) => !prev)}
                                    />
                                    <p>Free Cancellation </p>

                                </div>
                            </div>
                        )}
                    </div>
                    {/* residence Section */}
                    <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b-2 pb-2 justify-between items-center cursor-pointer'
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
                                        checked={selectedResidences.indonesia}
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                indonesia: !prevState.indonesia,
                                            }))
                                        }
                                    />

                                    <p className='text-[#49556D]'>Indonesia </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                        checked={selectedResidences.bali}
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                bali: !prevState.bali,
                                            }))
                                        }
                                    />
                                    <p className='text-[#49556D]'>Bali </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                        checked={selectedResidences.iceland}
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                iceland: !prevState.iceland,
                                            }))
                                        }
                                    />
                                    <p className='text-[#49556D]'>Iceland </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                        checked={selectedResidences.japan}
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                japan: !prevState.japan,
                                            }))
                                        }
                                    /> <p className='text-[#49556D]'>Japan </p>
                                </div>
                                <div className='flex items-center gap-3'>

                                    <input
                                        type="checkbox"
                                        checked={selectedResidences.italy}
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                italy: !prevState.italy,
                                            }))
                                        }
                                    />
                                    <p className='text-[#49556D]'>Italy </p>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                        checked={selectedResidences.paris}
                                        onChange={() =>
                                            setSelectedResidences((prevState) => ({
                                                ...prevState,
                                                paris: !prevState.paris,
                                            }))
                                        }
                                    />
                                    <p className='text-[#49556D]'>Paris </p>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Meal Plan Section */}
                    <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b-2 pb-2 justify-between items-center cursor-pointer'
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
                                        checked={selectedMealPlans.breakfast}
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
                                        checked={selectedMealPlans.allInclusive}
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
                                        checked={selectedMealPlans.dinner}
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
                                        checked={selectedMealPlans.lunch}
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
                    </div>
                    {/* Popular Area Section */}
                    <div>
                        <h5
                            className='flex text-lg font-bold my-3 border-b-2 pb-2 justify-between items-center cursor-pointer'
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
                                    d={isMealPlanOpen ? 'M7 10.5L12 14.5L17 10.5' : 'M17 14.5L12 10.5L7 14.5'}
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
                                            checked={selectedPopularAreas.beach}
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
                                            checked={selectedPopularAreas.mountain}
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
                                            checked={selectedPopularAreas.city}
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
                                            checked={selectedPopularAreas.adventure}
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
                                            checked={selectedPopularAreas.thematicTours}
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
                                            checked={selectedPopularAreas.cultural}
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
                                            checked={selectedPopularAreas.historical}
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
                                            checked={selectedPopularAreas.personalizedTours}
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllTours;
