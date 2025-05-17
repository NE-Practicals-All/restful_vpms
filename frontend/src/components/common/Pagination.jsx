import React from 'react';

const Pagination = ({ meta, setPage }) => {
  const { currentPage, totalPages } = meta;

  const pages = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-secondary text-white hover:bg-green-700'
        }`}
      >
        Previous
      </button>

      <div className="flex space-x-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              page === currentPage
                ? 'bg-primary text-white'
                : 'bg-accent text-primary hover:bg-green-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-secondary text-white hover:bg-green-700'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
