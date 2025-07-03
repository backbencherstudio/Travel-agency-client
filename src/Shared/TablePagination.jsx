export default function TablePagination({handleChangePage,handleNextPage,handlePreviousPage,page,filteredData,rowsPerPage}){
    return(
        <div className="flex justify-between items-center sm:px-5 pb-4">
          <div className="flex gap-2 items-center justify-between w-full">
            {/* Previous Button */}
            <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 border border-[#D0D5DD] rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-1 text-sm sm:text-base">
                <svg className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                  <path d="M15.8333 9.99996H4.16663M4.16663 9.99996L9.99996 15.8333M4.16663 9.99996L9.99996 4.16663" stroke="#344054" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Previous</span>
              </div>
            </button>

            {/* Page numbers - sliding window with selected always first */}
            {filteredData && <div className="flex gap-1 items-center">
              {(() => {
                const totalPages = Math.ceil(filteredData?.length / rowsPerPage);
                const showEllipsis = totalPages > 6;
                const lastPagesStart = Math.max(0, totalPages - 6);

                // When we're in the last 6 pages, show them all with selected moving through
                if (page >= lastPagesStart) {
                  return Array.from({ length: Math.min(6, totalPages) }, (_, i) => {
                    const pageNum = lastPagesStart + i;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handleChangePage(pageNum)}
                        className={`text-sm sm:text-base px-2 sm:px-3 sm:py-1 rounded-md ${page === pageNum ? 'bg-[#F9FAFB] text-[#182230]' : ''}`}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  });
                }

                // Normal sliding window with selected page first
                return (
                  <>
                    {/* Current page (always first) */}
                    <button
                      onClick={() => handleChangePage(page)}
                      className="px-2 sm:px-3 sm:py-1 rounded-md bg-[#F9FAFB] text-[#182230] text-sm sm:text-base"
                    >
                      {page + 1}
                    </button>

                    {/* Next 2 pages */}
                    {Array.from({ length: 2 }, (_, i) => {
                      const pageNum = page + i + 1;
                      if (pageNum >= totalPages) return null;
                      return (
                        <button
                          key={pageNum}
                          onClick={()=>handleChangePage(pageNum)}
                          className="px-2 sm:px-3 sm:py-1 rounded-md text-sm sm:text-base"
                        >
                          {pageNum + 1}
                        </button>
                      );
                    })}

                    {/* Ellipsis if there are more pages */}
                    {showEllipsis && page + 3 < totalPages - 3 && (
                      <span className="px-2 text-sm sm:text-base">⋯</span>
                    )}

                    {/* Last 3 pages (always shown) */}
                    {showEllipsis && Array.from({ length: 3 }, (_, i) => {
                      const pageNum = totalPages - 3 + i;
                      if (pageNum <= page + 2) return null; // Don't show if already visible
                      return (
                        <button
                          key={pageNum}
                          onClick={()=>handleChangePage(pageNum)}
                          className={`px-2 sm:px-3 sm:py-1 text-sm sm:text-base rounded-md ${page === pageNum ? 'bg-[#F9FAFB] text-[#182230]' : ''}`}
                        >
                          {pageNum + 1}
                        </button>
                      );
                    })}
                  </>
                );
              })()}
            </div>}

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={(page + 1) * rowsPerPage >= filteredData?.length && filteredData}
              className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 border border-[#D0D5DD] rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center gap-1 text-sm sm:text-base">
                <span>Next</span>
                <svg  className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                  <path d="M4.16675 9.99996H15.8334M15.8334 9.99996L10.0001 4.16663M15.8334 9.99996L10.0001 15.8333" stroke="#344054" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>
        </div>
    )
}