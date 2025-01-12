import React from 'react'
import PackageDestination from '../../../Components/Dashboard/Packages/DestinationPolicy/PackageDestination'
import PackagePolicy from '../../../Components/Dashboard/Packages/DestinationPolicy/PackagePolicy'

const PackageDestinationPolicy = () => {
  return (
    <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-[#080613]">Package Destinations & Policies</h3>
        <PackageDestination />
        <PackagePolicy />
    </div>
  )
}

export default PackageDestinationPolicy