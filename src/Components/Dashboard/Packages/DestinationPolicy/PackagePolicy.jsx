import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TablePagination } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import axiosClient from '../../../../axiosClient';
import ProjectPolicyApis from '../../../../Apis/ProjectPolicyApis';
import { LuTrash2 } from 'react-icons/lu';

const PackagePolicy = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [editPolicyId, setEditPolicyId] = useState(null);
    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    // Fetch categories
    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['policy'],
        queryFn: async () => {
            const response = await axiosClient.get('/api/admin/package-cancellation-policy');
            return response.data;
        },
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    // Mutation for saving a new category
    const saveMutation = useMutation({
        mutationFn: ProjectPolicyApis.save,
        onSuccess: () => {
            refetch();
            reset();
            setEditPolicyId(null);
        },
    });

    // Mutation for updating an existing category
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => axiosClient.patch(`/api/admin/package-cancellation-policy/${id}`, data),
        onSuccess: () => {
            refetch();
            reset();
            setEditPolicyId(null);
        },
    });

    // Mutation for deleting a category
    const deleteMutation = useMutation({
        mutationFn: (id) => axiosClient.delete(`/api/admin/package-cancellation-policy/${id}`),
        onSuccess: () => {
            refetch();
        },
    });

    const onSubmit = async (formData) => {
        if (editPolicyId) {
            updateMutation.mutate({ id: editPolicyId, data: formData });
        } else {
            saveMutation.mutate(formData);
        }
    };

    const handleEdit = (category) => {
        setEditPolicyId(category.id);
        setValue('policy', category.policy);
        setValue('description', category.description);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleCancelEdit = () => {
        setEditPolicyId(null);
        reset();
    };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="bg-white h-fit pt-8 px-6 pb-6 rounded-lg flex flex-col gap-4">
                <div className="md:grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-8 col-span-2">
                        <h3 className="text-2xl font-semibold text-[#080613]">
                            {editPolicyId ? 'Edit Policy' : 'Add Policy'}
                        </h3>
                        <div className='grid md:grid-cols-2 gap-8 justify-between'>
                            {/* Name */}
                            <div>
                                <label className="block text-gray-500 text-base font-medium mb-2">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter policy"
                                    {...register('policy', { required: 'Policy is required' })}
                                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                />
                                {errors.policy && (
                                    <p className="text-red-500 text-xs mt-1">{errors.policy.message}</p>
                                )}
                            </div>
                            <div className='w-full'>
                                <label className="block text-gray-500 text-base font-medium mb-2">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your description"
                                    {...register('description', { required: 'Description is required' })}
                                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-4">
                            {editPolicyId && (
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
                                {editPolicyId ? 'Update' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-[#080613] mb-4">Policy List</h3>
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
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category,index) => (
                                        <TableRow key={category.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{category.policy}</TableCell>
                                            <TableCell>{category.description}</TableCell>
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

export default PackagePolicy