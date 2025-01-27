import { FaRegBell } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'
import image from '../../assets/img/logo.png'
import { IoMenu } from 'react-icons/io5'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider'
import { useContext, useState, useEffect, useRef } from 'react'
import moment from 'moment'
import NotificationApis from '../../Apis/NotificationApis'

const AdminHeader = ({ showSidebar, setShowSidebar }) => {
  const { user } = useContext(AuthContext)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registered', time: new Date() },
    { id: 2, message: 'System update available', time: new Date(Date.now() - 60000) }, // 1 minute ago
    { id: 3, message: 'You have a new message', time: new Date(Date.now() - 3600000) } // 1 hour ago
  ])
  const notificationRef = useRef(null)

  const handleClickOutside = event => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    getNotification();
  }, [])
  
  const getNotification = async () => {
    const res = await NotificationApis.getNotification();
    console.log(res);
  }

  const clearNotification = id => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    )
  }


  const clearAllNotifications = () => {
    setNotifications([])
  }

  const formatNotificationTime = time => {
    const now = moment()
    const notificationTime = moment(time)

    if (now.isSame(notificationTime, 'day')) {
      return notificationTime.fromNow() // "1 minute ago", "2 hours ago", etc.
    } else if (now.diff(notificationTime, 'days') < 7) {
      return notificationTime.format('dddd h:mm A') // "Sunday 1:10 PM"
    } else {
      return notificationTime.format('MMM D, h:mm A') // "Jan 25, 2:50 PM"
    }
  }


  return (
    <div className='fixed top-0 left-0 w-full z-40'>
      <div className='ml-0 lg:ml-[200px] px-6 bg-zinc-50 py-5 shadow-md'>
        <div className='flex justify-between items-center h-full'>
          {/* Show FaList icon only on small and medium devices */}
          <div
            onClick={() => setShowSidebar(!showSidebar)}
            className='md:flex lg:hidden rounded-sm cursor-pointer'
          >
            <IoMenu className='text-2xl text-orange-500' />
          </div>

          {/* This section will display the route name */}
          <div className='hidden lg:flex lg:ms-20'>
            <p className='text-[#1D1F2C] text-[14px] font-medium'>
              Welcome, {user?.name}
            </p>
          </div>

          {/* Right-side section will always be aligned to the right */}
          <div className='flex relative'>
            <input
              type='text'
              placeholder='Search'
              className='p-2 border mx-5 rounded-lg bg-no-repeat bg-left pl-10 hidden md:block'
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" width="20px" height="20px"><path d="M10 2a8 8 0 015.664 13.736l5.316 5.316a1 1 0 01-1.414 1.414l-5.316-5.316A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"></path></svg>')`,
                backgroundSize: '16px 16px',
                backgroundPosition: '10px center'
              }}
            />
            <div
              className='border mr-5 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer relative'
              onClick={e => {
                e.stopPropagation()
                setShowNotifications(!showNotifications)
              }}
              ref={notificationRef}
            >
                <FaRegBell />
            {notifications.length > 0 && (
              <span className='absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                {notifications.length}
              </span>
            )}
              {showNotifications && (
                <div
                  className='absolute top-16 md:-right-20  w-80 bg-white shadow-lg rounded-lg p-4 z-50 transition-all duration-300 ease-in-out transform'
                  style={{
                    opacity: showNotifications ? 1 : 0,
                    transform: showNotifications
                      ? 'translateY(0)'
                      : 'translateY(-10px)'
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className='flex justify-between items-center mb-2'>
                    <h3 className='font-semibold text-gray-800'>
                      Notifications
                    </h3>
                    <button
                      className='text-sm text-red-500 hover:underline'
                      onClick={clearAllNotifications}
                    >
                      Clear All
                    </button>
                  </div>
                  <ul className='mt-2 space-y-2'>
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <li
                          key={notification.id}
                          className='flex justify-between items-center text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-md'
                        >
                          <div>
                            <span>{notification.message}</span>
                            <p className='text-xs text-gray-400'>
                              {formatNotificationTime(notification.time)}
                            </p>
                          </div>
                          <button
                            className='text-red-500 hover:text-red-700'
                            onClick={() => clearNotification(notification.id)}
                          >
                            <FaTimes />
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className='text-sm text-gray-600'>
                        No new notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
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
                <p className='text-[12px] text-[#72777F]'>{user?.type}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader