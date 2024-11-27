import React from 'react';
import starFull from '../../assets/img/star.svg';
import starNone from '../../assets/img/star-none.svg';
import avatar1 from '../../assets/img/avatar/avatar-1.jpg';
import avatar2 from '../../assets/img/avatar/avatar-2.png';
import avatar3 from '../../assets/img/avatar/avatar-3.png';
import avatar4 from '../../assets/img/avatar/avatar-4.png';
import avatar5 from '../../assets/img/avatar/avatar-5.png';
import avatar6 from '../../assets/img/avatar/avatar-6.png';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Testimonials = () => {

    const testimonials = [
        {
          id: 1,
          description: "Loved every moment of my trip! The guides were knowledgeable, friendly, and highly professional.",
          rating: 5.0,
          user: {name: 'Samantha Lau', username: 'baleful_exorcism_76', image: avatar1},
        },
        {
          id: 2,
          description: "An unforgettable journey! Every detail was planned to perfection. Truly a once-in-a-lifetime experience.",
          rating: 4.0,
          user: {name: 'Divya Ansari', username: 'turgid_designer_29', image: avatar2},
        },
        {
          id: 3,
          description: "From start to finish, everything was seamless. The personalized itinerary made all the difference!",
          rating: 4.0,
          user: {name: 'Carlota Rossi', username: 'garrulous_designer_41', image: avatar3},
        },
        {
          id: 4,
          description: "Exceeded my expectations! I felt cared for every step of the way. Highly recommend!",
          rating: 4.0,
          user: {name: 'Nya Badu', username: 'salubrious_ninja_98', image: avatar4},
        },
        {
          id: 4,
          description: "A dream vacation come true. The attention to detail and unique spots made it unforgettable",
          rating: 4.0,

          user: {name: 'Aishwarya Kumar', username: 'redolent_cupcake_89', image: avatar5},
        },
        {
          id: 5,
          description: "The perfect mix of adventure and relaxation. Couldn’t have asked for a better experience!",
          rating: 4.0,
          user: {name: 'Ajeet Bai', username: 'Tour Expert', image: avatar6},
        },
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {

                stars.push(<FaStar key={i} className="text-orange-500" />);
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {

                stars.push(<FaStarHalfAlt key={i} className="text-orange-500" />);
            } else {
                // Empty star
                stars.push(<FaRegStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };


  return (
    <div>
        <div className="w-full">
            <div className="max-w-[1216px] mx-auto px-5">
                <div className="text-center max-w-xl mx-auto">
                    <div className='text-2xl md:text-5xl font-bold text-center'>What Our Travelers Say</div>
                    {/* <div className="text-center mb-10">
                        <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                        <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                        <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
                        <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                        <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                    </div> */}
                </div>
                <div className="-mx-3 flex flex-col md:flex-row flex-wrap gap-4 items-start justify-between py-12 md:py-20">
                    {testimonials?.map(testimonial => (
                        <div className="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                            <div className='flex gap-2 items-center'>
                                {/* <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" /> */}
                                {renderStars(testimonial.rating)}
                            </div>
                            <div className="w-full mt-4">
                                <p className="text-xl leading-tight text-[#404C5C]">{testimonial.description}</p>
                            </div>
                            <div className="w-full flex mb-4 items-center mt-4">
                                <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                    <img src={testimonial.user.image} alt="" className=' w-10 h-10 object-cover'/>
                                </div>
                                <div className="flex-grow pl-3">
                                    <h6 className="font-bold text-xl uppercase text-[#323B47]">{testimonial.user.name}</h6>
                                    <p className='text-sm text-gray-500'>{testimonial.user.username}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* <div className="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                        <div className='flex gap-2 items-center'>
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starNone} alt="" />
                        </div>
                        <div className="w-full mt-4">
                            <p className="text-xl leading-tight text-[#404C5C]">An unforgettable journey! Every detail was planned to perfection. Truly a once-in-a-lifetime experience.</p>
                        </div>
                        <div className="w-full flex mb-4 items-center mt-4">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                <img src={avatar2} alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-xl uppercase text-[#323B47]">Divya Ansari</h6>
                                <p className='text-sm text-gray-500'>turgid_designer_29</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                        <div className='flex gap-2 items-center'>
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starNone} alt="" />
                        </div>
                        <div className="w-full mt-4">
                            <p className="text-xl leading-tight text-[#404C5C]">From start to finish, everything was seamless. The personalized itinerary made all the difference!</p>
                        </div>
                        <div className="w-full flex mb-4 items-center mt-4">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                <img src={avatar3} alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-xl uppercase text-[#323B47]">Carlota Rossi</h6>
                                <p className='text-sm text-gray-500'>garrulous_designer_41</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                        <div className='flex gap-2 items-center'>
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starNone} alt="" />
                        </div>
                        <div className="w-full mt-4">
                            <p className="text-xl leading-tight text-[#404C5C]">Exceeded my expectations! I felt cared for every step of the way. Highly recommend!</p>
                        </div>
                        <div className="w-full flex mb-4 items-center mt-4">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                <img src={avatar4} alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-xl uppercase text-black">Nya Badu</h6>
                                <p className='text-sm text-gray-500'>salubrious_ninja_98</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                        <div className='flex gap-2 items-center'>
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starNone} alt="" />
                        </div>
                        <div className="w-full mt-4">
                            <p className="text-xl leading-tight text-[#404C5C]">A dream vacation come true. The attention to detail and unique spots made it unforgettable</p>
                        </div>
                        <div className="w-full flex mb-4 items-center mt-4">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                <img src={avatar5} alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-xl uppercase text-[#323B47]">Aishwarya Kumar</h6>
                                <p className='text-sm text-gray-500'>redolent_cupcake_89</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                        <div className='flex gap-2 items-center'>
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starFull} alt="" />
                            <img src={starNone} alt="" />
                        </div>
                        <div className="w-full mt-4">
                            <p className="text-xl leading-tight text-[#404C5C]">The perfect mix of adventure and relaxation. Couldn’t have asked for a better experience!</p>
                        </div>
                        <div className="w-full flex mb-4 items-center mt-4">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                <img src={avatar6} alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-xl uppercase text-[#323B47]">Ajeet Bai</h6>
                                <p className='text-sm text-gray-500'>rebarbative_toejam_26</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testimonials