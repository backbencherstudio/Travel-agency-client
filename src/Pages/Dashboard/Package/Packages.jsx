import { useEffect, useState } from 'react'
import PackageTable from '../../../Components/Dashboard/Packages/PackageTable'
import axiosClient from '../../../axiosClient'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

const Packages = () => {
  const [tourDateFilter, setTourDateFilter] = useState('all')
  const [packageData, setPackageData] = useState([])
  const [columns] = useState({
    packageName: true,
    package: true,
    details: true,
    budget: true,
    status: true,
    action: true,
    approval: true,
    created_at: true
  })

  const {
    isLoading,
    isError,
    data = [],
    error,
    refetch
  }= "hello";
  // } = useQuery({
  //   queryKey: ['packages'],
  //   queryFn: async () => {
  //     const response = await axiosClient.get('/api/admin/package')
  //     return response.data
  //   }
  // })

  console.log('data', data)

  // useEffect(() => {
  //   const fetchPackages = async () => {
  //       try {
  //           const resPackages = await axiosClient.get(`/api/admin/package`);
  //           console.log('resDetails', resPackages)
  //           setPackageData(resPackages.data.data);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //   }
  //   fetchPackages();
  // }, [])

  return (
    <div>
      <Helmet>
        <title>Around 360 - Packages</title>
      </Helmet>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <h3 className='text-[#080613] text-[24px] font-semibold'>Travel Packages</h3>
            <button className='bg-[#EB5B2A] p-2 flex gap-1 rounded-md text-white cursor-pointer items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.0052 4.16406V15.8307M4.17188 9.9974H15.8385" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className='text-[12px] font-medium text-center'>Add Package</span>
            </button>
          </div>
          <PackageTable
            tableType='package'
            title={'Travel Packages'}
            data={data?.data}
            setDateFilter={setTourDateFilter}
            dateFilter={tourDateFilter}
            columns={columns}
            refetch={refetch}
          />
        </div>
      )}
    </div>
  )
}

export default Packages
