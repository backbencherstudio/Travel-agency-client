import { useState, useEffect, useRef } from 'react'
import { FaRegBell } from 'react-icons/fa'
import { IoClose, IoMenu, IoSettingsOutline } from 'react-icons/io5'
import { LuBookmarkCheck, LuLayoutDashboard } from 'react-icons/lu'
import { MdOutlineBusinessCenter, MdOutlinePayment } from 'react-icons/md'
import image from '../../assets/img/logo.png'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'
import logo from '../../assets/img/Logo.svg'
import { FiCompass } from 'react-icons/fi'
import { RiArticleLine } from 'react-icons/ri'
import { FaRegSquarePlus } from 'react-icons/fa6'

const VendorDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const sidebarRef = useRef(null) // Ref for sidebar
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem('tab') || 'Dashboard'
  )
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [showCloseIcon, setShowCloseIcon] = useState(false)
  const [isSubmenuOpen, setSubmenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('tab', selectedTab)
  }, [selectedTab])

  useEffect(() => {
    if (isSidebarOpen) {
      const timer = setTimeout(() => setShowCloseIcon(true), 150)
      return () => clearTimeout(timer)
    } else {
      setShowCloseIcon(false)
    }
  }, [isSidebarOpen])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location])

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = event => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isSidebarOpen
      ) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isSidebarOpen])

  const handleNavigation = (tab, path) => {
    if (
      tab === 'addPackage' ||
      tab === 'packageCategory&Tag' ||
      tab === 'packageDestination&Policy'
    ) {
      setSubmenuOpen(true)
    } else {
      setSubmenuOpen(false)
    }
    setSelectedTab(tab)
    navigate(path)
  }

  return (
    <div className='flex min-h-screen bg-[#e9f0f9] relative'>
      {/* Black overlay */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-[#061d35] fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform lg:translate-x-0 lg:relative w-[280px] border border-[#061D35] p-5 z-50`}
      >
        <img src={logo} alt='' className='w-full h-8 mt-3' />
        <nav className='flex flex-col gap-4 text-white mt-11'>
          <button
            onClick={() => handleNavigation('Dashboard', '')}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === 'Dashboard'
                ? 'bg-[#eb5b2a] text-white font-semibold'
                : 'hover:bg-[#0d3055]'
            }`}
          >
            <LuLayoutDashboard className='h-5 w-5' />
            <span>Dashboard</span>
          </button>
          {/* add package */}
          <button
            onClick={() => setSubmenuOpen(!isSubmenuOpen)}
            className={`flex items-center justify-between w-full p-2 rounded ${
              selectedTab === 'addPackage' ||
              selectedTab === 'packageCategory&Tag' ||
              selectedTab === 'packageDestination&Policy'
                ? 'bg-[#eb5b2a] text-white font-semibold'
                : 'hover:bg-[#0d3055]'
            }`}
          >
            <div className='flex items-center space-x-2'>
              <FaRegSquarePlus className='h-5 w-5' />
              <span>Add Package</span>
            </div>
            <span
              className={`transform transition-transform ${
                isSubmenuOpen ? 'rotate-90' : ''
              }`}
            >
              ▸
            </span>
          </button>
          {isSubmenuOpen && (
            <div className='ml-6 flex flex-col gap-2 animate-dropdown'>
              <button
                onClick={() => handleNavigation('addPackage', 'add-package')}
                className={`text-xs flex items-center space-x-2 hover:bg-[#0d3055] p-2 rounded 
                    ${
                      selectedTab === 'addPackage'
                        ? 'bg-[#eb5b2a] text-white font-semibold'
                        : 'hover:bg-[#0d3055]'
                    }`}
              >
                <span>Add Package</span>
              </button>
              <button
                onClick={() =>
                  handleNavigation(
                    'packageCategory&Tag',
                    'package-category-&-tag'
                  )
                }
                className={`text-xs flex items-center space-x-2 hover:bg-[#0d3055] p-2 rounded ${
                  selectedTab === 'packageCategory&Tag'
                    ? 'bg-[#eb5b2a] text-white font-semibold'
                    : 'hover:bg-[#0d3055]'
                }`}
              >
                <span>Package Categories & Tags</span>
              </button>
              <button
                onClick={() =>
                  handleNavigation(
                    'packageDestination&Policy',
                    'package-destination-&-policy'
                  )
                }
                className={`text-xs flex items-center space-x-2 hover:bg-[#0d3055] p-2 rounded ${
                  selectedTab === 'packageDestination&Policy'
                    ? 'bg-[#eb5b2a] text-white font-semibold'
                    : 'hover:bg-[#0d3055]'
                }`}
              >
                <span>Package Destinations & Policies</span>
              </button>
            </div>
          )}

          <button
            onClick={() => handleNavigation('Packages', 'packages')}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === 'Packages'
                ? 'bg-[#eb5b2a] text-white font-semibold'
                : 'hover:bg-[#0d3055]'
            }`}
          >
            <MdOutlineBusinessCenter className='h-5 w-5' />
            <span>Packages</span>
          </button>

          <button
            onClick={() => handleNavigation('Booking List', 'booking-list')}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === 'Booking List'
                ? 'bg-[#eb5b2a] text-white font-semibold'
                : 'hover:bg-[#0d3055]'
            }`}
          >
            <LuBookmarkCheck className='h-5 w-5' />
            <span>Booking List</span>
          </button>

          <button
            onClick={() => handleNavigation('Payment', 'payment')}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === 'Payment'
                ? 'bg-[#eb5b2a] text-white font-semibold'
                : 'hover:bg-[#0d3055]'
            }`}
          >
            <MdOutlinePayment className='h-5 w-5' />
            <span>Payment</span>
          </button>

          <button
            onClick={() => handleNavigation('Settings', 'settings')}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === 'Settings'
                ? 'bg-[#eb5b2a] text-white font-semibold'
                : 'hover:bg-[#0d3055]'
            }`}
          >
            <IoSettingsOutline className='h-5 w-5' />
            <span>Settings</span>
          </button>
        </nav>
        <button className='absolute bottom-5 flex gap-3 text-[16px] hover:bg-[#fdf0ea] hover:text-[#ec6931] p-2 px-5 rounded-md text-white'>
          <CiLogout className='mt-1' /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className='flex flex-col flex-1 overflow-y-auto '>
        <header className='flex items-center justify-between bg-zinc-50 p-4 shadow-md'>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className='lg:hidden text-2xl text-orange-500'
          >
            {isSidebarOpen && showCloseIcon ? <IoClose /> : <IoMenu />}
          </button>
          <div className='hidden lg:block'>
            <p className='text-[#1D1F2C] text-[14px] capitalize'>
              Welcome, vendor name
            </p>
          </div>

          <div></div>
          <div className='flex'>
            <input
              type='text'
              placeholder='Search'
              className='p-2 border mx-5 rounded-lg hidden md:block'
            />
            <div className=' border mr-5 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer'>
              <FaRegBell />
            </div>
            <div className='flex'>
              <div className=' border mr-1 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer'>
                <img
                  src={image}
                  className='h-full w-full rounded-full object-cover'
                  alt=''
                />
              </div>
              <div>
                <h1 className='font-semibold text-[16px]'>Tren bold</h1>
                <p className='text-[12px] text-[#72777F]'>Vendor</p>
              </div>
            </div>
          </div>
        </header>
        <main className='flex-1 overflow-y-auto'>
          <div className='p-5'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default VendorDashboard
