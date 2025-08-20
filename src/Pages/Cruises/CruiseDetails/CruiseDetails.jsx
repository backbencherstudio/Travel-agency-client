import Details from '../../../Components/DetailsComponent/Details'
import HeroSection from '../../../Components/HeroSection/HeroSection'
import ParentComponent from '../../../Components/ParentComponent/ParentComponent'
import blogImage from '../../../assets/img/blogs/blogImage.png'
import mapImg from "../../../assets/img/tour-details/map.png";
import travelVideo from "../../../assets/img/travel/0c00ef17a18288fcfcf5934250ef6b4fe26652db.jpg";
import travelPhoto1 from "../../../assets/img/travel/751d78fa7767afed5b30f17ae77655a74a7e6305.jpg";
import travelPhoto2 from "../../../assets/img/travel/919a1168ed892703b96dbab67c5c590c1c52c24b.jpg";
import travelPhoto3 from "../../../assets/img/travel/c12cd5bf7ed6f1d806653c922784e46c57bdd546.jpg";
import travelPhoto4 from "../../../assets/img/travel/e0539ecd708b1a3a5d466c11ccb3dc87c12645ad.jpg";
import cruiseStaticImg1 from '../../../assets/img/Cruise/1e1ca89ad55d000b109e743750ace299463279cc.png'
import cruiseStaticImg2 from '../../../assets/img/Cruise/068f28853c58e59479878a07463c8614ac98ac15.png'
import cruiseStaticImg3 from '../../../assets/img/Cruise/2484b60572465720a589cb067a0723e5db769f21.png'
import cruiseStaticImg4 from '../../../assets/img/Cruise/05782a48d1257cc2084142163058caaccdb7162a.png'
import cruiseStaticImg5 from '../../../assets/img/Cruise/c6adfa06e79cf5e25bc739760271e8730d17ac89.png'
import cruiseStaticImg6 from '../../../assets/img/Cruise/d4223c0b7dd135299f3459c81dc255a2f122e7e1.png'
import cancellationBg from '../../../assets/img/tour-details/cancellation-bg.png'
import TravelPackages from '../../../Components/Home/TravelPackages'
import { useParams } from 'react-router-dom'
import ClientPackageApis from '../../../Apis/clientApi/ClientPackageApis'
import { useEffect, useState } from 'react'
import TravelWithUs from '../../../Components/Home/TravelWithUs'
import Loading from '../../../Shared/Loading'
import { Helmet } from 'react-helmet-async'
import Chatcard from '../../Tours/TourDetails/ChatCard';
const CruiseDetails = () => {


  //static data for disply purpose of testing.
  const [openChat, setOpenChat] = useState(false)
  const cruiseData = {
    cancellation_policy: {
      description: "early check-in & late check-out are subject to availability and may incur additional charges.",
      id: "cm6j5xs6u000opj7pjrjy67y4",
      policy: "Check-in & Check-out"
    },
    created_at: "2025-02-01T08:37:27.072Z",
    descriiption: "Bali is a paradise that promises breathtaking scenery, rich cultural heritage, and unforgettable experiences. From serene beaches and ancient temples to majestic waterfalls hidden in lush landscapes, Bali has something for every traveler. This guide takes you through the must-see spots in Bali for an adventure you'll treasure forever.",
    id: "cm6lxwpfj0005pjvk0553err9",
    duration: 1,
    max_capacity: 1,
    min_capacity: 1,
    name: "Sacred Temples of Bali",
    reveiws: [],
    package_destinations: [
      {
        destination: {
          country: {
            id: '20', name: "Bangladesh"
          },
          id: "cm5dgnqhu0001wvyowqat60gc",
          name: "Dhaka"
        }
      }
    ],
    package_files: [
      {
        file: cruiseStaticImg1,
        file_url: "https://backend.wepaser.com/public/storage/package/a59cfdf025c47e881cc13f5eab443c85image (1).png",
        id: "cm6lxwpfq0006pjvkw1wdu3x3"
      },
      {
        file: cruiseStaticImg2,
        file_url: "https://backend.wepaser.com/public/storage/package/72cf98b76b77fe44f5fc9810e6fff492aimage (2).png",
        id: "cm6lxwpfq0007pjvkpzesaajw"
      },
      {
        file: cruiseStaticImg3,
        file_url: "https://backend.wepaser.com/public/storage/package/6c28c8d240b89295c837ce109105eabbimage (3).png",
        id: "cm6lxwpfq0008pjvkdokgurnq"
      },
      {
        file: cruiseStaticImg4,
        file_url: "https://backend.wepaser.com/public/storage/package/10793ea227ebf12c74ede2978e3533eccimage (4).png",
        id: "cm6lxwpfq0009pjvkdsd3nuvh"
      },
      {
        file: cruiseStaticImg5,
        file_url: "https://backend.wepaser.com/public/storage/package/d1749499b87c86510b501233551e26fdaimage (5).png",
        id: "cm6lxwpfq000apjvk9nw6e5k6"
      },
      {
        file: cruiseStaticImg6,
        file_url: "https://backend.wepaser.com/public/storage/package/3d7ff63b2495f4d105f22bc210423d1597tony2.jpg",
        id: "cm6owioqe0000pjdfnuek27m7"
      }
    ],
    package_languages: [
      {
        language: {
          id: "cm6j5tdi8000epj7pygs823vp",
          name: "English"
        }
      }
    ],
    package_traveller_types: [
      {
        traveller_type: {
          id: "cm6j5v7oz000jpj7p51gcx1wp",
          type: "Solo travelers (if you only accept groups or families)"
        }
      }
    ],
    package_trip_plans: [
      {
        descriiption: "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. ",
        id: "cm6lxwpfy000cpjvkprzhz7sp",
        package_trip_plan_images: [
          {
            id: "cm6lxwpg2000dpjvkc8meeg8k",
            image: "9af24fda1077cb1bf2808227a15560bf8Rectangle 34624278.png"
          }
        ]
      }
    ],
    price: "100",
    type: "tour",
    updated_at: "2025-02-03T10:21:51.915Z",
    user_id: "cm6d8tp4w0000wvm8vc95wgsr"
  }


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

  const meetingData = {
    meetingPointDetails: meetingPointDetails,
    travelingCity: travelingCity,
    startDate: startDate,
    endDate: endDate,
    operatingDayAndTime: operatingDayAndTime
  }

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



  const links = [
    { name: 'Home', path: '/' },
    { name: 'Cruises', path: '/cruises' },
    { name: 'Cruise Details', path: '' }
  ]
  const [loading, setLoading] = useState(true)
  const [cruise, setCruise] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    cruiseDetails()
  }, [])

  const cruiseDetails = async () => {
    const res = await ClientPackageApis.getOne(id)
    if (res?.success) {
      setCruise(res?.data)
      setLoading(false)
    }
    console.log('res', res)
  }

  const handleChatOpen = () => {
    setOpenChat(prev => !prev);
  }

  // console.log('cruise', cruise)

  return (
    <div>
      <Helmet>
        <title>Around 360 - Cruise Details</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div className='w-full'>
          <div className='bg-[#fff] flex flex-col gap-5'>
            {/* <HeroSection
              bgImg={blogImage}
              pageName='Our Cruise'
              links={links}
              description={cruise?.description}
            /> */}

            <div className='pt-[54px] pb-[80px] px-4 xl:px-[192px] w-full'>
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
                  details={cruiseData}
                  includeExclude={includeExclude}
                  tripPlan={tripPlan}
                  meetingData={meetingData}
                  additionalInformation={additionalInformation}
                  mapImgPackage={mapImgPackage}
                  TravellerPhotos={TravellerPhotos}
                  topReviews={topReviews}
                />
              </ParentComponent>
            </div>
          </div>
          {/* <div className='py-20'>
            <TravelWithUs />
          </div> */}
        </div>
      )}
      {openChat && <div className="top-0 left-0 z-[99] w-screen h-screen bg-[#000e1999] overflow-hidden fixed flex items-center justify-center backdrop-blur-[2px]">
        <Chatcard handleChatOpen={handleChatOpen} />
      </div>}
    </div>
  )
}
export default CruiseDetails
