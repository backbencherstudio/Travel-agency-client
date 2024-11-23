import React from 'react';
import image1 from '../../assets/img/travel/image-1.png';
import image2 from '../../assets/img/travel/image-2.png';
import image3 from '../../assets/img/travel/image-3.png';
import image4 from '../../assets/img/travel/image-4.png';

const TravelDreams = () => {
  return (
    <div className='container px-8 md:mx-auto'>
        <div className='text-2xl md:text-5xl font-bold text-center'>Bringing Your Travel Dreams to Life</div>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-start content-center self-center gap-12 md:gap-20 py-12 md:py-32'>
            <div className='flex flex-col gap-5 md:w-[30rem]'>
                <div className='text-xl md:text-[32px] font-bold text-center md:text-left'>Why Choose <span className='text-orange-500'>Around 360?</span></div>
                <div className='flex flex-col gap-4 mx-4 md:mx-0'>
                    <p className='text-base text-gray-500'>At Around 360, we believe that travel is more than just a journey—it's an experience that transforms. Founded by passionate explorers, our agency is dedicated to creating customized travel experiences that cater to your unique interests and needs.</p>
                    <p className='text-base text-gray-500'> From hidden gems to iconic landmarks, we plan every trip with an insider’s touch, ensuring each moment is memorable and meaningful. Whether you’re seeking a luxurious getaway, an adventurous safari, or a family-friendly escape, our team of travel specialists is here to make your dream vacation come to life.</p>
                    <p className='text-base text-gray-500'>With a global network of trusted partners and years of experience, we offer seamless travel planning and 24/7 support, so you can relax and focus on what truly matters: enjoying your journey.</p>
                </div>
            </div>
            <div className='flex justify-center ml-6 md:w-1/2'>
                <img src={image1} alt="" className='w-[137px] md:w-[274px] h-[224px] md:h-[448px] object-cover rounded-[95px]' />
                <div className='grid items-end '>
                    <div></div>
                    <div className='relative right-3 md:right-6 bg-white rounded-l-[50px] md:rounded-tl-[105px] md:rounded-bl-[94px] pl-2 md:pl-3'>
                        <img src={image4} alt="" className='w-[100px] md:w-[200px] h-[166px] md:h-[332px] object-cover rounded-[90px]' />
                    </div>
                </div>
                <div className='grid items-start '>
                    <div className='relative right-8 md:right-16 bg-white rounded-b-full md:rounded-b-[92px] pl-2 md:pl-3 pb-2'>
                        <img src={image3} alt="" className='w-[90px] md:w-[180px] h-[155.5px] md:h-[311px] object-cover rounded-[90px]' />
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TravelDreams