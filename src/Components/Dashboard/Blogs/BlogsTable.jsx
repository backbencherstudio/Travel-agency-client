import { FaSearch, FaCheckCircle } from 'react-icons/fa';
import { useState, useEffect, useRef, useCallback } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { LuTrash2 } from 'react-icons/lu';
import { GoDotFill } from 'react-icons/go';
import { FiEdit2, FiPlus } from 'react-icons/fi';
import { debounce } from '../../../Shared/debounce';
import { FaRegSquarePlus } from 'react-icons/fa6';

const statusStyles = {
  Published: {
    color: '#067647',
    backgroundColor: '#ECFDF3',
    border: '1px solid #ABEFC6',
    icon: <FaCheckCircle />
  },
  Hold: {
    color: '#0A3159',
    backgroundColor: '#E7ECF2',
    border: '1px solid #90A9C3',
    icon: <GoDotFill className='text-lg' />
  }
};

const BlogsTable = ({ tableType = '', title, data, columns }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = id => {
    if (tableType === 'user' || tableType === 'blog') {
      navigate(`${id}`);
    }
  };

  const handleStatusChange = status => {
    setSelectedStatus(status);
    setIsOpen(false);
    // Update URL with selected status
    navigate({
      pathname: location.pathname,
      search: `?search=${searchQuery}&status=${status}`
    });
  };

  const handleSearchChange = e => {
    const value = e.target.value;
    setSearchQuery(value);
    // console.log('Search query updated:', value);  
    // Update URL with the search query
    navigate({
      pathname: location.pathname,
      search: `?search=${value}&status=${selectedStatus}`
    });
  };

  // Debounce the handleSearchChange function to optimize search performance
  const debouncedSearchChange = useCallback(
    debounce((value) => handleSearchChange({ target: { value }}), 100),  
    [handleSearchChange]  
  );

  const handleSearchInputChange = (e) => {
    debouncedSearchChange(e.target.value); 
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const statusFromQuery = queryParams.get('status');
    const searchFromQuery = queryParams.get('search');

    if (statusFromQuery) {
      setSelectedStatus(statusFromQuery);
    }

    if (searchFromQuery) {
      setSearchQuery(searchFromQuery);
    }
  }, [location.search]);

  useEffect(() => {
    let filtered = data;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (selectedStatus && selectedStatus !== 'All Status') {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    setFilteredData(filtered);
  }, [searchQuery, selectedStatus, data]);

  const handleAddBlogClick = () => {
    navigate('/dashboard/add-blog'); // Navigate to the 'add-blog' page
  };

  return (
    <>
      <div className='flex flex-col sm:flex-row justify-between items-center py-5'>
        <h1 className='text-[#0D0E0D] text-[20px]'>{title}</h1>
        <div className='flex flex-col items-center sm:flex-row gap-3 my-2 rounded-t-xl'>
          <div className='relative md:col-span-1'>
            <input
              type='text'
              placeholder='Search...'
              className='py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%]'
              value={searchQuery}
              onChange={handleSearchInputChange}  // Use debounced handler here
            />
            <FaSearch className='absolute top-3 left-3 text-zinc-400' />
          </div>

          <div className='flex justify-center' ref={dropdownRef}>
            <div className='relative inline-block text-left'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='inline-flex items-center gap-2 justify-between w-full px-4 py-2 text-sm font-medium text-white bg-[#EB5B2A] rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200'
              >
                {selectedStatus}
                <span>
                  <MdKeyboardArrowDown className='text-xl' />
                </span>
              </button>

              {isOpen && (
                <div className='absolute mt-5 w-56 lg:w-72 py-5 rounded-2xl bg-white border border-gray-200 shadow-lg z-10 right-0'>
                  <div className='absolute top-[-10px] right-10 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45'></div>

                  <div className='bg-white rounded-md'>
                    {/* Status options */}
                    {['All Status', 'Published', 'Hold'].map(status => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`block w-full px-5 py-5 text-left text-sm text-gray-700 hover:bg-gray-200 ${
                          selectedStatus === status
                            ? 'font-bold bg-gray-100'
                            : ''
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Paper style={{ borderRadius: '10px' }}>
        {/* add blog  */}
        <div className='flex justify-end p-5'>
          <button
            onClick={handleAddBlogClick} // Add the click handler
            className='flex text-[14px] items-center gap-1 bg-[#EB5B2A] hover:bg-[#eb5a2ae0] transform duration-300 text-white px-3 py-2 rounded-lg whitespace-nowrap'
          >
            <FaRegSquarePlus className='text-white text-xl' />
            Create Blog
          </button>
        </div>

        <TableContainer sx={{ padding: '16px' }}>
          <Table sx={{ border: '1px solid #e0e0e0' }}>
            <TableHead>
              <TableRow>
                {columns?.title && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Title
                  </TableCell>
                )}
                {columns?.author && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Author
                  </TableCell>
                )}
                {columns?.status && (
                  <TableCell
                    sx={{ color: '#475467', fontSize: '13px', fontWeight: 600 }}
                  >
                    Status
                  </TableCell>
                )}
                {columns?.publishedDate && (
                  <TableCell
                    sx={{
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    Published Date
                  </TableCell>
                )}
                {columns?.modifiedDate && (
                  <TableCell
                    sx={{
                      color: '#475467',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    Modified Date
                  </TableCell>
                )}
                <TableCell
                  sx={{
                    textAlign: 'center',
                    color: '#475467',
                    fontSize: '13px',
                    fontWeight: 600
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className='text-nowrap'>
              {filteredData?.length > 0 ? (
                filteredData
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map(item => (
                    <TableRow
                      key={item?.bookingId}
                      onClick={() => handleRowClick(item.id)}
                    >
                      {columns?.title && (
                        <TableCell style={{ minWidth: '200px' }}>
                          <div className='flex items-center gap-3'>
                            <img
                              className='rounded-lg'
                              src={item.blogImg}
                              alt={item.title}
                              style={{ width: '80px', height: '80px' }}
                            />
                            <span className='truncate text-[#1D1F2C] text-[14px] font-medium'>
                              {item.title}
                            </span>
                          </div>
                        </TableCell>
                      )}
                      {columns?.author && (
                        <TableCell style={{ minWidth: '200px' }}>
                          <p className='truncate text-[#475467]'>
                            {item.author}
                          </p>
                        </TableCell>
                      )}
                      {columns?.status && (
                        <TableCell>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              backgroundColor:
                                statusStyles[item.status]?.backgroundColor ||
                                'transparent',
                              color:
                                statusStyles[item.status]?.color || 'black',
                              padding: '1px 14px',
                              borderRadius: '50px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              border:
                                statusStyles[item.status]?.border || 'none',
                              height: '32px',
                              minWidth: '120px',
                              width: '120px',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden'
                            }}
                          >
                            {statusStyles[item.status]?.icon}
                            <span>{item.status}</span>
                          </span>
                        </TableCell>
                      )}

                      {columns?.publishedDate && (
                        <TableCell>
                          <p className='text-[#475467]'>{item.publishedDate}</p>
                        </TableCell>
                      )}
                      {columns?.modifiedDate && (
                        <TableCell>
                          <p className='text-[#475467]'>{item.modifiedDate}</p>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className='flex items-center justify-center gap-4'>
                          <button className='text-[#475467] hover:text-red-600 transform duration-300'>
                            <LuTrash2 className='text-xl' />
                          </button>
                          <button className='text-[#475467] hover:text-blue-700 transform duration-300'>
                            <FiEdit2 className='text-xl' />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns ? Object.keys(columns).length + 1 : 1}
                    align='center'
                  >
                    <p className='text-[#475467] font-medium py-6'>
                      No data found
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={filteredData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default BlogsTable;
