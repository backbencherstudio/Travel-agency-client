import React, { useEffect, useState } from "react";
import TourCard from "../Tours/TourCard";
import TourDetails from "../Tours/TourDetails/TourDetails";
import TourList from "~/Components/PackageTourCruise/TourList";
import { UserServices } from "~/userServices/user.services";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const location = useLocation();
  const router = useNavigate();
  const [wishList, setWishList] = useState([]);
  const isPackageRoute = location.pathname.includes("packages");

  const handleLovedPackages = async (packageId, value) => {
    try {
      const res = await UserServices?.removeFromWishList(packageId);
      if (res?.success) {
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
        setWishList(res?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWishList();
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-xl p-6">
      {wishList.length ? (
        <TourList
          tours={wishList}
          isPackageRoute={isPackageRoute}
          handleLovedPackages={handleLovedPackages}
          loading={false}
          specialOffer={[""]}
          lovedPackages={{cmfw1t29400iswsrc7kk2zr8e:true}}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <h2 className="text-black text-xl font-medium opacity-30">You wish list is empty</h2>
            <button onClick={()=>router('/tours')} type="button" className="bg-[#eb5b2a] text-white font-medium px-4 py-2 rounded-lg cursor-pointer">Browse tour</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
