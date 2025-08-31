import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import { FaEdit } from 'react-icons/fa'
import { LuTrash2 } from 'react-icons/lu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../Components/ui/select"
import { UserServices } from '~/userServices/user.services'
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

export default function PackagePlaces() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editServiceId, setEditServiceId] = useState(null)
  const [formData, setFormData] = useState({ latitude: '', longitude: '', type: 'meetingPoint' })
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Fetch services
  const fetchServices = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/admin/extra-service')
      setServices(res.data.data || [])
      setLoading(false)
    } catch (err) {
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      // if (editServiceId) {
      //   await axios.patch(`https://wherever-exposure-arts-amp.trycloudflare.com/api/admin/place/${editServiceId}`, formData)
      // } else {
      //   await axios.post('https://wherever-exposure-arts-amp.trycloudflare.com/api/admin/place', formData)
      // }
      const res = UserServices.createPackagePlaces(formData)
      setFormData({ latitude: '', longitude: '', type: 'meetingPoint' })
      setEditServiceId(null)
      fetchServices()
    } catch (err) {
      alert(err.message || 'Error saving service')
    }
  }

  // Handle edit
  const handleEdit = service => {
    setEditServiceId(service.id)
    setFormData({
      latitude: service.latitude,
      longitude: service.longitude,
      type: service.type
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Handle delete
  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this service?')) return
    try {
      await axios.delete(`/api/admin/extra-service/${id}`)
      fetchServices()
      setPage(0)
    } catch (err) {
      alert(err.message || 'Error deleting service')
    }
  }

  const handleCancelEdit = () => {
    setEditServiceId(null)
    setFormData({ latitude: '', longitude: '', type: 'meetingPoint' })
  }

  // Pagination logic
  const displayedServices = services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  const totalPages = Math.ceil(services.length / rowsPerPage)

  return (
    <div className='p-6'>
      <Helmet>
        <title>Around 360 - Package Extra Service</title>
      </Helmet>

      {/* Form */}
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg mb-6'>
        <h3 className='text-2xl font-semibold mb-4'>
          {editServiceId ? 'Edit Service' : 'Add Service'}
        </h3>

        <div className='grid md:grid-cols-2 gap-4 mb-4'>
          <div>
            <label className='block mb-1'>Latitude</label>
            <input
              type='text'
              value={formData.latitude}
              onChange={e => setFormData({ ...formData, latitude: e.target.value })}
              className='w-full p-2 border rounded outline-none'
              required
            />
          </div>
          <div>
            <label className='block mb-1'>Longitude</label>
            <input
              type='text'
              value={formData.longitude}
              onChange={e => setFormData({ ...formData, longitude: e.target.value })}
              className='w-full p-2 border rounded outline-none'
              required
            />
          </div>
          <div>
            <label className='block mb-1'>Name</label>
            <input
              type='text'
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className='w-full p-2 border rounded outline-none'
              required
            />
          </div>
          <div>
            <label className='block mb-1'>Address</label>
            <input
              type='text'
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className='w-full p-2 border rounded outline-none'
              required
            />
          </div>
          <div>
            <label className='block mb-1'>Country</label>
            <Select
              value={formData.country}
              onValueChange={(value) => setFormData({ ...formData, country: value })}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usa">USA</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className='block mb-1'>Country</label>
            <Select
              value={formData.city}
              onValueChange={(value) => setFormData({ ...formData, city: value })}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usa">USA</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
              </SelectContent>
            </Select>
          </div>


          <div>
            <label className='block mb-1'>Type</label>
            <select
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
              className='w-full p-2 border rounded'
              required
            >
              <option value='meetingPoint'>Meeting Point</option>
              <option value='pickupPoint'>Pickup Point</option>
              <option value='endPoint'>End Point</option>
            </select>
          </div>
        </div>

        <div className='flex gap-2'>
          {editServiceId && (
            <button
              type='button'
              onClick={handleCancelEdit}
              className='px-4 py-2 border text-red-500 rounded'
            >
              Cancel
            </button>
          )}
          <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded'>
            {editServiceId ? 'Update' : 'Save'}
          </button>
        </div>
      </form>

      {/* Table */}
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
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {services
                  ?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map(service => (
                    <TableRow key={service.id}>
                      <TableCell>{service.id}</TableCell>
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
                          <LuTrash2 className='text-lg' />
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
        count={services?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}
