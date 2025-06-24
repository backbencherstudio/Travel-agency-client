'use client'

import { useState } from 'react'
import GreenMark from '../../assets/user-dashboard/icons/GreenMark'
import UpcomingIcon from '../../assets/user-dashboard/icons/UpcomingIcon'
import CancelCross from '../../assets/user-dashboard/icons/CancelCross'
import EditIcon from '../../assets/user-dashboard/icons/EditIcon'
import DeleteIcon from '../../assets/user-dashboard/icons/DeleteIcon'

const bookings = [
  {  invoice: '#INV-001', date: '2025-06-20', bookingType: 'Online', amount: '$120', status: 'Complete' },
  {  invoice: '#INV-002', date: '2025-06-19', bookingType: 'Walk-in', amount: '$200', status: 'Upcoming' },
  { invoice: '#INV-003', date: '2025-06-18', bookingType: 'App', amount: '$80', status: 'Cancelled' },
  { invoice: '#INV-004', date: '2025-06-17', bookingType: 'Online', amount: '$150', status: 'Complete' },
  {  invoice: '#INV-005', date: '2025-06-16', bookingType: 'App', amount: '$300', status: 'Upcoming' },
  {   invoice: '#INV-006', date: '2025-06-15', bookingType: 'Walk-in', amount: '$90', status: 'Complete' },
  {  invoice: '#INV-007', date: '2025-06-14', bookingType: 'Online', amount: '$50', status: 'Cancelled' },
  {  invoice: '#INV-008', date: '2025-06-13', bookingType: 'App', amount: '$70', status: 'Complete' },
  {  invoice: '#INV-009', date: '2025-06-12', bookingType: 'Walk-in', amount: '$100', status: 'Upcoming' },
  {   invoice: '#INV-010', date: '2025-06-11', bookingType: 'Online', amount: '$60', status: 'Complete' },
]

const itemsPerPage = 7

export default function UserDashboardTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(bookings.length / itemsPerPage)

  const paginatedData = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="  mt-6  border border-[#EAECF0] rounded-lg">
      {/* Table */}
      <div className="overflow-x-auto      ">
        <table className="w-full text-sm text-left">
           
          <thead className="  text-[#475467] text-xs font-medium  bg-[#F9FAFB] border-b border-[#EAECF0]">
            <tr>
              <th className="px-6 py-3 ">Invoice</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Booking Type</th>
              <th className="px-6 py-3">Booking Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

            
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="  hover:bg-gray-50 border-b border-[#EAECF0">
                <td className="px-6 py-4 text-[#101828] text-sm font-medium">
                  {item.invoice}
                </td>
                <td className="px-6 py-4 text-[#475467] text-sm ">
                  {item.date}
                </td>
                <td className="px-6 py-4 text-[#475467] text-sm">
                  {item.bookingType}
                </td>
                <td className="px-6 py-4 text-[#475467] text-sm">
                  {item.amount}
                </td>
                <td className="px-6 py-4 flex items-center">
                  
                  <span
                    className={`py-[2px] px-2 rounded-2xl   text-xs font-medium flex items-center gap-1 ${
                      item.status === "Complete"
                        ? "bg-[#ECFDF3] text-[#067647] border border-[#ABEFC6]"
                        : item.status === "Upcoming"
                        ? "text-[#0A3159] text-xs font-bold bg-[#E7ECF2] border border-[#90A9C3]  "
                        : "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]"
                    }`}
                  >
                    {item.status ==='Complete'?<GreenMark/> :item.status==='Upcoming'?<UpcomingIcon/>:<CancelCross/>}
                    {item.status}
                  </span>
                </td>
                {
                  item.status ==='Upcoming' &&
                <td className="px-4 py-3 space-x-2">

                  <button className=" ">
                 <DeleteIcon/>
                  </button>
                  <button className=" ">
                   <EditIcon/>
                  </button>
                </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}

      {/* Prev & Next Justified */}
      <div className="flex justify-between mt-3 px-6 pb-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 border border-[#D0D5DD]  rounded-lg text-sm font-semibold ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#344054]"
          }`}
        >
          Previous
        </button>

        <div className="flex justify-center  ">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={` size-10  rounded   ${
                currentPage === index + 1
                  ? "bg-[#F9FAFB] text-[#182230]"
                  : "bg-white text-[#475467]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          className={`px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm font-semibold ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#344054"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
