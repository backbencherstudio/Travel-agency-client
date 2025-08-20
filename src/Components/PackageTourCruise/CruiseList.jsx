import CruiseCard from '../../Pages/Cruises/CruiseCard';

const CruiseList = ({ cruises, isPackageRoute, lovedPackages, specialOffer, handleLovedPackages }) => {
  return (
    <div className="flex flex-col gap-5">
      {cruises.map((cruise) => (
        <CruiseCard 
          key={cruise.id} 
          cruise={cruise} 
          isPackageRoute={isPackageRoute}
          lovedPackages={lovedPackages}
          specialOffer={specialOffer}
          handleLovedPackages={handleLovedPackages}
        />
      ))}
    </div>
  );
};

export default CruiseList;