import { FaEye, FaSearch } from 'react-icons/fa'
import { useEffect, useRef, useState, useCallback } from 'react'
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
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LuMailOpen, LuTrash2 } from 'react-icons/lu'
import { MdKeyboardArrowDown } from 'react-icons/md'
import debounce from 'lodash/debounce'
import { BsThreeDots } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { deleteUser, approveUser, rejectUser } from '../../../Apis/GetUserApis'
import { RxCross2 } from 'react-icons/rx'
import DropdownPortal from '../../../Shared/DropdownPortal'

const VendorManagemnetTable = ({ tableType = '', title, data, columns }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(data)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get('status') || 'All Vendor'
  )
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenAction, setIsOpenAction] = useState(null)
  const statuses = ['All Vendor', 'Approved', 'Rejected']
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const actionRefs = useRef(new Map())
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })

  // Debounced filter function
  const debouncedFilter = useCallback(
    debounce((query, status, data) => {
      let filtered = data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )

      // Filter by status
      if (status !== 'All Vendor') {
        filtered = filtered.filter(item => {
          if (status === 'Approved') return item.approved_at !== null
          if (status === 'Rejected') return item.approved_at === null
          return true
        })
      }

      setFilteredData(filtered)

      // Update URL with search query and status
      const params = new URLSearchParams(window.location.search)
      if (query) params.set('search', query)
      else params.delete('search')
      if (status !== 'All Vendor') params.set('status', status)
      else params.delete('status')

      const newUrl = `${window.location.pathname}?${params.toString()}`
      window.history.pushState({}, '', newUrl)
    }, 500),
    []
  )

  useEffect(() => {
    debouncedFilter(searchQuery, selectedStatus, data)
    return () => {
      debouncedFilter.cancel()
    }
  }, [searchQuery, selectedStatus, data, debouncedFilter])

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

      if (isOpenAction !== null) {
        const actionRef = actionRefs.current.get(isOpenAction)
        if (actionRef && !actionRef.contains(event.target)) {
          setIsOpenAction(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpenAction])

  // Delete User Function
  const handleDeleteUser = async id => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      try {
        await deleteUser(id)
        Swal.fire('Deleted!', 'The user has been deleted.', 'success')
        setFilteredData(prevData => prevData.filter(item => item.id !== id))
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete the user.', 'error')
      }
    }
  }

  // Approve User Function
  const handleApproveUser = async id => {
    try {
      await approveUser(id)
      Swal.fire('Success!', 'User has been approved.', 'success')
      setFilteredData(prevData =>
        prevData.map(item =>
          item.id === id
            ? { ...item, approved_at: new Date().toISOString() }
            : item
        )
      )
    } catch (error) {
      Swal.fire('Error!', 'Failed to approve user.', 'error')
    }
  }

  // Reject User Function
  const handleRejectUser = async id => {
    try {
      await rejectUser(id)
      Swal.fire('Success!', 'User has been rejected.', 'success')
      setFilteredData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, approved_at: null } : item
        )
      )
    } catch (error) {
      Swal.fire('Error!', 'Failed to reject user.', 'error')
    }
  }

  // drop down
  const handleThreeDotsClick = (e, id) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    })
    setIsOpenAction(isOpenAction === id ? null : id)
  }

  const handleStatusChange = status => {
    setSelectedStatus(status)
    setSearchParams({ status })
    setIsOpen(false)
  }

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
                {columns?.name && (
                  <TableCell
                    sx={{
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600,
                      width: '25%'
                    }}
                  >
                    Vendor Name
                  </TableCell>
                )}
                {columns?.phone && (
                  <TableCell
                    sx={{
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600,
                      width: '25%'
                    }}
                  >
                    Phone Number
                  </TableCell>
                )}
                {columns?.address && (
                  <TableCell
                    sx={{
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600,
                      width: '25%'
                    }}
                  >
                    Address
                  </TableCell>
                )}
                {columns?.status && (
                  <TableCell
                    sx={{
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600,
                      width: '25%'
                    }}
                  >
                    Status
                  </TableCell>
                )}
                {columns?.type && (
                  <TableCell
                    sx={{
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600,
                      width: '25%'
                    }}
                  >
                    Type
                  </TableCell>
                )}

                <TableCell
                  sx={{
                    color: '#475467',
                    fontSize: '13px',
                    fontWeight: 600,
                    width: '120px'
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className='text-nowrap'>
              {filteredData?.length > 0 ? (
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
                        <TableCell style={{ width: '25%' }}>
                          <div
                            onClick={() =>
                              navigate(`/dashboard/vendor-details/${item.id}`)
                            }
                            className='flex items-center gap-3 cursor-pointer '
                          >
                            {item.name.startsWith('http') ? (
                              <img
                                className='rounded-lg'
                                src={item.name}
                                alt={item.name}
                                style={{ width: '44px', height: '44px' }}
                              />
                            ) : (
                              <div className='w-[44px] h-[44px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-md'>
                                <span className='text-white text-xl font-semibold '>
                                  {item.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div>
                              <p className='truncate text-[#1D1F2C] text-[15px] font-medium hover:text-blue-600 transform duration-300'>
                                {item.name}
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
                        <TableCell style={{ width: '25%' }}>
                          <p className='truncate text-[#475467]'>
                            {item.phone_number
                              ? item.phone_number
                              : 'Not Available'}
                          </p>
                        </TableCell>
                      )}
                      {columns?.address && (
                        <TableCell style={{ width: '25%' }}>
                          <p className='truncate text-[#475467]'>
                            {item.address ? item.address : 'Not Available'}
                          </p>
                        </TableCell>
                      )}
                      {columns?.status && (
                        <TableCell style={{ width: '25%' }}>
                          <p
                            className={`truncate px-2 py-1 rounded-full text-center w-24 ${
                              item.approved_at === null
                                ? 'border bg-[#FEF3F2] border-[#bb233ab5] text-red-600'
                                : 'bg-[#ECFDF3] border-green-500 text-green-600 border'
                            }`}
                          >
                            {item.approved_at === null
                              ? 'Rejected'
                              : 'Approved'}
                          </p>
                        </TableCell>
                      )}

                      <TableCell style={{ width: '120px' }}>
                        <div className='flex gap-4'>
                          {' '}
                          {/* View Button */}
                          <div className='relative flex justify-center'>
                            <button
                              onClick={e => handleThreeDotsClick(e, item.id)}
                              className='text-blue-600 transition-all duration-500 ease-in-out'
                            >
                              {isOpenAction === item.id ? (
                                <RxCross2 className='text-xl' />
                              ) : (
                                <BsThreeDots className='text-xl' />
                              )}
                            </button>

                            {isOpenAction === item.id && (
                              <DropdownPortal
                                isOpen={isOpenAction === item.id}
                                position={dropdownPosition}
                              >
                                <div
                                  ref={ref =>
                                    actionRefs.current.set(item.id, ref)
                                  }
                                  className='absolute bg-white py-5 px-4 flex flex-col  -right-20 top-5 space-y-1 rounded-2xl shadow-2xl popup w-60 z-50'
                                >
                                  <button
                                    className={`flex item-center gap-3 py-2 px-4  rounded-md text-base ${
                                      item.approved_at !== null
                                        ? 'bg-green-600 text-white cursor-default text-sm'
                                        : 'hover:bg-green-600 text-zinc-600 text-sm hover:text-white duration-300'
                                    }`}
                                    disabled={item.approved_at !== null}
                                    onClick={() => handleApproveUser(item.id)}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    className={`flex item-center gap-3 py-2 px-4 rounded-md text-base ${
                                      item.approved_at === null
                                        ? 'bg-red-600 text-white cursor-default text-sm'
                                        : 'hover:bg-red-600 text-zinc-600 text-sm hover:text-white duration-300'
                                    }`}
                                    disabled={item.approved_at === null}
                                    onClick={() => handleRejectUser(item.id)}
                                  >
                                    Reject
                                  </button>
                                </div>
                              </DropdownPortal>
                            )}
                          </div>
                          <button
                            onClick={() =>
                              navigate(`/dashboard/vendor-details/${item.id}`)
                            }
                            className='text-[#475467] hover:text-blue-700 transform duration-300'
                          >
                            <FaEye className='text-lg' />
                          </button>
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteUser(item.id)}
                           className='text-red-600 hover:text-red-700 transform duration-300'
                          >
                            <LuTrash2 className='text-lg' />
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
          count={filteredData?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} of ${count}`
          }
        />
      </Paper>
    </div>
  )
}

export default VendorManagemnetTable
