import React from 'react'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { Link, useParams } from 'react-router-dom'
import { PackageData } from '../../../data/package';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import locationIcon from '../../../assets/dashboard/icons/location.svg'
import durationIcon from '../../../assets/dashboard/icons/duration.svg'
import usersIcon from '../../../assets/dashboard/icons/users.svg'
import currencyIcon from '../../../assets/dashboard/icons/currency.svg'
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { IoIosCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

const PackageDetails = () => {
    const { id } = useParams();
    console.log('id', id)

    // Assuming PackageData is an array of package objects
    const singlePackage = PackageData.find((pack) => pack.id === parseInt(id));
    // console.log('singlePackage', singlePackage); 
    
    // Function to render stars based on rating
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

    const formatDescription = (description) => {
        const words = description.split(' ');
        console.log('words', words)
        if (words.length >= 11) {
            // If the description has 11 or more words, return it as-is
            return description;
        } else {
            // If the description has fewer than 11 words, repeat it or append "..." to reach 11 words
            while (words.length < 11) {
                words.push('...');
            }
            return words.join(' ');
        }
    }

  return (
    <div>
        <div className="flex my-5 justify-between flex-wrap">
            <h1 className="font-semibold text-[24px]">Travel Packages</h1>
            <Link
                to="/dashboard/add-package"
                className="text-[16px] font-medium px-4 py-2 bg-[#eb5b2a] text-white rounded-md flex  items-center gap-1.5 hover:bg-opacity-90"
            >
                <FaRegSquarePlus className="text-xl" /> Add Package
            </Link>
        </div>
        <div className='bg-white p-4 border border-[#EAECF0] rounded-lg grid grid-cols-1 md:grid-cols-4 gap-6 pb-5'>
            <div className='flex flex-col gap-5 md:col-span-3'>
                <img src={singlePackage?.package_Images[0]} alt="" className='h-[281px] object-cover rounded-lg' />
                <div className='flex flex-col gap-2'>
                    <div className="flex justify-between flex-wrap">
                        <h1 className="font-semibold text-[24px]">{singlePackage?.name}</h1>
                        <Link
                            to="/dashboard/add-package"
                            className="text-xs font-medium px-3 py-2 bg-[#0E457D] text-white rounded-md flex items-center gap-1.5 hover:bg-opacity-90"
                            >
                            Edit Package
                        </Link>
                    </div>
                    <div className="flex gap-[4.8px] items-center">
                        <div className="flex gap-1 items-center">
                            {renderStars(singlePackage?.rating)}
                        </div>
                        <p className='text-sm font-medium text-[#333E47]'>{singlePackage?.rating}</p>
                        <p className='text-[10px] font-normal text-[#B3B7BA]'>12,256 ratings</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-[6px]'>
                        <div className='flex gap-[6px] w-28'>
                            <img src={locationIcon} alt="" className='w-[14px]' />
                            <p className='text-sm text-[#A5A5AB]'>Location</p>
                        </div>
                        <p className='text-sm text-[#333E47]'>{singlePackage?.destination}</p>
                    </div>
                    <div className='flex gap-[6px]'>
                        <div className='flex gap-[6px] w-28'>
                            <img src={durationIcon} alt="" className='w-[14px]' />
                            <p className='text-sm text-[#A5A5AB]'>Duration</p>
                        </div>
                        <p className='text-sm text-[#333E47]'>{singlePackage?.duration}</p>
                    </div>
                    <div className='flex gap-[6px]'>
                        <div className='flex gap-[6px] w-28'>
                            <img src={usersIcon} alt="" className='w-[14px]' />
                            <p className='text-sm text-[#A5A5AB]'>Quota</p>
                        </div>
                        <p className='text-sm text-[#333E47]'>{singlePackage?.max_capacity} participants</p>
                    </div>
                    <div className='flex gap-[6px]'>
                        <div className='flex gap-[6px] w-28'>
                            <img src={currencyIcon} alt="" className='w-[14px]' />
                            <p className='text-sm text-[#A5A5AB]'>Price</p>
                        </div>
                        <p className='text-sm text-[#333E47]'><span className='text-base font-semibold text-[#43ABFF]'>{singlePackage?.price}</span> Starting From</p>
                    </div>
                </div>
                <div className='flex flex-col gap-[10px] border-b-2 pb-5'>
                    <h3 className='text-base font-semibold'>About</h3>
                    <p className='text-sm font-normal text-[#333E47]'>{singlePackage?.description}</p>
                </div>
                <div className='flex flex-col gap-[14px]'>
                    <h3 className='text-base font-semibold'>Includes</h3>
                    <div className='grid md:grid-cols-2 gap-4'>
                        {singlePackage?.includes.map((include, index) => 
                            <div className='flex gap-2' key={index}>
                                <div>
                                    <RiCheckboxCircleFill className='text-base text-[#EB5B2A]' />
                                </div>
                                <p className='text-sm font-normal text-[#4A4C56] '>{include.name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='px-4 py-5 border-t border-l border-r rounded-t-lg'>
                <div class="w-full">
                    <div class="relative flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="absolute w-5 h-5 top-[14px] left-2.5 text-slate-600">
                        <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                        </svg>
                        <input
                        class="w-full bg-[#F7F8F8] placeholder:text-[#B3B7BA] text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Search package, location, etc..." 
                        />
                    </div>
                </div>
                {PackageData.map((pack, index) =>
                    <div key={index} className='p-3 flex flex-col gap-3'>
                        <div className='flex gap-[9px]'>
                            <img src={pack.package_Images[0]} className='w-[108px] h-16 rounded' alt="" />
                            <div className='flex flex-col gap-[5px]'>
                                <h6 className='text-sm font-medium text-[#475467]'>{pack.name}</h6>
                                <div className='flex justify-between'>
                                    <p className='text-sm font-medium text-[#475467]'>{pack.price}</p>
                                    <div>
                                        {pack.status === 1 ? (
                                            <p className="flex items-center gap-1 text-xs text-[#067647] font-medium px-1 border border-[#ABEFC6] bg-[#ECFDF3] rounded-2xl">
                                                <IoIosCheckmark className="text-sm text-[#17B26A]" />
                                                Active
                                            </p>
                                        )
                                        : 
                                        (
                                            <p className="flex items-center gap-1 text-xs text-[#B42318] font-medium px-1 border border-[#FECDCA] bg-[#FEF3F2] rounded-2xl">
                                                <RxCross2 className="text-xs text-[#B42318]" />
                                                Inactive
                                            </p>
                                        )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='text-xs font-normal text-[#475467]'>{formatDescription(pack.description)}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default PackageDetails