import React from 'react'
import './home.css';
import DatePicker from '../Date-picker/DatePicker';
import image1 from '../../assets/img/hero-img/image-1.png';
import image2 from '../../assets/img/hero-img/image-2.png';
import image3 from '../../assets/img/hero-img/image-3.png';
import image4 from '../../assets/img/hero-img/image-4.png';
import image5 from '../../assets/img/hero-img/image-5.png';

const Hero = () => {
  return (
    <div className=''>
        <div className='rectangular-1'></div>
        <div className='rectangular-2'></div>
        <div className='container mx-auto pt-4 pb-20'>
            <div className='max-w-7xl mx-2 md:mx-auto mt-12'>
                <div className='text-[23px] md:text-7xl font-bold text-center'>Explore the World with Our Curated Travel Experiences</div>
                <div className='max-w-[768px] md:w-[722px] mx-auto mt-4'>
                    <div className='text-lg text-center text-[#475467]'>From serene beaches to majestic mountains, discover tailor-made travel experiences designed just for you.</div>
                    <div className='relative grid md:flex gap-6 items-center py-5 px-6 rounded-3xl md:rounded-full bg-white mt-8 shadow'>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <div className="relative flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600 pl-1">
                                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                                </svg>
                            
                                <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-full pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Where to next?" 
                                />
                                
                            </div>
                        </div>
                        <DatePicker />
                        <button className="rounded-3xl bg-orange-500 px-5 py-2.5 text-sm font-medium text-white">Search</button> 
                    </div>
                </div>
            </div>
            {/* image section */}
            <div className='grid md:flex gap-4 md:gap-1 justify-center items-center md:w-[1216px] md:h-[301px] mx-8 md:mx-auto mt-8'>
                <img src={image1} alt="" className='w-[262.187px] h-[205.828px] mt-[30px] -rotate-[10.11deg] flex-shrink-0 rounded-2xl object-cover' />
                <img src={image2} alt="" className='w-[255.739px] h-[255.481px] -rotate-[5.997deg] flex-shrink-0 rounded-2xl object-cover' />
                <img src={image3} alt="" className='w-[268px] h-[301px] flex-shrink-0 rounded-2xl object-cover' />
                <img src={image4} alt="" className='w-[255.739px] h-[255.481px] rotate-[5.997deg] flex-shrink-0 rounded-2xl object-cover scale-x-[-1]' />
                <img src={image5} alt="" className='w-[262.187px] h-[205.828px] md:mt-[30px] rotate-[10.11deg] flex-shrink-0 rounded-2xl object-cover scale-x-[-1]' />
            </div>
        </div>
    </div>
  )
}

export default Hero