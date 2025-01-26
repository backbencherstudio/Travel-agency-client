import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import React, { useState } from 'react'
import { FaEye, FaSearch } from 'react-icons/fa'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

const BookingHistory = ({ title, data = [], columns = {}, handleSearch }) => {
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [page, setPage] = useState(0)
  
    const handleChangePage = (event, newPage) => setPage(newPage)
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    }
  
    const handleSearchInput = (event) => {
      handleSearch(event.target.value) // Trigger search handler
    }
  
    return (
      <div className='mx-auto max-w-[1216px] px-4 xl:px-0 py-10'>
        {/* Title and Search */}
        <div className='flex gap-2 items-center justify-between pb-10'>
          <h1 className='text-[#0D0E0D] capitalize text-[20px]'>{title}</h1>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search...'
              className='py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%]'
              onChange={handleSearchInput} // Call the handler on input change
            />
            <FaSearch className='absolute top-3 left-3 text-zinc-400' />
          </div>
        </div>
  
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.invoice_number && (
                    <TableCell
                      sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                    >
                      Invoice Number
                    </TableCell>
                  )}
                  {columns.package_name && (
                    <TableCell
                      sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                    >
                      Package Name
                    </TableCell>
                  )}
                  {columns.total_amount && (
                    <TableCell
                      sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                    >
                      Total Amount
                    </TableCell>
                  )}
                  {columns.payment_status && (
                    <TableCell
                      sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                    >
                      Payment Status
                    </TableCell>
                  )}
                  {columns.date && (
                    <TableCell
                      sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                    >
                      Date
                    </TableCell>
                  )}
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 ? (
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => (
                      <TableRow key={item.id}>
                        {columns.invoice_number && (
                          <TableCell>
                            <span className='truncate text-[#1D1F2C] text-[14px] font-medium'>
                              #{item.invoice_number}
                            </span>
                          </TableCell>
                        )}
                        {columns.package_name && (
                          <TableCell>
                            <p className='truncate text-[#475467]'>
                              {item.package_name}
                            </p>
                          </TableCell>
                        )}
                        {columns.total_amount && (
                          <TableCell>
                            <p className='truncate text-[#475467]'>
                              ${item.total_amount}
                            </p>
                          </TableCell>
                        )}
                        {columns.payment_status && (
                          <TableCell>
                            <p className='truncate text-[#475467]'>
                              <span
                                className={`px-2 py-1 rounded-md ${
                                  item.payment_status === 'successed'
                                    ? 'bg-red-100 text-red-800 py-1 px-2'
                                    : 'bg-green-100 text-green-800'
                                }`}
                              >
                                {item.payment_status}
                              </span>
                            </p>
                          </TableCell>
                        )}
                        {columns.date && (
                          <TableCell>
                            <p className='truncate text-[#475467]'>
                              {item.created_at}
                            </p>
                          </TableCell>
                        )}
                        <TableCell>
                          <div className='flex items-center justify-center gap-4'>
                            <button className='text-[#475467] hover:text-blue-700 transform duration-300'>
                              <FaEye className='text-xl' />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={Object.keys(columns).length + 1}
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
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    )
  }
  
  export default BookingHistory
  


