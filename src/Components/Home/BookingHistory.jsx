import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import debounce from "lodash.debounce";
import { searchBookings } from "../../Apis/clientApi/ClientBookApi";

const BookingHistory = ({
  title,
  data = [],
  columns = {},
  pagination,
  handlePagination,
  page,rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Debounced function to handle search
  const handleSearch = useCallback(
    debounce(async (query) => {
      if (query.trim()) {
        navigate(`?q=${query}`, { replace: true });
        setLoading(true);
        try {
          const response = await searchBookings(query);
          setFilteredData(response.data);
        } catch (error) {
          console.error("Error during search:", error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate(location.pathname, { replace: true });
        setFilteredData(data);
      }
    }, 500),
    [navigate, location.pathname, data]
  );

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    handleSearch(query);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    if (query.trim()) {
      setLoading(true);
      searchBookings(query)
        .then((response) => setFilteredData(response.data))
        .catch((error) => console.error("Error during data fetch:", error))
        .finally(() => setLoading(false));
    } else {
      setFilteredData(data);
    }
  }, [location.search, data]);

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  }, [handleSearch]);

  return (
    <div className="mx-auto max-w-[1216px] px-4 xl:px-0 py-10 ">
      {/* Title and Search */}
      <div className="flex gap-2 items-center justify-between pb-10">
        <h1 className="text-[#0D0E0D] capitalize text-[20px]">{title}</h1>
        <div className="relative">
          <input
            type="text"
            onChange={handleSearchInputChange}
            placeholder="Search..."
            className="py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%]"
          />
          <FaSearch className="absolute top-3 left-3 text-zinc-400" />
        </div>
      </div>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.invoice_number && (
                  <TableCell sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}>
                    Invoice Number
                  </TableCell>
                )}
                {columns.package_name && (
                  <TableCell sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}>
                    Package Name
                  </TableCell>
                )}
                {columns.total_amount && (
                  <TableCell sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}>
                    Total Amount
                  </TableCell>
                )}
                {columns.payment_status && (
                  <TableCell sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}>
                    Payment Status
                  </TableCell>
                )}
                {columns.date && (
                  <TableCell sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}>
                    Date
                  </TableCell>
                )}
                {columns.booking_status && (
                  <TableCell sx={{ color: "#475467", fontSize: "13px", fontWeight: 600 }}>
                    Booking Status
                  </TableCell>
                )}
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
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={Object.keys(columns).length + 1} align="center">
                    <p className="text-[#475467] font-medium py-6">Loading...</p>
                  </TableCell>
                </TableRow>
              ) : filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    {columns.invoice_number && (
                      <TableCell>
                        <span className="truncate text-[#1D1F2C] text-[14px] font-medium">
                          #{item.invoice_number}
                        </span>
                      </TableCell>
                    )}
                    {columns.package_name && (
                      <TableCell>
                        <p className="truncate text-[#475467]">
                          {item.booking_items[0]?.package?.name || "N/A"}
                        </p>
                      </TableCell>
                    )}
                    {columns.total_amount && (
                      <TableCell>
                        <p className="truncate text-[#475467]">${item.total_amount}</p>
                      </TableCell>
                    )}
                    {columns.payment_status && (
                      <TableCell>
                        <p className="truncate text-[#475467]">
                          <span
                            className={`px-2 py-1 rounded-md ${
                              !item.payment_status || item.payment_status === "pending"
                                ? "bg-red-100 text-red-800"
                                : item.payment_status === "successed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.payment_status || "pending"}
                          </span>
                        </p>
                      </TableCell>
                    )}
                    {columns.date && (
                      <TableCell>
                        <p className="truncate text-[#475467]">
                          {new Date(item.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </TableCell>
                    )}
                    {columns.booking_status && (
                      <TableCell>
                        <p className="truncate text-[#475467]">
                          <span
                            className={`px-2 py-1 rounded-md ${
                              item.status === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </p>
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex items-center justify-center gap-4">
                        <Link to={`/booking-history-review/${item.id}`}>
                          <button className="text-[#475467] hover:text-blue-700 transform duration-300">
                            <FaEye className="text-lg" />
                          </button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={Object.keys(columns).length + 1} align="center">
                    <p className="text-[#475467] font-medium py-6">No data found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={pagination?.totalPages * rowsPerPage || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default BookingHistory;
