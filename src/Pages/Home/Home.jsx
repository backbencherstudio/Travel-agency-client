import React from 'react';
import Hero from '../../Components/Home/Hero';
import TravelDreams from '../../Components/Home/TravelDreams';
import TopDestinations from '../../Components/Home/TopDestinations';
import TravelWithUs from '../../Components/Home/TravelWithUs';
import TravelPackages from '../../Components/Home/TravelPackages';
import Testimonials from '../../Components/Home/Testimonials';
import Destinations from '../../Components/Home/Destinations';

const Home = () => {
    return (
        <div className=''>
            <div className='pb-20 pt-4'>
                <Hero />
            </div>
            <div className='py-20 relative z-10 bg-white'>
                <TravelDreams />
            </div>
            <div className='py-20 bg-[#F0F4F9]'>
                <TopDestinations />
            </div>
            <div className='py-20'>
                <TravelWithUs />
            </div>
            <div className='py-20 bg-[#F0F4F9]'>
                <TravelPackages />
            </div>
            <div className='py-20'>
                <Testimonials />
            </div>
            <div className='py-20 bg-[#F0F4F9]'>
                <Destinations />
            </div>
        </div>
    );
};

export default Home;