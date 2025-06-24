import Details from "../../../Components/DetailsComponent/Details";
import HeroSection from "../../../Components/HeroSection/HeroSection";
import ParentComponent from "../../../Components/ParentComponent/ParentComponent";
import mapImg from "../../../assets/img/tour-details/map.png";
import travelVideo from "../../../assets/img/tour-details/travel-video.png";
import travelPhoto1 from "../../../assets/img/tour-details/travel-img1.png";
import travelPhoto2 from "../../../assets/img/tour-details/travel-img2.png";
import travelPhoto3 from "../../../assets/img/tour-details/travel-img3.png";
import travelPhoto4 from "../../../assets/img/tour-details/travel-img4.jpg";
import cancellationBg from "../../../assets/img/tour-details/cancellation-bg.png";
import "./tourDetails.css";
import TravelPackages from "../../../Components/Home/TravelPackages";
import { useParams } from "react-router-dom";
import ClientPackageApis from "../../../Apis/clientApi/ClientPackageApis";
import { useEffect, useState } from "react";
import Loading from "../../../Shared/Loading";
import { Helmet } from "react-helmet-async";
import Chatcard from "./ChatCard";

const TourDetails = () => {
  // const links = [
  //   { name: "Home", path: "/" },
  //   { name: "Tours", path: "/tours" },
  //   { name: "Tour Details", path: "" },
  // ];
  const [loading, setLoading] = useState(true);
  const [tour, setTour] = useState(null);
  const { id } = useParams();
  const [openChat,setOpenChat] = useState(false)

  useEffect(() => {
    tourDetails();
  }, []);

  const tourDetails = async () => {
    const res = await ClientPackageApis.getOne(id);
    if (res?.success) {
      setTour(res?.data);
      setLoading(false);
    }
    // console.log('res', res)
  };

  const [includeExclude, setIncludeExclude] = useState({
    "hotel+all_inclusive": true,
    "breakfast,_lunch_&_dinner": true,
    hotel_accommodation: true,
    "sight-seen": false,
    city_tour: false,
    custom_duty: false,
  });
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

  const meetingPointDetails =
    "Volare I Vuelos en globo Carretera Libre a Tulancingo Km 27.5 San Francisco Mazapa Manzana 005, 55830 de Arista, Méx., Mexico";
  const travelingCity = "Mexico";
  const startDate = "11/22/2024";
  const endDate = "05/10/2026";
  const operatingDayAndTime = [
    ["Monday - Thursday", "7:00 AM -10:00 PM"],
    ["Friday", "6:00 AM - 11:30 PM"],
    ["Saturday", "7:00 AM - 11:30 PM"],
    ["Sunday", "7:00 AM - 10:00 PM"],
  ];

  const additionalInformation = [
    "Not wheelchair accessible",
    "Infants must sit on laps",
    "Due to weather conditions or any security reasons tour operator has right to change the desert dune bashing location",
    "Not recommended for pregnant travelers",
    "Travelers should have a moderate physical fitness level",
    "Confirrnatjon will be received at time of booking",
  ];
  const mapImgPackage = mapImg;

  const TravellerPhotos = [
    travelVideo,
    travelPhoto1,
    travelPhoto2,
    travelPhoto3,
    travelPhoto4,
  ];

  const [topReviews, setTopReviews] = useState([
    {
      id: 1,
      starts: 5,
      userName: "Marpreet_s",
      date: "Mar 2025",
      body: "Excellent experience exploring Dubai on a high speed boat — great tour guide who is also a good photographer!",
    },
    {
      id: 2,
      starts: 5,
      userName: "Marpreet",
      date: "Mar 2025",
      body: "Excellent experience exploring Dubai on a high speed boat — great tour guide who is also a good photographer!",
    },
    {
      id: 3,
      starts: 5,
      userName: "m",
      date: "Mar 2025",
      body: "Excellent experience exploring Dubai on a high speed boat — great tour guide who is also a good photographer!",
    },
    {
      id: 4,
      starts: 5,
      userName: "s",
      date: "Mar 2025",
      body: "Excellent experience exploring Dubai on a high speed boat — great tour guide who is also a good photographer!",
    },
  ]);

  // const tour =  {
  //     id: 1,
  //     title: "Sacred Temples of Bali",
  //     description: "Explore our diverse range of guided tours. each designed to immerse you in captivating destinations and unforgettable experiences.",
  //     overview: "Bali is a paradise that promises breathtaking scenery, rich cultural heritage, and unforgettable experiences. From serene beaches and ancient temples to majestic waterfalls hidden in lush landscapes, Bali has something for every traveler. This guide takes you through the must-see spots in Bali for an adventure you'll treasure forever.",
  //     rating: 4.8,
  //     days: 7,
  //     location: "Beijing, China",
  //     price: 2999,
  //     locationImage: image1,
  //     include: ["Hotel + All inclusive", "Breakfast, Lunch & Dinner", "Hotel Accommodation", "How to use premade UI kits", "Transfer Between Destinations"],
  //     exclude: ["Sight-seen", "City Tour", "Custom Duty"],
  //     tourPlan: [
  //         {"locationImage": image1, "day": 1, "tourDescription": "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."},
  //         {"locationImage": image2, "day": 2, "tourDescription": "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."},
  //         {"locationImage": image3, "day": 3, "tourDescription": "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."},
  //         {"locationImage": image4, "day": 4, "tourDescription": "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."}
  //     ],
  // }

  // console.log('id', id)

  const handleChatOpen=()=>{
    setOpenChat(prev => !prev);
  }

  return (
    <div className="pt-[54px] pb-[80px] px-4 xl:px-[192px] w-full">
      <Helmet>
        <title>Around 360 - Tour Details</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full">
          <div className="bg-[#fff] flex flex-col gap-5">
            {/* <HeroSection bgImg={bgImg} pageName="Our Tour" links={links} description={tour?.description} /> */}
            <div className="max-w-[1216px] mx-auto w-full pb-4">
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2 text-[10px] sm:text-sm">
                  <span>Home</span>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.942841 0.345964C0.673302 0.561595 0.629601 0.954903 0.845232 1.22444L3.86622 5.00067L0.845232 8.77691C0.629601 9.04645 0.673301 9.43975 0.94284 9.65538C1.21238 9.87102 1.60569 9.82731 1.82132 9.55778L5.15465 5.39111C5.33726 5.16285 5.33726 4.8385 5.15465 4.61024L1.82132 0.443573C1.60569 0.174034 1.21238 0.130333 0.942841 0.345964Z"
                      fill="#0F1416"
                    />
                  </svg>{" "}
                  <span>Tour</span>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="6"
                    height="10"
                    viewBox="0 0 6 10"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.942841 0.345964C0.673302 0.561595 0.629601 0.954903 0.845232 1.22444L3.86622 5.00067L0.845232 8.77691C0.629601 9.04645 0.673301 9.43975 0.94284 9.65538C1.21238 9.87102 1.60569 9.82731 1.82132 9.55778L5.15465 5.39111C5.33726 5.16285 5.33726 4.8385 5.15465 4.61024L1.82132 0.443573C1.60569 0.174034 1.21238 0.130333 0.942841 0.345964Z"
                      fill="#0F1416"
                    />
                  </svg>{" "}
                  <span>Tour Details</span>
                </div>
                <div className="flex gap-1 p-2 text-xs sm:text-[16px] items-center bg-[#F6F8FA] w-fit rounded cursor-pointer">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M9.44699 13.9264C12.2357 13.741 14.457 11.4882 14.6398 8.65993C14.6755 8.10647 14.6755 7.5333 14.6398 6.97983C14.457 4.1516 12.2357 1.89877 9.44699 1.7134C8.4956 1.65016 7.5023 1.65029 6.55285 1.7134C3.76418 1.89877 1.54286 4.1516 1.36008 6.97983C1.32431 7.5333 1.32431 8.10647 1.36008 8.65993C1.42665 9.69001 1.88221 10.6438 2.41852 11.4491C2.72992 12.0129 2.52441 12.7166 2.20006 13.3312C1.96619 13.7744 1.84926 13.996 1.94315 14.1561C2.03704 14.3162 2.24676 14.3213 2.6662 14.3315C3.4957 14.3517 4.05504 14.1165 4.49904 13.7891C4.75085 13.6034 4.87676 13.5106 4.96354 13.4999C5.05032 13.4892 5.2211 13.5596 5.56259 13.7002C5.86952 13.8266 6.2259 13.9046 6.55285 13.9264C7.5023 13.9895 8.4956 13.9896 9.44699 13.9264Z"
                        stroke="#EB5B2A"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.99693 8H8.00291M10.6606 8H10.6666M5.33325 8H5.33923"
                        stroke="#EB5B2A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-orange-500" onClick={handleChatOpen}>Chat now</div>
                </div>
              </div>
            </div>
            <ParentComponent>
              <Details
                details={tour}
                includeExclude={includeExclude}
                tripPlan={tripPlan}
                meetingPointDetails={meetingPointDetails}
                additionalInformation={additionalInformation}
                mapImgPackage={mapImgPackage}
                TravellerPhotos={TravellerPhotos}
                topReviews={topReviews}
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
      {openChat && <div className="top-0 left-0 z-[99] w-screen h-screen bg-[#000e1999] overflow-hidden fixed flex items-center justify-center backdrop-blur-[2px]">
        <Chatcard handleChatOpen={handleChatOpen}/>
      </div>}
    </div>
  );
};
export default TourDetails;
