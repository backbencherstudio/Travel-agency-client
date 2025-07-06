import * as React from 'react'
// import avatar from '../../../assets/img/avatar/avatar-3.png'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'

import { useEffect, useState } from 'react'
import PackageTable from '../../../Components/Dashboard/Packages/PackageTable'
import axiosClient from '../../../axiosClient'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { getUserById } from '../../../Apis/GetUserApis'

const VendorDetails = () => {
  const { id } = useParams()
  const [tourDateFilter, setTourDateFilter] = useState('all')
  const [packageData, setPackageData] = useState([])
  const [userData, setUserData] = useState(null)
  const [columns] = useState({
    packageName: true,
    package: true,
    details: true,
    budget: true,
    status: true,
    action: true
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserById(id)
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    fetchUserData()
  }, [id])

  const {
    isLoading,
    isError,
    data = [],
    error,
    refetch
  } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await axiosClient.get(
        `/api/admin/package?vendor_id=${id}`
      )
      return response.data
    }
  })
  // console.log(userData?.data?.name)
  return (
    <>
      <Helmet>
        <title>Around 360 - Vendor Details</title>
      </Helmet>
      <div className='content min-h-[calc(100vh-80px)] w-full bg-white p-6'>
        <div className='userData overflow-y-auto'>
          <div className='top grid grid-cols-12 gap-4'>
            <div className='first col-span-12 md:col-span-4 2xl:col-span-2 flex flex-col items-center'>
              {userData?.data?.avatar ? (
                <img
                  src={userData.data.avatar}
                  alt={userData?.data?.name}
                  className='w-[200px] h-[200px] rounded-full object-cover mb-4'
                />
              ) : (
                <div className='w-[200px] h-[200px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4'>
                  <span className='text-white text-6xl font-semibold'>
                    {userData?.data?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <h1 className='text-xl font-medium text-center mb-[3px] '>
                {userData?.data?.name || 'Loading...'}
              </h1>
              <div className='rateing flex justify-center mb-1'>
                <Stack spacing={1}>
                  <Rating
                    name='half-rating-read'
                    defaultValue={
                      userData?.data?.average_rating === null
                        ? 0
                        : userData?.data?.average_rating
                    }
                    precision={0.5}
                    readOnly
                  />
                </Stack>
              </div>
              <p className='text-sm font-normal text-center'>
                {userData?.data?.reviews_count || 0} Reviews
              </p>
            </div>
            <div className='second md:col-span-8 2xl:col-span-10 col-span-12'>
              <h1 className='font-semibold text-lg mb-6'>Vendor Profile</h1>
              <div className='boxes grid md:grid-cols-10 w-full md:gap-4 '>
                <div className='h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex-col justify-start items-start inline-flex'>
                  <h2 className='self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]'>
                    Vendor Name
                  </h2>
                  <h1 className='self-stretch text-[#030b09] text-sm font-normal '>
                    {userData?.data?.name || 'Loading...'}
                  </h1>
                </div>
                <div className='h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex-col justify-start items-start inline-flex overflow-hidden'>
                  <h2 className='self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]'>
                    Email Address
                  </h2>
                  <h1 className='self-stretch text-[#030b09] text-sm font-normal text-wrap'>
                    {userData?.data?.email || 'Loading...'}
                  </h1>
                </div>
                <div className='h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex-col justify-start items-start inline-flex'>
                  <h2 className='self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]'>
                    Mobile Number
                  </h2>
                  <h1 className='self-stretch text-[#030b09] text-sm font-normal '>
                    {userData?.data?.phone_number || 'Not Available'}
                  </h1>
                </div>
                <div className='min-h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 w-full flex-col justify-start items-start inline-flex'>
                  <h2 className='self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]'>
                    Address
                  </h2>
                  <h1 className='self-stretch text-[#030b09] text-sm font-normal '>
                    {userData?.data?.address || 'Not Available'}
                  </h1>
                </div>

                <div className='flex col-span-10 gap-4'>
                  <div className='min-h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 flex-1 flex-col justify-start items-start inline-flex'>
                    <h2 className='self-stretch text-[#a1a1a1] text-sm font-normal mb-[3px]'>
                      Join Date
                    </h2>
                    <h1 className='self-stretch text-[#030b09] text-sm font-normal '>
                      {userData?.data?.created_at
                        ? new Date(userData.data.created_at).toLocaleDateString()
                        : 'Not Available'}
                    </h1>
                  </div>

                  <div className='min-h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 flex-1 flex-col justify-start items-start inline-flex'>
                    <h2 className=' text-[#a1a1a1] text-sm font-normal mb-[3px]'>
                      Gender
                    </h2>
                    <h1 className=' text-[#030b09] text-sm font-normal '>
                      {userData?.data?.gender
                        ? userData?.data?.gender
                        : 'Not Available'}
                    </h1>
                  </div>

                  <div className='flex-1 min-h-16 px-3 py-2 bg-gray-50 rounded border border-[#e9eaec] mb-4 md:col-span-5 flex-col justify-start items-start inline-flex'>
                    <h2 className=' text-[#a1a1a1] text-sm font-normal mb-[3px]'>
                      Date Of Birth
                    </h2>
                    <h1 className=' text-[#030b09] text-sm font-normal '>
                      {userData?.data?.date_of_birth
                        ? new Date(
                          userData.data.date_of_birth
                        ).toLocaleDateString()
                        : 'Not Available'}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1 className='mt-8 mb-6 text-lg font-semibold'>Vendor Tour Package</h1>

        {/* package table part */}
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <PackageTable
              data={data?.data}
              setDateFilter={setTourDateFilter}
              dateFilter={tourDateFilter}
              columns={columns}
              refetch={refetch}
              showAction={false}
            />
          )}
        </div>
        {/* package table part */}
      </div>
    </>
  )
}

export default VendorDetails
