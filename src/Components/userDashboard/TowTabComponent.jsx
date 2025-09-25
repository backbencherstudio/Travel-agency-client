import React, { useEffect, useState } from "react";
import TableWithPagination from "../../Components/userDashboard/TableWithPagination";
import GreenMark from "../../assets/user-dashboard/icons/GreenMark";
import UpcomingIcon from "../../assets/user-dashboard/icons/UpcomingIcon";
import CancelCross from "../../assets/user-dashboard/icons/CancelCross";
import DeleteIcon from "../../assets/user-dashboard/icons/DeleteIcon";
import EditIcon from "../../assets/user-dashboard/icons/EditIcon";
import EyeIcon from "../../assets/user-dashboard/icons/EyeIcon";
import { Link } from "react-router-dom";
import { getAllBookings } from "~/Apis/clientApi/ClientBookApi";
import { MdOutlinePendingActions } from "react-icons/md";


const TwoTabComponent = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [data, setData] = useState();
  const [pagination, setPagination] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const getBookings = async (page, limit) => {
    try {
      setLoading(true);
      const response = await getAllBookings({ page, limit });

      if (!response.success) {
        throw new Error("Failed to fetch bookings");
      }

      setData(response.data);
      setPagination(response?.pagination);
      setError(null);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load booking data. Please try again later.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    getBookings(1, 10);
  }, []);

  const handlePageChange=(page)=>{
    getBookings(page,10);
  }

  return (
    <div className="w-full  ">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 w-full">
        <button
          className={` pb-3 text-base font-semibold w-[50%] ${
            activeTab === "tab1"
              ? "border-b-2 border-[#EB5B2A] text-[#A7411E]"
              : "text-[#667085]"
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Booking
        </button>
        <button
          className={` pb-3 text-base font-semibold w-[50%] ${
            activeTab === "tab2"
              ? "border-b-2 border-[#EB5B2A] text-[#A7411E]"
              : "text-[#667085]"
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Reservation
        </button>
      </div>

      {/* Content Area */}
      <div className="     rounded-b-lg min-h-[150px]">
        {activeTab === "tab1" && (
          <div>
            {/* Tab One Content - Add later */}
            <TableWithPagination
              data={data}
              itemsPerPage={10}
              columns={[
                { key: "invoice_number", label: "Invoice" },
                { key: "booking_date_time", label: "Date" },
                { key: "booking_type", label: "Booking Type" },
                { key: "final_price", label: "Amount" },
                {
                  key: "status",
                  label: "Status",
                  render: (value) => (
                    <span
                      className={`inline-flex items-center gap-1 py-[2px] px-2 rounded-2xl text-xs font-medium capitalize ${
                        value.toLowerCase() === "complete"
                          ? "bg-[#ECFDF3] text-[#067647] border border-[#ABEFC6]"
                          : value.toLowerCase() === "upcoming"
                          ? "text-[#0A3159] font-bold bg-[#E7ECF2] border border-[#90A9C3]"
                          : "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]"
                      }`}
                    >
                      {value.toLowerCase() === "complete" && <GreenMark />}
                      {value.toLowerCase() === "upcoming" && <UpcomingIcon />}
                      {value.toLowerCase() === "cancelled" && <CancelCross />}
                      {value.toLowerCase() === "pending" && <MdOutlinePendingActions />}
                      {value}
                    </span>
                  ),
                },
              ]}
              pagination={pagination}
              handlePageChange={handlePageChange}
              actions={(row) =>
                row?.status?.toLowerCase() === "upcoming" && (
                  <>
                    <button>
                      <DeleteIcon />
                    </button>
                    <button>
                      <EditIcon />
                    </button>
                  </>
                )
              }
            />
          </div>
        )}
        {activeTab === "tab2" && (
          <div>
            <TableWithPagination
              data={data}
              itemsPerPage={10}
              columns={[
                { key: "invoice_number", label: "Invoice" },
                { key: "booking_date_time", label: "Date" },
                { key: "booking_type", label: "Booking Type" },
                { key: "final_price", label: "Amount" },
                {
                  key: "action",
                  label: "Action",
                  render: (row) => (
                    <Link to="/user-dashboard/tour-management/reservation-details">
                      <EyeIcon />
                    </Link>
                  ),
                },
              ]}
              pagination={pagination}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoTabComponent;
