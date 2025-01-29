// Review.js
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaEye } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import Swal from 'sweetalert2';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TablePagination, Modal, Backdrop, Fade, Box, Button
} from "@mui/material";
import ReviewApis from "../../../Apis/ReviewApis";
import { format } from 'date-fns';
import { Package, User, Calendar } from 'lucide-react';
import { Helmet } from 'react-helmet-async'
const Review = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Modal states
  const [selectedReview, setSelectedReview] = useState(null);
  const [open, setOpen] = useState(false);
  ``

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await ReviewApis.getAllReviews();
      if (response.success) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const filteredData = reviews.filter((item) =>
    item?.package?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await ReviewApis.deleteReview(id);
          if (response.data.success) {
            // Directly update the state instead of fetching
            setReviews(prevReviews => prevReviews.filter(review => review.id !== id));
            Swal.fire('Deleted!', 'Review has been deleted.', 'success');
          } else {
            Swal.fire('Error!', 'Failed to delete the review.', 'error');
          }
        } catch (error) {
          console.error('Error while deleting:', error);
          Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
        }
      }
    });
  };

  // Modal handlers
  const handleOpen = (review) => {
    setSelectedReview(review);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedReview(null);
    setOpen(false);
  };

  return (
    <>  
      <Helmet>
        <title>Around 360 - Review</title>
      </Helmet>
      <div className="flex flex-col sm:flex-row justify-between items-center py-5">
        <h1 className="text-[#0D0E0D] text-[20px] font-semibold">Review</h1>
        <div className="flex flex-col items-center sm:flex-row gap-3 my-2 rounded-t-xl">
          <div className="relative md:col-span-1">
            <input
              type="text"
              placeholder="Search..."
              className="py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute top-3 left-3 text-zinc-400" />
          </div>

          <div className="flex justify-center" ref={dropdownRef}>
            <div className="relative inline-block text-left">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 justify-between w-full px-4 py-2 text-sm font-medium text-white bg-[#EB5B2A] rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-200"
              >
                {"All Status"}
                <span><MdKeyboardArrowDown className="text-xl" /></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Paper style={{ borderRadius: "10px" }}>
        <TableContainer sx={{ padding: "16px" }}>
          <Table sx={{ border: "1px solid #e0e0e0" }}>
            <TableHead>
              <TableRow>
                <TableCell width="20%" sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}>Package Name</TableCell>
                <TableCell width="55%" sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}>Comment</TableCell>
                <TableCell width="9%" sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}>Rating</TableCell>
                <TableCell width="16%" sx={{ textAlign: "center", color: "#475467", fontSize: "13px", fontWeight: 600 }}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="text-nowrap">
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <p className="text-[#475467] font-medium py-6">Loading...</p>
                  </TableCell>
                </TableRow>
              ) : filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell width="25%">
                        <div className="flex items-center gap-3">
                          <span className="truncate text-[#1D1F2C] text-[15px] font-medium">
                            {item.package?.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell 
                        width="50%"
                        sx={{
                          maxWidth: 0, // Forces truncation
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.comment}
                      </TableCell>
                      <TableCell sx={{ fontWeight: '600', width: '9%' }}>{item.rating_value}/5</TableCell>
                      <TableCell width="16%">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-[#475467] hover:text-red-600 transform duration-300"
                          >
                            <LuTrash2 className="text-xl" />
                          </button>
                          <button
                            className="text-[#475467] hover:text-blue-700 transform duration-300"
                            onClick={() => handleOpen(item)}
                          >
                            <FaEye className="text-xl" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <p className="text-[#475467] font-medium py-6">No reviews found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Review Details Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        scroller
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.45)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#EB5B2A] p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Package className="h-6 w-6" />
                  <span className="text-lg font-semibold">
                    Review Details
                  </span>
                </div>
                <span className="px-3 py-1 bg-[#d44718] rounded-full text-sm font-medium">
                  Rating: {selectedReview?.rating_value}/5
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-[#EB5B2A]" />
                  <div>
                    <div className="text-sm text-gray-600">Package</div>
                    <div className="text-black font-medium">
                      {selectedReview?.package?.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-[#EB5B2A]" />
                  <div>
                    <div className="text-sm text-gray-600">User</div>
                    <div className="text-black font-medium">
                      {selectedReview?.user?.name}
                    </div>
                  </div>
                </div>


                <div className="mt-4">
                  <div className="text-sm text-gray-600">Comment</div>
                  <div 
                    className="mt-2 p-4 bg-gray-50 rounded-lg text-black"
                    style={{
                      maxHeight: '120px', // Shows approximately 4-6 lines
                      overflowY: 'auto',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#EB5B2A #f1f1f1'
                    }}
                  >
                    {selectedReview?.comment}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              <Button
                onClick={handleClose}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#EB5B2A",
                  "&:hover": { backgroundColor: "#d44718" }
                }}
              >
                Close
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Review;
