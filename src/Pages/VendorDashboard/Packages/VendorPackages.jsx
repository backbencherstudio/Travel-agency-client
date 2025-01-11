import  { useState } from 'react'
import VendorPackgaesTable from '../../../Components/VendorDashboard/Packages/VendorPackgaesTable'
import { PackageData } from '../../../data/package';

const VendorPackages = () => {
     const [tourDateFilter, setTourDateFilter] = useState("all");
      const [columns] = useState({
        packageName: true,
        package: true,
        details: true,
        budget: true,
        status: true,
        action: true,
      });
  return (
    <div>
      <VendorPackgaesTable
        tableType='package'
        title={'Travel Packages'}
        data={PackageData}
        setDateFilter={setTourDateFilter}
        dateFilter={tourDateFilter}
        columns={columns}
      />
    </div>
  )
}

export default VendorPackages
