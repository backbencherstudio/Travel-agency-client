import { useEffect, useState } from 'react'
import PackageTable from '../../../Components/Dashboard/Packages/PackageTable'
import axiosClient from '../../../axiosClient'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const Packages = () => {
  const [tourDateFilter, setTourDateFilter] = useState('all');
  const [packageData,setPakcageData] = useState([]);
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
    data,
    error,
    refetch
  } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const response = await axiosClient.get('/api/admin/package')
      return response.data
    }
  })

  if (isError) {
    console.error('Error fetching packages:', error)
  }

  useEffect(()=>{
    const filtered = data?.data?.filter(item => item?.rejected_at === null)
    setPakcageData(filtered);
  },[data])


  return (
    <div>
      <Helmet>
        <title>Around 360 - Packages</title>
      </Helmet>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className='space-y-4 py-5'>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <h3 className='text-[#080613] text-[24px] font-semibold'>Travel Packages</h3>
            <button className='bg-[#EB5B2A] p-2 flex gap-1 rounded-md text-white cursor-pointer items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.0052 4.16406V15.8307M4.17188 9.9974H15.8385" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <Link to="/dashboard/add-package" className='text-[12px] font-medium text-center'>Add Package</Link>
            </button>
          </div>
          <PackageTable
            tableType='package'
            title={'Travel Packages'}
            data={packageData?.filter(item => item.type.toLowerCase() !== 'cruise')}
            setDateFilter={setTourDateFilter}
            dateFilter={tourDateFilter}
            columns={columns}
            refetch={refetch}
            showAction={true}
          />
        </div>
      )}
    </div>
  )
}

export default Packages