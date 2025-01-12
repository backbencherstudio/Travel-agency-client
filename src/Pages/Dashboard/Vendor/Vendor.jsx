import { useState } from 'react'
import VendorManagemnetTable from '../../../Components/Dashboard/Vendor/VendorManagemnetTable'
import { vendorData } from '../../../data/vendor'

const Vendor = () => {
  const [columns] = useState({
    id: true,
    name: true,
    date: true,
    travelerImg: true,
    phone: true,
    email: true,
    address: true,
    expert: true
  })
  return (
    <div>
      <VendorManagemnetTable
        title={'Vendor Management'}
        data={vendorData}
        columns={columns}
      />
    </div>
  )
}

export default Vendor
