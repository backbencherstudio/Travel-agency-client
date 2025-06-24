import React, { useState } from 'react'
import LeftArrowIcon from '../../assets/user-dashboard/icons/LeftArrowIcon'
import RightArrowIcon from '../../assets/user-dashboard/icons/RightArrowIcon'

export default function TableWithPagination({
  columns,
  data,
  itemsPerPage = 5,
  actions,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="mt-6 border border-[#EAECF0] rounded-lg  ">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[#475467] text-xs font-medium bg-[#F9FAFB] border-b border-[#EAECF0]">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3">
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-4 py-3">Action</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 border-b border-[#EAECF0]">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-[#475467] text-sm">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 space-x-2">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-3 px-6 pb-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 border border-[#D0D5DD] rounded-lg text-sm font-semibold flex${
            currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#344054]'
          }`}
        >
         <LeftArrowIcon/>  Previous
        </button>

        <div className="flex justify-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`size-10 rounded ${
                currentPage === index + 1
                  ? 'bg-[#F9FAFB] text-[#182230]'
                  : 'bg-white text-[#475467]'
              }`}
            >
             {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className={`px-3   border border-[#D0D5DD] rounded-lg text-sm font-semibold flex items-center ${
            currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#344054]'
          }`}
        >
          Next <RightArrowIcon/>
        </button>
      </div>
    </div>
  )
}
