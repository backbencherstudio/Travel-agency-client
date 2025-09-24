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
import travelVideo from "../../assets/img/tour-details/travel-video.png";
import travelPhoto1 from "../../assets/img/tour-details/travel-img1.png";
import travelPhoto2 from "../../assets/img/tour-details/travel-img2.png";
import travelPhoto3 from "../../assets/img/tour-details/travel-img3.png";
import travelPhoto4 from "../../assets/img/tour-details/travel-img4.jpg";

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

   const [tripPlan, setTripPlan] = useState([
    {
      id: 1,
      title: "Paraces",
      body: "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
      time: 45,
      fee: "Free",
    },
    {
      id: 2,
      title: "Oasis Huacachina",
      body: "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
      time: 45,
      fee: "Free",
    },
    {
      id: 3,
      title: "Miraflores",
      body: "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
      time: 45,
      fee: "Free",
    },
  ]);

    const TravellerPhotos = [
      travelVideo,
      travelPhoto1,
      travelPhoto2,
      travelPhoto3,
      travelPhoto4,
    ];


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
                tripPlan={tripPlan}
                TravellerPhotos={TravellerPhotos}
              />
            </ParentComponent>
          </div>
          <ParentComponent>
            <div
              className="relative w-full px-4 sm:px-8 py-16 rounded-2xl bg-cover bg-bottom bg-no-repeat"
              style={{ backgroundImage: `url(${cancellationBg})` }}
            >
              <div className="absolute inset-0 bg-blue-900/80 rounded-2xl"></div>
              <div className="relative z-10 max-w-xl mx-auto flex flex-col justify-center items-center gap-4 text-center">
                <h1 className="text-2xl md:text-5xl font-bold text-white">
                  Free cancellation
                </h1>
                <p className="text-base md:text-xl font-normal text-white">
                  You'll receive a full refund if you cancel at least 24 hours
                  in advance of most experiences.
                </p>
              </div>
            </div>
            <div className="pt-20">
              <TravelPackages />
            </div>
          </ParentComponent>
        </div>
      )}
    </div>
  )
}

export default PackageDetails