import TourCard from "../../Pages/Tours/TourCard";

const TourList = ({
  tours,
  isPackageRoute,
  lovedPackages,
  specialOffer,
  handleLovedPackages,
  loading,
  fetchWishList,
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 transition-opacity duration-300 ${
        loading ? "opacity-50" : "opacity-100"
      }`}
    >
      {loading ? (
        <div className="col-span-2 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        tours?.map((tour) => (
          <TourCard
            key={tour.id}
            wishListId={tour?.id}
            tour={tour?.package || tour}
            isPackageRoute={isPackageRoute}
            lovedPackages={lovedPackages}
            specialOffer={specialOffer}
            handleLovedPackages={handleLovedPackages}
          />
        ))
      )}
    </div>
  );
};

export default TourList;
