import React, { useState } from 'react'
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
import { FaEdit} from 'react-icons/fa'
import axiosClient from '../../../axiosClient'
import ProjectExtraServiceApis from '../../../Apis/ProjectExtraServiceApis'
import { Helmet } from 'react-helmet-async'
import { LuTrash2 } from 'react-icons/lu'

const PackageExtraService = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm()
  const [editServiceId, setEditServiceId] = useState(null)
  // Pagination states
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Fetch categories
  const {
    isLoading,
    isError,
    data = [],
    error,
    refetch
  } = useQuery({
    queryKey: ['service'],
    queryFn: async () => {
      const response = await axiosClient.get('/api/admin/extra-service')
      return response.data
    }
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Mutation for saving a new service
  const saveMutation = useMutation({
    mutationFn: ProjectExtraServiceApis.save,
    onSuccess: () => {
      refetch()
      reset()
      setEditServiceId(null)
    }
  })

  // Mutation for updating an existing service
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      axiosClient.patch(`/api/admin/extra-service/${id}`, data),
    onSuccess: () => {
      refetch()
      reset()
      setEditServiceId(null)
    }
  })

  // Mutation for deleting a service
  const deleteMutation = useMutation({
    mutationFn: id => axiosClient.delete(`/api/admin/extra-service/${id}`),
    onSuccess: () => {
      refetch()
      setPage(0)
    }
  })

  const onSubmit = async formData => {
    if (editServiceId) {
      updateMutation.mutate({ id: editServiceId, data: formData })
    } else {
      saveMutation.mutate(formData)
    }
  }

  const handleEdit = service => {
    setEditServiceId(service.id)
    setValue('name', service.name)
    setValue('description', service.description)
    setValue('price', service.price)
  }

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteMutation.mutate(id)
    }
  }

  const handleCancelEdit = () => {
    setEditServiceId(null)
    reset()
  }

  return (
    <div>
      <Helmet>
        <title>Around 360 - Package Extra Service</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        <div className='bg-white h-fit pt-8 px-6 pb-6 rounded-lg flex flex-col gap-4'>
          <div className='md:grid md:grid-cols-2 gap-8'>
            <div className='flex flex-col gap-8 col-span-2'>
              <h3 className='text-2xl font-semibold text-[#080613]'>
                {editServiceId ? 'Edit Service' : 'Add Service'}
              </h3>
              <div className='grid md:grid-cols-2 gap-8 justify-between'>
                {/* Name */}
                <div>
                  <label className='block text-gray-500 text-base font-medium mb-2'>
                    Service Name
                  </label>
                  <input
                    type='text'
                    placeholder='Enter service'
                    {...register('name', { required: 'name is required' })}
                    className='w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600'
                  />
                  {errors.name && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className='w-full'>
                  <label className='block text-gray-500 text-base font-medium mb-2'>
                    Description
                  </label>
                  <input
                    type='text'
                    placeholder='Enter your description'
                    {...register('description', {
                      required: 'Description is required'
                    })}
                    className='w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600'
                  />
                  {errors.description && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className='w-full'>
                  <label className='block text-gray-500 text-base font-medium mb-2'>
                    Price
                  </label>
                  <input
                    type='number'
                    placeholder='Enter your price'
                    {...register('price', { required: 'Price is required' })}
                    className='w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600'
                  />
                  {errors.price && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='flex flex-row justify-start items-center gap-4'>
                {editServiceId && (
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
                  {editServiceId ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>

          <div className='mt-8'>
            <h3 className='text-2xl font-semibold text-[#080613] mb-4'>
              Policy List
            </h3>
            {isLoading ? (
              <div className='flex justify-center items-center'>
                <CircularProgress />
              </div>
            ) : isError ? (
              <p className='text-red-500'>Error: {error.message}</p>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>SL</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.data
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((service,index) => (
                        <TableRow key={service.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{service.name}</TableCell>
                          <TableCell>{service.description}</TableCell>
                          <TableCell>{service.price}</TableCell>
                          <TableCell>
                            <button
                              type='button'
                              className='text-blue-500 text-lg'
                              onClick={() => handleEdit(service)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              type='button'
                              className='text-red-600 hover:text-red-700 transform duration-300 ml-4'
                              onClick={() => handleDelete(service.id)}
                            >
                               <LuTrash2  className='text-lg'/>
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={data?.data?.length}
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

export default PackageExtraService
