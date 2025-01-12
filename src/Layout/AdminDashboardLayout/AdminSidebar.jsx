import { useEffect, useRef, useState } from 'react'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { IoSettingsOutline } from 'react-icons/io5'
import { LuBookmarkCheck, LuLayoutDashboard } from 'react-icons/lu'
import { MdOutlineBusinessCenter, MdOutlinePayment } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/Logo.svg'
import { CiLogout } from 'react-icons/ci'
import { FiCompass } from 'react-icons/fi'
import { RiArticleLine } from 'react-icons/ri'
import { LuMessageSquareText } from "react-icons/lu";

const AdminSidebar = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const sidebarRef = useRef(null)
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
      tab === 'packageDestination&Policy' ||
      tab === 'packageExtraService'
    ) {
      setSubmenuOpen(true)
    } else {
      setSubmenuOpen(false)
    }
    setSelectedTab(tab)
    navigate(path)
  }
  return (
    <>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? 'invisible' : 'visible'
        } w-screen h-screen bg-[#22292f80] top-0 left-0 z-10`}
      ></div>

      <div
        className={`w-[275px] fixed px-5 pt-4 bg-[#061d35] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/5%)]  transition-all ${
          showSidebar ? 'left-0' : '-left-[275px] lg:left-0'
        }`}
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
          <button
            onClick={() => setSubmenuOpen(!isSubmenuOpen)}
            className={`flex items-center justify-between w-full p-2 rounded ${
              selectedTab === 'addPackage' ||
              selectedTab === 'packageCategory&Tag' ||
              selectedTab === 'packageDestination&Policy' ||
              selectedTab === 'packageExtraService'
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
              <button
                onClick={() =>
                  handleNavigation(
                    'packageExtraService',
                    'package-extra-service'
                  )
                }
                className={`text-xs flex items-center space-x-2 hover:bg-[#0d3055] p-2 rounded ${
                  selectedTab === 'packageExtraService'
                    ? 'bg-[#eb5b2a] text-white font-semibold'
                    : 'hover:bg-[#0d3055]'
                }`}
              >
                <span>Package Extra Service</span>
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
            onClick={() => handleNavigation('Bookings', 'bookings')}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === 'Bookings'
                ? 'bg-[#eb5b2a] text-white font-semibold'
                : 'hover:bg-[#0d3055]'
            }`}
          >
            <LuBookmarkCheck className='h-5 w-5' />
            <span>Bookings</span>
          </button>
          <button
            onClick={() => handleNavigation('Vendor', 'vendor')}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === 'Vendor'
                ? 'bg-[#eb5b2a] text-white font-semibold'
                : 'hover:bg-[#0d3055]'
            }`}
          >
            <FiCompass className='h-5 w-5' />
            <span>Vendor</span>
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
            onClick={() => handleNavigation('Blog', 'blog')}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === 'Blog'
                ? 'bg-[#eb5b2a] text-white font-semibold'
                : 'hover:bg-[#0d3055]'
            }`}
          >
            <RiArticleLine className='h-5 w-5' />
            <span>Blog</span>
          </button>

          <button
            onClick={() => handleNavigation('Chat', 'chat')}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === 'Chat'
                ? 'bg-[#eb5b2a] text-white font-semibold'
                : 'hover:bg-[#0d3055]'
            }`}
          >
            <LuMessageSquareText className='h-5 w-5' />
            <span>Messages</span>
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

          <button className='absolute bottom-5 flex gap-3 text-[16px] hover:bg-[#fdf0ea] hover:text-[#ec6931] p-2 px-5 rounded-md text-white'>
            <CiLogout className='mt-1' /> Logout
          </button>
        </nav>
      </div>
    </>
  )
}

export default AdminSidebar
