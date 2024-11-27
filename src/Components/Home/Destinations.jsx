import React from 'react';
import image1 from '../../assets/img/destinations/image-1.png';
import image2 from '../../assets/img/destinations/image-2.png';
import image3 from '../../assets/img/destinations/image-3.png';
import image4 from '../../assets/img/destinations/image-4.png';
import image5 from '../../assets/img/destinations/image-5.png';
import image6 from '../../assets/img/destinations/image-6.png';

const Destinations = () => {

    const destinations = [
        {
          id: 1,
          title: "Everest trek to Base Camp",
          starting_price: 105.00,
          image: image1,
        },
        {
          id: 2,
          title: "Everest trek to Base Camp",
          starting_price: 105.00,
          image: image2,
        },
        {
          id: 3,
          title: "Everest trek to Base Camp",
          starting_price: 105.00,
          image: image3,
        },
        {
          id: 4,
          title: "Everest trek to Base Camp",
          starting_price: 105.00,
          image: image4,
        },
        {
          id: 5,
          title: "Everest trek to Base Camp",
          starting_price: 105.00,
          image: image5,
        },
        {
          id: 6,
          title: "Everest trek to Base Camp",
          starting_price: 105.00,
          image: image6,
        },
    ];
    
  return (
    <div>
        <div className="w-full px-5 xl:px-0">
            <div className="max-w-[1216px] mx-auto">
                <div className="text-center max-w-xl mx-auto">
                    <div className='text-2xl md:text-5xl font-bold text-center'>Destinations for you</div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start py-12 md:py-20">
                    {destinations?.map(destination => (
                        <div className="flex gap-3 bg-white shadow rounded-xl overflow-hidden items-center justify-start">
                            <div className="relative w-[102px] h-[102px] flex-shrink-0">
                                <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={destination.image}/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-xl font-bold">{destination.title}</p>
                                <span className="text-sm text-[#4A4C56]">
                                    Price starts at <span className='text-[#EB5B2A]'>${destination.starting_price}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Destinations