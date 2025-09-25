import React, { useEffect, useState } from "react";
import BookingHistory from "../../Components/Home/BookingHistory";
import { getAllBookings } from "../../Apis/clientApi/ClientBookApi";
import Loading from "../../Shared/Loading";
import { Helmet } from "react-helmet-async";

const BookingHistoryTable = () => {
  const [columns] = useState({
    invoice_number: true,
    package_name: true,
    total_amount: true,
    date: true,
    payment_status: true,
    booking_status: true,
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getBookings(1, 10); // load first page initially
  }, []);

  const getBookings = async (page, limit) => {
    try {
      setLoading(true);
      const response = await getAllBookings({ page, limit });

      if (!response.success) {
        throw new Error("Failed to fetch bookings");
      }

      setData(response.data);
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load booking data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = (page, limit) => {
    getBookings(page, limit);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handlePagination(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0);
    handlePagination(1, newLimit);
  };

  return (
    <div>
      <Helmet>
        <title>Around 360 - Booking History</title>
      </Helmet>
      {loading ? (
        <p>
          <Loading />
        </p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <BookingHistory
          title="Booking History"
          data={data}
          columns={columns}
          pagination={pagination}
          handlePagination={handlePagination}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
        />
      )}
    </div>
  );
};

export default BookingHistoryTable;
