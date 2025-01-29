import React from 'react'
import PackageDestination from '../../../Components/Dashboard/Packages/DestinationPolicy/PackageDestination'
import PackagePolicy from '../../../Components/Dashboard/Packages/DestinationPolicy/PackagePolicy'
import { Helmet } from 'react-helmet-async'

const PackageDestinationPolicy = () => {
  return (
    <div className="flex flex-col gap-4">
        <Helmet>
            <title>Around 360 - Package Destinations & Policies</title>
        </Helmet>
        <h3 className="text-2xl font-semibold text-[#080613]">Package Destinations & Policies</h3>
        <PackageDestination />
        <PackagePolicy />
    </div>
  )
}
  
export default PackageDestinationPolicy