import React from 'react'
import { useForm } from 'react-hook-form';
import axiosClient from '../../../../axiosClient';
import { useQuery } from '@tanstack/react-query';
import ProjectTagApis from '../../../../Apis/PackageTagApis';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const PackageTag = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['tag'],
        queryFn: async () => {
            const url = '/api/admin/tag';
            const response = await axiosClient.get(url);
            return response.data;
        },
    });

    console.log('data', data)
        
    const onSubmit = async (data) => {
        console.log('data', data)
        const res = await ProjectTagApis.save(data);
        console.log('res', res)
        refetch();
    };
    
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="bg-white h-fit pt-8 px-6 pb-6 rounded-lg flex flex-col gap-4">
                <div className="md:grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-8 col-span-2">
                        <h3 className="text-2xl font-semibold text-[#080613]">Tags</h3>
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
                        <div className="flex flex-col justify-start items-start gap-4">
                            <button
                                type="submit"
                                className="border border-[#061D35] px-4 py-2 rounded-full bg-[#061D35] text-base font-semibold text-white hover:bg-white hover:text-[#061D35]"
                            >
                                Save
                            </button>
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
                                    {data?.data?.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell>{category.id}</TableCell>
                                            <TableCell>{category.name}</TableCell>
                                            <TableCell>
                                                {/* Add actions like edit/delete here */}
                                                <button className="text-blue-500 hover:underline">Edit</button>
                                                <button className="text-red-500 hover:underline ml-4">Delete</button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </div>
        </form>
    </div>
  )
}

export default PackageTag