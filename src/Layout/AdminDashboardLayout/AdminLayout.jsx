import { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'
import { AuthContext } from '../../AuthProvider/AuthProvider'
import Loading from '../../Shared/Loading'

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const { loading } = useContext(AuthContext);

  return (
    <div className=' w-full h-full  min-h-screen bg-[#e9f0f9]'>
      {loading && (
        <Loading />
      )}
      <div className='animate-from-middle'>
        <AdminHeader
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <AdminSidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        <div className='ml-0 mt-4 lg:ml-[275px] py-[80px] px-5  '>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
