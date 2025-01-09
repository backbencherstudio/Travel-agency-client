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

} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LuTrash2 } from 'react-icons/lu'
import { FiEdit2, FiPlus } from 'react-icons/fi'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

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

  const navigate = useNavigate()

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
    if (['user', 'blog'].includes(tableType)) {
      navigate(`${id}`)
    }
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }



 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data) // Handle form submission
  }




  return (
    <>
      <div className='py-2 sm:py-0'>
        <div className='flex gap-2 items-center'>
          <h1 className='text-[#0D0E0D] text-[20px]'>{title}</h1>
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
              onClick={handleOpenModal}
              className='flex text-[14px] items-center gap-1 bg-[#EB5B2A] hover:bg-[#eb5a2ae0] transform duration-300 text-white px-3 py-2 rounded-lg whitespace-nowrap'
            >
              <FiPlus className='text-white text-xl' />
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
                      onClick={() => handleRowClick(item.id)}
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
                          <button className='text-[#475467] hover:text-red-600 transform duration-300'>
                            <LuTrash2 className='text-xl' />
                          </button>
                          <button className='text-[#475467] hover:text-blue-700 transform duration-300'>
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
        <DialogTitle>Add Admin Member</DialogTitle>
        <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
          <span className='text-red-500 text-sm'>{errors.name.message}</span>
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
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
          placeholder='Type your email'
          className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && (
          <span className='text-red-500 text-sm'>{errors.email.message}</span>
        )}
      </div>

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
          <option value='Active'>Active</option>
          <option value='Inactive'>Inactive</option>
        </select>
        {errors.status && (
          <span className='text-red-500 text-sm'>{errors.status.message}</span>
        )}
      </div>

      {/* Image Upload */}
      <div>
        <label className='block mb-2 font-medium'>Upload Image</label>
        <input
          type='file'
          {...register('image', { required: 'Image is required' })}
          className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 ${
            errors.image ? 'border-red-500' : ''
          }`}
        />
        {errors.image && (
          <span className='text-red-500 text-sm'>{errors.image.message}</span>
        )}
      </div>

      <button
        type='submit'
        className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600'
      >
        Save
      </button>
    </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            color='primary'
            variant='contained'
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AdminMembersAddTable
