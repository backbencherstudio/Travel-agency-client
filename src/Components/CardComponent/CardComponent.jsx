/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const CardComponent = ({ blog }) => {

    return (
        <div>

            <Link to={`/blogDetails/${blog.id}`} >

                <div key={blog?.id} className="relative flex flex-col bg-white shadow-md border border-slate-200 rounded-xl">
                    <div className="relative h-56 overflow-hidden text-white rounded-t-xl">
                        <img src={blog.image} alt="card-image" />
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
                            {blog.title}
                        </h6>
                        <p className="text-[#65666b] leading-normal text-base font-light">
                            {blog.description.length > 80 ? blog.description.substring(0, 80) + "..." : blog.description.name}
                        </p>
                        <div className="w-full flex mb-1 items-center mt-4">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                <img src={blog.user?.image} alt="" />
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-base uppercase text-black">{blog.user.name}</h6>
                                <p className='text-sm text-[#899AB2]'>{blog.user.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CardComponent;