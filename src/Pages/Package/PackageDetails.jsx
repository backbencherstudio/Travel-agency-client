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
import { Helmet } from 'react-helmet-async';

const PackageDetails = () => {
  const links = [{ name: "Home", path: "/" }, { name: "Packages", path: "/packages" }, { name: "Package Details", path: "" },]

  const [loading, setLoading] = useState(true);
  const [packageDetails, setPackageDetails] = useState(null);
  const { id } = useParams();

  const [includeExclude, setIncludeExclude] = useState({
    "Hotel + All Inclusive": true,
    "Breakfast, Lunch & Dinner": true,
    "Hotel Accommodation": true,
    "Sight Seen": false,
    "City Tour": false,
    "Custom Duty": false,
    "Professional Tour Guide": true,
    "Transfer Between Destinations": true,
    "Personal Expenses": false,
    "How to use premade UI kits": true,
  });

  const travelingCity = "Mexico";
  const startDate = "11/22/2024";
  const endDate = "05/10/2026";
  const operatingDayAndTime = [
    ["Monday - Thursday", "7:00 AM -10:00 PM"],
    ["Friday", "6:00 AM - 11:30 PM"],
    ["Saturday", "7:00 AM - 11:30 PM"],
    ["Sunday", "7:00 AM - 10:00 PM"],
  ];
  const meetingPointDetails = "Volare I Vuelos en globo Carretera Libre a Tulancingo Km 27.5 San Francisco Mazapa Manzana 005, 55830 de Arista, Méx., Mexico";

  const meetingData = {
    meetingPointDetails: meetingPointDetails,
    travelingCity: travelingCity,
    startDate: startDate,
    endDate: endDate,
    operatingDayAndTime: operatingDayAndTime
  }


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
      <Helmet>
        <title>Around 360 - Package Details</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="bg-[#F0F4F9]" >
            <HeroSection bgImg={bgImg} pageName="Our Packages" links={links} description={packageDetails?.description} />
            <ParentComponent>
              <Details
                details={packageDetails}
                includeExclude={includeExclude}
                meetingData={meetingData}
              />
            </ParentComponent>
          </div>
        </div>
      )}
    </div>
  )
}

export default PackageDetails