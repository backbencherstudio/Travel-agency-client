import React from 'react'
import Details from "../../Components/DetailsComponent/Details";
import HeroSection from "../../Components/HeroSection/HeroSection";
import ParentComponent from "../../Components/ParentComponent/ParentComponent";
import bgImg from '../../assets/img/packages/banner.png';
import cancellationBg from '../../assets/img/tour-details/cancellation-bg.png';
import TravelPackages from "../../Components/Home/TravelPackages";
import { useParams } from "react-router-dom";
import ClientPackageApis from "../../Apis/clientApi/ClientPackageApis";
import { useEffect, useState } from "react";
import Loading from "../../Shared/Loading";

const PackageDetails = () => {
  const links = [{name: "Home", path: "/"}, {name: "Packages", path: "/packages"}, {name: "Package Details", path: ""},]

  const [loading, setLoading] = useState(true);
  const [packageDetails, setPackageDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPackageDetails();
  }, [])

  const getPackageDetails = async () => {
    const res = await ClientPackageApis.getOne(id);
    if (res?.success) {
      setPackageDetails(res?.data)
      setLoading(false);
    }
  }
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="bg-[#F0F4F9]" >
            <HeroSection bgImg={bgImg} pageName="Our Packages" links={links} description={packageDetails?.description} />
            <ParentComponent>
              <Details details={packageDetails} />
            </ParentComponent>
          </div>
        </div>
      )}
    </div>
  )
}

export default PackageDetails