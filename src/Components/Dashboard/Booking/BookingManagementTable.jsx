import { FaCheckCircle, FaTimesCircle, FaSearch, FaEye } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import debounce from 'lodash/debounce'

const statusStyles = {
  Confirmed: {
    color: '#067647',
    backgroundColor: '#ECFDF3',
    border: '1px solid #ABEFC6',
    icon: <FaCheckCircle />
  },
  Pending: {
    color: '#0A3159',
    backgroundColor: '#E7ECF2',
    border: '1px solid #90A9C3',
    icon: <GoDotFill className='text-lg' />
  },
  Canceled: {
    color: '#B42318',
    backgroundColor: '#FEF3F2',
    border: '1px solid #FECDCA',
    icon: <FaTimesCircle />
  },
  Requests: {
    color: '#067647',
    backgroundColor: '#ECFDF3',
    border: '1px solid #ABEFC6',
    icon: <GoDotFill className='text-lg' />
  }
}

const BookingManagementTable = ({ tableType = '', title, data, columns }) => {
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState()
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [isOpen, setIsOpen] = useState(false)
  const statuses = [
    'All Status',
    'Requests',
    'Pending',
    'Confirmed',
    'Canceled'
  ]
  const navigate = useNavigate()

  const dropdownRef = useRef(null) // Reference for dropdown

  // Pagination states
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

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
  }, [data])

  useEffect(() => {
    debouncedSearch(searchQuery, selectedStatus, data);
  }, [searchQuery, selectedStatus, data, debouncedSearch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
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
              className='py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%]'
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
                        className={`w-full px-5 py-5 text-left text-sm hover:bg-gray-200 ${
                          selectedStatus === status
                            ? 'bg-gray-100 font-semibold'
                            : ''
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Paper style={{ borderRadius: '10px' }}>
        <TableContainer sx={{ padding: '16px' }}>
          <Table sx={{ border: '1px solid #e0e0e0' }}>
            <TableHead>
              <TableRow>
                {columns?.bookingId && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Booking Id
                  </TableCell>
                )}
                {columns?.name && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Travelers Name
                  </TableCell>
                )}
                {columns?.packageName && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Package Name
                  </TableCell>
                )}
                {columns?.date && (
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    Date
                  </TableCell>
                )}
                {columns?.status && (
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    Status
                  </TableCell>
                )}
                {/* {selectedStatus === 'Requests' || selectedStatus === 'Pending' && ( */}
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    Action
                  </TableCell>
                {/* )} */}
              </TableRow>
            </TableHead>

            <TableBody className='text-nowrap'>
              {filteredData?.length > 0 ? (
                filteredData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map(item => (
                    <TableRow key={item?.id} onClick={() => handleRowClick(item.id)}>
                      {columns?.bookingId && (
                        <TableCell>
                          <p className='text-[#475467] text-[12px]'>
                            #{item?.invoice_number}
                          </p>
                        </TableCell>
                      )}
                      {columns?.name && (
                        <TableCell style={{ minWidth: '200px' }}>
                          <div className='flex items-center gap-3'>
                            <img
                              className='rounded-full'
                              src={item.user?.image || 'default-image-url'}
                              alt={item.user?.name}
                              style={{ width: '40px', height: '40px' }}
                            />
                            <span className='truncate text-[#1D1F2C] text-[15px] font-medium'>
                              {item.user?.name}
                            </span>
                          </div>
                        </TableCell>
                      )}
                      {columns?.packageName && (
                        <TableCell style={{ minWidth: '200px' }}>
                          <p className='truncate text-[#475467]'>
                            {item.booking_items?.[0]?.package?.name || 'N/A'}
                          </p>
                        </TableCell>
                      )}
                      {columns?.date && (
                        <TableCell style={{ textAlign: 'center' }}>
                          <p className='text-[#475467]'>
                            {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </TableCell>
                      )}
                      {columns?.status && (
                        <TableCell style={{ textAlign: 'center' }}>
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
                              fontWeight: 'bold',
                              border:
                                statusStyles[item.status?.charAt(0).toUpperCase() + item.status?.slice(1)]?.border || 'none',
                              height: '32px'
                            }}
                          >
                            {statusStyles[item.status?.charAt(0).toUpperCase() + item.status?.slice(1)]?.icon}
                            <span>{item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}</span>
                          </span>
                        </TableCell>
                      )}
                      {/* {selectedStatus === 'Requests' || selectedStatus === 'Pending' && ( */}
                        <TableCell style={{ textAlign: 'center' }}>
                          <button
                            className='text-[#475467] hover:text-blue-700 transform duration-300'
                            onClick={() =>
                              navigate(
                                `/dashboard/booking-request/${item.id}`
                              )
                            }
                          >
                            <FaEye className='text-xl' />
                          </button>
                        </TableCell>
                      {/* )} */}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns ? Object.keys(columns).length + 1 : 1}
                    align='center'
                  >
                    <p className='text-[#475467] font-medium py-6'>
                      No data found
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default BookingManagementTable
