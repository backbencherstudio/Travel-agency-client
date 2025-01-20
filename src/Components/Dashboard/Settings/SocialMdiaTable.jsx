import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Modal,
  Box,
  CircularProgress
} from '@mui/material'
import { useForm, useFieldArray } from 'react-hook-form'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { AiOutlineDelete } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import { FiEdit2 } from 'react-icons/fi'
import {
  deleteSocialMediaData,
  postSocialMediaData,
  updateSocialMediaData
} from '../../../Apis/SocialMediaCreateAPi'
import { LuTrash2 } from 'react-icons/lu'
import Swal from 'sweetalert2'

const SocialMdiaTable = ({
  data = [],
  columns = {},
  onAddSocialMedia,
  onUpdateSocialMedia,
  fetchData
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentEditId, setCurrentEditId] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset
  } = useForm({
    defaultValues: {
      socialLinks: [{ name: '', iconUrl: '', link: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks'
  })

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen)
    if (!isModalOpen) {
      // If opening the modal for adding, reset the form
      reset({
        socialLinks: [{ name: '', iconUrl: '', link: '' }]
      })
      setIsEditing(false)
      setCurrentEditId(null)
    }
  }

  const openEditModal = id => {
    setIsEditing(true)
    setCurrentEditId(id)
    const itemToEdit = data.find(item => item.id === id)
    if (itemToEdit) {
      reset({
        socialLinks: [
          {
            name: itemToEdit.name,
            iconUrl: itemToEdit.icon,
            link: itemToEdit.url
          }
        ]
      })
    }
    setIsModalOpen(true)
  }

  const handleDelete = async id => {
    try {
      const confirmDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won’t be able to undo this action!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      })
      if (!confirmDelete.isConfirmed) return

      setLoading(true) 

      await deleteSocialMediaData(id) 
      fetchData() 

      Swal.fire({
        title: 'Deleted!',
        text: 'Your social media data has been deleted.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Failed to delete social media data:', error)
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete social media data. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async formData => {
    setLoading(true)
    try {
      const formattedData = formData.socialLinks.map(link => ({
        name: link.name,
        url: link.link,
        icon: link.iconUrl
      }))

      if (isEditing) {
        const response = await updateSocialMediaData(
          currentEditId,
          formattedData[0]
        )
        console.log('Updated social media data:', response)
        // onUpdateSocialMedia(currentEditId, response); // Call parent update function
        // fetchData();
      } else {
        const addedData = await Promise.all(
          formattedData.map(async socialMedia => {
            const response = await postSocialMediaData(socialMedia)
            return response
          })
        )

        addedData.forEach(newItem => onAddSocialMedia(newItem)) // Call parent add function
      }
      fetchData()
      setIsModalOpen(false) // Close the modal
    } catch (error) {
      console.error('Failed to save social media data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <div>
      <div className='p-4 sm:p-6'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-10'>
          <div>
            <h2 className=' text-lg sm:text-xl font-semibold mb-2 text-[#080613]'>
              Manage Social & Copyright Information
            </h2>
            <p className='text-[#687588] text-sm'>
              Update Your Company's Social Here
            </p>
          </div>
          <div>
            <button
              onClick={handleModalToggle}
              className='flex text-[14px] mt-5 sm:mt-0 items-center gap-1 bg-[#EB5B2A] hover:bg-[#eb5a2ae0] transform duration-300 text-white px-3 py-2 rounded-lg whitespace-nowrap'
            >
              <FaRegSquarePlus className='text-white text-xl' />
              Add Social
            </button>
          </div>
        </div>

        <Paper style={{ borderRadius: '10px' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.name && (
                    <TableCell
                      sx={{
                        color: '#475467',
                        fontSize: '13px',
                        fontWeight: 600
                      }}
                    >
                      Name
                    </TableCell>
                  )}
                  {columns.url && (
                    <TableCell
                      sx={{
                        color: '#475467',
                        fontSize: '13px',
                        fontWeight: 600
                      }}
                    >
                      Link
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
                {paginatedData.length > 0 ? (
                  paginatedData.map(item => (
                    <TableRow key={item.id}>
                      {columns.name && (
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <img
                              className='rounded-lg'
                              src={item.icon}
                              alt={item.name}
                              style={{ width: '40px', height: '40px' }}
                            />
                            <span className='truncate text-[#1D1F2C] text-[14px] font-medium'>
                              {item.name}
                            </span>
                          </div>
                        </TableCell>
                      )}
                      {columns.url && (
                        <TableCell>
                          <p className='truncate text-[#475467]'>{item.url}</p>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className='flex items-center justify-center gap-4'>
                          <button
                            className='text-[#475467] hover:text-blue-700 transform duration-300'
                            onClick={() => openEditModal(item.id)}
                          >
                            <FiEdit2 className='text-xl' />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className='text-red-600 hover:text-red-700 transform duration-300'
                          >
                            <LuTrash2 className='text-xl' />
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
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Modal */}
        <Modal open={isModalOpen} onClose={handleModalToggle}>
          <Box
            sx={{
              width: '90%',
              maxWidth: 500,
              maxHeight: '90vh',
              overflowY: 'auto',
              bgcolor: 'background.paper',
              p: 4,
              mx: 'auto',
              my: '10%',
              borderRadius: 2,
              boxShadow: 24
            }}
          >
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-lg font-semibold'>
                {isEditing ? 'Edit Social Link' : 'Add Social Link'}
              </h3>
              <button
                className='text-2xl text-red-600 cursor-pointer'
                onClick={handleModalToggle}
              >
                <RxCross2 />
              </button>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit(handleSave)}>
              <div className='max-h-96 overflow-y-auto px-2'>
                {fields.map((field, index) => (
                  <div key={field.id} className='mb-4'>
                    <div className='flex justify-between items-center mt-3 mb-2'>
                      <label className='text-sm font-medium text-gray-700'>
                        Link {index + 1}
                      </label>
                      {index > 0 && (
                        <button
                          type='button'
                          onClick={() => remove(index)}
                          className='text-red-500 hover:text-red-700'
                        >
                          <AiOutlineDelete className='text-lg' />
                        </button>
                      )}
                    </div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Social Media Name
                    </label>
                    <input
                      type='text'
                      {...register(`socialLinks.${index}.name`, {
                        required: 'Social Media Name is required'
                      })}
                      className={`w-full p-2 border ${
                        errors.socialLinks?.[index]?.name
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-md focus:outline-none focus:border-orange-400`}
                      placeholder='Enter social media name'
                    />
                    {errors.socialLinks?.[index]?.name && (
                      <p className='text-sm text-red-500 mt-1'>
                        {errors.socialLinks[index].name.message}
                      </p>
                    )}
                    <label className='block text-sm font-medium text-gray-700 mb-1 mt-3'>
                      Social Icon URL
                    </label>
                    <input
                      type='text'
                      {...register(`socialLinks.${index}.iconUrl`, {
                        required: 'Social Icon URL is required',
                        pattern: {
                          value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                          message: 'Invalid URL format'
                        }
                      })}
                      className={`w-full p-2 border ${
                        errors.socialLinks?.[index]?.iconUrl
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-md focus:outline-none focus:border-orange-400`}
                      placeholder='Enter social icon URL'
                    />
                    {errors.socialLinks?.[index]?.iconUrl && (
                      <p className='text-sm text-red-500 mt-1'>
                        {errors.socialLinks[index].iconUrl.message}
                      </p>
                    )}
                    <label className='block text-sm font-medium text-gray-700 mt-3 mb-1'>
                      Social Link
                    </label>
                    <input
                      type='text'
                      {...register(`socialLinks.${index}.link`, {
                        required: 'Social Link is required',
                        pattern: {
                          value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                          message: 'Invalid URL format'
                        }
                      })}
                      className={`w-full p-2 border ${
                        errors.socialLinks?.[index]?.link
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } rounded-md focus:outline-none focus:border-orange-400`}
                      placeholder='Enter social link'
                    />
                    {errors.socialLinks?.[index]?.link && (
                      <p className='text-sm text-red-500 mt-1'>
                        {errors.socialLinks[index].link.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className='flex justify-between gap-2 mt-5'>
                <button
                  type='button'
                  onClick={() => append({ name: '', iconUrl: '', link: '' })}
                  className='text-sm text-orange-500 hover:underline'
                >
                  + Add More
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2'
                  disabled={loading}
                >
                  {loading && <CircularProgress size={20} color='inherit' />}
                  Save
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default SocialMdiaTable
