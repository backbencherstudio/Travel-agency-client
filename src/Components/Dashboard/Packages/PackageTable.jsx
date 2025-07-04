import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import TablePagination from '../../../Shared/TablePagination'
import coverImage from '../../../assets/img/tour-details/image-1.png'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import { FaEdit, FaSearch } from 'react-icons/fa'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { IoIosCheckmark } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { BsThreeDots } from 'react-icons/bs'
import noPreview from '../../../assets/dashboard/no-preview.png'
import axiosClient from '../../../axiosClient'
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import Swal from 'sweetalert2'
import PackageApis from '../../../Apis/PackageApis'
import debounce from 'lodash.debounce'
import DropdownPortal from '../../../Shared/DropdownPortal'
import { LuTrash2 } from 'react-icons/lu'
import { MdEdit } from 'react-icons/md'

// const PackageTable = ({ tableType = '', title, data, columns, refetch }) => {
const PackageTable = ({ tableType = '', title, columns, refetch }) => {

  const data = [
    {
      id: 12341225,
      name: "Mediterranean Marvels Cruise",
      type: "Venice Dreams",
      description: "ail to the heart of the Caribbean, visiting turquoise beaches, tropical islands, and rich cultural sites. ",
      user: { id: "templeUser01" },
      price: 2999,
      status: 1,
      package_files: [{ file_url: coverImage }]
    },
    {
      id: 2,
      name: "Temple",
      type: true,
      description: "Temple description",
      user: { id: "templeUser01" },
      price: 1200,
      status: 1,
      package_files: [{ file_url: coverImage }]
    },
    {
      id: 3,
      name: "Temple",
      type: true,
      description: "Temple description",
      user: { id: "templeUser01" },
      price: 1200,
      status: 1,
      package_files: [{ file_url: coverImage }]
    },
  ];


  const { user } = useContext(AuthContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpenAction, setIsOpenAction] = useState(null)
  const [showTab, setShowTab] = useState('all')
  const navigate = useNavigate()
  const actionRefs = useRef(new Map())
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedStatus, setSelectedStatus] = useState(
    searchParams.get('status') || 'All Packages'
  )

  // Pagination states
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(2)
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
    const rect = e.currentTarget.getBoundingClientRect()
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    })
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


  const handleChangePage = (event, newPage) => {
    console.log("Page : ",newPage)
    setPage(newPage);
  };

  const handleNextPage = (event) => {
    setPage(prev => prev + 1)
  };

  const handlePreviousPage = () => {
    setPage(prev => Math.max(0, prev - 1))
  }

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
  }, [showTab])

  return (
    <div className='bg-white rounded-lg space-y-4'>
      <div className='flex flex-col md:flex-row justify-between  gap-3 px-4 pt-4 rounded-t-xl'>
        <div className='flex md:gap-6 flex-1'>
          <button
            className={`text-xs md:text-base font-semibold text-[#667085] px-4 pb-3 ${showTab === 'all' &&
              'border-b-2 border-[#EB5B2A] text-[#A7411E]'
              }`}
            onClick={() => handleActiveTab('all')}
          >
            All Packages
          </button>
          <button
            className={`text-xs md:text-base font-semibold text-[#667085] px-4 pb-3  ${showTab === 'tour' &&
              'border-b-2 border-[#EB5B2A] text-[#A7411E]'
              }`}
            onClick={() => handleActiveTab('tour')}
          >
            Tour Packages
          </button>
          <button
            className={`text-xs md:text-base font-semibold text-[#667085] px-4 pb-3  ${showTab === 'cruise' &&
              'border-b-2 border-[#EB5B2A] text-[#A7411E]'
              }`}
            onClick={() => handleActiveTab('cruise')}
          >
            Cruises Packages
          </button>
        </div>
        <div className='relative md:col-span-1 w-fit'>
          <input
            type='text'
            placeholder='Search anything...'
            className='py-1.5 placeholder:text-sm pl-10 bg-[#F7F8F8] rounded-md focus:outline-none w-full lg:w-[100%]'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <FaSearch className='absolute top-3 left-3 text-zinc-400' />
        </div>
      </div>
      <div className="w-full overflow-x-auto p-4">
        <table className="w-full table-auto min-w-[768px]">
          <thead>
            <tr className='text-[#475467] font-medium'>
              <th className='px-3'>
                <div className='flex items-center gap-1'>
                  <span className='font-normal'>Package Name</span>
                  <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                  </svg>
                </div>
              </th>
              <th className='px-3'>
                <div className='flex items-center gap-1'>
                  <span className='font-normal'>Package</span>
                  <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                  </svg>
                </div>
              </th>
              <th className='px-3'>
                <div className='flex items-center gap-1'>
                  <span className='font-normal'>Details</span>
                  <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                  </svg>
                </div>
              </th>
              <th className='px-3'>
                <div className='flex items-center gap-1'>
                  <span className='font-normal'>Budget</span>
                  <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                  </svg>
                </div>
              </th>
              <th className='px-3'>
                <div className='flex items-center gap-1'>
                  <span className='font-normal'>Status</span>
                  <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                  </svg>
                </div>
              </th>
              {/* <TableCell>Approval</TableCell> */}
              <th className='font-normal px-3'>Action</th>
            </tr>
          </thead>

          <tbody className='text-nowrap'>
            {filteredData?.length === 0 ? (
              <tr>
                <td colSpan={7} align='center'>
                  <div className='flex flex-col items-center justify-center py-8'>
                    <p className='text-gray-500 text-lg'>No data found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item, index) => (
                    <tr className={`hover:bg-[#fdf0ea] px-3 py-5`} key={index}>
                      <td className='py-5 px-3 min-w-[290px] overflow-hidden'>
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
                            <p className='text-xs font-medium text-[#000E19] text-wrap'>
                              {item.name}
                              {user?.id === item?.user?.id && (
                                <span className='text-xs font-normal text-[#475467]'>
                                  me
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td
                       className='px-3'
                        style={{
                          minWidth: '150px',
                          color: '#475467',
                          fontSize: '12px'
                        }}
                      >
                        {item.type || 'Not Available'}
                      </td>
                      <td
                      className='block min-w-[200px] text-[12px]  text-wrap py-5 px-3 capitalize text-[#475467]'>
                        {item.description}
                      </td>
                      <td className='text-[#475467] text-[12px] px-3' >
                        ${item.price}
                      </td>
                      {columns?.status && (
                        <td className='px-3 min-w-[150px]'>
                          <div>
                            {item.status === 1 ? (
                              <p className='flex items-center gap-1 text-[#067647] font-medium px-3 py-[2px] border border-[#ABEFC6] bg-[#ECFDF3] rounded-2xl'>
                                <IoIosCheckmark className='text-xl text-[#17B26A]' />
                                Active
                              </p>
                            ) : (
                              <p className='flex items-center gap-1 text-[#B42318] font-medium px-3 py-[2px] border border-[#FECDCA] bg-[#FEF3F2] rounded-2xl'>
                                <RxCross2 className='text-[12px] text-[#B42318]' />
                                Inactive
                              </p>
                            )}
                          </div>
                        </td>
                      )}
                      {/* <TableCell style={{ minWidth: '200px' }}>
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
                      </TableCell> */}
                      {columns?.action && (
                        <td className='px-3'>
                          <div className='relative w-fit'>
                            <svg className='cursor-pointer' onClick={e => toggleActionOpen(e, item.id)} xmlns="http://www.w3.org/2000/svg" width="60" height="25" viewBox="0 0 60 25" fill="none">
                              <path d="M22 13C22 13.2652 22.1054 13.5196 22.2929 13.7071C22.4804 13.8946 22.7348 14 23 14C23.2652 14 23.5196 13.8946 23.7071 13.7071C23.8946 13.5196 24 13.2652 24 13C24 12.7348 23.8946 12.4804 23.7071 12.2929C23.5196 12.1054 23.2652 12 23 12C22.7348 12 22.4804 12.1054 22.2929 12.2929C22.1054 12.4804 22 12.7348 22 13Z" stroke="#475467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M29 13C29 13.2652 29.1054 13.5196 29.2929 13.7071C29.4804 13.8946 29.7348 14 30 14C30.2652 14 30.5196 13.8946 30.7071 13.7071C30.8946 13.5196 31 13.2652 31 13C31 12.7348 30.8946 12.4804 30.7071 12.2929C30.5196 12.1054 30.2652 12 30 12C29.7348 12 29.4804 12.1054 29.2929 12.2929C29.1054 12.4804 29 12.7348 29 13Z" stroke="#475467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M36 13C36 13.2652 36.1054 13.5196 36.2929 13.7071C36.4804 13.8946 36.7348 14 37 14C37.2652 14 37.5196 13.8946 37.7071 13.7071C37.8946 13.5196 38 13.2652 38 13C38 12.7348 37.8946 12.4804 37.7071 12.2929C37.5196 12.1054 37.2652 12 37 12C36.7348 12 36.4804 12.1054 36.2929 12.2929C36.1054 12.4804 36 12.7348 36 13Z" stroke="#475467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {isOpenAction === item.id &&
                              <div className='z-[2] p-4 shadow-md w-fit absolute bg-white rounded-lg top-[25px] right-0'>
                                <div className='relative'>
                                  <Link to={`/dashboard/edit-package/${item?.id}`} className={`flex bg-[#EB5B2A] w-fit gap-3 p-3 rounded-md font-medium text-white`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M3.98573 21.2011L9.28903 20.1404C9.48262 20.1017 9.66043 20.0066 9.80003 19.867L16.4498 13.2171C16.8403 12.8266 16.8403 12.1934 16.4498 11.8029L12.2072 7.56025C11.8167 7.16973 11.1835 7.16973 10.793 7.56026L4.14317 14.2101C4.00357 14.3497 3.90842 14.5275 3.8697 14.7211L2.80904 20.0244C2.66909 20.7241 3.28601 21.341 3.98573 21.2011Z" fill="currentColor" />
                                      <path d="M20.1925 5.2318L18.7783 3.81758C17.6068 2.64601 15.7073 2.64601 14.5357 3.81758L13.5504 4.80287C13.1599 5.19339 13.1599 5.82656 13.5504 6.21708L17.793 10.4597C18.1836 10.8502 18.8167 10.8502 19.2073 10.4597L20.1925 9.47444C21.3641 8.30287 21.3641 6.40337 20.1925 5.2318Z" fill="currentColor" />
                                    </svg>
                                    <span>Edit Packages Deatils</span>
                                  </Link>
                                  <div onClick={e => handlePackageDelete(e, item.id)} className={`flex w-fit gap-3 p-3 rounded-md font-medium text-[#4A4C56]`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 10.01C10.5523 10.01 11 10.4577 11 11.01V16.01C11 16.5623 10.5523 17.01 10 17.01C9.44772 17.01 9 16.5623 9 16.01V11.01C9 10.4577 9.44772 10.01 10 10.01Z" fill="#777980" />
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14 10.01C14.5523 10.01 15 10.4577 15 11.01V16.01C15 16.5623 14.5523 17.01 14 17.01C13.4477 17.01 13 16.5623 13 16.01V11.01C13 10.4577 13.4477 10.01 14 10.01Z" fill="#777980" />
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2.01001C8.34315 2.01001 7 3.35316 7 5.01001H4H3C2.44772 5.01001 2 5.45773 2 6.01001C2 6.56229 2.44772 7.01001 3 7.01001H4V19.01C4 20.6669 5.34315 22.01 7 22.01H17C18.6569 22.01 20 20.6669 20 19.01V7.01001H21C21.5523 7.01001 22 6.56229 22 6.01001C22 5.45773 21.5523 5.01001 21 5.01001H20H17C17 3.35316 15.6569 2.01001 14 2.01001H10ZM15 5.01001C15 4.45773 14.5523 4.01001 14 4.01001H10C9.44772 4.01001 9 4.45773 9 5.01001H15ZM7 7.01001H6V19.01C6 19.5623 6.44772 20.01 7 20.01H17C17.5523 20.01 18 19.5623 18 19.01V7.01001H17H7Z" fill="#777980" />
                                    </svg>
                                    <span>Delete forever</span>
                                  </div>
                                  <div className='absolute -top-[26px] right-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">
                                      <path d="M6.92712 1.68746L0 10H20L13.0729 1.68746C11.4737 -0.231555 8.5263 -0.231558 6.92712 1.68746Z" fill="white" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            }
                          </div>

                          {/* remove this section */}
                          {/* <div className='flex items-center gap-3'>
                          <tr className='relative flex justify-center'>
                            <button
                              onClick={e => toggleActionOpen(e, item.id)}
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
                                    ref &&
                                    actionRefs.current.set(item.id, ref)
                                  }
                                  className='absolute bg-white py-5 px-4 flex flex-col -right-20 top-5 space-y-1 rounded-2xl shadow-2xl popup w-60 z-50'
                                >
                                  {user?.type === 'admin' && (
                                    <>
                                      <button
                                        className={`flex item-center gap-3 py-2 px-4 rounded-md text-base ${item.approved_at !== null
                                          ? 'bg-green-600 text-white cursor-default text-sm'
                                          : 'hover:bg-green-600 text-zinc-600 text-sm hover:text-white duration-300'
                                          }`}
                                        disabled={item.approved_at !== null}
                                        onClick={() =>
                                          handleApproveClick(item.id)
                                        }
                                      >
                                        Approve
                                      </button>
                                      <button
                                        className={`flex item-center gap-3 py-2 px-4 rounded-md text-base ${item.approved_at === null
                                          ? 'bg-red-600 text-white cursor-default text-sm'
                                          : 'hover:bg-red-600 text-zinc-600 text-sm hover:text-white duration-300'
                                          }`}
                                        disabled={item.approved_at === null}
                                        onClick={() =>
                                          handleRejectClick(item.id)
                                        }
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  {user?.id === item?.user?.id && (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleActiveClick(item.id)
                                        }
                                        className='flex item-center gap-3 p-3 hover:bg-green-500 rounded-md text-base text-zinc-600 hover:text-white duration-300'
                                      >
                                        {/* <FaCheck className="mt-1" /> 
                                        Active
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleRejectClick(item.id)
                                        }
                                        className='flex item-center gap-3 p-3 hover:bg-red-500 rounded-md text-base text-zinc-600 hover:text-white duration-300'
                                      >
                                        {/* <RxCross2 className='text-xl' /> 
                                        Inactive
                                      </button>
                                    </>
                                  )}
                                </div>
                              </DropdownPortal>
                            )}
                          </div>
                          <Link
                            to={`/dashboard/edit-package/${item?.id}`}
                            className='text-blue-600 hover:text-blue-700 transform duration-300'
                          >
                            <FaEdit className='text-lg' />

                          </Link>
                          <button
                            onClick={e => handlePackageDelete(e, item.id)}
                            className='text-red-600 hover:text-red-700 transform duration-300'
                          >
                            <LuTrash2 className='text-lg' />
                          </button>
                        </div> */}
                        </td>
                      )}
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

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
  )
}

export default PackageTable