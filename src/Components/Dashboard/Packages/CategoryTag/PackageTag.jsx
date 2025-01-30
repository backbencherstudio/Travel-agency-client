import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axiosClient from '../../../../axiosClient';
import { useQuery, useMutation } from '@tanstack/react-query';
import ProjectTagApis from '../../../../Apis/PackageTagApis';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TablePagination } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { LuTrash2 } from 'react-icons/lu';

const PackageTag = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [editTagId, setEditTagId] = useState(null);
    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Fetch tags
    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['tag'],
        queryFn: async () => {
            const url = '/api/admin/tag';
            const response = await axiosClient.get(url);
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

    // Mutation for saving a new tag
    const saveMutation = useMutation({
        mutationFn: ProjectTagApis.save,
        onSuccess: () => {
            refetch();
            reset();
            setEditTagId(null);
        },
    });

    // Mutation for updating an existing tag
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => axiosClient.patch(`/api/admin/tag/${id}`, data),
        onSuccess: () => {
            refetch();
            reset();
            setEditTagId(null);
        },
    });

    // Mutation for deleting a tag
    const deleteMutation = useMutation({
        mutationFn: (id) => axiosClient.delete(`/api/admin/tag/${id}`),
        onSuccess: () => {
            refetch();
        },
    });

    const onSubmit = async (formData) => {
        if (editTagId) {
            updateMutation.mutate({ id: editTagId, data: formData });
        } else {
            saveMutation.mutate(formData);
        }
    };

    const handleEdit = (tag) => {
        setEditTagId(tag.id);
        setValue('name', tag.name); // Populate the form with selected tag data
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this tag?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleCancelEdit = () => {
        setEditTagId(null);
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="bg-white h-fit pt-8 px-6 pb-6 rounded-lg flex flex-col gap-4">
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col gap-8 col-span-2">
                            <h3 className="text-2xl font-semibold text-[#080613]">
                                {editTagId ? 'Edit Tag' : 'Add Tag'}
                            </h3>
                            {/* Name */}
                            <div>
                                <label className="block text-gray-500 text-base font-medium mb-2">
                                    Tag Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your tag name"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full p-3 text-black rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                )}
                            </div>
                            <div className="flex flex-row justify-start items-center gap-4">
                                <button
                                    type="submit"
                                    className="border border-[#061D35] px-4 py-2 rounded-full bg-[#061D35] text-base font-semibold text-white hover:bg-white hover:text-[#061D35]"
                                >
                                    {editTagId ? 'Update' : 'Save'}
                                </button>
                                {editTagId && (
                                    <button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="border border-[#061D35] px-4 py-2 rounded-full text-red-500 hover:underline"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold text-[#080613] mb-4">Tag List</h3>
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
                                            <TableCell>ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data?.data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((tag) => (
                                            <TableRow key={tag.id}>
                                                <TableCell>{tag.id}</TableCell>
                                                <TableCell>{tag.name}</TableCell>
                                                <TableCell>
                                                    <button type='button'
                                                        className="text-blue-500 text-lg"
                                                        onClick={() => handleEdit(tag)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className="text-red-600 hover:text-red-700 transform duration-300 ml-4"
                                                        onClick={() => handleDelete(tag.id)}
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
    );
};

export default PackageTag;
