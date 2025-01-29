import React, { useEffect, useState } from 'react'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PackageData } from '../../../data/package'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import locationIcon from '../../../assets/dashboard/icons/location.svg'
import durationIcon from '../../../assets/dashboard/icons/duration.svg'
import usersIcon from '../../../assets/dashboard/icons/users.svg'
import currencyIcon from '../../../assets/dashboard/icons/currency.svg'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { IoIosCheckmark } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import axiosClient from '../../../axiosClient'
import { Helmet } from 'react-helmet-async'

const PackageDetails = () => {
  const [singlePackage, setSinglePackage] = useState()
  const [packages, setPackages] = useState([])
  const { id } = useParams()
  console.log('id', id)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const resDetails = await axiosClient.get(`/api/admin/package/${id}`)
        const resPackages = await axiosClient.get(`/api/admin/package`)
        console.log('resDetails', resDetails)
        console.log('packages', resPackages)
        setSinglePackage(resDetails.data.data)
        setPackages(resPackages.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchDetails()
  }, [])

  // Assuming PackageData is an array of package objects
  // const singlePackage = PackageData.find((pack) => pack.id === parseInt(id));
  // console.log('singlePackage', singlePackage);

  // Function to render stars based on rating
  const renderStars = rating => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className='text-orange-500' />)
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className='text-orange-500' />)
      } else {
        // Empty star
        stars.push(<FaRegStar key={i} className='text-gray-300' />)
      }
    }
    return stars
  }

  const truncateDescription = description => {
    const words = description.split(' ')
    return words.slice(0, 14).join(' ') + (words.length > 11 ? '...' : '')
  }

  const handleNavigate = id => {
    const currentPath = window.location.pathname
    const basePath = currentPath.split('/').slice(0, -1).join('/')
    navigate(`${basePath}/${id}`)
  }

  return (
    <div>
      <Helmet>
        <title>Around 360 - Package Details</title>
      </Helmet>
      <div className='flex my-5 justify-between items-center'>
        <h1 className='font-semibold text-[18px] md:text-[24px]'>
          Travel Packages
        </h1>
        <Link
          to='/dashboard/add-package'
          className='text-sm md:text-[16px] font-medium px-4 py-2 bg-[#eb5b2a] text-white rounded-md flex  items-center gap-1.5 hover:bg-opacity-90'
        >
          <FaRegSquarePlus className='text-xl' /> Add Package
        </Link>
      </div>
      <div className='bg-white p-4 border border-[#EAECF0] rounded-lg grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-5'>
        <div className='flex flex-col gap-5 md:col-span-2 xl:col-span-3'>
          <img
            src={singlePackage?.package_files[0]?.file_url}
            alt={singlePackage?.package_files[0]?.file_url}
            className='h-[281px] object-cover rounded-lg'
          />
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between flex-wrap'>
              <h1 className='font-semibold text-[24px]'>
                {singlePackage?.name}
              </h1>
              <Link
                to={`/dashboard/edit-package/${singlePackage?.id}`}
                className='text-xs font-medium px-3 py-2 bg-[#0E457D] text-white rounded-md flex items-center gap-1.5 hover:bg-opacity-90'
              >
                Edit Package
              </Link>
            </div>
            <div className='flex gap-[4.8px] items-center'>
              <div className='flex gap-1 items-center'>
                {/* {renderStars(singlePackage?.reviews[0]?.review?.value)} */}
              </div>
              {/* <p className='text-sm font-medium text-[#333E47]'>{singlePackage?.rating}</p> */}
              <p className='text-[10px] font-normal text-[#B3B7BA]'>
                12,256 ratings
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-[6px]'>
              <div className='flex gap-[6px] w-28'>
                <img src={locationIcon} alt='' className='w-[14px]' />
                <p className='text-sm text-[#A5A5AB]'>Location</p>
              </div>
              <p className='text-sm text-[#333E47]'>
                {singlePackage?.destination?.name},{' '}
                {singlePackage?.destination?.country?.name}
              </p>
            </div>
            <div className='flex gap-[6px]'>
              <div className='flex gap-[6px] w-28'>
                <img src={durationIcon} alt='' className='w-[14px]' />
                <p className='text-sm text-[#A5A5AB]'>Duration</p>
              </div>
              <p className='text-sm text-[#333E47]'>
                {singlePackage?.duration}
              </p>
            </div>
            <div className='flex gap-[6px]'>
              <div className='flex gap-[6px] w-28'>
                <img src={usersIcon} alt='' className='w-[14px]' />
                <p className='text-sm text-[#A5A5AB]'>Quota</p>
              </div>
              <p className='text-sm text-[#333E47]'>
                {singlePackage?.max_capacity} participants
              </p>
            </div>
            <div className='flex gap-[6px]'>
              <div className='flex gap-[6px] w-28'>
                <img src={currencyIcon} alt='' className='w-[14px]' />
                <p className='text-sm text-[#A5A5AB]'>Price</p>
              </div>
              <p className='text-sm text-[#333E47]'>
                <span className='text-base font-semibold text-[#43ABFF]'>
                  {singlePackage?.price}
                </span>{' '}
                Starting From
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-[10px] border-b-2 pb-5'>
            <h3 className='text-base font-semibold'>About</h3>
            <p className='text-sm font-normal text-[#333E47]'>
              {singlePackage?.description}
            </p>
          </div>
          <div className='flex flex-col gap-[14px]'>
            <h3 className='text-base font-semibold'>Includes</h3>
            <div className='grid md:grid-cols-2 gap-4'>
              {singlePackage?.package_tags
                .filter(tag => tag?.type === 'included') // Adjusted to match the type
                .map((include, index) => (
                  <div className='flex gap-2' key={index}>
                    <div>
                      <RiCheckboxCircleFill className='text-base text-[#EB5B2A]' />
                    </div>
                    <p className='text-sm font-normal text-[#4A4C56]'>
                      {include?.tag?.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className='px-4 py-5 border-t border-l border-r rounded-t-lg'>
          <div class='w-full'>
            <div class='relative flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                class='absolute w-5 h-5 top-[14px] left-2.5 text-slate-600'
              >
                <path
                  fill-rule='evenodd'
                  d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z'
                  clip-rule='evenodd'
                />
              </svg>
              <input
                class='w-full bg-[#F7F8F8] placeholder:text-[#B3B7BA] text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
                placeholder='Search package, location, etc...'
              />
            </div>
          </div>
          {packages.map((pack, index) => (
            <div
              key={index}
              className='p-3 flex flex-col gap-3 cursor-pointer'
              onClick={() => handleNavigate(pack.id)}
            >
              <div className='flex flex-col xl:flex-row gap-[9px]'>
                <img
                  src={pack?.package_files[0]?.file_url}
                  className='xl:w-[108px] xl:h-16 rounded'
                  alt={pack?.package_files[0]?.file_url}
                />
                <div className='flex flex-col gap-[5px]'>
                  <h6 className='text-sm font-medium text-[#475467]'>
                    {pack.name}
                  </h6>
                  <div className='flex gap-2 justify-between'>
                    <p className='text-sm font-medium text-[#475467]'>
                      ${pack.price}
                    </p>
                    <div>
                      {pack.status === 1 ? (
                        <p className='flex items-center gap-1 text-[10px] 2xl:text-xs text-[#067647] font-medium px-1 border border-[#ABEFC6] bg-[#ECFDF3] rounded-2xl'>
                          <IoIosCheckmark className='text-sm text-[#17B26A]' />
                          Active
                        </p>
                      ) : (
                        <p className='flex items-center gap-1 text-[10px] 2xl:text-xs text-[#B42318] font-medium px-1 border border-[#FECDCA] bg-[#FEF3F2] rounded-2xl'>
                          <RxCross2 className='text-xs text-[#B42318]' />
                          Inactive
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <p className='text-xs font-normal text-[#475467]'>
                {truncateDescription(pack.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PackageDetails
