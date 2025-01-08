import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import VendorHeader from './VendorHeader'
import VendorSidebar from './VendorSidebar'

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div className=' w-full h-full'>
      <>
        <VendorHeader
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <VendorSidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        <div className='ml-0 lg:ml-[275px] py-[80px] px-5 bg-[#e9f0f9] h-screen '>
          <Outlet />
        </div>
      </>
    </div>
  )
}

export default MainLayout
