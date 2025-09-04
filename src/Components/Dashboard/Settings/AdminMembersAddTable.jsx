import { FaEdit, FaEye, FaEyeSlash, FaSearch } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import TablePagination from '../../../Shared/TablePagination'
import img1 from '../../../assets/img/tour-details/image-5.png'
import {
  CircularProgress,
  Dialog,
  DialogContent
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { FaRegSquarePlus } from 'react-icons/fa6'
import {
  addUser,
  deleteUser,
  searchUsers,
  updateUser
} from '../../../Apis/CreateNewUser'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import debounce from 'lodash.debounce'
import { useLocation, useNavigate } from 'react-router-dom'
import { LuTrash2 } from 'react-icons/lu'


const AdminMembersAddTable = ({ title, data = [], columns = {}, onDataUpdate }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialQuery = queryParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [filteredData, setFilteredData] = useState(data)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openModal, setOpenModal] = useState(false)
  const [mode, setMode] = useState('add')
  const [selectedMember, setSelectedMember] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  useEffect(() => {
    // Fetch data when the search query changes, debounced
    const fetchData = debounce(async () => {
      if (searchQuery.trim()) {
        navigate(`?q=${searchQuery}`)
        setLoading(true)
        try {
          const response = await searchUsers(searchQuery)
          setFilteredData(response.data)
        } catch (error) {
          toast.error(
            error.response?.data?.message ||
            error.message ||
            'An error occurred while searching.'
          )
        } finally {
          setLoading(false)
        }
      } else {
        navigate(location.pathname)
        setFilteredData(data)
      }
    }, 500)

    fetchData()

    return () => {
      fetchData.cancel()
    }
  }, [searchQuery, data, navigate, location.pathname])

  const handleChangePage = (event, newPage) => setPage(newPage)
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
    const memberToEdit = data.find(member => member.id === id)
    if (memberToEdit) {
      setSelectedMember(memberToEdit)
      setMode('edit')
      setOpenModal(true)
    }
  }

  const handleOpenModal = (member = null) => {
    if (member) {
      setMode('edit')
      setSelectedMember(member)
    } else {
      setMode('add')
      setSelectedMember(null)
    }
    setOpenModal(true)
    reset('')
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setImagePreview(null)
    setImageError(false)
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (mode === 'edit' && selectedMember) {
      // Populate form with selected member's data
      setValue('name', selectedMember.name)
      setValue('email', selectedMember.email)
      setValue('type', selectedMember.type)
      // setImagePreview(selectedMember.image || null)
    }
  }, [mode, selectedMember, setValue])

  // handle add and edit user
  const onSubmit = async formData => {
    setLoading(true)

    try {
      if (mode === 'edit') {
        delete formData.email
      }

      if (mode === 'add') {
        const response = await addUser(formData)
        if (response.success) {
          toast.success('Member added successfully!')
          onDataUpdate()
        } else {
          toast.error(response.message || 'Failed to add member.')
        }
      } else if (mode === 'edit') {
        const response = await updateUser(selectedMember.id, formData)
        if (response.success) {
          toast.success('Member updated successfully!')
          onDataUpdate()
        } else {
          toast.error(response.message || 'Failed to update member.')
        }
      }

      reset()
      setOpenModal(false)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error(
        error.response?.data?.message ||
        error.message ||
        'An error occurred while submitting.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleRePasswordVisibility = () => setShowRePassword(!showRePassword)

  // handle delete user
  const handleDeleteUser = async userId => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
      setLoading(true)
      try {
        const response = await deleteUser(userId)
        if (response.success) {
          Swal.fire('Deleted!', 'Member has been deleted.', 'success')
          setFilteredData(prevData =>
            prevData.filter(member => member.id !== userId)
          )
        } else {
          Swal.fire(
            'Error!',
            response.message || 'Failed to delete member.',
            'error'
          )
        }
      } catch (error) {
        console.error('Error deleting member:', error)
        Swal.fire(
          'Error!',
          error.message || 'An error occurred while deleting.',
          'error'
        )
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <div className=' p-4 sm:p-6'>
        <div className='flex gap-2 items-center'>
          <h1 className='text-[#0D0E0D] capitalize text-[20px]'>{title}</h1>
          <h2 className='text-[#687588] capitalize bg-[#E9EAEC] text-start px-2 py-1 text-[12px] rounded-md'>
            Deafult
          </h2>
        </div>
        <div className='grid gird-col-1 xl:grid-cols-2 items-center py-5 gap-3'>
          <p className='text-[#687588] text-sm'>
            Admin can see all fields, edit all fields, and do <br /> everything
            the system offers.
          </p>
          <div className='flex items-center xl:justify-end gap-5'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search Member'
                className='py-1.5 pl-10 rounded-md bg-[#F0F4F9] focus:outline-none focus:border-orange-400 w-full lg:w-[100%] placeholder:text-[12px] placeholder:text-[#B3B7BA]'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {/* <FaSearch className='absolute top-3 left-3 text-zinc-400' /> */}
              <svg className='absolute top-3 left-3 text-zinc-400' xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.75 2.5C5.12665 2.5 3 4.62665 3 7.25C3 9.87335 5.12665 12 7.75 12C10.3734 12 12.5 9.87335 12.5 7.25C12.5 4.62665 10.3734 2.5 7.75 2.5ZM2 7.25C2 4.07436 4.57436 1.5 7.75 1.5C10.9256 1.5 13.5 4.07436 13.5 7.25C13.5 10.4256 10.9256 13 7.75 13C4.57436 13 2 10.4256 2 7.25Z" fill="#757D83" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1089 10.6089C11.3042 10.4137 11.6208 10.4137 11.8161 10.6089L14.8536 13.6464C15.0488 13.8417 15.0488 14.1583 14.8536 14.3536C14.6583 14.5488 14.3417 14.5488 14.1464 14.3536L11.1089 11.3161C10.9137 11.1208 10.9137 10.8042 11.1089 10.6089Z" fill="#757D83" />
              </svg>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className='flex text-[14px] items-center gap-1 bg-[#EB5B2A] hover:bg-[#eb5a2ae0] transform duration-300 text-white px-3 py-2 rounded-lg whitespace-nowrap'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M10.5052 4.16406V15.8307M4.67188 9.9974H16.3385" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Admin Member
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto min-w-[768px]">
            <thead className='text-[#475467] text-[12px] bg-[#F9FAFB]'>
              <tr>
                {columns.name && (
                  <th className='font-medium py-4 px-6 rounded-lg'>
                    <div className='flex items-center gap-1'>
                      <span>Member</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                      </svg>
                    </div>
                  </th>
                )}
                {columns.email && (
                  <th className='font-medium py-4 px-6 rounded-lg'>
                    <div className='flex items-center gap-1'>
                      <span>Email</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                      </svg>
                    </div>
                  </th>
                )}
                {columns.type && (
                  <th className='font-medium py-4 px-6 rounded-lg'>
                    <div className='flex items-center gap-1'>
                      <span>Status</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                      </svg>
                    </div>
                  </th>
                )}
                <th className='font-medium py-4 px-6 rounded-lg'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(item => (
                    <tr key={item.id} className='border-b border-[#F1F2F4]'>
                      {columns.name && (
                        <td className='px-6 py-[18px]'>
                          <div className='flex items-center gap-3'>
                            <img
                              className='rounded-full'
                              src={item.memberImg || img1}
                              alt={item.name}
                              style={{ width: '24px', height: '24px' }}
                            />
                            <span className='truncate text-[#1D1F2C] text-[12px] font-medium'>
                              {item.name}
                            </span>
                          </div>
                        </td>
                      )}
                      {columns.email && (
                        <td className='px-6 py-[18px]'>
                          <p className='truncate text-[#475467] text-[12px] font-medium'>
                            {item.email}
                          </p>
                        </td>
                      )}
                      {columns.type && (
                        <td className='px-6 py-[18px]'>
                          <p className='truncate text-[#475467] text-[12px] font-medium'>{item.type}</p>
                        </td>
                      )}
                      <td className='px-4 py-[18px]'>
                        <div className='flex items-center justify-center gap-4'>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              handleOpenModal(item)
                            }}
                            className='text-blue-500 hover:text-blue-600 transform duration-300'
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                              <path d="M17.6138 8.70831C18.5801 9.72504 18.5801 11.2698 17.6138 12.2865C15.984 14.0013 13.1848 16.3307 10.0052 16.3307C6.82561 16.3307 4.02645 14.0013 2.39663 12.2865C1.43029 11.2698 1.43029 9.72504 2.39663 8.70831C4.02645 6.99351 6.82561 4.66406 10.0052 4.66406C13.1848 4.66406 15.984 6.99351 17.6138 8.70831Z" stroke="#475467" stroke-width="1.5" />
                              <path d="M12.5052 10.4974C12.5052 11.8781 11.3859 12.9974 10.0052 12.9974C8.6245 12.9974 7.50521 11.8781 7.50521 10.4974C7.50521 9.11668 8.6245 7.9974 10.0052 7.9974C11.3859 7.9974 12.5052 9.11668 12.5052 10.4974Z" stroke="#475467" stroke-width="1.5" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteUser(item.id)}
                            className='text-red-600 hover:text-red-700 transform duration-300'
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                              <path d="M10.6667 4.50065V3.96732C10.6667 3.22058 10.6667 2.84721 10.5213 2.562C10.3935 2.31111 10.1895 2.10714 9.93865 1.97931C9.65344 1.83398 9.28007 1.83398 8.53333 1.83398H7.46667C6.71993 1.83398 6.34656 1.83398 6.06135 1.97931C5.81046 2.10714 5.60649 2.31111 5.47866 2.562C5.33333 2.84721 5.33333 3.22058 5.33333 3.96732V4.50065M6.66667 8.16732V11.5007M9.33333 8.16732V11.5007M2 4.50065H14M12.6667 4.50065V11.9673C12.6667 13.0874 12.6667 13.6475 12.4487 14.0753C12.2569 14.4516 11.951 14.7576 11.5746 14.9493C11.1468 15.1673 10.5868 15.1673 9.46667 15.1673H6.53333C5.41323 15.1673 4.85318 15.1673 4.42535 14.9493C4.04903 14.7576 3.74307 14.4516 3.55132 14.0753C3.33333 13.6475 3.33333 13.0874 3.33333 11.9673V4.50065" stroke="#475467" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan={Object.keys(columns).length + 1}
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
        <TablePagination handleChangePage={handleChangePage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} page={page} filteredData={filteredData} rowsPerPage={rowsPerPage} />
      </div>

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <h1 className='text-center text-[#080613] text-lg my-4'>
          {mode === 'edit' ? 'Edit Member' : 'Add Member'}
        </h1>
        <DialogContent className={`transition-all ${loading ? '' : ''}`}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {/* Name and Email in same line */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Member Name */}
              <div>
                <label className='block mb-2 font-medium'>Member Name</label>
                <input
                  type='text'
                  {...register('name', { required: 'Name is required' })}
                  placeholder='Enter member name'
                  className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${errors.name ? 'border-red-500' : ''
                    }`}
                />
                {errors.name && (
                  <span className='text-red-500 text-sm'>
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className='block mb-2 font-medium'>Email Address</label>
                <input
                  type='email'
                  {...register('email', {
                    required: mode === 'add' ? 'Email is required' : false,
                    pattern: {
                      value:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                      message: 'Invalid email address'
                    }
                  })}
                  placeholder='Type your email'
                  className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${errors.email ? 'border-red-500' : ''
                    }`}
                  disabled={mode === 'edit'}
                />
                {errors.email && (
                  <span className='text-red-500 text-sm'>
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            {/* type and Image Upload in same line */}
            <div className='grid grid-cols-1 gap-4'>
              {/* type */}
              <div>
                <label className='block mb-2 font-medium'>type</label>
                <select
                  {...register('type', { required: 'type is required' })}
                  className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${errors.type ? 'border-red-500' : ''
                    }`}
                >
                  <option value=''>Select type</option>
                  <option value='user'>User</option>
                  <option value='vendor'>Vendor</option>
                </select>
                {errors.type && (
                  <span className='text-red-500 text-sm'>
                    {errors.type.message}
                  </span>
                )}
              </div>

              {/* Password field with real-time validation */}
              {/* Password field with real-time validation - Only for Add Mode */}
              {mode === 'add' && (
                <>
                  <div>
                    <label className='block mb-2 font-medium'>Password</label>
                    <div className='relative'>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message:
                              'Password must be at least 8 characters long'
                          }
                        })}
                        placeholder='Enter password'
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${errors.password ? 'border-red-500' : ''
                          }`}
                      />
                      <button
                        type='button'
                        onClick={togglePasswordVisibility}
                        className='absolute right-3 top-3 text-gray-500 hover:text-black'
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && (
                      <span className='text-red-500 text-sm'>
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  {/* Re-Password field with real-time validation */}
                  <div>
                    <label className='block mb-2 font-medium'>
                      Re-Password
                    </label>
                    <div className='relative'>
                      <input
                        type={showRePassword ? 'text' : 'password'}
                        {...register('rePassword', {
                          required: 'Please confirm your password',
                          validate: value =>
                            value === watch('password') ||
                            'Passwords do not match'
                        })}
                        placeholder='Re-enter password'
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${errors.rePassword ? 'border-red-500' : ''
                          }`}
                      />
                      <button
                        type='button'
                        onClick={toggleRePasswordVisibility}
                        className='absolute right-3 top-3 text-gray-500 hover:text-black'
                      >
                        {showRePassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {/* Show real-time error message when passwords don't match */}
                    {watch('password') !== watch('rePassword') &&
                      watch('rePassword') &&
                      !errors.rePassword && (
                        <span className='text-red-500 text-sm'>
                          Passwords do not match
                        </span>
                      )}
                    {errors.rePassword && (
                      <span className='text-red-500 text-sm'>
                        {errors.rePassword.message}
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </form>

          {/* Cancel and Save buttons */}
          <div className='flex justify-between items-center px-4 py-4'>
            <button
              onClick={handleCloseModal}
              className='px-4 py-2 border border-gray-400 rounded-lg hover:bg-[#EB5B2A] transform duration-300 hover:text-white hover:border-[#EB5B2A]'
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className='bg-[#EB5B2A] text-md px-4 py-2 text-white rounded-lg'
              disabled={loading}
            >
              {mode === 'add' ? 'Add Member' : 'Update Member'}
            </button>
          </div>
          {loading && (
            <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10'>
              <CircularProgress size={50} style={{ color: '#EB5B2A' }} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AdminMembersAddTable
