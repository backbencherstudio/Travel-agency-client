import * as React from 'react'
import { FaSearch, FaEye } from 'react-icons/fa'
import { useState, useEffect, useRef, useCallback } from 'react'
import img1 from '../../../assets/img/tour-details/image-5.png'
import TablePagination from '../../../Shared/TablePagination'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination
// } from '@mui/material'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { LuTrash2 } from 'react-icons/lu'
import TransactionApis from '../../../Apis/TransectionApis'
import { Modal, Box, Typography, Fade, Backdrop, Button } from '@mui/material'
import { Receipt, Package, User, Calendar, CreditCard } from 'lucide-react'
import { format } from 'date-fns'
import debounce from 'lodash/debounce'

const BookingTable = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [transactions, setTransactions] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const statusOptions = ['All Status', 'succeeded', 'pending']

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await TransactionApis.getAllTransactions()
      if (response.success && response.data?.data) {
        setTransactions(response.data.data)
        setFilteredData(response.data.data)
      } else {
        setTransactions([])
        setFilteredData([])
        console.error('Invalid data format received:', response)
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
      setTransactions([])
      setFilteredData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()

    // Get initial search query and status from URL
    const params = new URLSearchParams(window.location.search)
    const searchParam = params.get('search')
    const statusParam = params.get('status')
    if (searchParam) setSearchQuery(searchParam)
    if (statusParam) setSelectedStatus(statusParam)
  }, [])

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query, status) => {
      if (!transactions.length) return

      let filtered = transactions

      // Filter by search query
      if (query) {
        filtered = filtered.filter(item => {
          const userName = item?.booking?.user?.name?.toLowerCase() || ''
          const invoiceNumber =
            item?.booking?.invoice_number?.toLowerCase() || ''
          const searchTerm = query.toLowerCase()

          return (
            userName.includes(searchTerm) || invoiceNumber.includes(searchTerm)
          )
        })
      }

      // Filter by status
      if (status !== 'All Status') {
        filtered = filtered.filter(
          item => item.status?.toLowerCase() === status.toLowerCase()
        )
      }

      setFilteredData(filtered)

      // Update URL with search query and status
      const params = new URLSearchParams(window.location.search)
      if (query) params.set('search', query)
      else params.delete('search')
      if (status !== 'All Status') params.set('status', status)
      else params.delete('status')

      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.pushState({}, '', newUrl)
    }, 500),
    [transactions]
  )

  useEffect(() => {
    debouncedSearch(searchQuery, selectedStatus)
  }, [searchQuery, selectedStatus, debouncedSearch])

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

  const handleStatusChange = status => {
    setSelectedStatus(status)
    setIsOpen(false)
  }

  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [open, setOpen] = useState(false)

  const handleOpen = transaction => {
    setSelectedTransaction(transaction)
    setOpen(true)
  }

  const handleClose = () => {
    setSelectedTransaction(null)
    setOpen(false)
  }

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const response = await TransactionApis.deleteTransaction(id)
          if (response.data.success) {
            fetchTransactions()
          } else {
            console.error('Failed to delete the transaction')
          }
        } catch (error) {
          console.error('Error while deleting:', error)
        }
      }
    })
  }

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency?.toUpperCase() || 'USD'
    }).format(amount)
  }

  const formatDate = dateString => {
    return format(new Date(dateString), 'MMM dd, yyyy')
  }


  console.log(filteredData)

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between items-center  py-5'>
        <h1 className='text-[#0D0E0D] text-[20px] font-semibold'>{title}</h1>
        <div className='flex flex-col items-center sm:flex-row gap-3 my-2 rounded-t-xl'>
          <div className='relative md:col-span-1'>
            <input
              type='text'
              placeholder='Search by Traveler Name'
              className='py-1.5 pl-10 rounded-md placeholder:text-sm focus:outline-none focus:border-orange-400 w-full lg:w-[100%]'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <svg className='absolute top-3 left-3 text-zinc-400' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 2.5C4.62665 2.5 2.5 4.62665 2.5 7.25C2.5 9.87335 4.62665 12 7.25 12C9.87335 12 12 9.87335 12 7.25C12 4.62665 9.87335 2.5 7.25 2.5ZM1.5 7.25C1.5 4.07436 4.07436 1.5 7.25 1.5C10.4256 1.5 13 4.07436 13 7.25C13 10.4256 10.4256 13 7.25 13C4.07436 13 1.5 10.4256 1.5 7.25Z" fill="#757D83" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6089 10.6089C10.8042 10.4137 11.1208 10.4137 11.3161 10.6089L14.3536 13.6464C14.5488 13.8417 14.5488 14.1583 14.3536 14.3536C14.1583 14.5488 13.8417 14.5488 13.6464 14.3536L10.6089 11.3161C10.4137 11.1208 10.4137 10.8042 10.6089 10.6089Z" fill="#757D83" />
            </svg>
          </div>
          <div className='flex justify-center' ref={dropdownRef}>
            <div className='relative inline-block text-left'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='inline-flex items-center gap-2 justify-between w-full px-4 py-2 text-sm font-medium text-white bg-[#EB5B2A] rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200 capitalize'
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
                    {statusOptions.map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className='block w-full px-4 py-2 text-left hover:bg-gray-100 capitalize'
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
      <div className='bg-white p-4 rounded-lg space-y-4'>
        <div className='w-full overflow-x-auto'>
          <table className="w-full table-auto min-w-[768px]">
            <thead>
              <tr className='text-[#475467] text-[12px] bg-[#F9FAFB]'>
                <th className='font-medium p-6 rounded-lg'>

                  <div className='flex items-center gap-1'>
                    <span>Booking ID</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                    </svg>
                  </div>
                </th>
                <th className='font-medium p-6'>
                  <div className='flex items-center gap-1'>
                    <span>Traveler's Name</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                    </svg>
                  </div>
                </th>
                <th className='font-medium p-6'>
                  <div className='flex items-center gap-1'>
                    <span>Amount</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                    </svg>
                  </div>
                </th>
                <th className='font-medium p-6'>
                  <div className='flex items-center gap-1'>
                    <span>Date</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                    </svg>
                  </div>
                </th>
                {/* <th className='font-medium p-6'>
                <div className='flex items-center gap-1'>
                  <span>Status</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                  </svg>
                </div>
              </th> */}
                <th className='font-medium p-6 rounded-lg'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='text-nowrap text-[12px]'>
              {loading ? (
                <tr>
                  <td>
                    <p className='text-[#475467] font-medium py-6'>
                      Loading...
                    </p>
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(item => (
                    <tr key={item.id}>
                      <td className='p-6'>
                        <p className='text-[#475467] text-[12px]'>
                          #{item?.booking?.invoice_number}
                        </p>
                      </td>
                      <td className='p-6'>
                        <div className='flex items-center gap-2'>
                          <img
                            className='rounded-full'
                            src={item?.avatar || img1}
                            alt={item?.booking?.user?.name}
                            style={{ width: '24px', height: '24px' }}
                          />
                          <span className='truncate text-[#1D1F2C] text-[14px]'>
                            {item?.booking?.user?.name || "Miraz Hossain"}
                          </span>
                        </div>
                      </td>
                      <td className='p-6'>
                        <p className='truncate text-[#475467]'>
                          ${item?.paid_amount || 0}
                        </p>
                      </td>
                      <td className='p-6'>
                        <span
                          className={`py-1 rounded-full text-[#475467]`}
                        >
                          {new Date(item.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </td>
                      {/* <td className='p-6'>
                      <span
                        className={`px-3 py-1 rounded-full ${item.status === 'succeeded'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}
                      >
                        {item.status}
                      </span>
                    </td> */}
                      <td className='p-6'>
                        <div className='flex items-center justify-center gap-4'>
                          <button
                            className='text-[#475467] hover:text-blue-700 transform duration-300'
                            onClick={() => handleOpen(item)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                              <path d="M17.7808 8.20831C18.7471 9.22504 18.7471 10.7698 17.7808 11.7865C16.151 13.5013 13.3518 15.8307 10.1722 15.8307C6.9926 15.8307 4.19344 13.5013 2.56362 11.7865C1.59728 10.7698 1.59728 9.22504 2.56362 8.20831C4.19344 6.49351 6.9926 4.16406 10.1722 4.16406C13.3518 4.16406 16.151 6.49351 17.7808 8.20831Z" stroke="#475467" stroke-width="1.5" />
                              <path d="M12.6722 9.9974C12.6722 11.3781 11.5529 12.4974 10.1722 12.4974C8.79149 12.4974 7.6722 11.3781 7.6722 9.9974C7.6722 8.61668 8.79149 7.4974 10.1722 7.4974C11.5529 7.4974 12.6722 8.61668 12.6722 9.9974Z" stroke="#475467" stroke-width="1.5" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className='text-[#475467] hover:text-red-700 transform duration-300'
                          >
                            <LuTrash2 className='text-lg' />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={5} align='center'>
                    <p className='text-[#475467] font-medium py-6'>
                      No transactions found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <TablePagination handleChangePage={handleChangePage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} page={page} filteredData={filteredData} rowsPerPage={rowsPerPage} />
      </div>
      {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.45)'
            }
          }
        }}
      >
        <Fade in={open}>
          <Box className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='bg-[#EB5B2A] p-6 text-white'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2'>
                  <Receipt className='h-6 w-6' />
                  <span className='text-lg font-semibold'>
                    Invoice #{selectedTransaction?.booking?.invoice_number}
                  </span>
                </div>
                <span className='px-3 py-1 bg-[#d44718] rounded-full text-sm font-medium capitalize'>
                  {selectedTransaction?.status}
                </span>
              </div>
            </div>
            <div className='p-6 space-y-6'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-black'>
                  {formatCurrency(
                    selectedTransaction?.amount,
                    selectedTransaction?.currency
                  )}
                </div>
                <div className='text-sm text-gray-600 mt-1'>Total Amount</div>
              </div>
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <Package className='h-5 w-5 text-[#EB5B2A]' />
                  <div>
                    <div className='text-sm text-gray-600'>Package</div>
                    <div className='text-black font-medium'>
                      {
                        selectedTransaction?.booking?.booking_items[0]?.package
                          ?.name
                      }
                    </div>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <User className='h-5 w-5 text-[#EB5B2A]' />
                  <div>
                    <div className='text-sm text-gray-600'>Client</div>
                    <div className='text-black font-medium'>
                      {selectedTransaction?.booking?.user?.name}
                    </div>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <Calendar className='h-5 w-5 text-[#EB5B2A]' />
                  <div>
                    <div className='text-sm text-gray-600'>Date Issued</div>
                    <div className='text-black font-medium'>
                      {selectedTransaction?.created_at &&
                        formatDate(selectedTransaction.created_at)}
                    </div>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <CreditCard className='h-5 w-5 text-[#EB5B2A]' />
                  <div>
                    <div className='text-sm text-gray-600'>Reference</div>
                    <div className='text-black font-medium font-mono text-sm'>
                      {selectedTransaction?.reference_number}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='border-t border-gray-100 p-6 bg-gray-50'>
              <div className='flex justify-between items-center text-sm'>
                <span className='text-gray-600'>Payment Status</span>
                <span className='text-[#EB5B2A] font-medium capitalize'>
                  {selectedTransaction?.status}
                </span>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default BookingTable
