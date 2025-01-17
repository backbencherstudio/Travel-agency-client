import { FaSearch } from 'react-icons/fa'
import CompanyInfo from '../../../Components/Dashboard/Settings/CompanyInfo'
import Cancellation from '../../../Components/Dashboard/Settings/Cancellation'
import Permission from '../../../Components/Dashboard/Settings/Permission'
import Password from '../../../Components/Dashboard/Settings/Password'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { RxCrossCircled } from 'react-icons/rx'
import { useState, useEffect } from 'react'
import { GoShieldLock } from 'react-icons/go'
import { IoLockOpenOutline } from 'react-icons/io5'
import { RiCoupon2Line, RiQuestionAnswerLine } from 'react-icons/ri'
import { useNavigate, useLocation } from 'react-router-dom'
import FaqAdded from '../Faq/FaqAdded'
import Coupon from '../../../Components/Dashboard/Settings/Coupon/Coupon'
import SocialCopyRight from '../../../Components/Dashboard/Settings/SocialCopyRight'
import { MdCopyright } from 'react-icons/md'

const Settings = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Retrieve active tab from URL (query parameter)
  const queryParams = new URLSearchParams(location.search)
  const defaultTab = queryParams.get('tab') || 'Company Info'
  const [activeTab, setActiveTab] = useState(defaultTab)

  const menuItems = [
    {
      icon: <IoMdInformationCircleOutline className='text-xl' />,
      label: 'Company Info'
    },
    { icon: <RxCrossCircled className='text-xl' />, label: 'Cancellation' },
    { icon: <GoShieldLock className='text-lg' />, label: 'Permission' },
    { icon: <IoLockOpenOutline className='text-lg' />, label: 'Password' },
    { icon: <RiCoupon2Line  className='text-lg' />, label: 'Coupon' },
    {
      icon: <RiQuestionAnswerLine className='text-xl' />,
      label: 'FAQ'
    },
    {
      icon: <MdCopyright className="text-xl" />, // Updated icon
      label: 'Social & Copyright',
    },
  ]

  // Save active tab to localStorage and update the URL when it changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab)
    navigate(`?tab=${activeTab}`, { replace: true })
  }, [activeTab, navigate])

  const renderContent = () => {
    switch (activeTab) {
      case 'Company Info':
        return <CompanyInfo />
      case 'Cancellation':
        return <Cancellation />
      case 'Permission':
        return <Permission />
      case 'Password':
        return <Password />
      case 'FAQ':
        return <FaqAdded />
      case 'Coupon':
        return <Coupon />
      case 'Social & Copyright':
        return <SocialCopyRight />
      default:
        return <CompanyInfo />
    }
  }

  return (
    <div className='min-h-[calc(100vh-80px)] w-full'>
      {/* Header with Search */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5'>
        <h1 className='text-[#0D0E0D] text-[20px] capitalize'>Settings</h1>
        <div className='relative w-full sm:w-auto'>
          <input
            type='text'
            placeholder='Search anything'
            className='py-1.5 pl-10 pr-4 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full sm:w-[300px]'
          />
          <FaSearch className='absolute top-3 left-3 text-zinc-400' />
        </div>
      </div>

      <div className='bg-white rounded-xl p-4 md:p-5 min-h-[calc(100vh-180px)]'>
        {/* Mobile Tabs */}
        <div className='md:hidden w-full overflow-x-auto pb-2 mb-4'>
          <div className='flex gap-2 min-w-max'>
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                  ${
                    activeTab === item.label
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-50 hover:bg-orange-100'
                  }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className='flex flex-col md:flex-row gap-6'>
          {/* Sidebar Navigation - Hidden on Mobile */}
          <div className='hidden md:block md:w-[200px] lg:w-[250px] xl:w-[300px] bg-[#FDEFEA] rounded-xl p-4 h-[calc(100vh-220px)]'>
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(item.label)}
                className={`w-full text-left px-4 py-2 rounded-lg mb-7 flex items-center gap-3 transition-colors ${
                  activeTab === item.label
                    ? 'bg-orange-500 text-white'
                    : 'hover:bg-orange-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Main Form Area */}
          <div className='flex-1 overflow-y-auto h-[calc(100vh-220px)]'>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
