import {  FaSearch, FaEye } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
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
import { LuTrash2 } from 'react-icons/lu'

const BookingTable = ({ tableType = '', title, data, columns }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(data)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

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
    <>
      <div className='flex flex-col sm:flex-row justify-between items-center  py-5'>
        <h1 className='text-[#0D0E0D] text-[20px]'>{title}</h1>
        <div className='flex flex-col items-center sm:flex-row gap-3 my-2 rounded-t-xl'>
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

          <div className='flex justify-center' ref={dropdownRef}>
            <div className='relative inline-block text-left'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='inline-flex items-center gap-2 justify-between w-full px-4 py-2 text-sm font-medium text-white bg-[#EB5B2A] rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200'
              >
                {'All Status'}
                <span>
                  <MdKeyboardArrowDown className='text-xl' />
                </span>
              </button>

              {isOpen && (
                <div className='absolute mt-5 w-56 lg:w-72 py-5 rounded-2xl bg-white border border-gray-200 shadow-lg z-10 right-0'>
                  <div className='absolute top-[-10px] right-10 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45'></div>

                  <div className='bg-white rounded-md'>
                    {/* Status Dropdown has been removed */}
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
                    Traveler's Name
                  </TableCell>
                )}
                {columns?.amount && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Amount
                  </TableCell>
                )}
                {columns?.date && (
                  <TableCell
                    sx={{
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    Date
                  </TableCell>
                )}
                {/* Removed the Status column */}
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
              </TableRow>
            </TableHead>

            <TableBody className='text-nowrap'>
              {filteredData?.filter(item =>
                item.customerName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ).length > 0 ? (
                filteredData
                  ?.filter(item =>
                    item.customerName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map(item => (
                    <TableRow
                      key={item?.bookingId}
                      onClick={() => handleRowClick(item.id)}
                    >
                      {columns?.bookingId && (
                        <TableCell>
                          <p className='text-[#475467] text-[12px]'>
                            #{item.bookingId}
                          </p>
                        </TableCell>
                      )}
                      {columns?.name && (
                        <TableCell style={{ minWidth: '200px' }}>
                          <div className='flex items-center gap-3'>
                            <img
                              className='rounded-full'
                              src={item.customerImg}
                              alt={item.customerName}
                              style={{ width: '40px', height: '40px' }}
                            />
                            <span className='truncate text-[#1D1F2C] text-[15px] font-medium'>
                              {item.customerName}
                            </span>
                          </div>
                        </TableCell>
                      )}
                      {columns?.amount && (
                        <TableCell style={{ minWidth: '200px' }}>
                          <p className='truncate text-[#475467]'>
                            {item.amount}
                          </p>
                        </TableCell>
                      )}
                      {columns?.date && (
                        <TableCell >
                          <p className='text-[#475467]'>{item.date}</p>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className='flex items-center justify-center gap-4'>
                          {/* Delete Button */}
                          <button className='text-[#475467] hover:text-red-600 transform duration-300'>
                            <LuTrash2 className='text-xl' />
                          </button>
                          {/* View Button */}
                          <button
                            // onClick={() =>
                            //   navigate(
                            //     `/dashboard/booking-request/${item.bookingId}` // This can still be useful
                            //   )
                            // }
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
    </>
  )
}

export default BookingTable
