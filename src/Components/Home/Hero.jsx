import React, { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import './home.css';
import DatePicker from '../Date-picker/DatePicker';
import image1 from '../../assets/img/hero-img/image-1.png';
import image2 from '../../assets/img/hero-img/image-2.png';
import image3 from '../../assets/img/hero-img/image-3.png';
import image4 from '../../assets/img/hero-img/image-4.png';
import image5 from '../../assets/img/hero-img/image-5.png';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Skeleton } from '@mui/material';

const Hero = () => {
    const [input, setInput] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    const [imageLoaded, setImageLoaded] = useState({
        image1: false,
        image2: false,
        image3: false,
        image4: false,
        image5: false
    });
    const navigate = useNavigate();

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "30px",
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };

      const handleInput = (value) => {
        setInput(value);
      }

      const handleSubmit = async() => {
        const data = { q: input, selectedDate: selectedDate }
        navigate(`/search-results?${new URLSearchParams(data).toString()}`, { replace: true });
      }

  return (
    <div className=''>
        <div className='rectangular-1'></div>
        <div className='rectangular-2'></div>
        <div className='container mx-auto'>
            <div className='max-w-7xl mx-2 md:mx-auto mt-12'>
                <div className='text-[23px] md:text-4xl lg:text-6xl leading-5 font-bold text-center md:mx-2 lg:mx-0 xl:mx-16'>Explore the World with Our Curated Travel Experiences</div>
                <div className='max-w-[768px] md:w-[722px] mx-auto mt-8'>
                    <div className='text-lg text-center text-[#475467]'>From serene beaches to majestic mountains, discover tailor-made travel experiences designed just for you.</div>
                    <div className='relative grid md:flex gap-6 items-center py-5 px-6 rounded-3xl md:rounded-full bg-white mt-8 shadow'>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <div className="relative flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600 pl-1">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                </svg>
                            
                                <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-full pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Where to next?" value={input} onChange={(e) => handleInput(e.target.value)} 
                                />
                                
                            </div>
                        </div>
                        <DatePicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
                        <button className="rounded-3xl bg-orange-500 px-5 py-2.5 text-sm font-medium text-white" onClick={handleSubmit}>Search</button> 
                    </div>
                </div>
            </div>
            
            {/* for small devices */}
            <div className="md:hidden container mx-auto mt-8">
                <Slider {...sliderSettings} className="mx-4 md:mx-auto">
                    {[image1, image2, image3, image4, image5].map((image, index) => (
                        <div key={index} className="relative">
                            {!imageLoaded[`image${index + 1}`] && (
                                <div className="absolute inset-0">
                                    <Skeleton variant="rectangular" width="100%" height={301} />
                                </div>
                            )}
                            <LazyLoadImage
                                src={image}
                                alt={`Travel destination view ${index + 1}`}
                                effect="blur"
                                className="w-[268px] h-[301px] flex-shrink-0 rounded-2xl object-cover"
                                onLoad={() => setImageLoaded(prev => ({...prev, [`image${index + 1}`]: true}))}
                                style={{ opacity: imageLoaded[`image${index + 1}`] ? 1 : 0 }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
        {/* image section */}
        <div className='hidden md:block'>
            <div className='container mx-auto grid md:flex gap-4 md:gap-1 justify-center items-center md:w-[1216px] md:h-[301px] md:mx-auto mt-8'>
                <div className="relative">
                    {!imageLoaded.image1 && (
                        <div className="absolute inset-0">
                            <Skeleton variant="rectangular" width="100%" height={205} className="mt-[30px] -rotate-[10.11deg]" />
                        </div>
                    )}
                    <LazyLoadImage
                        src={image1}
                        alt="Travel destination scenic view 1"
                        effect="blur"
                        className='w-[128.187px] h-[115.828px] xl:w-[262.187px] xl:h-[205.828px] mt-[30px] -rotate-[10.11deg] flex-shrink-0 rounded-2xl object-cover'
                        onLoad={() => setImageLoaded(prev => ({...prev, image1: true}))}
                        style={{ opacity: imageLoaded.image1 ? 1 : 0 }}
                    />
                </div>

                <div className="relative">
                    {!imageLoaded.image2 && (
                        <div className="absolute inset-0">
                            <Skeleton variant="rectangular" width="100%" height={255} className="-rotate-[5.997deg]" />
                        </div>
                    )}
                    <LazyLoadImage
                        src={image2}
                        alt="Travel destination scenic view 2"
                        effect="blur"
                        className='w-[140.739px] h-[130.481px] xl:w-[255.739px] xl:h-[255.481px] -rotate-[5.997deg] flex-shrink-0 rounded-2xl object-cover'
                        onLoad={() => setImageLoaded(prev => ({...prev, image2: true}))}
                        style={{ opacity: imageLoaded.image2 ? 1 : 0 }}
                    />
                </div>

                <div className="relative">
                    {!imageLoaded.image3 && (
                        <div className="absolute inset-0">
                            <Skeleton variant="rectangular" width="100%" height={301} />
                        </div>
                    )}
                    <LazyLoadImage
                        src={image3}
                        alt="Scenic travel destination"
                        effect="blur"
                        className='w-[190px] h-[180px] xl:w-[268px] xl:h-[301px] flex-shrink-0 rounded-2xl object-cover'
                        onLoad={() => setImageLoaded(prev => ({...prev, image3: true}))}
                        style={{ opacity: imageLoaded.image3 ? 1 : 0 }}
                    />
                </div>

                <div className="relative">
                    {!imageLoaded.image4 && (
                        <div className="absolute inset-0">
                            <Skeleton variant="rectangular" width="100%" height={255} className="rotate-[5.997deg]" />
                        </div>
                    )}
                    <LazyLoadImage
                        src={image4}
                        alt="Travel landscape view"
                        effect="blur"
                        className='w-[140.739px] h-[130.481px] xl:w-[255.739px] xl:h-[255.481px] rotate-[5.997deg] flex-shrink-0 rounded-2xl object-cover scale-x-[-1]'
                        onLoad={() => setImageLoaded(prev => ({...prev, image4: true}))}
                        style={{ opacity: imageLoaded.image4 ? 1 : 0 }}
                    />
                </div>

                <div className="relative">
                    {!imageLoaded.image5 && (
                        <div className="absolute inset-0">
                            <Skeleton variant="rectangular" width="100%" height={205} className="mt-[30px] rotate-[10.11deg]" />
                        </div>
                    )}
                    <LazyLoadImage
                        src={image5}
                        alt="Travel destination view"
                        effect="blur"
                        className='w-[128.187px] h-[115.828px] xl:w-[262.187px] xl:h-[205.828px] md:mt-[30px] rotate-[10.11deg] flex-shrink-0 rounded-2xl object-cover scale-x-[-1]'
                        onLoad={() => setImageLoaded(prev => ({...prev, image5: true}))}
                        style={{ opacity: imageLoaded.image5 ? 1 : 0 }}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero