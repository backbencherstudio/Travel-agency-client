import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TablePagination } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import axiosClient from '../../../../axiosClient';
import ProjectDestinationApis from '../../../../Apis/ProjectDestinationApis';
import uploadIcon from '../../../../assets/dashboard/upload-icon.svg';
import { useDropzone } from 'react-dropzone';
import { LuTrash2 } from 'react-icons/lu';

const PackageDestination = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [editDestinationId, setEditDestinationId] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [images, setImages] = useState([]);
    const [countries, setCountry] = useState([]);
    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resCountry = await axiosClient.get('api/admin/country');
                setCountry(resCountry.data.data.map(tag => ({ value: tag.id, label: tag.name })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    // Fetch categories
    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['destination'],
        queryFn: async () => {
            const response = await axiosClient.get('/api/admin/destination');
            return response.data;
        },
    });

    // console.log('data', data)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onImageDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newImages]);
        setIsDragging(false);
    };

    const imageDropzone = useDropzone({
        onDrop: onImageDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        multiple: true,
        onDragEnter: () => setIsDragging(true),
        onDragLeave: () => setIsDragging(false),
    });

    const handleDeleteImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    // console.log('images', images)

    // Mutation for saving a new category
    const saveMutation = useMutation({
        mutationFn: ProjectDestinationApis.save,
        onSuccess: () => {
            refetch();
            reset();
            setImages([]);
            setEditDestinationId(null);
        },
    });

    // Mutation for updating an existing category
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => axiosClient.patch(`/api/admin/destination/${id}`, data),
        onSuccess: () => {
            refetch();
            reset();
            setImages([]);
            setEditDestinationId(null);
        },
    });

    // Mutation for deleting a category
    const deleteMutation = useMutation({
        mutationFn: (id) => axiosClient.delete(`/api/admin/destination/${id}`),
        onSuccess: () => {
            refetch();
        },
    });

    const onSubmit = async (data) => {

        const formDataObject = {
            ...data,
            images: images.map((image) => image.file)
        };

        const form = new FormData();
        for (let key in formDataObject) {
            if (key === 'images') {
                formDataObject[key].forEach((image) => form.append('images', image));
            } else {
                form.append(key, formDataObject[key]);
            }
        }

        for (let pair of form.entries()) {
            // console.log(pair[0], pair[1]);
        }

        if (editDestinationId) {
            updateMutation.mutate({ id: editDestinationId, data: form });
        } else {
            saveMutation.mutate(form);
        }
    };

    const handleEdit = (category) => {
        setEditDestinationId(category.id);
        setValue('name', category.name);
        setValue('description', category.description);
        setValue('country_id', category.country.id);
        setImages(category.destination_images);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleCancelEdit = () => {
        setEditDestinationId(null);
        reset();
    };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="bg-white h-fit pt-8 px-6 pb-6 rounded-lg flex flex-col gap-4">
                <div className="md:grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-8 col-span-2">
                        <h3 className="text-2xl font-semibold text-[#080613]">
                            {editDestinationId ? 'Edit Destination' : 'Add Destination'}
                        </h3>
                        <div className='grid md:grid-cols-2 gap-8 justify-between'>
                            {/* Name */}
                            <div className='w-full'>
                                <label className="block text-gray-500 text-base font-medium mb-2">
                                    Destination Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your destination name"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-500 text-base font-medium mb-2">
                                    Country
                                </label>
                                <select
                                    type="text"
                                    placeholder="Select a country"
                                    {...register('country_id', { required: 'Country is required' })}
                                    className="text-base text-[#C9C9C9] w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                >
                                    <option value="" className="text-base text-[#C9C9C9]">Select a country</option>
                                    {countries.map(cat => (
                                        <option key={cat.value} value={cat.value} className="text-base text-black">{cat.label}</option> // Ensure a return for each <option>
                                    ))}
                                </select>
                                {errors.country_id && (
                                    <p className="text-red-500 text-xs mt-1">{errors.country_id.message}</p>
                                )}
                            </div>
                            <div className='w-full'>
                                <label className="block text-gray-500 text-base font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    type="text"
                                    placeholder="Enter your description"
                                    {...register('description', { required: 'Description is required' })}
                                    className="w-full p-3 h-[165px] text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                                )}
                            </div>
                            {/* Image Upload Section */}
                            <div className="w-full">
                                <h2 className="text-base font-medium text-gray-500 mb-2">Upload Images</h2>
                                <div
                                    {...imageDropzone.getRootProps()}
                                    className={`border border-dashed flex flex-col items-center rounded-lg py-8 cursor-pointer transition ${
                                        isDragging ? 'bg-purple-900/50 border-purple-600' : 'border-gray-200'
                                    }`}
                                >
                                    <img src={uploadIcon} className="bg-[#EB5B2A] p-[10px] rounded-full mb-[6px]" alt="" />
                                    <input {...imageDropzone.getInputProps()} />
                                    <p className="text-xs md:text-base text-black rounded-full">
                                        Drag & Drop or <span className="text-[#EB5B2A]">Choose File</span> to upload
                                    </p>
                                    <p className="mt-1 text-xs md:text-base text-gray-400 text-center">
                                        Supported formats : jpeg, png
                                    </p>
                                </div>
                                <div className="mt-4 flex flex-wrap gap-4 justify-start items-start">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={image.preview || image.image_url}
                                                alt=""
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                onClick={() => handleDeleteImage(index)}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-4">
                            {editDestinationId && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="border border-[#061D35] px-4 py-2 rounded-full text-red-500 hover:underline"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                className="border border-[#061D35] px-4 py-2 rounded-full bg-[#061D35] text-base font-semibold text-white hover:bg-white hover:text-[#061D35]"
                            >
                                {editDestinationId ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-[#080613] mb-4">Destination List</h3>
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <CircularProgress />
                        </div>
                    ) : isError ? (
                        <p className="text-red-500">Error: {error.message}</p>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>SL</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Country</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((category,index) => (
                                        <TableRow key={category.id}>
                                            <TableCell>{index+1}</TableCell>
                                            <TableCell>{category.name}</TableCell>
                                            <TableCell>{category.description}</TableCell>
                                            <TableCell>{category.country.name}</TableCell>
                                            <TableCell>
                                                <button
                                                    type='button'
                                                    className="text-blue-500 text-lg"
                                                    onClick={() => handleEdit(category)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    type='button'
                                                    className="text-red-600 hover:text-red-700 transform duration-300 ml-4"
                                                    onClick={() => handleDelete(category.id)}
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
                    component="div"
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

export default PackageDestination