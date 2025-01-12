import React from 'react'
import PackageCategory from '../../../Components/Dashboard/Packages/CategoryTag/PackageCategory'
import PackageTag from '../../../Components/Dashboard/Packages/CategoryTag/PackageTag'

const PackageCategoryTag = () => {
  return (
    <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-[#080613]">Package Categories & Tags</h3>
        <PackageCategory />
        <PackageTag />
    </div>
  )
}

export default PackageCategoryTag