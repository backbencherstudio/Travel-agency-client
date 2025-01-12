import { FaRegBell } from 'react-icons/fa'
import image from '../../assets/img/logo.png'
import { IoMenu } from 'react-icons/io5'

const AdminHeader = ({ showSidebar, setShowSidebar }) => {
  return (
    <div className='fixed top-0 left-0 w-full z-40'>
      <div className='ml-0 lg:ml-[200px] px-6 bg-zinc-50 py-4 shadow-md'>
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
              Welcome, admin name
            </p>
          </div>

          {/* Right-side section will always be aligned to the right */}
          <div className='flex'>
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
                <p className='text-[12px] text-[#72777F]'>admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
