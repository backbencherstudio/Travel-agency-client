import React from 'react';
import starFull from '../../assets/img/star.svg';
import starNone from '../../assets/img/star-none.svg';
import avatar1 from '../../assets/img/avatar/avatar-1.png';
import avatar2 from '../../assets/img/avatar/avatar-2.png';
import avatar3 from '../../assets/img/avatar/avatar-3.png';
import avatar4 from '../../assets/img/avatar/avatar-4.png';
import avatar5 from '../../assets/img/avatar/avatar-5.png';
import avatar6 from '../../assets/img/avatar/avatar-6.png';

const Testimonials = () => {
  return (
    <div>
        <div class="w-full px-5">
            <div class="w-full max-w-6xl mx-auto">
                <div class="text-center max-w-xl mx-auto">
                    <div className='text-2xl md:text-5xl font-bold text-center'>What Our Travelers Say</div>
                    {/* <div class="text-center mb-10">
                        <span class="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                        <span class="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                        <span class="inline-block w-40 h-1 rounded-full bg-indigo-500"></span>
                        <span class="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"></span>
                        <span class="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"></span>
                    </div> */}
                </div>
                <div class="-mx-3 flex flex-wrap gap-4 items-start justify-between py-12 md:py-20">
                        <div class="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                            <div className='flex gap-2 items-center'>
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                            </div>
                            <div class="w-full mt-4">
                                <p class="text-xl leading-tight">Loved every moment of my trip! The guides were knowledgeable, friendly, and highly professional.</p>
                            </div>
                            <div class="w-full flex mb-4 items-center mt-4">
                                <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                    <img src={avatar1} alt=""/>
                                </div>
                                <div class="flex-grow pl-3">
                                    <h6 class="font-bold text-xl uppercase text-black">Samantha Lau</h6>
                                    <p className='text-sm text-gray-500'>baleful_exorcism_76</p>
                                </div>
                            </div>
                        </div>
                        <div class="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                            <div className='flex gap-2 items-center'>
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starNone} alt="" />
                            </div>
                            <div class="w-full mt-4">
                                <p class="text-xl leading-tight">An unforgettable journey! Every detail was planned to perfection. Truly a once-in-a-lifetime experience.</p>
                            </div>
                            <div class="w-full flex mb-4 items-center mt-4">
                                <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                    <img src={avatar2} alt=""/>
                                </div>
                                <div class="flex-grow pl-3">
                                    <h6 class="font-bold text-xl uppercase text-black">Divya Ansari</h6>
                                    <p className='text-sm text-gray-500'>turgid_designer_29</p>
                                </div>
                            </div>
                        </div>
                        <div class="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                            <div className='flex gap-2 items-center'>
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starNone} alt="" />
                            </div>
                            <div class="w-full mt-4">
                                <p class="text-xl leading-tight">From start to finish, everything was seamless. The personalized itinerary made all the difference!</p>
                            </div>
                            <div class="w-full flex mb-4 items-center mt-4">
                                <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                    <img src={avatar3} alt=""/>
                                </div>
                                <div class="flex-grow pl-3">
                                    <h6 class="font-bold text-xl uppercase text-black">Carlota Rossi</h6>
                                    <p className='text-sm text-gray-500'>garrulous_designer_41</p>
                                </div>
                            </div>
                        </div>
                        <div class="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                            <div className='flex gap-2 items-center'>
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starNone} alt="" />
                            </div>
                            <div class="w-full mt-4">
                                <p class="text-xl leading-tight">Exceeded my expectations! I felt cared for every step of the way. Highly recommend!</p>
                            </div>
                            <div class="w-full flex mb-4 items-center mt-4">
                                <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                    <img src={avatar4} alt=""/>
                                </div>
                                <div class="flex-grow pl-3">
                                    <h6 class="font-bold text-xl uppercase text-black">Nya Badu</h6>
                                    <p className='text-sm text-gray-500'>salubrious_ninja_98</p>
                                </div>
                            </div>
                        </div>
                        <div class="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                            <div className='flex gap-2 items-center'>
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starNone} alt="" />
                            </div>
                            <div class="w-full mt-4">
                                <p class="text-xl leading-tight">A dream vacation come true. The attention to detail and unique spots made it unforgettable</p>
                            </div>
                            <div class="w-full flex mb-4 items-center mt-4">
                                <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                    <img src={avatar5} alt=""/>
                                </div>
                                <div class="flex-grow pl-3">
                                    <h6 class="font-bold text-xl uppercase text-black">Aishwarya Kumar</h6>
                                    <p className='text-sm text-gray-500'>redolent_cupcake_89</p>
                                </div>
                            </div>
                        </div>
                        <div class="md:w-[28%] rounded-lg bg-white shadow p-4 text-gray-800 font-light">
                            <div className='flex gap-2 items-center'>
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starFull} alt="" />
                                <img src={starNone} alt="" />
                            </div>
                            <div class="w-full mt-4">
                                <p class="text-xl leading-tight">The perfect mix of adventure and relaxation. Couldn’t have asked for a better experience!</p>
                            </div>
                            <div class="w-full flex mb-4 items-center mt-4">
                                <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                    <img src={avatar6} alt=""/>
                                </div>
                                <div class="flex-grow pl-3">
                                    <h6 class="font-bold text-xl uppercase text-black">Ajeet Bai</h6>
                                    <p className='text-sm text-gray-500'>rebarbative_toejam_26</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testimonials