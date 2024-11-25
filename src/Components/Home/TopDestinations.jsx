import React from 'react';
import image1 from '../../assets/img/top-destinations/image-1.png';
import image2 from '../../assets/img/top-destinations/image-2.png';
import image3 from '../../assets/img/top-destinations/image-3.png';
import image4 from '../../assets/img/top-destinations/image-4.png';
import image5 from '../../assets/img/top-destinations/image-5.png';
import image6 from '../../assets/img/top-destinations/image-6.png';
import './home.css'

const TopDestinations = () => {

    const destinations = [
        { name: "Indonesia", tours: "78 Times Tour", image: image1 },
        { name: "Bali", tours: "100 Times Tour", image: image2 },
        { name: "Iceland", tours: "50 Times Tour", image: image3 },
        { name: "Japan", tours: "98 Times Tour", image: image4 },
        { name: "Italy", tours: "26 Times Tour", image: image5 },
        { name: "Paris", tours: "48 Times Tour", image: image6 },
      ];

  return (
    <div className="max-w-7xl mx-auto px-4">
        <div className="text-2xl md:text-5xl font-bold text-center">
            Top Travel Destinations
        </div>
        <div className="py-12 md:py-20">
            <div className="grid grid-cols-12 gap-6">
            {destinations.map((destination, index) => (
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
                    src={destination.image}
                    alt={destination.name}
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