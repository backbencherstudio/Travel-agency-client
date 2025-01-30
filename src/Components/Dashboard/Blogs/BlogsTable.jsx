import { FaSearch, FaCheckCircle, FaEdit } from 'react-icons/fa'
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
import { useNavigate, useLocation } from 'react-router-dom'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { LuTrash2 } from 'react-icons/lu'
import { FaRegSquarePlus } from 'react-icons/fa6'
import BlogApis from '../../../Apis/BlogApi'
import Swal from 'sweetalert2'
import useDebounce from '../../../Shared/debounce'
import { BsThreeDots } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import DropdownPortal from '../../../Shared/DropdownPortal'

const BlogsTable = ({ tableType = '', title, data, columns }) => {
  const [searchQuery, setSearchQuery] = useState('')
  // const [filteredData, setFilteredData] = useState(data)
  const [filteredData, setFilteredData] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('All Status')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dropdownRef = useRef(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isOpenAction, setIsOpenAction] = useState(null)
  const actionRefs = useRef(new Map())
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })

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

  const handleClickOutside = event => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !Array.from(actionRefs.current.values()).some(ref =>
        ref?.contains(event.target)
      )
    ) {
      setIsOpenAction(null)
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const searchFromQuery = queryParams.get('search') || ''
    const statusFromQuery = queryParams.get('status') || 'All Status'
    // setSearchQuery(searchFromQuery)
    // setSelectedStatus(statusFromQuery)
    fetchSearchResults(searchFromQuery, statusFromQuery)

    // Close dropdown when clicking outside
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Debounced function
  const fetchSearchResults = async (query = '', status = 'All Status') => {
    setIsLoading(true)

    try {
      let apiStatus = ''
      if (status === 'Active') apiStatus = '1'
      if (status === 'Deactivated') apiStatus = '0'

      const response = await BlogApis.searchBlogs(query, apiStatus)
      if (!response.errors && Array.isArray(response.data)) {
        setFilteredData(response.data)
      } else {
        setFilteredData([]) // Set to empty array to prevent undefined error
      }
    } catch (error) {
      console.error('Search error:', error)
      setFilteredData([]) // Prevents crashes due to undefined data
    } finally {
      setIsLoading(false)
    }
  }

  // Apply the debounce hook
  // Increase debounce delay to 1 second
  const debouncedFetchSearchResults = useDebounce(fetchSearchResults, 300) // 1000ms delay

  // Handle search input change and use debounce
  const handleSearchChange = e => {
    const value = e.target.value
    setSearchQuery(value)
    debouncedFetchSearchResults(value, selectedStatus)
    navigate({
      pathname: location.pathname,
      search: `?search=${value}&status=${selectedStatus}`
    })
  }

  // Handle status change from the dropdown
  const handleStatusChange = status => {
    setSelectedStatus(status)
    setIsOpen(false)
    fetchSearchResults(searchQuery, status)
    navigate({
      pathname: location.pathname,
      search: `?search=${searchQuery}&status=${status}`
    })
  }

  // Other handlers remain the same
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

  // Update filtered data when the status changes
  useEffect(() => {
    if (!data) return // Ensure `data` is not undefined

    let filtered = data
    if (selectedStatus !== 'All Status') {
      filtered = filtered.filter(item =>
        selectedStatus === 'Active' ? item.status === 1 : item.status === 0
      )
    }
    setFilteredData(filtered)
  }, [selectedStatus, data])

  const handleAddBlogClick = () => {
    navigate('/dashboard/add-blog')
  }

  const handleEditClick = id => {
    navigate(`/dashboard/add-blog/${id}`)
  }

  const handleDeleteClick = async id => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You wont be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      try {
        const response = await BlogApis.deleteBlogPost(id)
        if (response.errors) {
          await Swal.fire('Error', response.message, 'error')
        } else {
          await Swal.fire('Deleted!', 'Your blog has been deleted.', 'success')
          setFilteredData(prevData => prevData.filter(item => item.id !== id))
        }
      } catch (error) {
        await Swal.fire('Error', 'An unexpected error occurred.', 'error')
        console.error(error)
      }
    }
  }
  // ====================== handle status update
  // Function to update status (0: Deactive, 1: Active)
  const handleStatusUpdate = async (id, status) => {
    try {
      const newStatus = status === 'Active' ? 1 : 0
      const response = await BlogApis.updateBlogStatus(id, newStatus)
      if (response.errors) {
        await Swal.fire('Error', response.message, 'error')
      } else {
        await Swal.fire(
          'Updated!',
          `Blog status has been updated to ${status}.`,
          'success'
        )
        setFilteredData(prevData =>
          prevData.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
          )
        )
      }
    } catch (error) {
      await Swal.fire('Error', 'An unexpected error occurred.', 'error')
      console.error(error)
    }
  }

  // Approval and reject
  const handleApproveClick = async id => {
    const result = await Swal.fire({
      title: 'Approve this blog?',
      text: 'Are you sure you want to approve this blog?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      const response = await BlogApis.approveBlogPost(id)
      if (response.errors) {
        await Swal.fire('Error', response.message, 'error')
      } else {
        await Swal.fire('Approved!', 'The blog has been approved.', 'success')
        setFilteredData(prevData =>
          prevData.map(item =>
            item.id === id
              ? { ...item, approved_at: new Date().toISOString() }
              : item
          )
        )
      }
    }
  }

  const handleRejectClick = async id => {
    const result = await Swal.fire({
      title: 'Reject this blog?',
      text: 'Are you sure you want to reject this blog?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      const response = await BlogApis.rejectBlogPost(id)
      if (response.errors) {
        await Swal.fire('Error', response.message, 'error')
      } else {
        await Swal.fire('Rejected!', 'The blog has been rejected.', 'success')
        setFilteredData(prevData =>
          prevData.map(item =>
            item.id === id ? { ...item, approved_at: null } : item
          )
        )
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between items-center py-5'>
        <h1 className='text-[#0D0E0D] text-[20px]'>{title}</h1>
        <div className='flex flex-col items-center sm:flex-row gap-3 my-2 rounded-t-xl'>
          <div className='relative md:col-span-1'>
            <input
              type='text'
              placeholder='Search...'
              className='py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%]'
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FaSearch className='absolute top-3 left-3 text-zinc-400' />
          </div>

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
                    {['All Status', 'Active', 'Deactivated'].map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`block w-full px-5 py-5 text-left text-sm text-gray-700 hover:bg-gray-200 ${
                          selectedStatus === status
                            ? 'font-bold bg-gray-100'
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
        <div className='flex justify-end p-5'>
          <button
            onClick={handleAddBlogClick}
            className='flex text-[14px] items-center gap-1 bg-[#EB5B2A] hover:bg-[#eb5a2ae0] transform duration-300 text-white px-3 py-2 rounded-lg whitespace-nowrap'
          >
            <FaRegSquarePlus className='text-white text-xl' />
            Create Blog
          </button>
        </div>

        <TableContainer sx={{ padding: '16px' }}>
          <Table sx={{ border: '1px solid #e0e0e0' }}>
            <TableHead>
              <TableRow>
                {columns?.title && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Title
                  </TableCell>
                )}
                {columns?.user && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Author
                  </TableCell>
                )}
                {columns?.status && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Status
                  </TableCell>
                )}
                {columns?.approved_at && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Approval
                  </TableCell>
                )}
                {columns?.created_at && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Published Date
                  </TableCell>
                )}
                {columns?.updated_at && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Modified Date
                  </TableCell>
                )}
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
              {filteredData?.length > 0 ? (
                filteredData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map(item => (
                    <TableRow
                      key={item?.id}
                      onClick={() => handleRowClick(item.id)}
                    >
                      {columns?.title && (
                        <TableCell style={{ minWidth: '200px' }}>
                          <div className='flex items-center gap-3'>
                            <img
                              className='rounded-lg'
                              // alt={item.title}
                              alt='blog image'
                              style={{ width: '80px', height: '80px' }}
                            />
                            <span className='truncate text-[#1D1F2C] text-[14px] font-medium'>
                              {item.title}
                            </span>
                          </div>
                        </TableCell>
                      )}
                      {columns?.user && (
                        <TableCell style={{ minWidth: '200px' }}>
                          <p className='truncate text-[#475467]'>
                            {item?.user?.type}
                          </p>
                        </TableCell>
                      )}
                      {columns?.status && (
                        <TableCell style={{ minWidth: '200px' }}>
                          {item.status === 1 ? (
                            <span
                              className='bg-[#ECFDF3] border-[#ABEFC6] border text-[13px] text-[#067647] px-2 py-1 rounded-full'
                              style={{
                                height: '30px',
                                width: '100px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              Active
                            </span>
                          ) : item.status === 0 ? (
                            <span
                              className='bg-[#FEF3F2] border text-[#B42318] text-[13px] border-[#FECDCA] px-2 py-1 rounded-full'
                              style={{
                                height: '30px',
                                width: '100px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              Deactivated
                            </span>
                          ) : null}
                        </TableCell>
                      )}

                      {columns?.approved_at && (
                        <TableCell style={{ minWidth: '200px' }}>
                          {item?.user?.type === 'admin' ||
                          item?.user?.type === 'vendor' ? (
                            <>
                              <p className='truncate text-[#475467]'>
                                {item.approved_at === null ? (
                                  <span
                                    className='bg-[#FEF3F2] border text-[#B42318] text-[13px] border-[#FECDCA] px-2 py-1 rounded-full'
                                    style={{
                                      height: '30px',
                                      width: '100px',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    Reject
                                  </span>
                                ) : (
                                  <span
                                    className='bg-[#ECFDF3] border-[#ABEFC6] border text-[13px] text-[#067647] px-2 py-1 rounded-full'
                                    style={{
                                      height: '30px',
                                      width: '100px',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    Approved
                                  </span>
                                )}
                              </p>
                            </>
                          ) : item?.user?.type === 'admin' ? (
                            <>
                              <p className='truncate text-[#475467]'>
                                {item.approved_at === null ? (
                                  <span
                                    className='bg-[#FEF3F2] border text-[#B42318] text-[13px] border-[#FECDCA] px-2 py-1 rounded-full'
                                    style={{
                                      height: '30px',
                                      width: '100px',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    Reject
                                  </span>
                                ) : (
                                  <span
                                    className='bg-[#ECFDF3] border-[#ABEFC6] border text-[13px] text-[#067647] px-2 py-1 rounded-full'
                                    style={{
                                      height: '30px',
                                      width: '100px',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                  >
                                    Approved
                                  </span>
                                )}
                              </p>
                            </>
                          ) : (
                            <></>
                          )}
                        </TableCell>
                      )}
                      {columns?.created_at && (
                        <TableCell>
                          <p className='text-[#475467]'>
                            {item.created_at
                              ? new Date(item.created_at).toLocaleString(
                                  'en-US',
                                  {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                    hour12: true
                                  }
                                )
                              : ''}
                          </p>
                        </TableCell>
                      )}
                      {columns?.updated_at && (
                        <TableCell>
                          <p className='text-[#475467]'>
                            {item.created_at
                              ? new Date(item.updated_at).toLocaleString(
                                  'en-US',
                                  {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                    hour12: true
                                  }
                                )
                              : ''}
                          </p>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className='relative flex items-center justify-center gap-4'>
                          <div className='relative flex justify-center'>
                            <button
                              onClick={e => handleThreeDotsClick(e, item.id)}
                              className='text-blue-600 transition-all duration-500 ease-in-out'
                            >
                              {isOpenAction === item.id ? (
                                <RxCross2 className='text-xl opacity-100 scale-100 transition-transform duration-300 ease-in-out' />
                              ) : (
                                <BsThreeDots className='text-xl opacity-100 scale-100 transition-transform duration-300 ease-in-out' />
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
                                  className='absolute bg-white py-5 px-4 flex flex-col -right-20 top-5 space-y-1 rounded-2xl shadow-2xl popup w-60 z-50'
                                >
                                  {item?.user?.type === 'admin' ||
                                  item?.user?.type === 'vendor' ? (
                                    <>
                                      <button
                                        className={`flex item-center gap-3 py-2 px-4 rounded-md text-sm ${
                                          item.status === 1
                                            ? 'bg-green-600 text-white cursor-default'
                                            : 'hover:bg-green-600 text-zinc-600 hover:text-white duration-300'
                                        }`}
                                        disabled={item.status === 1}
                                        onClick={() =>
                                          handleStatusUpdate(item.id, 'Active')
                                        }
                                      >
                                        Active
                                      </button>
                                      <button
                                        className={`flex item-center gap-3 py-2 px-4 rounded-md text-sm ${
                                          item.status === 0
                                            ? 'bg-red-600 text-white cursor-default'
                                            : 'hover:bg-red-600 text-zinc-600 hover:text-white duration-300'
                                        }`}
                                        disabled={item.status === 0}
                                        onClick={() =>
                                          handleStatusUpdate(
                                            item.id,
                                            'Deactive'
                                          )
                                        }
                                      >
                                        Deactive
                                      </button>
                                    </>
                                  ) : item?.user?.type === 'admin' ? (
                                    <>
                                      <button
                                        className={`flex item-center gap-3 py-2 px-4 rounded-md text-sm ${
                                          item.approved_at !== null
                                            ? 'bg-green-600 text-white cursor-default'
                                            : 'hover:bg-green-600 text-zinc-600 hover:text-white duration-300'
                                        }`}
                                        disabled={item.approved_at !== null}
                                        onClick={() =>
                                          handleApproveClick(item.id)
                                        }
                                      >
                                        Approve
                                      </button>
                                      <button
                                        className={`flex item-center gap-3 py-2 px-4 rounded-md text-sm ${
                                          item.approved_at === null
                                            ? 'bg-red-600 text-white cursor-default'
                                            : 'hover:bg-red-600 text-zinc-600 hover:text-white duration-300'
                                        }`}
                                        disabled={item.approved_at === null}
                                        onClick={() =>
                                          handleRejectClick(item.id)
                                        }
                                      >
                                        Reject
                                      </button>
                                    </>
                                  ) : (
                                    <p className='text-sm text-gray-500'>
                                      No actions available
                                    </p>
                                  )}
                                </div>
                              </DropdownPortal>
                            )}
                          </div>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              handleEditClick(item.id)
                            }}
                            className='text-blue-500 hover:text-blue-600 transform duration-300'
                          >
                            <FaEdit className='text-lg' />
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              handleDeleteClick(item.id)
                            }}
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

export default BlogsTable
