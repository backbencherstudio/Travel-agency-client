import React from 'react';
import image1 from '../../assets/img/destinations/image-1.png';
import image2 from '../../assets/img/destinations/image-2.png';
import image3 from '../../assets/img/destinations/image-3.png';
import image4 from '../../assets/img/destinations/image-4.png';
import image5 from '../../assets/img/destinations/image-5.png';
import image6 from '../../assets/img/destinations/image-6.png';

const Destinations = () => {
  return (
    <div>
        <div className="w-full px-5">
            <div className="w-full max-w-6xl mx-auto">
                <div className="text-center max-w-xl mx-auto">
                    <div className='text-2xl md:text-5xl font-bold text-center'>Destinations for you</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-12 md:py-20">
                    <div className="flex gap-3 bg-white shadow rounded-xl overflow-hidden items-center justify-start">

                        <div className="relative w-[102px] h-[102px] flex-shrink-0">
                            <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={image1}/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-xl font-bold">Everest trek to Base Camp</p>
                            <span className="text-sm text-[#4A4C56]">
                                Price starts at <span className='text-[#EB5B2A]'>$105.00</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3 bg-white shadow rounded-xl overflow-hidden items-center justify-start">

                        <div className="relative w-[102px] h-[102px] flex-shrink-0">
                            <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={image2}/>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <p className="text-xl font-bold">Everest trek to Base Camp</p>
                            <span className="text-sm text-[#4A4C56]">
                                Price starts at <span className='text-[#EB5B2A]'>$105.00</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3 bg-white shadow rounded-xl overflow-hidden items-center justify-start">

                        <div className="relative w-[102px] h-[102px] flex-shrink-0">
                            <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={image3}/>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <p className="text-xl font-bold">Everest trek to Base Camp</p>
                            <span className="text-sm text-[#4A4C56]">
                                Price starts at <span className='text-[#EB5B2A]'>$105.00</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3 bg-white shadow rounded-xl overflow-hidden items-center justify-start">

                        <div className="relative w-[102px] h-[102px] flex-shrink-0">
                            <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={image4}/>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <p className="text-xl font-bold">Everest trek to Base Camp</p>
                            <span className="text-sm text-[#4A4C56]">
                                Price starts at <span className='text-[#EB5B2A]'>$105.00</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3 bg-white shadow rounded-xl overflow-hidden items-center justify-start">

                        <div className="relative w-[102px] h-[102px] flex-shrink-0">
                            <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={image5}/>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <p className="text-xl font-bold">Everest trek to Base Camp</p>
                            <span className="text-sm text-[#4A4C56]">
                                Price starts at <span className='text-[#EB5B2A]'>$105.00</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3 bg-white shadow rounded-xl overflow-hidden items-center justify-start">

                        <div className="relative w-[102px] h-[102px] flex-shrink-0">
                            <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={image6}/>
                        </div>

                        <div className="flex flex-col gap-2 py-2">
                            <p className="text-xl font-bold">Everest trek to Base Camp</p>
                            <span className="text-sm text-[#4A4C56]">
                                Price starts at <span className='text-[#EB5B2A]'>$105.00</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Destinations