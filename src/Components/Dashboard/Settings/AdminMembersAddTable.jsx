import { FaSearch } from 'react-icons/fa'
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
import { useNavigate } from 'react-router-dom'
import { FiEdit2, FiPlus } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'
import { CiImageOn } from 'react-icons/ci'
import { FaRegSquarePlus } from 'react-icons/fa6'

const AdminMembersAddTable = ({
  tableType = '',
  title,
  data = [],
  columns = {}
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(data)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openModal, setOpenModal] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [mode, setMode] = useState('add')
  const [selectedMember, setSelectedMember] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const filtered = data.filter(
      item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredData(filtered)
  }, [searchQuery, data])

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
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (mode === 'edit' && selectedMember) {
      // Populate form with selected member's data
      setValue('name', selectedMember.name)
      setValue('email', selectedMember.email)
      setValue('status', selectedMember.status)
      setImagePreview(selectedMember.image || null)
    }
  }, [mode, selectedMember, setValue])

  // Handle image upload
  const handleImageUpload = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setValue('logo', reader.result)
        setImageError(false)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle image deletion (clear the selected image)
  const handleImageDelete = () => {
    setImagePreview(null)
    setValue('logo', null)
  }

  // Handle form submission
  const onSubmit = async data => {
    if (!imagePreview) {
      setImageError(true)
      return
    }

    setLoading(true)

    setTimeout(() => {
      console.log('Form Data:', data)

      // Reset form and close modal
      reset()
      setImagePreview(null)
      setImageError(false)
      setOpenModal(false)
      setLoading(false)

      // For now, just log the data
      if (mode === 'edit') {
        console.log('Editing Member', selectedMember.id)
        // Make API call to update the member
      } else {
        console.log('Adding new member')
        // Make API call to add the new member
      }
    }, 2000)
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
                {columns.status && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Status
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
                    <TableRow
                      key={item.id}
                     
                    >
                      {columns.name && (
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <img
                              className='rounded-lg'
                              src={item.memberImg}
                              alt={item.name}
                              style={{ width: '50px', height: '50px' }}
                            />
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
                      {columns.status && (
                        <TableCell>
                          <p className='truncate text-[#475467]'>
                            {item.status}
                          </p>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className='flex items-center justify-center gap-4'>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              handleOpenModal(item)
                            }}
                            className='text-[#475467] hover:text-blue-700 transform duration-300'
                          >
                            <FiEdit2 className='text-xl' />
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
                    required: 'Email is required',
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
                />
                {errors.email && (
                  <span className='text-red-500 text-sm'>
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            {/* Status and Image Upload in same line */}
            <div className='grid grid-cols-1 gap-4'>
              {/* Status */}
              <div>
                <label className='block mb-2 font-medium'>Status</label>
                <select
                  {...register('status', { required: 'Status is required' })}
                  className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
                    errors.status ? 'border-red-500' : ''
                  }`}
                >
                  <option value=''>Select Status</option>
                  <option value='Manager'>Manager</option>
                  <option value='Co-Member'>Co-Member</option>
                </select>
                {errors.status && (
                  <span className='text-red-500 text-sm'>
                    {errors.status.message}
                  </span>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className='block mb-2 font-medium'>Upload Image</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='hidden'
                  id='logoUpload'
                />
                <label
                  htmlFor='logoUpload'
                  className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-400 transition-colors block'
                >
                  {imagePreview ? (
                    <div className='flex flex-col items-center gap-2'>
                      <div className='relative'>
                        <img
                          src={imagePreview}
                          alt='Preview'
                          className='w-32 h-32 object-contain'
                        />
                        <button
                          type='button'
                          onClick={handleImageDelete}
                          className='absolute top-0 right-0 text-red-500'
                        >
                          <IoMdClose size={20} />
                        </button>
                      </div>
                      <span className='text-sm text-gray-500'>
                        Click to change image
                      </span>
                    </div>
                  ) : (
                    <p className='flex justify-center gap-2 items-center'>
                      <CiImageOn className='text-xl' />
                      <span className='text-gray-500'>Choose file</span>
                    </p>
                  )}
                </label>
                {imageError && (
                  <span className='text-red-500 text-sm'>
                    Please upload a logo
                  </span>
                )}
              </div>
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
              Save
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
