import React, { useState } from 'react'
import TablePagination from '../../../Shared/TablePagination'
import {
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Paper,
  // TablePagination,
  Modal,
  Box,
  CircularProgress
} from '@mui/material'
import { useForm, useFieldArray } from 'react-hook-form'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { AiOutlineDelete } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'

import {
  deleteSocialMediaData,
  postSocialMediaData,
  updateSocialMediaData
} from '../../../Apis/SocialMediaCreateAPi'
import { LuTrash2 } from 'react-icons/lu'
import Swal from 'sweetalert2'
import { FaEdit } from 'react-icons/fa'

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
        // console.log('Updated social media data:', response)
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

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  console.log(paginatedData)

  return (
    <div>
      <div className='p-4 sm:p-6'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-10'>
          <div>
            <h2 className=' text-lg sm:text-xl font-semibold mb-2 text-[#080613]'>
              Manage Social & Copyright Information
            </h2>
            <p className='text-[#687588] text-[12px]'>
              Update Your Company's Social Here
            </p>
          </div>
          <div>
            <button
              onClick={handleModalToggle}
              className='flex mt-5 sm:mt-0 items-center gap-1 bg-[#EB5B2A] hover:bg-[#eb5a2ae0] transform duration-300 text-white p-3 rounded-lg whitespace-nowrap font-medium text-[12px]'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10.0052 4.16406V15.8307M4.17188 9.9974H15.8385" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Add Social
            </button>
          </div>
        </div>

        <div className='space-y-4'>
          <div className="w-full overflow-x-auto">
            <table className="w-full table-auto min-w-[768px]">
              <thead className='bg-[#F9FAFB]'>
                <tr className='text-[12px] text-[#475467]'>
                  {columns.name && (
                    <th className='font-medium  p-4 rounded-lg'>
                      <div className='flex items-center gap-1'>
                        <span>Name</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                        </svg>
                      </div>
                    </th>
                  )}
                  {columns.url && (
                    <th className='font-medium  px-5 py-4 rounded-lg'>
                      <div className='flex items-center gap-1'>
                        <span>Link</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                        </svg>
                      </div>
                    </th>
                  )}
                  <th className='font-medium  px-5 py-4 rounded-lg'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map(item => (
                    <tr key={item.id} className=' border-b border-[#F1F2F4] text-[#475467] text-[12px]'>
                      {columns.name && (
                        <td className='p-4'>
                          <div className='flex items-center gap-3'>
                            <img
                              className='rounded-lg'
                              src={item.icon}
                              alt={item.name}
                              style={{ width: '24px', height: '24px' }}
                            />
                            <span className='truncate text-[#1D1F2C] text-[12px] font-medium'>
                              {item.name}
                            </span>
                          </div>
                        </td>
                      )}
                      {columns.url && (
                        <td className='p-4'>
                          <p className='truncate text-[#475467]'>{item.url}</p>
                        </td>
                      )}
                      <td className='p-4'>
                        <div className='flex items-center justify-center gap-4'>
                          <button
                            className='text-blue-500 hover:text-blue-600 transform duration-300'
                            onClick={() => openEditModal(item.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                              <path d="M1.91476 12.5747C1.94539 12.299 1.9607 12.1612 2.0024 12.0324C2.03941 11.9181 2.09168 11.8093 2.15782 11.709C2.23237 11.596 2.33043 11.4979 2.52655 11.3018L11.3307 2.4976C12.0671 1.76122 13.261 1.76122 13.9974 2.4976C14.7338 3.23398 14.7338 4.42789 13.9974 5.16427L5.19321 13.9684C4.99709 14.1646 4.89903 14.2626 4.78599 14.3372C4.68569 14.4033 4.57692 14.4556 4.46263 14.4926C4.3338 14.5343 4.19597 14.5496 3.92031 14.5802L1.66406 14.8309L1.91476 12.5747Z" stroke="#475467" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
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
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          <TablePagination handleChangePage={handleChangePage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} page={page} filteredData={paginatedData} rowsPerPage={rowsPerPage} />
        </div>

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
                      className={`w-full p-2 border ${errors.socialLinks?.[index]?.name
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
                      className={`w-full p-2 border ${errors.socialLinks?.[index]?.iconUrl
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
                      className={`w-full p-2 border ${errors.socialLinks?.[index]?.link
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
