import { FaEye, FaSearch } from 'react-icons/fa'
import { useEffect, useRef, useState, useCallback } from 'react'
import TablePagination from '../../../Shared/TablePagination'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // TablePagination
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
  const statuses = ['All Vendor', 'Vendor Requests', 'Previously Removed']
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)
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
          if (status === 'Vendor Requests') return item.approved_at !== null
          if (status === 'Previously Removed') return item.approved_at === null
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
  
  console.log("Vendors data : ",filteredData)

  return (
    <div>
      <div className='flex flex-col md:flex-row justify-between items-center mb-7'>
        <h1 className='font-semibold text-[#080613] text-[24px]'>{title}</h1>
        <div className='flex flex-col md:flex-row gap-3 pt-4 rounded-t-xl'>
          <div className='relative md:col-span-1'>
            <input
              type='text'
              placeholder='Search anything'
              className='py-1.5 pl-10 placeholder:text-sm rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%]'
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
                <div className='absolute mt-3 w-56 lg:w-72 rounded-2xl bg-white border border-gray-200 shadow-lg z-10 right-0'>
                  <div className='absolute top-[-10px] right-10 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45'></div>

                  <div className='bg-white rounded-md p-4 space-y-1'>
                    {statuses.map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`w-full px-2 py-4 text-left text-sm hover:bg-[#EB5B2A] hover:text-white rounded-md duration-300 ${selectedStatus === status
                          ? 'bg-[#EB5B2A] font-semibold text-white'
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


      <div className='bg-white rounded-lg p-4 space-y-4 w-full overflow-x-auto'>
        <table className='table-auto w-full'>
          <thead>
            <tr className='text-[#475467] text-[12px] bg-[#F9FAFB]'>
              {columns?.name && (
                <td className='px-4 text-nowrap py-3 rounded-md'>
                  Vendor Name
                </td>
              )}
              {columns?.phone && (
                <td className='px-4 text-nowrap'>
                  Phone Number
                </td>
              )}
              {columns?.address && (
                <td className='px-4 text-nowrap'>
                  Address
                </td>
              )}
              {columns?.status && (
                <td className='text-center px-4 text-nowrap'>
                  Expert
                </td>
              )}
              {/* {columns?.status && (
                <td>
                  Status
                </td>
              )} */}
              {columns?.type && (
                <td className='px-4 text-nowrap'>
                  Type
                </td>
              )}

              <td className='px-4 text-nowrap text-center'>
                Action
              </td>
            </tr>
          </thead>

          <tbody className='text-nowrap'>
            {filteredData?.length > 0 ? (
              filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map(item => (
                  <tr
                    className={`text-[#1D1F2C] border-b border-[#EDEDED] ${(tableType === 'user' || tableType === 'blog') &&
                      'cursor-pointer hover:bg-[#fdf0ea]'
                      }`}
                    key={item?.id}
                    onClick={() => handleRowClick(item.id)}
                  >
                    {columns?.name && (
                      <td className='px-4 py-3'>
                        <div
                          onClick={() =>
                            navigate(`/dashboard/vendor-details/${item.id}`)
                          }
                          className='flex items-center gap-3 cursor-pointer '
                        >
                          {item.name.startsWith('http') ? (
                            <img
                              className=''
                              src={item.name}
                              alt={item.name}
                              style={{ width: '48px', height: '48px' }}
                            />
                          ) : (
                            <div className='w-[48px] h-[48px] rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-md'>
                              <span className='text-white text-xl font-semibold '>
                                {item.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className='truncate text-[#1D1F2C] text-[14px]'>
                              {item.name}
                            </p>
                            <p className='truncate text-[#757D83] text-[10px] font-medium flex  items-center gap-1 mt-1'>
                              <LuMailOpen />
                              <span>{item.email}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                    )}
                    {columns?.phone && (
                      <td className='px-4 text-[12px]'>
                        <p className='truncate text-[#475467]'>
                          {item.phone_number
                            ? item.phone_number
                            : 'Not Available'}
                        </p>
                      </td>
                    )}
                    {columns?.address && (
                      <td className='px-4 text-[12px]'>
                        <p className='truncate text-[#475467]'>
                          {item.address ? item.address : 'Not Available'}
                        </p>
                      </td>
                    )}
                    {columns?.status && (
                      <td className='px-4'>
                        <p
                          className={`px-2 py-1 text-[12px] rounded-full text-center ${item.approved_at === null
                            ? 'bg-[#FEF3F2]'
                            : 'bg-[#FDEFEA]'
                            }`}
                        >
                          {item.approved_at === null
                            ? 'No Expertise'
                            : 'Venice Tour Guide'}
                        </p>
                      </td>
                    )}

                    <td className='px-4'>
                      <div className='flex gap-4'>
                        {' '}
                        {/* View Button */}
                        {/* <div className='relative flex justify-center'>
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
                                  className={`flex item-center gap-3 py-2 px-4  rounded-md text-base ${item.approved_at !== null
                                    ? 'bg-green-600 text-white cursor-default text-sm'
                                    : 'hover:bg-green-600 text-zinc-600 text-sm hover:text-white duration-300'
                                    }`}
                                  disabled={item.approved_at !== null}
                                  onClick={() => handleApproveUser(item.id)}
                                >
                                  Approve
                                </button>
                                <button
                                  className={`flex item-center gap-3 py-2 px-4 rounded-md text-base ${item.approved_at === null
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
                        </div> */}
                        <button
                          onClick={() =>
                            navigate(`/dashboard/vendor-details/${item.id}`)
                          }
                          className='text-[#475467] hover:text-blue-400 transform duration-300'
                        >
                          <FaEye className='text-lg' />
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteUser(item.id)}
                          className='text-[#333E47] hover:text-red-700 transform duration-300'
                        >
                          <LuTrash2 className='text-lg' />
                        </button>
                      </div>
                    </td>
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
        <TablePagination handleChangePage={handleChangePage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} page={page} filteredData={filteredData} rowsPerPage={rowsPerPage} />
      </div>

      {/* <TablePagination
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
        /> */}

    </div>
  )
}

export default VendorManagemnetTable
