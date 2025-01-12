import { FaEye, FaSearch } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
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
import { LuMailOpen, LuTrash2 } from 'react-icons/lu'
import { MdKeyboardArrowDown } from 'react-icons/md'

const VendorManagemnetTable = ({ tableType = '', title, data, columns }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(data)
  const navigate = useNavigate()
  const dropdownRef = useRef(null) // Reference for dropdown
  const [selectedStatus, setSelectedStatus] = useState('All Vendor')
  const [isOpen, setIsOpen] = useState(false)
  const statuses = [
    'All Vendor',
    'Requests',
    'Pending',
    'Confirmed',
    'Canceled'
  ]
  // Pagination states
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

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
              onChange={e => {
                setSearchQuery(e.target.value)
                setFilteredData(
                  data.filter(item =>
                    item.travelerName
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  )
                )
              }}
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
                        // onClick={() => handleStatusChange(status)}
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
                {columns?.name && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Vendor Name
                  </TableCell>
                )}
                {columns?.phone && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Phone Number
                  </TableCell>
                )}
                {columns?.address && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Address
                  </TableCell>
                )}
                {columns?.expert && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Expert
                  </TableCell>
                )}
                <TableCell
                  sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className='text-nowrap'>
              {filteredData.length > 0 ? (
                filteredData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map(item => (
                    <TableRow
                      className={`${
                        (tableType === 'user' || tableType === 'blog') &&
                        'cursor-pointer hover:bg-[#fdf0ea]'
                      }`}
                      key={item?.id}
                      onClick={() => handleRowClick(item.id)}
                    >
                      {columns?.name && (
                        <TableCell style={{ minWidth: '200px' }}>
                          <div className='flex items-center gap-3'>
                            <img
                              className='rounded-lg'
                              src={item.travelerImg}
                              alt={item.travelerName}
                              style={{ width: '44px', height: '44px' }}
                            />
                            <div>
                              <p className='truncate text-[#1D1F2C] text-[15px] font-medium'>
                                {item.travelerName}
                              </p>
                              <p className='truncate text-[#757D83] text-[14px] font-medium flex  items-center gap-2 mt-1'>
                                <LuMailOpen />
                                <span>{item.email}</span>
                              </p>
                            </div>
                          </div>
                        </TableCell>
                      )}
                      {columns?.phone && (
                        <TableCell>
                          <p className='truncate text-[#475467]'>
                            {item.phone}
                          </p>
                        </TableCell>
                      )}
                      {columns?.address && (
                        <TableCell>
                          <p className='truncate text-[#475467]'>
                            {item.address}
                          </p>
                        </TableCell>
                      )}
                      {columns?.expert && (
                        <TableCell>
                          <p>
                            <span className='bg-[#FDEFEA] truncate text-[#475467] px-4 py-2 rounded-lg'>
                              {item.expert}
                            </span>
                          </p>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className='flex gap-4'>
                          {/* Delete Button */}
                          <button className='text-[#475467] hover:text-red-600 transform duration-300'>
                            <LuTrash2 className='text-xl' />
                          </button>
                          {/* View Button */}
                          <button
                            onClick={() =>
                              navigate(
                                `/dashboard/vendor-details/${item.id}`
                              )
                            }
                            className='text-[#475467] hover:text-blue-700 transform duration-300'
                          >
                            <FaEye className='text-xl' />
                          </button>
                        </div>
                      </TableCell>
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

export default VendorManagemnetTable
