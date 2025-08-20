import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import image1 from '../../assets/img/top-destinations/image-1.png';
import image2 from '../../assets/img/top-destinations/image-2.png';
import image3 from '../../assets/img/top-destinations/image-3.png';
import image4 from '../../assets/img/top-destinations/image-4.png';
import image5 from '../../assets/img/top-destinations/image-5.png';
import image6 from '../../assets/img/top-destinations/image-6.png';
import './home.css'
import { useTravelData } from '../../Context/TravelDataContext/TravelDataContext';

const TopDestinations = () => {
    const { homeData } = useTravelData();
    console.log("homeData", homeData);

  return (
    <div className="max-w-[1216px] mx-auto px-4">
        <div className="text-2xl md:text-5xl font-bold text-center text-[#1D1F2C]">
            Top Travel Destinations
        </div>
        <div className="py-12 md:py-20">
            <div className="grid grid-cols-12 gap-6">
            {homeData?.destinations?.map((destination, index) => (
                <div
                key={index}
                className={`relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-5 pb-5 pt-40 h-[400px] ${
                    index === 0 || index === 2
                    ? "col-span-12 md:col-span-3"
                    : index === 1
                    ? "col-span-12 md:col-span-6"
                    : index === 3 || index === 4 || index === 5
                    ? "col-span-12 md:col-span-4"
                    : ""
                }`}
                >
                <img
                    src={destination?.destination_images[0]?.image_url}
                    alt={destination?.destination_images[0]?.image}
                    effect="blur"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className={`absolute inset-0 ${
                    index === 0 || index === 2
                    ? "col-span-12 md:col-span-3 image-gradient-2"
                    : index === 1
                    ? "col-span-12 md:col-span-6 image-gradient-1"
                    : index === 3 || index === 4 || index === 5
                    ? "col-span-12 md:col-span-4 image-gradient-2"
                    : ""
                }`}></div>
                <h3 className="z-10 mt-3 text-2xl font-semibold text-white">
                    {destination.name}
                </h3>
                <div className="z-10 gap-y-1 overflow-hidden text-base leading-6 text-white">
                    {destination.tours}
                </div>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default TopDestinations