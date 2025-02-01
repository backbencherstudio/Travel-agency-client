import { FaEdit, FaSearch } from 'react-icons/fa'
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
import {  FiPlus, FiTrash2 } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'
import { CiImageOn } from 'react-icons/ci'
import { FaRegSquarePlus } from 'react-icons/fa6'
import AddEditModal from './AddEditModal'
import CouponApis from '../../../../Apis/CouponApis'
import moment from 'moment/moment'
import { LuTrash2 } from 'react-icons/lu'

const CouponTable = ({ title, data = [], columns = {}, getCoupons }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm()
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
    // if (searchQuery) {
    setFilteredData(filtered)
    // }
  }, [searchQuery, data])

  // console.log('filteredData', filteredData)

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

  useEffect(() => {
    if (mode === 'edit' && selectedMember) {
      // Populate form with selected member's data
      setValue('name', selectedMember.name)
      setValue('code', selectedMember.code)
      setValue('description', selectedMember.description)
      setValue('amount_type', selectedMember.amount_type)
      setValue('amount', selectedMember.amount)
      setValue('max_uses', selectedMember.max_uses)
      setValue('max_uses_per_user', selectedMember.max_uses_per_user)
      setValue(
        'starts_at',
        moment(selectedMember.starts_at).format('YYYY-MM-DD')
      )
      setValue(
        'expires_at',
        moment(selectedMember.updated_at).format('YYYY-MM-DD')
      )
      setValue('min_type', selectedMember.min_type)
      setValue('min_amount', selectedMember.min_amount)
      setValue('min_quantity', selectedMember.min_quantity)
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
    setLoading(true)

    // For now, just log the data
    if (mode === 'edit') {
      // console.log('Editing Member', selectedMember.id)
      // console.log('data', data)
      // Make API call to update the member
      const res = await CouponApis.update(selectedMember.id, data)
      console.log('res', res)
      if (res.success) {
        // Reset form and close modal
        reset()
        setOpenModal(false)
        setLoading(false)
        getCoupons()
      }
    } else {
      console.log('data', data)
      console.log('Adding new member')
      // Make API call to add the new member
      const res = await CouponApis.save(data)
      console.log('res', res)
      if (res.success) {
        // Reset form and close modal
        reset()
        setOpenModal(false)
        setLoading(false)
        getCoupons()
      }
    }
  }

  const handleCouponDelete = async (e, id) => {
    e.preventDefault()
    const shouldDelete = window.confirm('Do you want to delete this coupon?')
    if (shouldDelete) {
      try {
        const res = await CouponApis.delete(id)
        getCoupons()
        // Optional: Handle success, e.g., refresh list or show a success message
        console.log('Package deleted successfully:', res)
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Failed to delete package:', error)
      }
    }
  }

  return (
    <div>
      <div className=''>
        <div className='grid gird-col-1 xl:grid-cols-2 items-center py-5 gap-3'>
          <div className='flex flex-col gap-2 '>
            <h1 className='text-[#0D0E0D] text-xl font-semibold'>{title}</h1>
            <p className='text-[#687588] text-sm'>Give discounts by coupons.</p>
          </div>
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
              Add Coupon
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
                    Coupon Name
                  </TableCell>
                )}
                {columns.code && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Coupon Code
                  </TableCell>
                )}
                {columns.description && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Description
                  </TableCell>
                )}
                {columns.amountType && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Amounty type
                  </TableCell>
                )}
                {columns.amount && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Amount
                  </TableCell>
                )}
                {columns.starts_at && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Starts at
                  </TableCell>
                )}
                {columns.expires_at && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Expires at
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
                          <span className='truncate text-[#1D1F2C] text-[14px] font-medium'>
                            {item.name}
                          </span>
                        </TableCell>
                      )}
                      {columns.code && (
                        <TableCell>
                          <span className='truncate text-[#1D1F2C] text-[14px] font-medium'>
                            {item.code}
                          </span>
                        </TableCell>
                      )}
                      {columns.description && (
                        <TableCell>
                          <p className='truncate text-[#475467]'>
                            {item.description}
                          </p>
                        </TableCell>
                      )}
                      {columns.amountType && (
                        <TableCell>
                          <p className='truncate text-[#475467]'>
                            {item.amount_type}
                          </p>
                        </TableCell>
                      )}
                      {columns.amount && (
                        <TableCell>
                          <p className='truncate text-[#475467]'>
                            {item.amount}
                          </p>
                        </TableCell>
                      )}
                      {columns.starts_at && (
                        <TableCell>
                          <p className='truncate text-[#475467]'>
                            {moment(item.starts_at).format('DD MMM YYYY')}
                          </p>
                        </TableCell>
                      )}
                      {columns.expires_at && (
                        <TableCell>
                          <p className='truncate text-[#475467]'>
                            {moment(item.expires_at).format('DD MMM YYYY')}
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
                            className='text-blue-500 hover:text-blue-600 transform duration-300'
                          >
                              <FaEdit  className='text-lg' />
                          </button>
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              handleCouponDelete(e, item.id)
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
      <AddEditModal
        mode={mode}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        loading={loading}
      />
    </div>
  )
}

export default CouponTable
