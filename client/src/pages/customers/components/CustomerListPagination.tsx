import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
  totalItems: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  indexOfFirstItem,
  indexOfLastItem,
}: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages around current
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }

    return range;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 bg-white">
      {/* Items per page selector */}
      <div className="flex items-center gap-2 mb-4 sm:mb-0">
        <span className="text-sm text-gray-700">Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
        </select>
        <span className="text-sm text-gray-700">entries</span>
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-300 text-sm
            disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Previous
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {typeof page === "number" ? (
                <button
                  onClick={() => onPageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span className="px-2 text-gray-500">{page}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md border border-gray-300 text-sm
            disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next
        </button>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-700 mt-4 sm:mt-0">
        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(indexOfLastItem, totalItems)}
        </span>{" "}
        of <span className="font-medium">{totalItems}</span> entries
      </div>
    </div>
  );
}
