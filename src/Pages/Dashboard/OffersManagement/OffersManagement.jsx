import { useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate, useLocation } from 'react-router-dom'
import TablePagination from "../../../Shared/TablePagination";


export default function OffersManagement() {
    const title = "Promotional code and offers management";
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearchChange = e => {
        const value = e.target.value
        setSearchQuery(value)
        // debouncedFetchSearchResults(value, selectedStatus)
        navigate({
            pathname: location.pathname,
            search: `?search=${value}&status=${selectedStatus}`
        })
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);

    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        setPage(newPage);
    };
    const handleNextPage = (event) => {
        setPage(prev => prev + 1)
    };

    const handlePreviousPage = () => {
        setPage(prev => Math.max(0, prev - 1))
    }

    const [filteredData, setFilteredData] = useState([
        {
            id: "00001",
            discount_type: "10%",
            created_at: "2025-01-28T04:30:23.562Z",
            expirate_at: "2024-09-25T17:46:00",
            status: -1,
            restricted_use: "05",
        },
        {
            id: "00002",
            discount_type: "$25",
            created_at: "2025-01-28T04:30:23.562Z",
            expirate_at: "2024-09-25T17:46:00",
            status: 0,
            restricted_use: "03",
        },
        {
            id: "00003",
            discount_type: "12%",
            created_at: "2025-01-28T04:30:23.562Z",
            expirate_at: "2024-09-25T17:46:00",
            status: 1,
            restricted_use: "01",
        },
    ])


    const handleDeleteClick = async id => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You wont be able to undo this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        })

        // if (result.isConfirmed) {
        //     try {
        //         const response = await BlogApis.deleteBlogPost(id)
        //         if (response.errors) {
        //             await Swal.fire('Error', response.message, 'error')
        //         } else {
        //             await Swal.fire('Deleted!', 'Your blog has been deleted.', 'success')
        //             setFilteredData(prevData => prevData.filter(item => item.id !== id))
        //         }
        //     } catch (error) {
        //         await Swal.fire('Error', 'An unexpected error occurred.', 'error')
        //         console.error(error)
        //     }
        // }
    }

    const handleEditClick = id => {
        navigate(`/dashboard/edit-offers/${id}`)
    }

    const handleViewOffers = (id) => {
        navigate(`/dashboard/view-offers/${id}`)
    }

    return (
        <div>
            <div className='flex flex-col sm:flex-row justify-between items-center py-5'>
                <h1 className='text-[#0D0E0D] text-[20px]'>{title}</h1>
                <div className='flex flex-col items-center sm:flex-row gap-3 my-2 rounded-t-xl'>
                    <div className='relative md:col-span-1'>
                        <input
                            type='text'
                            placeholder='Search anything'
                            className='py-1.5 pl-10 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%] placeholder:text-[12px]'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <svg className='absolute top-3 left-3 text-zinc-400' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 2.5C4.62665 2.5 2.5 4.62665 2.5 7.25C2.5 9.87335 4.62665 12 7.25 12C9.87335 12 12 9.87335 12 7.25C12 4.62665 9.87335 2.5 7.25 2.5ZM1.5 7.25C1.5 4.07436 4.07436 1.5 7.25 1.5C10.4256 1.5 13 4.07436 13 7.25C13 10.4256 10.4256 13 7.25 13C4.07436 13 1.5 10.4256 1.5 7.25Z" fill="#757D83" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6089 10.6089C10.8042 10.4137 11.1208 10.4137 11.3161 10.6089L14.3536 13.6464C14.5488 13.8417 14.5488 14.1583 14.3536 14.3536C14.1583 14.5488 13.8417 14.5488 13.6464 14.3536L10.6089 11.3161C10.4137 11.1208 10.4137 10.8042 10.6089 10.6089Z" fill="#757D83" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className=" p-4 bg-white rounded-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full table-auto min-w-[768px]">
                        <thead className='bg-[#F9FAFB] text-[#475467] text-[12px]'>
                            <tr className="text-nowrap">
                                <th className='p-6 rounded-l-lg font-medium'>
                                    Code name
                                </th>
                                <th className='p-6  font-medium'>
                                    Discount type
                                </th>
                                <th className='p-6  font-medium'>
                                    <div className="flex items-center gap-1">
                                        <span>Creation date</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                                        </svg>
                                    </div>
                                </th>
                                <th className='p-6 font-medium'>
                                    <div className="flex items-center gap-1">
                                        <span>Expiration date</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 8.00314C4.674 7.83229 4.951 7.83229 5.12186 8.00314L7 9.88128L8.87814 8.00314C9.049 7.83229 9.326 7.83229 9.49686 8.00314C9.66771 8.174 9.66771 8.451 9.49686 8.62186L7.30936 10.8094C7.1385 10.9802 6.8615 10.9802 6.69064 10.8094L4.50314 8.62186C4.33229 8.451 4.33229 8.174 4.50314 8.00314Z" fill="#757D83" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.50314 5.99686C4.674 6.16771 4.951 6.16771 5.12186 5.99686L7 4.11872L8.87814 5.99686C9.049 6.16771 9.326 6.16771 9.49686 5.99686C9.66771 5.826 9.66771 5.549 9.49686 5.37814L7.30936 3.19064C7.1385 3.01979 6.8615 3.01979 6.69064 3.19064L4.50314 5.37814C4.33229 5.549 4.33229 5.826 4.50314 5.99686Z" fill="#757D83" />
                                        </svg>
                                    </div>
                                </th>
                                <th className='p-6 font-medium'>
                                    Code status
                                </th>
                                <th className='p-6 font-medium'>
                                    Restricted usage
                                </th>
                                <th className='p-6 rounded-r-lg font-medium'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData?.map(item => (
                                    <tr className="border-b border-[#EDEDED] text-nowrap text-[#475467] text-[12px] capitalize">
                                        <td className="p-6">#{item.id}</td>
                                        <td className="p-6 text-sm text-[#1D1F2C]">{item.discount_type}</td>
                                        <td className="p-6">{new Date(item.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short', // "Jun" for June
                                            day: 'numeric'  // "25"
                                        })}</td>
                                        <td className="p-6">{new Date(item.expirate_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short', // "Jun" for June
                                            day: 'numeric'  // "25"
                                        })}</td>
                                        <td className="p-6">{item.status === 0 ?
                                            <div className="flex items-center gap-1 text-[#067647] w-full border border-[#ABEFC6] bg-[#ECFDF3] py-1 px-3 rounded-full justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                                                    <path d="M10.5 3L5 8.5L2.5 6" stroke="#17B26A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <span>Active</span>
                                            </div> : item.status === 1 ?
                                                <div className="flex items-center gap-1 text-[#0A3159] w-full border border-[#90A9C3] bg-[#E7ECF2] py-1 px-3 rounded-full justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none">
                                                        <circle cx="3" cy="3" r="3" fill="#0E457D" />
                                                    </svg>
                                                    <span>Used</span>
                                                </div>
                                                :
                                                <div className="flex items-center gap-1 text-[#B42318] w-full border border-[#FECDCA] bg-[#FEF3F2] py-1 px-3 rounded-full justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M8.5 3.5L3.5 8.5M3.5 3.5L8.5 8.5" stroke="#B42318" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span>Inactive</span>
                                                </div>
                                        }</td>
                                        <td className="p-6">
                                            {
                                                item.restricted_use
                                            }
                                        </td>
                                        <td className="p-6 flex items-center gap-[10px]">
                                            <svg onClick={e => {
                                                e.stopPropagation()
                                                handleViewOffers(item.id)
                                            }} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M17.6099 8.21124C18.5762 9.22797 18.5762 10.7727 17.6099 11.7894C15.9801 13.5042 13.1809 15.8337 10.0013 15.8337C6.82171 15.8337 4.02255 13.5042 2.39272 11.7894C1.42638 10.7727 1.42638 9.22797 2.39272 8.21124C4.02255 6.49644 6.82171 4.16699 10.0013 4.16699C13.1809 4.16699 15.9801 6.49644 17.6099 8.21124Z" stroke="#475467" stroke-width="1.5" />
                                                <path d="M12.5013 10.0003C12.5013 11.381 11.382 12.5003 10.0013 12.5003C8.62059 12.5003 7.5013 11.381 7.5013 10.0003C7.5013 8.61961 8.62059 7.50033 10.0013 7.50033C11.382 7.50033 12.5013 8.61961 12.5013 10.0003Z" stroke="#475467" stroke-width="1.5" />
                                            </svg>
                                            <button
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    handleEditClick(item.id)
                                                }}

                                                className='text-red-600 hover:text-red-700 transform duration-300'
                                            >
                                                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M1.91476 12.0747C1.94539 11.799 1.9607 11.6612 2.0024 11.5324C2.03941 11.4181 2.09168 11.3093 2.15782 11.209C2.23237 11.096 2.33043 10.9979 2.52655 10.8018L11.3307 1.9976C12.0671 1.26122 13.261 1.26122 13.9974 1.9976C14.7338 2.73398 14.7338 3.92789 13.9974 4.66427L5.19321 13.4684C4.99709 13.6646 4.89903 13.7626 4.78599 13.8372C4.68569 13.9033 4.57692 13.9556 4.46263 13.9926C4.3338 14.0343 4.19597 14.0496 3.92031 14.0802L1.66406 14.3309L1.91476 12.0747Z" stroke="#475467" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    handleDeleteClick(item.id)
                                                }}
                                                className='text-blue-500 hover:text-blue-600 transform duration-300'
                                            >
                                                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M10.6667 4.00016V3.46683C10.6667 2.72009 10.6667 2.34672 10.5213 2.06151C10.3935 1.81063 10.1895 1.60665 9.93865 1.47882C9.65344 1.3335 9.28007 1.3335 8.53333 1.3335H7.46667C6.71993 1.3335 6.34656 1.3335 6.06135 1.47882C5.81046 1.60665 5.60649 1.81063 5.47866 2.06151C5.33333 2.34672 5.33333 2.72009 5.33333 3.46683V4.00016M6.66667 7.66683V11.0002M9.33333 7.66683V11.0002M2 4.00016H14M12.6667 4.00016V11.4668C12.6667 12.5869 12.6667 13.147 12.4487 13.5748C12.2569 13.9511 11.951 14.2571 11.5746 14.4488C11.1468 14.6668 10.5868 14.6668 9.46667 14.6668H6.53333C5.41323 14.6668 4.85318 14.6668 4.42535 14.4488C4.04903 14.2571 3.74307 13.9511 3.55132 13.5748C3.33333 13.147 3.33333 12.5869 3.33333 11.4668V4.00016" stroke="#475467" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <TablePagination handleChangePage={handleChangePage} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} page={page} filteredData={filteredData} rowsPerPage={rowsPerPage}/>
            </div>
        </div>
    )
}