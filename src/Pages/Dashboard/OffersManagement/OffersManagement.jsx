import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import TablePagination from "../../../Shared/TablePagination";
import OfferManagementApis from "~/Apis/OfferManagementApis";

export default function OffersManagement() {
    const title = "Promotional code and offers management";
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState(''); // Status state
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle search query change
    const handleSearchChange = e => {
        const value = e.target.value;
        setSearchQuery(value);
        navigate({
            pathname: location.pathname,
            search: `?search=${value}&status=${status}`
        });
    };

    // Fetch data when the component mounts or the search query/status changes
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await OfferManagementApis.get(searchQuery, status);
                if (response.errors) {
                    setError(response.message);
                } else {
                    setFilteredData(response.data);
                }
            } catch (err) {
                setError('An error occurred while fetching offers.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [searchQuery, status]);

    // Pagination states
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle next and previous page actions
    const handleNextPage = () => {
        setPage(prev => prev + 1);
    };

    const handlePreviousPage = () => {
        setPage(prev => Math.max(0, prev - 1));
    };

    // Handle delete
    const handleDeleteClick = async id => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to undo this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            // Uncomment to perform deletion API call
            // const response = await OfferManagementApis.delete(id);
            // if (response.errors) {
            //     Swal.fire('Error', response.message, 'error');
            // } else {
            //     Swal.fire('Deleted!', 'The offer has been deleted.', 'success');
            //     setFilteredData(prevData => prevData.filter(item => item.id !== id));
            // }
        }
    };

    // Handle editing
    const handleEditClick = id => {
        navigate(`/dashboard/edit-offers/${id}`);
    };

    // Handle viewing offer
    const handleViewOffers = id => {
        navigate(`/dashboard/view-offers/${id}`);
    };

    return (
        <div>
            <div className='flex flex-col sm:flex-row justify-between items-center py-5'>
                <h1 className='text-[#0D0E0D] text-[20px]'>{title}</h1>
                <div className='flex flex-col items-center sm:flex-row gap-3 my-2 rounded-t-xl'>
                    <input
                        type='text'
                        placeholder='Search anything'
                        className='py-1.5 pl-10 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%] placeholder:text-[12px]'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="p-4 bg-white rounded-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full table-auto min-w-[768px]">
                        <thead className='bg-[#F9FAFB] text-[#475467] text-[12px]'>
                            <tr className="text-nowrap">
                                <th className='p-6 rounded-l-lg font-medium'>
                                    Code name
                                </th>
                                <th className='p-6 font-medium'>
                                    Discount type
                                </th>
                                <th className='p-6 font-medium'>
                                    Creation date
                                </th>
                                <th className='p-6 font-medium'>
                                    Expiration date
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
                            {isLoading ? (
                                <tr><td colSpan="7" className="text-center">Loading...</td></tr>
                            ) : error ? (
                                <tr><td colSpan="7" className="text-center text-red-500">{error}</td></tr>
                            ) : (
                                filteredData.map(item => (
                                    <tr className="border-b border-[#EDEDED] text-nowrap text-[#475467] text-[12px] capitalize" key={item.id}>
                                        <td className="p-6">#{item.id}</td>
                                        <td className="p-6 text-sm text-[#1D1F2C]">{item.amount_type}</td>
                                        <td className="p-6">{new Date(item.starts_at).toLocaleDateString()}</td>
                                        <td className="p-6">{new Date(item.expires_at).toLocaleDateString()}</td>
                                        <td className="p-6">
                                            {item.status === 1 ? "Active" : item.status === 2?"Inactive":"Used"}
                                        </td>
                                        <td className="p-6">{item.max_uses | "Unlimited"}</td>
                                        <td className="p-6 flex items-center gap-[10px]">
                                            <svg onClick={e => { e.stopPropagation(); handleViewOffers(item.id) }} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M17.6099 8.21124C18.5762 9.22797 18.5762 10.7727 17.6099 11.7894C15.9801 13.5042 13.1809 15.8337 10.0013 15.8337C6.82171 15.8337 4.02255 13.5042 2.39272 11.7894C1.42638 10.7727 1.42638 9.22797 2.39272 8.21124C4.02255 6.49644 6.82171 4.16699 10.0013 4.16699C13.1809 4.16699 15.9801 6.49644 17.6099 8.21124Z" stroke="#475467" stroke-width="1.5" />
                                                <path d="M12.5013 10.0003C12.5013 11.381 11.382 12.5003 10.0013 12.5003C8.62059 12.5003 7.5013 11.381 7.5013 10.0003C7.5013 8.61961 8.62059 7.50033 10.0013 7.50033C11.382 7.50033 12.5013 8.61961 12.5013 10.0003Z" stroke="#475467" stroke-width="1.5" />
                                            </svg>
                                            <button onClick={e => { e.stopPropagation(); handleEditClick(item.id) }} className='text-red-600 hover:text-red-700 transform duration-300' >
                                                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"> <path d="M1.91476 12.0747C1.94539 11.799 1.9607 11.6612 2.0024 11.5324C2.03941 11.4181 2.09168 11.3093 2.15782 11.209C2.23237 11.096 2.33043 10.9979 2.52655 10.8018L11.3307 1.9976C12.0671 1.26122 13.261 1.26122 13.9974 1.9976C14.7338 2.73398 14.7338 3.92789 13.9974 4.66427L5.19321 13.4684C4.99709 13.6646 4.89903 13.7626 4.78599 13.8372C4.68569 13.9033 4.57692 13.9556 4.46263 13.9926C4.3338 14.0343 4.19597 14.0496 3.92031 14.0802L1.66406 14.3309L1.91476 12.0747Z" stroke="#475467" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                            <button onClick={e => { e.stopPropagation(); handleDeleteClick(item.id) }} className='text-blue-500 hover:text-blue-600 transform duration-300' >
                                                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M10.6667 4.00016V3.46683C10.6667 2.72009 10.6667 2.34672 10.5213 2.06151C10.3935 1.81063 10.1895 1.60665 9.93865 1.47882C9.65344 1.3335 9.28007 1.3335 8.53333 1.3335H7.46667C6.71993 1.3335 6.34656 1.3335 6.06135 1.47882C5.81046 1.60665 5.60649 1.81063 5.47866 2.06151C5.33333 2.34672 5.33333 2.72009 5.33333 3.46683V4.00016M6.66667 7.66683V11.0002M9.33333 7.66683V11.0002M2 4.00016H14M12.6667 4.00016V11.4668C12.6667 12.5869 12.6667 13.147 12.4487 13.5748C12.2569 13.9511 11.951 14.2571 11.5746 14.4488C11.1468 14.6668 10.5868 14.6668 9.46667 14.6668H6.53333C5.41323 14.6668 4.85318 14.6668 4.42535 14.4488C4.04903 14.2571 3.74307 13.9511 3.55132 13.5748C3.33333 13.147 3.33333 12.5869 3.33333 11.4668V4.00016" stroke="#475467" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <TablePagination
                    handleChangePage={handleChangePage}
                    handleNextPage={handleNextPage}
                    handlePreviousPage={handlePreviousPage}
                    page={page}
                    filteredData={filteredData}
                    rowsPerPage={rowsPerPage}
                />
            </div>
        </div>
    );
}
