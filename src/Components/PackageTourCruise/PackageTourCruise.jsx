import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { debounce } from "lodash";

// Filter Components
import FilterSection from "./Filters/FilterSection";
import SearchFilter from "./Filters/SearchFilter";
import DateRangeFilter from "./Filters/DateRangeFilter";
import BudgetFilter from "./Filters/BudgetFilter";
import RatingFilter from "./Filters/RatingFilter";
import CancellationFilter from "./Filters/CancellationFilter";
import DestinationFilter from "./Filters/DestinationFilter";
import ResidenceTypeFilter from "./Filters/ResidenceTypeFilter";
import MealPlanFilter from "./Filters/MealPlanFilter";
import PopularAreaFilter from "./Filters/PopularAreaFilter";
import LanguageFilter from "./Filters/LanguageFilter";
import User from "../Dashboard/chat/Components/User";
import { AuthContext } from "~/Context/AuthProvider/AuthProvider";

// Display Components
import TourList from "./TourList";
import CruiseList from "./CruiseList";
import Loading from "../../Shared/Loading";

// APIs and Context
import { useTravelData } from "../../Context/TravelDataContext/TravelDataContext";
import ClientPackageApis from "../../Apis/clientApi/ClientPackageApis";
import ClientLanguageApis from "../../Apis/clientApi/ClientLanguageApis";
import { UserServices } from "~/userServices/user.services";

function PackageTourCruise({ getPackagesData, pageLoading, currentPage }) {
  const location = useLocation();
  const navigate = useNavigate();
    const { user, fetchUserInfo } = useContext(AuthContext);
  const { destinations, cancellationPolicies } = useTravelData();

  // ------------------- Filters state -------------------
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [searchDestination, setSearchDestination] = useState("");
  const [queryParam, setQueryParam] = useState("");

  // Single-selection filters
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedResidence, setSelectedResidence] = useState(null);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [selectedPopularArea, setSelectedPopularArea] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const [isFreeCancellation, setIsFreeCancellation] = useState({});
  const [selectedDestinations, setSelectedDestinations] = useState({});
  const [languages, setLanguages] = useState([]);

  // ------------------- Data state -------------------
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lovedPackages, setLovedPackages] = useState({});
  const [specialOffer, setSpecialOffer] = useState({
    cm6lxw87f0001pjvknqzcxiq2: false,
    cm6lxwpfj0005pjvk0553err9: true,
  });

  const isCruiseRoute = location.pathname.includes("cruises");
  const isPackageRoute = location.pathname.includes("packages");
  const isSearchResultsRoute = location.pathname.includes("search-results");
  const itemsPerPage = 6;

  // ------------------- Debounced functions -------------------
  const debouncedSetPriceRange = useRef(
    debounce((newPriceRange) => setPriceRange(newPriceRange), 100)
  ).current;

  const debouncedSearch = useRef(
    debounce((value) => setSearchDestination(value), 500)
  ).current;

  // ------------------- Fetch languages -------------------
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await ClientLanguageApis.getLanguages();
        if (response.success) {
          setLanguages(response.data);
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  // ------------------- Apply filters -------------------
  useEffect(() => {
    applyFilters();
    fetchWishList();
  }, [
    startDate,
    endDate,
    priceRange,
    selectedRating,
    selectedResidence,
    selectedMealPlan,
    selectedPopularArea,
    isFreeCancellation,
    selectedDestinations,
    selectedLanguage,
    searchDestination,
    queryParam,
  ]);

  // ------------------- Handlers -------------------
  const handleDateChange = (date, isStart) => {
    if (isStart) {
      setStartDate(date);
      if (endDate && date > endDate) setEndDate(null);
    } else {
      if (!startDate || date < startDate) return;
      setEndDate(date);
    }
  };

  const handlePriceChange = (type, value) => {
    const numValue = Number(value);
    if (type === "min") {
      debouncedSetPriceRange({
        ...priceRange,
        min: Math.min(numValue, priceRange.max - 100),
      });
    } else {
      debouncedSetPriceRange({
        ...priceRange,
        max: Math.max(numValue, priceRange.min + 100),
      });
    }
  };

  const handleRatingChange = (stars) => {
    setSelectedRating(selectedRating === stars ? null : stars);
  };

  const handleResidenceChange = (residence) => {
    setSelectedResidence(selectedResidence === residence ? null : residence);
  };

  const handleMealPlanChange = (mealPlan) => {
    setSelectedMealPlan(selectedMealPlan === mealPlan ? null : mealPlan);
  };

  const handlePopularAreaChange = (area) => {
    setSelectedPopularArea(selectedPopularArea === area ? null : area);
  };

  const handleLovedPackages = async (packageId) => {
    try {
       const res = await UserServices?.addToWishList({
          package_id: packageId,
        });
      if (res?.success) {
        applyFilters();
        fetchWishList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchWishList = async () => {
    try {
      const res = await UserServices?.getWishList();
      if (res?.success) {
        const lovedMap = {};
        res?.data?.forEach((item) => {
          lovedMap[item?.package?.id] = true;
        });
        setLovedPackages(lovedMap);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ------------------- Apply filters function -------------------
  const applyFilters = async () => {
    setLoading(true);
    try {
      const formattedStartDate = startDate?.toISOString().split("T")[0] || "";
      const formattedEndDate = endDate?.toISOString().split("T")[0] || "";

      const filterParams = {
        user_id:user?.id,
        q: queryParam || "",
        duration_start: formattedStartDate,
        duration_end: formattedEndDate,
        min_price: priceRange.min,
        max_price: priceRange.max,
        ...(selectedRating !== null && { rating: selectedRating }),
        ...(selectedResidence !== null && { residences: [selectedResidence] }),
        ...(selectedMealPlan !== null && { mealPlans: [selectedMealPlan] }),
        ...(selectedPopularArea !== null && {
          popularAreas: [selectedPopularArea],
        }),
        policies: Object.fromEntries(
          Object.entries(isFreeCancellation).map(([policyId, value]) => {
            const policy = cancellationPolicies.find((p) => p.id === policyId);
            return [policy?.name || policyId, value];
          })
        ),
        destinations: Object.entries(selectedDestinations)
          .filter(([_, value]) => value)
          .map(([key]) => key),
        searchQuery: searchDestination,
        languages: selectedLanguage ? [selectedLanguage] : [],
      };

      const params = new URLSearchParams(location.search);
      Object.entries(filterParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          if (value.length > 0) params.set(key, value.join(","));
          else params.delete(key);
        } else if (value !== null && value !== undefined)
          params.set(key, value.toString());
        else params.delete(key);
      });

      navigate(`${location.pathname}?${params.toString()}`, { replace: true });

      const res = await ClientPackageApis.all(
        isCruiseRoute
          ? "cruise"
          : isPackageRoute
          ? "package"
          : isSearchResultsRoute
          ? ""
          : "tour",
        filterParams,
        user?.id
      );

      if (res.success) {
        setPackages(res?.data);
        getPackagesData(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  // ------------------- Pagination -------------------
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = packages.slice(indexOfFirstItem, indexOfLastItem);

  // ------------------- Cleanup -------------------
  useEffect(() => {
    return () => {
      debouncedSetPriceRange.cancel();
      debouncedSearch.cancel();
    };
  }, [debouncedSetPriceRange, debouncedSearch]);

  // ------------------- Render -------------------
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="px-4 xl:px-0 pt-10 xl:pt-20 flex items-start justify-start lg:gap-6 flex-col lg:flex-row">
        {/* Filter Section */}
        <div className="p-6 lg:sticky top-10 lg:max-w-[300px] mb-6 lg:mb-0 bg-white rounded-xl shadow-md flex flex-col w-full gap-3">
          <SearchFilter
            searchDestination={searchDestination}
            onSearchChange={debouncedSearch}
          />

          <FilterSection title="Durations">
            <DateRangeFilter
              startDate={startDate}
              endDate={endDate}
              onDateChange={handleDateChange}
            />
          </FilterSection>

          <FilterSection title="Budget">
            <BudgetFilter
              priceRange={priceRange}
              minPrice={0}
              maxPrice={5000}
              onPriceChange={handlePriceChange}
            />
          </FilterSection>

          <FilterSection title="Ratings">
            <RatingFilter
              selectedRating={selectedRating}
              onRatingChange={handleRatingChange}
            />
          </FilterSection>

          <FilterSection title="Free Cancellation options">
            <CancellationFilter
              cancellationPolicies={cancellationPolicies}
              isFreeCancellation={isFreeCancellation}
              onCancellationChange={setIsFreeCancellation}
            />
          </FilterSection>

          <FilterSection title="Popular Destination">
            <DestinationFilter
              destinations={destinations}
              selectedDestinations={selectedDestinations}
              onDestinationChange={setSelectedDestinations}
            />
          </FilterSection>

          <FilterSection title="Type of residence">
            <ResidenceTypeFilter
              selectedResidence={selectedResidence}
              onResidenceChange={handleResidenceChange}
            />
          </FilterSection>

          <FilterSection title="Meal plans available">
            <MealPlanFilter
              selectedMealPlan={selectedMealPlan}
              onMealPlanChange={handleMealPlanChange}
            />
          </FilterSection>

          <FilterSection title="Popular Area">
            <PopularAreaFilter
              selectedArea={selectedPopularArea}
              onAreaChange={handlePopularAreaChange}
            />
          </FilterSection>

          <FilterSection title="Languages">
            <LanguageFilter
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </FilterSection>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="w-full">
            <Loading />
          </div>
        ) : (
          <div className="animate-from-middle w-full lg:w-10/12">
            {isCruiseRoute ? (
              <CruiseList
                cruises={currentItems}
                isPackageRoute={isPackageRoute}
                lovedPackages={lovedPackages}
                specialOffer={specialOffer}
                handleLovedPackages={handleLovedPackages}
              />
            ) : (
              <TourList
                tours={currentItems}
                isPackageRoute={isPackageRoute}
                lovedPackages={lovedPackages}
                specialOffer={specialOffer}
                handleLovedPackages={handleLovedPackages}
                loading={pageLoading}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PackageTourCruise;
