import image1 from '../../assets/img/blogs/image-1.png';
import image2 from '../../assets/img/blogs/image-2.png';
import image3 from '../../assets/img/blogs/image-3.png';
import avatar3 from '../../assets/img/avatar/avatar-3.png';

const Blogs = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        <div className='text-2xl md:text-5xl font-bold text-center'>Travel Inspiration & Tips</div>
        <div className='flex flex-col md:flex-row gap-6 items-center justify-center py-12'>

            <div className="relative flex flex-col my-6 bg-white shadow-md border border-slate-200 rounded-xl w-80 md:w-96">
                <div className="relative h-56 overflow-hidden text-white rounded-t-xl">
                    <img src={image1} alt="card-image" />
                    <div className="absolute top-0 left-0 bg-[#F5F7F9] text-[#323B47] px-3 pb-1 m-4 rounded-full text-xs font-bold">
                        Recently Added
                    </div>
                </div>
                <div className="p-4">
                    <div className='flex items-center gap-1'>
                        <div className="mb-5 bg-[#E7ECF2] text-[#0E457D] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#0E457D] dark:bg-gray-700 dark:text-gray-300">
                            5 mins read
                        </div>
                        <div className="mb-5 bg-[#FDEFEA] text-[#EB5B2A] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#EB5B2A] dark:bg-gray-700 dark:text-gray-300">
                            Jan 6, 2024
                        </div>
                    </div>
                    <h6 className="mb-2 text-slate-800 text-xl font-bold">
                        Hidden Gems: 7 Underrated Destinations to Visit
                    </h6>
                    <p className="text-[#65666b] leading-normal text-base font-light">
                        Step off the beaten path with these hidden destinations that promise unique experiences and fewer crowds.
                    </p>
                    <div className="w-full flex mb-1 items-center mt-4">
                        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                            <img src={avatar3} alt=""/>
                        </div>
                        <div className="flex-grow pl-3">
                            <h6 className="font-bold text-base uppercase text-black">Bessie Cooper</h6>
                            <p className='text-sm text-[#899AB2]'>Tour Expert</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative flex flex-col my-6 bg-white shadow-md border border-slate-200 rounded-xl w-80 md:w-96">
                <div className="relative h-56 overflow-hidden text-white rounded-t-xl">
                    <img src={image2} alt="card-image" />
                    <div className="absolute top-0 left-0 bg-[#F5F7F9] text-[#323B47] px-3 pb-1 m-4 rounded-full text-xs font-bold">
                        Recently Added
                    </div>
                </div>
                <div className="p-4">
                    <div className='flex items-center gap-1'>
                        <div className="mb-5 bg-[#E7ECF2] text-[#0E457D] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#0E457D] dark:bg-gray-700 dark:text-gray-300">
                            5 mins read
                        </div>
                        <div className="mb-5 bg-[#FDEFEA] text-[#EB5B2A] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#EB5B2A] dark:bg-gray-700 dark:text-gray-300">
                            Jan 6, 2024
                        </div>
                    </div>
                    <h6 className="mb-2 text-slate-800 text-xl font-bold">
                        A Food Lover’s Guide to Southeast Asia
                    </h6>
                    <p className="text-[#65666b] leading-normal text-base font-light">
                        Indulge in Southeast Asia’s rich food culture with our guide to must-try dishes, from Thai street food to Malaysian delights.
                    </p>
                    <div className="w-full flex mb-1 items-center mt-4">
                        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                            <img src={avatar3} alt=""/>
                        </div>
                        <div className="flex-grow pl-3">
                            <h6 className="font-bold text-base uppercase text-black">Bessie Cooper</h6>
                            <p className='text-sm text-[#899AB2]'>Tour Expert</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative flex flex-col my-6 bg-white shadow-md border border-slate-200 rounded-xl w-80 md:w-96">
                <div className="relative h-56 overflow-hidden text-white rounded-t-xl">
                    <img src={image3} alt="card-image" />
                    <div className="absolute top-0 left-0 bg-[#F5F7F9] text-[#323B47] px-3 pb-1 m-4 rounded-full text-xs font-bold">
                        Recently Added
                    </div>
                </div>
                <div className="p-4">
                    <div className='flex items-center gap-1'>
                        <div className="mb-5 bg-[#E7ECF2] text-[#0E457D] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#0E457D] dark:bg-gray-700 dark:text-gray-300">
                            5 mins read
                        </div>
                        <div className="mb-5 bg-[#FDEFEA] text-[#EB5B2A] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#EB5B2A] dark:bg-gray-700 dark:text-gray-300">
                            Jan 6, 2024
                        </div>
                    </div>
                    <h6 className="mb-2 text-slate-800 text-xl font-bold">
                        Top 10 Most Scenic Road Trips Worldwide
                    </h6>
                    <p className="text-[#65666b] leading-normal text-base font-light">
                        Hit the road with our list of scenic drives, featuring breathtaking landscapes, winding routes, and memorable stops along the way.
                    </p>
                    <div className="w-full flex mb-1 items-center mt-4">
                        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                            <img src={avatar3} alt=""/>
                        </div>
                        <div className="flex-grow pl-3">
                            <h6 className="font-bold text-base uppercase text-black">Bessie Cooper</h6>
                            <p className='text-sm text-[#899AB2]'>Tour Expert</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='grid justify-center'>
            <button className='flex gap-2 items-center justify-center px-5 py-3 bg-[#D65326] rounded-full text-white text-base'>
                See All Blogs 
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M4.6665 10H16.3332" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5 4.16699L16.3333 10.0003L10.5 15.8337" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Blogs