import { FaCheckCircle, FaTimesCircle, FaSearch, FaEye } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import TablePagination from '../../../Shared/TablePagination'
import { useState, useEffect, useRef, useCallback } from 'react'
import user1 from "../../../assets/img/travel-packages/package-1.png"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import debounce from 'lodash/debounce'

const statusStyles = {
  Confirmed: {
    color: '#067647',
    backgroundColor: '#ECFDF3',
    border: '1px solid #ABEFC6',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
      <path d="M10.1749 3L4.67493 8.5L2.17493 6" stroke="#17B26A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  },
  Pending: {
    color: '#0A3159',
    backgroundColor: '#E7ECF2',
    border: '1px solid #90A9C3',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="7" height="6" viewBox="0 0 7 6" fill="none">
      <circle cx="3.17493" cy="3" r="3" fill="#0E457D" />
    </svg>
  },
  Cancelled: {
    color: '#B42318',
    backgroundColor: '#FEF3F2',
    border: '1px solid #FECDCA',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
      <path d="M9.17493 3.5L4.17493 8.5M4.17493 3.5L9.17493 8.5" stroke="#F04438" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  },
  Requests: {
    color: '#067647',
    backgroundColor: '#ECFDF3',
    border: '1px solid #ABEFC6',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
      <circle cx="6.6748" cy="6" r="3" fill="#067647" />
    </svg>
  }
}

// const BookingManagementTable = ({ tableType = '', title, data, columns }) => {
const BookingManagementTable = ({ tableType = '', title, columns }) => {


  const data = [
    {
      id: 1,
      invoice_number: "00001",
      user: {
        image: user1,
        name: "Raphael Goodman"
      },
      booking_items: [
        { package: { name: "Venice Dreams" } }
      ],
      created_at: "Jun 25, 2024",
      status: "confirmed"
    },
    {
      id: 2,
      invoice_number: "00002",
      user: {
        image: user1,
        name: "Raphael Goodman"
      },
      booking_items: [
        { package: { name: "Venice Dreams" } }
      ],
      created_at: "Jun 25, 2024",
      status: "requests"
    },
    {
      id: 3,
      invoice_number: "00003",
      user: {
        image: user1,
        name: "Raphael Goodman"
      },
      booking_items: [
        { package: { name: "Venice Dreams" } }
      ],
      created_at: "Jun 25, 2024",
      status: "cancelled"
    },
  ]

  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState()
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [isOpen, setIsOpen] = useState(false)
  const statuses = [
    'All Status',
    'Requests',
    'Pending',
    'Confirmed',
    'Cancelled'
  ]

  console.log(selectedStatus)
  const navigate = useNavigate()

  const dropdownRef = useRef(null) // Reference for dropdown

  // Pagination states
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query, status, data) => {
      if (!data) return;

      let filtered = data;

      // Filter by search query
      if (query) {
        filtered = data.filter(item => {
          const userName = item.user?.name?.toLowerCase() || '';
          const packageName = item.booking_items?.[0]?.package?.name?.toLowerCase() || '';
          const invoiceNumber = item.invoice_number?.toLowerCase() || '';
          const searchTerm = query.toLowerCase();

          return userName.includes(searchTerm) ||
            packageName.includes(searchTerm) ||
            invoiceNumber.includes(searchTerm);
        });
      }

      // Filter by status
      if (status !== 'All Status') {
        filtered = filtered.filter(item =>
          item.status?.toLowerCase() === status.toLowerCase()
        );
      }

      setFilteredData(filtered);

      // Update URL with search query and status
      const params = new URLSearchParams(window.location.search);
      if (query) params.set('search', query);
      else params.delete('search');
      if (status !== 'All Status') params.set('status', status);
      else params.delete('status');

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
    }, 500),
    []
  );

  useEffect(() => {
    setFilteredData(data)
  }, [])

  useEffect(() => {
    debouncedSearch(searchQuery, selectedStatus, data);
  }, [searchQuery, selectedStatus, debouncedSearch]);
  // }, [searchQuery, selectedStatus, data, debouncedSearch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleNextPage = (event) => {
    setPage(prev => prev + 1)
  };

  const handlePreviousPage = () => {
    setPage(prev => Math.max(0, prev - 1))
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRowClick = id => {
    if (tableType === 'user' || tableType === 'blog') {
      navigate(`${id}`)
    }
  }

  const handleStatusChange = status => {
    setSelectedStatus(status)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div>
      <div className='flex flex-col md:flex-row justify-between items-center mb-7'>
        <h1 className='font-semibold text-[24px]'>{title}</h1>
        <div className='flex flex-col md:flex-row gap-3 pt-4 rounded-t-xl'>
          <div className='relative md:col-span-1'>
            <input
              type='text'
              placeholder='Search...'
              className='py-1.5 pl-10 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%]'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <FaSearch className='absolute top-3 left-3 text-zinc-400' />
          </div>

          {/* Custom Dropdown */}
          <div className='flex justify-center' ref={dropdownRef}>
            <div className='relative inline-block text-left'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='inline-flex items-center gap-2 justify-between w-full px-4 py-2 text-sm font-medium text-white bg-[#EB5B2A] rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200'
              >
                {selectedStatus}
                <span>
                  <MdKeyboardArrowDown className='text-xl' />
                </span>
              </button>

              {isOpen && (
                <div className='absolute mt-5 w-56 lg:w-72 py-5 rounded-2xl bg-white border border-gray-200 shadow-lg z-10 right-0'>
                  <div className='absolute top-[-10px] right-10 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45'></div>

                  <div className='bg-white rounded-md'>
                    {statuses.map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`w-full px-5 py-5 text-left text-[#4A4C56] text-base hover:bg-gray-200 ${selectedStatus === status
                          ? 'bg-gray-100 font-semibold'
                          : ''
                          }`}
                      >
                        {status.split("_").join(" ")}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-[10px] bg-white p-4 w-full overflow-x-auto space-y-3'>
        <table className='w-full table-auto'>
          <thead className='text-nowrap'>
            <tr className='bg-[#F9FAFB] rounded-md'>
              {columns?.bookingId && (
                <th className='px-6 py-3 text-[#475467] text-[12px] font-medium'>
                  <div className='flex items-center gap-1'>
                    <span>Booking ID</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                    </svg>
                  </div>
                </th>
              )}
              {columns?.name && (
                <th className='px-6 py-3 text-[#475467] text-[12px] font-medium'>
                  <div className='flex items-center gap-1'>
                    <span className='text-start'>Travelers Name</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                    </svg>
                  </div>
                </th>
              )}
              {columns?.packageName && (
                <th className='px-6 py-3 text-[#475467] text-[12px] font-medium'>
                  <div className='flex items-center gap-1'>
                    <span>Package Name</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                    </svg>
                  </div>
                </th>
              )}
              {columns?.date && (
                <th className='px-6 py-3 text-[#475467] text-[12px] font-medium'>
                  <div className='flex items-center gap-1 justify-center'>
                    <span>Date</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                    </svg>
                  </div>
                </th>
              )}
              {columns?.status && (
                <th className='px-6 py-3 text-[#475467] text-[12px] font-medium'>
                  <div className='flex items-center gap-1 justify-center'>
                    <span className='text-center'>Status</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                    </svg>
                  </div>
                </th>
              )}
              <th className='px-6 py-3 text-[#475467] text-[12px] font-medium'>
                Action
              </th>
            </tr>
          </thead>

          <tbody className='text-nowrap'>
            {filteredData?.length > 0 ? (
              filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map(item => (
                  <tr key={item?.id} onClick={() => handleRowClick(item.id)} className='border-b border-[#EAECF0]'>
                    {columns?.bookingId && (
                      <td className='px-6 py-5'>
                        <p className='text-[#475467] text-[12px]'>
                          #{item?.invoice_number}
                        </p>
                      </td>
                    )}
                    {columns?.name && (
                      <td className='px-6 py-5' style={{ minWidth: '200px' }}>
                        <div className='flex items-center gap-3'>
                          <img
                            className='rounded-full'
                            src={item.user?.image || 'default-image-url'}
                            alt={item.user?.name}
                            style={{ width: '24px', height: '24px' }}
                          />
                          <span className='truncate text-[#1D1F2C] text-[14px]'>
                            {item.user?.name}
                          </span>
                        </div>
                      </td>
                    )}
                    {columns?.packageName && (
                      <td className='px-6 py-5' style={{ minWidth: '200px' }}>
                        <p className='truncate text-[#475467] text-[12px] capitalize'>
                          {item.booking_items?.[0]?.package?.name || 'N/A'}
                        </p>
                      </td>
                    )}
                    {columns?.date && (
                      <td className='px-6 py-5' style={{ textAlign: 'center' }}>
                        <p className='text-[#475467] text-[12px]'>
                          {/* {new Date(item.created_at).toLocaleDateString()} */}
                          {item.created_at}
                        </p>
                      </td>
                    )}
                    {columns?.status && (
                      <td className='px-6 py-5' style={{ textAlign: 'center' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            backgroundColor:
                              statusStyles[item.status?.charAt(0).toUpperCase() + item.status?.slice(1)]?.backgroundColor ||
                              'transparent',
                            color:
                              statusStyles[item.status?.charAt(0).toUpperCase() + item.status?.slice(1)]?.color || 'black',
                            padding: '1px 14px',
                            borderRadius: '50px',
                            fontSize: '12px',
                            fontWeight: '500',
                            border:
                              statusStyles[item.status?.charAt(0).toUpperCase() + item.status?.slice(1)]?.border || 'none',
                            height: '30px',
                          }}
                          className='w-full'
                        >
                          {statusStyles[item.status?.charAt(0).toUpperCase() + item.status?.slice(1)]?.icon}
                          <span>{item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}</span>
                        </span>
                      </td>
                    )}
                    {/* {selectedStatus === 'Booking_Requests' || selectedStatus === 'Pending' && ( */}
                    {(item.status === "requests" || item.status === "pending") && <td className='px-6 py-5' style={{ textAlign: 'center' }}>
                      <button
                        className='text-[#475467] hover:text-blue-700 transform duration-300'
                        onClick={() =>
                          navigate(
                            `/dashboard/booking-request/${item.id}`
                          )
                        }
                      >
                        <FaEye className='text-lg' />
                      </button>
                    </td>}
                    {/* )} */}
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan={columns ? Object.keys(columns).length + 1 : 1}
                  align='center'
                >
                  <p className='text-[#475467] font-medium py-6'>
                    No data found
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        <TablePagination handleChangePage={handleChangePage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} page={page} filteredData={filteredData} rowsPerPage={rowsPerPage} />
      </div>
    </div>
  )
}

export default BookingManagementTable
