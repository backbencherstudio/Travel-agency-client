import * as React from 'react';
import { FaSearch, FaEye } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import TransactionApis from "../../../Apis/TransectionApis";
import { Modal, Box, Typography, Fade, Backdrop, Button } from '@mui/material';







const BookingTable = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await TransactionApis.getAllTransactions();
      if (response.data.success) {
        setTransactions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredData = transactions.filter((item) =>
    item?.booking?.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // try {
  //   const response = await TransactionApis.deleteTransaction(transactionId);
  //   if (response.data.success) {
  //     fetchTransactions();
  //   }
  // } catch (error) {
  //   console.error("Error deleting transaction:", error);
  // }




  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);





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
          const response = await TransactionApis.deleteTransaction(id);
          if (response.data.success) {
            // Fetch the updated list of transactions
            fetchTransactions();
          } else {
            console.error('Failed to delete the transaction');
          }
        } catch (error) {
          console.error('Error while deleting:', error);
        }
      }
    });
  };



  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center  py-5">
        <h1 className="text-[#0D0E0D] text-[20px] font-semibold">{title}</h1>
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
                <span>
                  <MdKeyboardArrowDown className="text-xl" />
                </span>
              </button>

              {isOpen && (
                <div className="absolute mt-5 w-56 lg:w-72 py-5 rounded-2xl bg-white border border-gray-200 shadow-lg z-10 right-0">
                  <div className="absolute top-[-10px] right-10 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>

                  <div className="bg-white rounded-md">
                    {/* Status Dropdown has been removed */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Paper style={{ borderRadius: "10px" }}>
        <TableContainer sx={{ padding: "16px" }}>
          <Table sx={{ border: "1px solid #e0e0e0" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}
                >
                  Invoice Number
                </TableCell>
                <TableCell
                  sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}
                >
                  Traveler's Name
                </TableCell>
                <TableCell
                  sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}
                >
                  Amount
                </TableCell>
                <TableCell
                  sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    color: "#475467",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="text-nowrap">
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <p className="text-[#475467] font-medium py-6">
                      Loading...
                    </p>
                  </TableCell>
                </TableRow>
              ) : filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <p className="text-[#475467] text-[12px]">
                          #{item.booking?.invoice_number}
                        </p>
                      </TableCell>
                      <TableCell style={{ minWidth: "200px" }}>
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={
                              item.booking?.user?.avatar ||
                              "/default-avatar.png"
                            }
                            alt={item.booking?.user?.name}
                            style={{ width: "40px", height: "40px" }}
                          />
                          <span className="truncate text-[#1D1F2C] text-[15px] font-medium">
                            {item.booking?.user?.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell style={{ minWidth: "200px" }}>
                        <p className="truncate text-[#475467]">
                          ${item?.paid_amount || 0}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full ${
                            item.status === "succeeded"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-[#475467] hover:text-red-600 transform duration-300"
                          >
                            <LuTrash2 className="text-xl" />
                          </button>
                          <button className="text-[#475467] hover:text-blue-700 transform duration-300">
                            <FaEye className="text-xl"onClick={handleOpen} />

      <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.15)', // 25% opacity
            },
          },
        }}
      >
        <Fade in={open}>
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] lg:w-[800px] bg-white border-2 border-[#f2f2f2] shadow-md rounded-[10px] p-4">
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Jhine marneka wada saccha mera
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>

                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <p className="text-[#475467] font-medium py-6">
                      No transactions found
                    </p>
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








    </>
  );
};

export default BookingTable;
