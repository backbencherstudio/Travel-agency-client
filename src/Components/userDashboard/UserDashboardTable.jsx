import { useEffect, useState } from 'react'
import GreenMark from '../../assets/user-dashboard/icons/GreenMark'
import UpcomingIcon from '../../assets/user-dashboard/icons/UpcomingIcon'
import CancelCross from '../../assets/user-dashboard/icons/CancelCross'
import EditIcon from '../../assets/user-dashboard/icons/EditIcon'
import DeleteIcon from '../../assets/user-dashboard/icons/DeleteIcon'
import { MdOutlinePendingActions } from "react-icons/md";


export default function UserDashboardTable({bookingData,pagination,handleFetchData}) {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange=(page)=>{
    setCurrentPage(page);
    handleFetchData(page);
  }

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
            {bookingData?.map((item, index) => (
              <tr key={index} className="  hover:bg-gray-50 border-b border-[#EAECF0">
                <td className="px-6 py-4 text-[#101828] text-sm font-medium">
                  #{item?.invoice_number}
                </td>
                <td className="px-6 py-4 text-[#475467] text-sm text-nowrap">
                  {item?.booking_date_time?.split('T')?.[0]}
                </td>
                <td className="px-6 py-4 text-[#475467] text-sm">
                  {item?.booking_type}
                </td>
                <td className="px-6 py-4 text-[#475467] text-sm">
                  {item?.total_amount}
                </td>
                <td className="px-6 py-4 flex items-center">
                  <span
                    className={`py-[2px] px-2 rounded-2xl   text-xs font-medium flex items-center gap-1 capitalize ${
                      item.status.toLowerCase() === "complete"
                        ? "bg-[#ECFDF3] text-[#067647] border border-[#ABEFC6]"
                        : item.status === "upcoming"
                        ? "text-[#0A3159] text-xs font-bold bg-[#E7ECF2] border border-[#90A9C3]  "
                        : "bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]"
                    }`}
                  >
                    {item.status.toLowerCase() ==='complete'?<GreenMark/> :item.status.toLowerCase() ==='upcoming'?<UpcomingIcon/>:item?.status?.toLowerCase() === 'pending'? <MdOutlinePendingActions />:<CancelCross/>}
                    {item.status}
                  </span>
                </td>
                {
                  item.status.toLowerCase() ==='upcoming' &&
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
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
          {Array.from({ length: pagination?.totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
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
            handlePageChange(Math.min(pagination?.totalPages, currentPage + 1))
          }
          disabled={currentPage === pagination?.totalPages}
          className={`px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm font-semibold ${
            currentPage === pagination?.totalPages
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
