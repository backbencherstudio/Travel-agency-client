import { FaEdit, FaEye, FaEyeSlash, FaSearch } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Dialog,
  DialogContent
} from '@mui/material'
import {  FiTrash2 } from 'react-icons/fi'
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


const AdminMembersAddTable = ({ title, data = [], columns = {} }) => {
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
      // Remove email from the payload in edit mode
      if (mode === 'edit') {
        delete formData.email
      }

      if (mode === 'add') {
        // Add new member
        const response = await addUser(formData)
        if (response.success) {
          toast.success('Member added successfully!')
          setFilteredData(prevData => [...prevData, response.data])
        } else {
          toast.error(response.message || 'Failed to add member.')
        }
      } else if (mode === 'edit') {
        // Update existing member
        const response = await updateUser(selectedMember.id, formData)
        if (response.success) {
          toast.success('Member updated successfully!')
          setFilteredData(prevData =>
            prevData.map(member =>
              member.id === selectedMember.id ? response.data : member
            )
          )
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
                placeholder='Search...'
                className='py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%]'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <FaSearch className='absolute top-3 left-3 text-zinc-400' />
            </div>
            <button
              onClick={() => handleOpenModal()}
              className='flex text-[14px] items-center gap-1 bg-[#EB5B2A] hover:bg-[#eb5a2ae0] transform duration-300 text-white px-3 py-2 rounded-lg whitespace-nowrap'
            >
              <FaRegSquarePlus className='text-white text-xl' />
              Admin Member
            </button>
          </div>
        </div>
      </div>
      <Paper style={{ borderRadius: '10px' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.name && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Member
                  </TableCell>
                )}
                {columns.email && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Email
                  </TableCell>
                )}
                {columns.type && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    type
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
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(item => (
                    <TableRow key={item.id}>
                      {columns.name && (
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            {/* <img
                              className='rounded-lg'
                              src={item.memberImg}
                              alt={item.name}
                              style={{ width: '50px', height: '50px' }}
                            /> */}
                            <span className='truncate text-[#1D1F2C] text-[14px] font-medium'>
                              {item.name}
                            </span>
                          </div>
                        </TableCell>
                      )}
                      {columns.email && (
                        <TableCell>
                          <p className='truncate text-[#475467]'>
                            {item.email}
                          </p>
                        </TableCell>
                      )}
                      {columns.type && (
                        <TableCell>
                          <p className='truncate text-[#475467]'>{item.type}</p>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className='flex items-center justify-center gap-4'>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              handleOpenModal(item)
                            }}
                            className='text-blue-500 hover:text-blue-600 transform duration-300'
                          >
                            <FaEdit  className='text-lg' />
                          </button>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

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
                  className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                    errors.name ? 'border-red-500' : ''
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
                  className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                    errors.email ? 'border-red-500' : ''
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
                  className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                    errors.type ? 'border-red-500' : ''
                  }`}
                >
                  <option value=''>Select type</option>
                  <option value='manager'>Manager</option>
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
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                          errors.password ? 'border-red-500' : ''
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
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                          errors.rePassword ? 'border-red-500' : ''
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
