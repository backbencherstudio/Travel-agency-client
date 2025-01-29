import { useCallback, useContext, useEffect, useRef, useState } from 'react'
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
import { FaRegTrashAlt, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { IoIosCheckmark } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { BsThreeDots } from 'react-icons/bs'
import noPreview from '../../../assets/dashboard/no-preview.png'
import axiosClient from '../../../axiosClient'
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import Swal from 'sweetalert2'
import PackageApis from '../../../Apis/PackageApis'
import debounce from 'lodash.debounce'

const PackageTable = ({ tableType = '', title, data, columns, refetch }) => {
  const { user } = useContext(AuthContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpenAction, setIsOpenAction] = useState(null)
  const [showTab, setShowTab] = useState('all')
  const navigate = useNavigate()
  const actionRefs = useRef(new Map())

  // Pagination states
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filteredData, setFilteredData] = useState(data)

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRowClick = id => {
    navigate(`${id}`)
  }

  const toggleActionOpen = (e, id) => {
    e.stopPropagation()
    setIsOpenAction(isOpenAction === id ? null : id)
  }

  const handleActiveTab = tab => {
    setShowTab(tab)
    if (tab === 'all') {
      setFilteredData(data)
    } else {
      const filtered = data.filter(
        item => item.type.toLowerCase() === tab.toLowerCase()
      )
      setFilteredData(filtered)
    }
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        Array.from(actionRefs.current.values()).every(
          ref => ref && !ref.contains(event.target)
        )
      ) {
        setIsOpenAction(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Approval and reject
  const handleApproveClick = async id => {
    const result = await Swal.fire({
      title: 'Approve this package?',
      text: 'Are you sure you want to approve this package?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      const response = await PackageApis.approvePackage(id)
      if (response.errors) {
        await Swal.fire('Error', response.message, 'error')
      } else {
        await Swal.fire(
          'Approved!',
          'The package has been approved.',
          'success'
        )
        refetch()
      }
    }
  }

  const handleRejectClick = async id => {
    const result = await Swal.fire({
      title: 'Reject this package?',
      text: 'Are you sure you want to reject this package?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
      cancelButtonText: 'Cancel'
    })

    if (result.isConfirmed) {
      const response = await PackageApis.rejectPackage(id)
      if (response.errors) {
        await Swal.fire('Error', response.message, 'error')
      } else {
        await Swal.fire(
          'Rejected!',
          'The package has been rejected.',
          'success'
        )
        refetch()
      }
    }
  }

  const handlePackageDelete = async (e, id) => {
    e.preventDefault()
    const result = await Swal.fire({
      title: 'Delete this package?',
      text: 'Are you sure you want to delete this package? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    })

    if (result.isConfirmed) {
      try {
        const res = await axiosClient.delete(`api/admin/package/${id}`)
        await Swal.fire(
          'Deleted!',
          'The package has been deleted successfully.',
          'success'
        )
        refetch()
      } catch (error) {
        await Swal.fire('Error!', 'Failed to delete the package.', 'error')
        console.error('Failed to delete package:', error)
      }
    }
  }

  // Debounce search input to avoid unnecessary re-renders
  const handleSearch = useCallback(
    debounce(query => {
      if (query.trim() === '') {
        setFilteredData(
          showTab === 'all'
            ? data
            : data.filter(
                item => item.type.toLowerCase() === showTab.toLowerCase()
              )
        )
        navigate(location.pathname)
      } else {
        const lowercasedQuery = query.toLowerCase()
        const baseData =
          showTab === 'all'
            ? data
            : data.filter(
                item => item.type.toLowerCase() === showTab.toLowerCase()
              )
        const filtered = baseData.filter(item =>
          item.name.toLowerCase().includes(lowercasedQuery)
        )
        setFilteredData(filtered)
        navigate(`?q=${query}`)
      }
    }, 500),
    [data, navigate, location.pathname, showTab]
  )

  useEffect(() => {
    handleSearch(searchQuery)
    return () => handleSearch.cancel()
  }, [searchQuery, handleSearch])

  useEffect(() => {
    handleActiveTab(showTab)
  }, [data, showTab])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <div className=''>
      <Paper style={{ borderRadius: '10px' }}>
        <div className='flex flex-col lg:flex-row justify-between items-end  gap-3 px-4 pt-4 rounded-t-xl'>
          <div className='flex md:gap-6 border-b border-[#EAECF0] w-full lg:w-1/2'>
            <button
              className={`text-xs md:text-base font-semibold text-[#667085] px-4 pb-3 ${
                showTab === 'all' &&
                'border-b-2 border-[#EB5B2A] text-[#A7411E]'
              }`}
              onClick={() => handleActiveTab('all')}
            >
              All Packages
            </button>
            <button
              className={`text-xs md:text-base font-semibold text-[#667085] px-4 pb-3  ${
                showTab === 'tour' &&
                'border-b-2 border-[#EB5B2A] text-[#A7411E]'
              }`}
              onClick={() => handleActiveTab('tour')}
            >
              Tour Packages
            </button>
            <button
              className={`text-xs md:text-base font-semibold text-[#667085] px-4 pb-3  ${
                showTab === 'cruise' &&
                'border-b-2 border-[#EB5B2A] text-[#A7411E]'
              }`}
              onClick={() => handleActiveTab('cruise')}
            >
              Cruises Packages
            </button>
          </div>
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
        </div>
        <TableContainer sx={{ padding: '16px' }}>
          <Table
            sx={{
              border: '1px solid #e0e0e0'
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Package Name</TableCell>
                <TableCell>Package</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Approval</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody className='text-nowrap'>
              {filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item, index) => (
                  <TableRow className={`hover:bg-[#fdf0ea]`} key={index}>
                    <TableCell style={{ minWidth: '280px' }}>
                      <div className='flex items-center gap-2 '>
                        {item.package_files &&
                        item.package_files.length !== 0 ? (
                          <img
                            src={item.package_files[0]?.file_url}
                            alt={item.package_files[0]?.file_url}
                            className=' w-28 h-20 rounded-md'
                          />
                        ) : (
                          <img
                            src={noPreview}
                            alt=''
                            className=' w-28 h-20 rounded-md'
                          />
                        )}
                        <div className='flex flex-col gap-[5px]'>
                          <p className='text-xs font-normal text-[#475467]'>
                            #{item.id}
                          </p>
                          <p className='text-xs font-medium text-black'>
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: '200px',
                        color: '#475467',
                        fontSize: '12px'
                      }}
                    >
                      {item.type || 'Not Available'}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: '200px',
                        maxWidth: '200px',
                        color: '#475467',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: '12px'
                      }}
                    >
                      {item.description}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: '200px',
                        color: '#475467',
                        fontSize: '12px'
                      }}
                    >
                      {item.price}
                    </TableCell>
                    {columns?.status && (
                      <TableCell>
                        <p>
                          {item.status === 1 ? (
                            <p className='flex items-center gap-1 text-[#067647] font-medium px-3 py-[2px] border border-[#ABEFC6] bg-[#ECFDF3] rounded-2xl'>
                              <IoIosCheckmark className='text-xl text-[#17B26A]' />
                              Active
                            </p>
                          ) : (
                            <p className='flex items-center gap-1 text-[#B42318] font-medium px-3 py-[2px] border border-[#FECDCA] bg-[#FEF3F2] rounded-2xl'>
                              <RxCross2 className='text-sm text-[#B42318]' />
                              Inactive
                            </p>
                          )}
                        </p>
                      </TableCell>
                    )}
                    <TableCell style={{ minWidth: '200px' }}>
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
                    </TableCell>
                    {columns?.action && (
                      <TableCell>
                        <div className='flex items-center gap-1'>
                          <div className='relative'>
                            <button
                              onClick={e => toggleActionOpen(e, item.id)}
                              className='text-lg p-text p-1 rounded-full'
                            >
                              <BsThreeDots />
                            </button>
                            {isOpenAction === item.id && (
                              <div
                                className={`bg-white p-4 absolute flex flex-col top-full -right-5 mt-2 space-y-1 rounded-2xl shadow-2xl popup w-60 z-50`}
                                ref={ref =>
                                  ref && actionRefs.current.set(item.id, ref)
                                }
                              >
                                <div className='w-4 h-4 bg-white rotate-45 absolute -top-[7px] right-[45px] hidden xl:block shadow-2xl'></div>
                                {user?.type === 'admin' && (
                                  <>
                                    <button
                                      onClick={() =>
                                        handleApproveClick(item.id)
                                      }
                                      className='flex item-center gap-3 p-3 hover:bg-green-500 rounded-md text-base text-zinc-600 hover:text-white duration-300'
                                    >
                                      {/* <IoIosCheckmark className='mt-1' /> */}
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => handleRejectClick(item.id)}
                                      className='flex item-center gap-3 p-3 hover:bg-red-500 rounded-md text-base text-zinc-600 hover:text-white duration-300'
                                    >
                                      {/* <RxCross2 className='text-xl' /> */}
                                      Reject
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                          <button
                            onClick={e => handlePackageDelete(e, item.id)}
                            className='flex item-center gap-3 p-3 hover:bg-red-500 rounded-md text-base text-zinc-600 hover:text-white duration-300'
                          >
                            <FaRegTrashAlt className='text-xl' />
                          </button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
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

export default PackageTable
