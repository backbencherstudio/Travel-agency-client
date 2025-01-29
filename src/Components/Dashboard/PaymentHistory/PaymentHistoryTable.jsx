import * as React from "react";
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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuTrash2 } from "react-icons/lu";
import TransactionApis from "../../../Apis/TransectionApis";
import { Modal, Box, Typography, Fade, Backdrop, Button } from "@mui/material";
import { Receipt, Package, User, Calendar, CreditCard } from "lucide-react";
import { format } from "date-fns";

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
      if (response.success && response.data?.data) {
        setTransactions(response.data.data);
      } else {
        setTransactions([]);
        console.error("Invalid data format received:", response);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredData = Array.isArray(transactions)
    ? transactions.filter((item) =>
        (item?.reference_number || "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTransaction(null);
    setOpen(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await TransactionApis.deleteTransaction(id);
          if (response.data.success) {
            fetchTransactions();
          } else {
            console.error("Failed to delete the transaction");
          }
        } catch (error) {
          console.error("Error while deleting:", error);
        }
      }
    });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency?.toUpperCase() || "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy");
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
                  <div className="bg-white rounded-md"></div>
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
                          #{item?.booking?.invoice_number}
                        </p>
                      </TableCell>
                      <TableCell style={{ minWidth: "200px" }}>
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={item?.avatar || "/default-avatar.png"}
                            alt={item?.booking?.user?.name}
                            style={{ width: "40px", height: "40px" }}
                          />
                          <span className="truncate text-[#1D1F2C] text-[15px] font-medium">
                            {item?.booking?.user?.name}
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
              backgroundColor: "rgba(0, 0, 0, 0.45)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#EB5B2A] p-6 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Receipt className="h-6 w-6" />
                  <span className="text-lg font-semibold">
                    Invoice #{selectedTransaction?.booking?.invoice_number}
                  </span>
                </div>
                <span className="px-3 py-1 bg-[#d44718] rounded-full text-sm font-medium capitalize">
                  {selectedTransaction?.status}
                </span>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-black">
                  {formatCurrency(
                    selectedTransaction?.amount,
                    selectedTransaction?.currency
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Amount</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-[#EB5B2A]" />
                  <div>
                    <div className="text-sm text-gray-600">Package</div>
                    <div className="text-black font-medium">
                      {selectedTransaction?.booking?.booking_items[0]?.package?.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-[#EB5B2A]" />
                  <div>
                    <div className="text-sm text-gray-600">Client</div>
                    <div className="text-black font-medium">
                      {selectedTransaction?.booking?.user?.name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-[#EB5B2A]" />
                  <div>
                    <div className="text-sm text-gray-600">Date Issued</div>
                    <div className="text-black font-medium">
                      {selectedTransaction?.created_at &&
                        formatDate(selectedTransaction.created_at)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-[#EB5B2A]" />
                  <div>
                    <div className="text-sm text-gray-600">Reference</div>
                    <div className="text-black font-medium font-mono text-sm">
                      {selectedTransaction?.reference_number}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Payment Status</span>
                <span className="text-[#EB5B2A] font-medium capitalize">
                  {selectedTransaction?.status}
                </span>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default BookingTable;
