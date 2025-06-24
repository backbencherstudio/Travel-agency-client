import React, { useState } from 'react'
import TableWithPagination from '../../Components/userDashboard/TableWithPagination'
import GreenMark from '../../assets/user-dashboard/icons/GreenMark'
import UpcomingIcon from '../../assets/user-dashboard/icons/UpcomingIcon'
import CancelCross from '../../assets/user-dashboard/icons/CancelCross'
import DeleteIcon from '../../assets/user-dashboard/icons/DeleteIcon'
import EditIcon from '../../assets/user-dashboard/icons/EditIcon'
import EyeIcon from '../../assets/user-dashboard/icons/EyeIcon'
import { Link } from 'react-router-dom'


const bookings = [
  { invoice: '#INV-001', date: '2025-06-20', bookingType: 'Online', amount: '$120', status: 'Complete' },
  { invoice: '#INV-002', date: '2025-06-19', bookingType: 'Walk-in', amount: '$200', status: 'Upcoming' },
  { invoice: '#INV-003', date: '2025-06-18', bookingType: 'App', amount: '$80', status: 'Cancelled' },
  // ... more
]

const DemoData = [
  {
    reservationId: "#R12345",
    packageName: "Holiday Package",
    date: "2025-06-24",
    bookingAmount: "$500",
  },
  {
    reservationId: "#R12346",
    packageName: "Weekend Getaway",
    date: "2025-07-10",
    bookingAmount: "$300",
  },
  {
    reservationId: "#R12347",
    packageName: "Business Trip",
    date: "2025-08-05",
    bookingAmount: "$750",
  },
  {
    reservationId: "#R12347",
    packageName: "Business Trip",
    date: "2025-08-05",
    bookingAmount: "$750",
  },
  {
    reservationId: "#R12347",
    packageName: "Business Trip",
    date: "2025-08-05",
    bookingAmount: "$750",
  },
  {
    reservationId: "#R12347",
    packageName: "Business Trip",
    date: "2025-08-05",
    bookingAmount: "$750",
  },
  {
    reservationId: "#R12347",
    packageName: "Business Trip",
    date: "2025-08-05",
    bookingAmount: "$750",
  },
  {
    reservationId: "#R12347",
    packageName: "Business Trip",
    date: "2025-08-05",
    bookingAmount: "$750",
  },
  {
    reservationId: "#R12347",
    packageName: "Business Trip",
    date: "2025-08-05",
    bookingAmount: "$750",
  },
  {
    reservationId: "#R12347",
    packageName: "Business Trip",
    date: "2025-08-05",
    bookingAmount: "$750",
  },
  // Add more demo data as needed
];

const TwoTabComponent = () => {
  const [activeTab, setActiveTab] = useState('tab1')

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
              data={bookings}
              itemsPerPage={7}
              columns={[
                { key: "invoice", label: "Invoice" },
                { key: "date", label: "Date" },
                { key: "bookingType", label: "Booking Type" },
                { key: "amount", label: "Amount" },
                {
                  key: "status",
                  label: "Status",
                  render: (value) => (
                    <span
                      className={`inline-flex items-center gap-1 py-[2px] px-2 rounded-2xl text-xs font-medium ${
                        value === "Complete"
                          ? "bg-[#ECFDF3] text-[#067647] border border-[#ABEFC6]"
                          : value === "Upcoming"
                          ? "text-[#0A3159] font-bold bg-[#E7ECF2] border border-[#90A9C3]"
                          : "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]"
                      }`}
                    >
                      {value === "Complete" && <GreenMark />}
                      {value === "Upcoming" && <UpcomingIcon />}
                      {value === "Cancelled" && <CancelCross />}
                      {value}
                    </span>
                  ),
                },
              ]}
              actions={(row) =>
                row.status === "Upcoming" && (
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
        {activeTab === "tab2" && <div>
          <TableWithPagination
      data={DemoData}
      itemsPerPage={7}
      columns={[
        { key: "reservationId", label: "Reservation ID" },
        { key: "packageName", label: "Package Name" },
        { key: "date", label: "Date" },
        { key: "bookingAmount", label: "Booking Amount" },
        {
          key: "action",
          label: "Action",
          render: (row) => (
            <Link>
       <EyeIcon/>
            </Link>
          ),
        },
      ]}
     
    />
          </div>}
      </div>
    </div>
  );
}

export default TwoTabComponent
