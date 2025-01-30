import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination
} from '@mui/material'
import { FaEdit, FaTrash } from 'react-icons/fa'
import axiosClient from '../../../axiosClient'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from 'react-helmet-async'

const Language = () => {
  // Initialize form handling and states
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm()
  const [displayText, setDisplayText] = useState('Add Language')
  const [editLanguageId, setEditLanguageId] = useState(null)
  // Pagination states
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Fetch languages using React Query
  const { data: languages, refetch } = useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const response = await axiosClient.get('/api/admin/language')
      return response.data
    }
  })

  // Update the form's display text based on edit state
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText(editLanguageId ? 'Edit Language' : 'Add Language')
    }, 2000) // Change text after 2 seconds

    return () => clearTimeout(timer) // Cleanup on unmount
  }, [editLanguageId])

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Mutation for saving a new language
  const saveMutation = useMutation({
    mutationFn: data => axiosClient.post('/api/admin/language', data),
    onSuccess: () => {
      toast.success('Language added successfully')
      refetch()
      reset()
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  })

  // Mutation for updating an existing language
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      axiosClient.patch(`/api/admin/language/${id}`, data),
    onSuccess: () => {
      toast.success('Language updated successfully')
      refetch()
      reset()
      setEditLanguageId(null)
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  })

  // Mutation for deleting a language
  const deleteMutation = useMutation({
    mutationFn: id => axiosClient.delete(`/api/admin/language/${id}`),
    onSuccess: () => {
      toast.success('Language deleted successfully')
      refetch()
    },
    onError: error => {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  })

  // Submit handler for adding or updating a language
  const onSubmit = async data => {
    try {
      if (editLanguageId) {
        await updateMutation.mutateAsync({
          id: editLanguageId,
          data: {
            name: data.name,
            code: data.content
          }
        })
      } else {
        await saveMutation.mutateAsync({
          name: data.name,
          code: data.content
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  // Handle edit button click
  const handleEdit = language => {
    event.preventDefault() // Prevent default event
    event.stopPropagation() // Stop event propagation

    setEditLanguageId(language.id)
    setValue('name', language.name) // Set the name field
    setValue('content', language.code) // Set the content field
  }

  // Handle delete button click
  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id)
      }
    })
  }

  // Handle canceling edit mode
  const handleCancelEdit = () => {
    setEditLanguageId(null)
    reset() // Reset the form fields
  }

  return (
    <div>
      <Helmet>
        <title>Around 360 - Language</title>
      </Helmet>
      {/* Form for adding/editing a language */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <div className='bg-white h-fit pt-8 px-6 pb-6 rounded-lg flex flex-col gap-4'>
          <div className='md:grid md:grid-cols-3 gap-8'>
            <div className='flex flex-col gap-8 col-span-2'>
              {/* Display add/edit form heading */}
              <h3 className='text-2xl font-semibold text-[#080613]'>
                {displayText}
              </h3>
              {/* Language Name field */}
              <div>
                <label className='block text-gray-500 text-base font-medium mb-2'>
                  Language Name
                </label>
                <input
                  type='text'
                  placeholder='Enter language name'
                  {...register('name', {
                    required: 'Language name is required'
                  })}
                  className='w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600'
                />
                {errors.name && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.name.message}
                  </p>
                )}
              </div>
              {/* Language Content field */}
              <div>
                <label className='block text-gray-500 text-base font-medium mb-2'>
                  Language Content
                </label>
                <input
                  type='text'
                  placeholder='Enter language content'
                  {...register('content', {
                    required: 'Language content is required'
                  })}
                  className='w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600'
                />
                {errors.content && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.content.message}
                  </p>
                )}
              </div>
              {/* Save/Update and Cancel buttons */}
              <div className='flex flex-row justify-start items-center gap-4'>
                {editLanguageId && (
                  <button
                    type='button'
                    onClick={handleCancelEdit}
                    className='border border-[#061D35] px-4 py-2 rounded-full text-red-500 hover:underline'
                  >
                    Cancel
                  </button>
                )}
                <button
                  type='submit'
                  className='border border-[#061D35] px-4 py-2 rounded-full bg-[#061D35] text-base font-semibold text-white hover:bg-white hover:text-[#061D35]'
                >
                  {editLanguageId ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>

          {/* Language list table */}
          <div className='mt-8'>
            <h3 className='text-2xl font-semibold text-[#080613] mb-4'>
              Language List
            </h3>
            {languages?.data?.length === 0 ? (
              <p>No languages found.</p>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {languages?.data
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map(language => (
                        <TableRow key={language.id}>
                          <TableCell>{language.id}</TableCell>
                          <TableCell>{language.name}</TableCell>
                          <TableCell>{language.code}</TableCell>
                          <TableCell>
                            <div className='flex gap-2'>
                              {/* Edit button */}
                              <button
                                onClick={event => handleEdit(language)}
                                className='flex items-center justify-center text-blue-600 hover:text-blue-800'
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  padding: '0',
                                  margin: '0'
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  style={{ width: '20px', height: '20px' }}
                                />
                              </button>
                              {/* Delete button */}
                              <button
                                onClick={() => handleDelete(language.id)}
                                className='flex items-center justify-center text-red-600 hover:text-red-800'
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  padding: '0',
                                  margin: '0'
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  style={{ width: '20px', height: '20px' }}
                                />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
          {/* Pagination controls */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={languages?.data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </form>
    </div>
  )
}

export default Language
