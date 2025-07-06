import React from 'react';
import PropTypes from 'prop-types';

export default function TablePagination({
  handleChangePage,
  handleNextPage,
  handlePreviousPage,
  page,
  filteredData,
  rowsPerPage
}) {
  const totalPages = Math.ceil(filteredData?.length / rowsPerPage) || 0;
  const showEllipsis = totalPages > 6;
  const lastPagesStart = Math.max(0, totalPages - 6);

  const renderPageNumbers = () => {
    // Always show first page
    const pages = [
      <PageButton
        key={0}
        pageNum={0}
        isActive={page === 0}
        onClick={() => handleChangePage(0)}
      />
    ];

    // Show current page and nearby pages
    if (totalPages > 1) {
      // Calculate window around current page
      let startPage = Math.max(1, page - 1);
      let endPage = Math.min(totalPages - 1, page + 1);

      // Adjust if we're at the beginning or end
      if (page <= 2) endPage = Math.min(4, totalPages - 1);
      if (page >= totalPages - 3) startPage = Math.max(totalPages - 5, 1);

      // Add ellipsis after first page if needed
      if (startPage > 1) {
        pages.push(
          <span key="ellipsis-start" className="px-2 text-[12px] sm:text-base">⋯</span>
        );
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        if (i > 0 && i < totalPages - 1) {
          pages.push(
            <PageButton
              key={i}
              pageNum={i}
              isActive={page === i}
              onClick={() => handleChangePage(i+1)}
            />
          );
        }
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 2) {
        pages.push(
          <span key="ellipsis-end" className="px-2 text-[12px] sm:text-base">⋯</span>
        );
      }

      // Always show last page if there's more than one page
      if (totalPages > 1) {
        pages.push(
          <PageButton
            key={totalPages - 1}
            pageNum={totalPages - 1}
            isActive={page === totalPages - 1}
            onClick={() => handleChangePage(totalPages - 1)}
          />
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-between items-center sm:px-5 pb-4">
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-between w-full">
        {/* Previous Button */}
        <PaginationButton
          onClick={handlePreviousPage}
          disabled={page === 0}
          direction="previous"
        />

        {/* Page numbers */}
        {filteredData?.length > 0 && (
          <div className="flex gap-1 items-center">
            {renderPageNumbers()}
          </div>
        )}

        {/* Next Button */}
        <PaginationButton
          onClick={handleNextPage}
          disabled={(page + 1) * rowsPerPage >= filteredData?.length}
          direction="next"
        />
      </div>
    </div>
  );
}

TablePagination.propTypes = {
  handleChangePage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  filteredData: PropTypes.array,
  rowsPerPage: PropTypes.number.isRequired
};

const PaginationButton = ({ onClick, disabled, direction }) => {
  const isPrevious = direction === "previous";
  const iconPath = isPrevious 
    ? "M15.8333 9.99996H4.16663M4.16663 9.99996L9.99996 15.8333M4.16663 9.99996L9.99996 4.16663"
    : "M4.16675 9.99996H15.8334M15.8334 9.99996L10.0001 4.16663M15.8334 9.99996L10.0001 15.8333";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 border border-[#D0D5DD] rounded-lg ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
      } transition-colors duration-200`}
      aria-label={isPrevious ? "Previous page" : "Next page"}
    >
      <div className="flex items-center gap-1 text-[12px] sm:text-base">
        {!isPrevious && <span>Next</span>}
        <svg 
          className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]" 
          viewBox="0 0 20 20" 
          fill="none"
          aria-hidden="true"
        >
          <path 
            d={iconPath} 
            stroke={disabled ? "#D0D5DD" : "#344054"} 
            strokeWidth="1.66667" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
        {isPrevious && <span>Previous</span>}
      </div>
    </button>
  );
};

PaginationButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  direction: PropTypes.oneOf(["previous", "next"]).isRequired
};

const PageButton = ({ pageNum, isActive = false, onClick }) => (
  <button
    onClick={onClick}
    className={`text-sm sm:text-base px-2 sm:px-3 sm:py-1 rounded-md transition-colors duration-200 ${
      isActive 
        ? 'bg-[#F9FAFB] text-[#182230] font-medium' 
        : 'hover:bg-gray-100 text-gray-600'
    }`}
    aria-label={`Go to page ${pageNum + 1}`}
    aria-current={isActive ? "page" : undefined}
  >
    {pageNum + 1}
  </button>
);

PageButton.propTypes = {
  pageNum: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};