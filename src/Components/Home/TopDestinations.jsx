import React from 'react';
import image1 from '../../assets/img/top-destinations/image-1.png';
import image2 from '../../assets/img/top-destinations/image-2.png';
import image3 from '../../assets/img/top-destinations/image-3.png';
import image4 from '../../assets/img/top-destinations/image-4.png';
import image5 from '../../assets/img/top-destinations/image-5.png';
import image6 from '../../assets/img/top-destinations/image-6.png';
import './home.css'

const TopDestinations = () => {
  return (
    <div className='container mx-auto'>
        <div className='text-2xl md:text-5xl font-bold text-center'>Top Travel Destinations</div>
        <div className='flex flex-col flex-wrap gap-6 items-center justify-center py-12 md:py-20'>
            <div className='flex flex-wrap justify-between gap-6 mx-2'>
                <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-5 pb-5 pt-40 mx-auto md:h-[400px] md:w-[285px]">
                    <img src={image1} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 image-gradient-2"></div>
                    <h3 className="z-10 mt-3 text-2xl font-semibold text-white">Indonesia</h3>
                    <div className="z-10 gap-y-1 overflow-hidden text-base leading-6 text-white">78 Times Tour</div>
                </div>
                <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-5 pb-5 pt-40 mx-auto md:h-[400px] md:w-[598px]">
                    <img src={image2} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover " />
                    <div className="absolute inset-0 image-gradient-1"></div>
                    <h3 className="z-10 mt-3 text-2xl font-semibold text-white">Bali</h3>
                    <div className="z-10 gap-y-1 overflow-hidden text-base leading-6 text-white">100 Times Tour</div>
                </div>
                <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-5 pb-5 pt-40 mx-auto h-[255px] w-[345px] md:h-[400px] md:w-[285px]">
                    <img src={image3} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 image-gradient-2"></div>
                    <h3 className="z-10 mt-3 text-2xl font-semibold text-white">Iceland</h3>
                    <div className="z-10 gap-y-1 overflow-hidden text-base leading-6 text-white">50 Times Tour</div>
                </div>
            </div>
            <div className='flex flex-wrap justify-between gap-6 mx-2'>
                <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-5 pb-5 pt-40 mx-auto md:h-[376px] md:w-[389.33px]">
                    <img src={image4} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 image-gradient-2"></div>
                    <h3 className="z-10 mt-3 text-2xl font-semibold text-white">Japan</h3>
                    <div className="z-10 gap-y-1 overflow-hidden text-base leading-6 text-white">98 Times Tour</div>
                </div>
                <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-5 pb-5 pt-40 mx-auto md:h-[376px] md:w-[389.33px]">
                    <img src={image5} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 image-gradient-2"></div>
                    <h3 className="z-10 mt-3 text-2xl font-semibold text-white">Italy</h3>
                    <div className="z-10 gap-y-1 overflow-hidden text-base leading-6 text-white">26 Times Tour</div>
                </div>
                <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-5 pb-5 pt-40 mx-auto h-[255px] w-[345px] md:h-[376px] md:w-[389.33px]">
                    <img src={image6} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 image-gradient-2"></div>
                    <h3 className="z-10 mt-3 text-2xl font-semibold text-white">Paris</h3>
                    <div className="z-10 gap-y-1 overflow-hidden text-base leading-6 text-white">48 Times Tour</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopDestinations