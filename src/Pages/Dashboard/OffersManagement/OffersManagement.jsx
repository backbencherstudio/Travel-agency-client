import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import TablePagination from "../../../Shared/TablePagination";
import OfferManagementApis from "~/Apis/OfferManagementApis";
import CouponTable from "./CouponTable";
import GiftCardTable from "./GiftCardTable";

export default function OffersManagement() {
  const title = "Promotional code and offers management";
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState(""); // Status state
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCoupon, setIsCoupon] = useState(true);

  // Handle search query change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    navigate({
      pathname: location.pathname,
      search: `?search=${value}&status=${status}`,
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
          //   setPage(res?.pagination?.page);
          //   setTotalPages(res?.pagination?.totalPages);
        }
      } catch (err) {
        setError("An error occurred while fetching offers.");
        console.log("Error while fetch : ", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, status]);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle next and previous page actions
  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  // Handle delete
  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
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
  const handleEditClick = (id) => {
    navigate(`/dashboard/edit-offers/${id}`);
  };

  // Handle viewing offer
  const handleViewOffers = (id) => {
    navigate(`/dashboard/view-offers/${id}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center py-5">
        <h1 className="text-[#0D0E0D] text-[20px]">{title}</h1>
      </div>
      <div className="bg-white px-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <button type="button">Coupons</button>
            <button type="button">Gift cards</button>
          </div>
          <div className="flex flex-col items-center sm:flex-row gap-3 my-2 rounded-t-xl">
            <input
              type="text"
              placeholder="Search anything"
              className="py-1.5 px-2 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[100%] placeholder:text-[12px] bg-gray-100"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {isCoupon ? (
          <CouponTable
            isLoading={isLoading}
            error={error}
            handleViewOffers={handleViewOffers}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleChangePage={handleChangePage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            page={page}
            filteredData={filteredData}
            rowsPerPage={rowsPerPage}
            totalPages={totalPages}
          />
        ) : (
          <GiftCardTable
            isLoading={isLoading}
            error={error}
            handleViewOffers={handleViewOffers}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleChangePage={handleChangePage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            page={page}
            filteredData={filteredData}
            rowsPerPage={rowsPerPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
}
