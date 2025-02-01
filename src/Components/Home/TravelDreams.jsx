import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import image1 from '../../assets/img/travel/image-1.png';
import image2 from '../../assets/img/travel/image-2.png';
import image3 from '../../assets/img/travel/image-3.png';
import image4 from '../../assets/img/travel/image-4.png';

const TravelDreams = () => {
  return (
    <div className='max-w-[1216px] mx-auto px-4 xl:px-0'>
        <div className='text-2xl md:text-5xl font-bold text-center'>Bringing Your Travel Dreams to Life</div>
        <div className=' flex flex-col md:flex-row items-center justify-start content-center self-center gap-12 md:gap-20 py-12 md:py-32'>
            <div className='flex flex-col gap-5 w-full md:w-6/12'>
                <div className='text-xl md:text-[32px] leading-10 font-bold text-center md:text-left'>Why Choose <span className='text-orange-500'>Around 360?</span></div>
                <div className='flex flex-col gap-4 mx-4 md:mx-0'>
                    <p className='text-base text-gray-500'>At Around 360, we believe that travel is more than just a journey—it's an experience that transforms. Founded by passionate explorers, our agency is dedicated to creating customized travel experiences that cater to your unique interests and needs.</p>
                    <p className='text-base text-gray-500'> From hidden gems to iconic landmarks, we plan every trip with an insider's touch, ensuring each moment is memorable and meaningful. Whether you're seeking a luxurious getaway, an adventurous safari, or a family-friendly escape, our team of travel specialists is here to make your dream vacation come to life.</p>
                    <p className='text-base text-gray-500'>With a global network of trusted partners and years of experience, we offer seamless travel planning and 24/7 support, so you can relax and focus on what truly matters: enjoying your journey.</p>
                </div>
            </div>
            <div className='flex justify-center w-full md:w-6/12'>
                <LazyLoadImage
                    src={image1}
                    alt="Travel destination view 1"
                    effect="blur"
                    className='w-[137px] h-[224px] lg:w-48 lg:h-[300px] xl:w-[274px] xl:h-[448px] object-cover rounded-[95px]'
                />
                <div className='grid items-end '>
                    <div></div>
                    <div className='relative right-3 md:right-6 bg-white rounded-l-[50px] md:rounded-l-[25px] lg:rounded-l-[50px] xl:rounded-tl-[85px] xl:rounded-bl-[75px] pl-2 lg:pl-3'>
                        <LazyLoadImage
                            src={image4}
                            alt="Travel destination view 4"
                            effect="blur"
                            className='w-[100px] h-[166px] md:w-full md:h-[166px] xl:w-[200px] xl:h-[332px] object-cover rounded-[90px]'
                        />
                    </div>
                </div>
                <div className='grid items-start '>
                    <div className='relative right-8 lg:right-16 bg-white rounded-b-full xl:rounded-b-[92px] pl-2 lg:pl-3 pb-2'>
                        <LazyLoadImage
                            src={image3}
                            alt="Travel destination view 3"
                            effect="blur"
                            className='w-[90px] h-[155.5px] md:w-full md:h-40 xl:w-[180px] xl:h-[311px] object-cover rounded-[90px]'
                        />
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TravelDreams