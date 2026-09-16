import React from 'react';
import './Global.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Generate page numbers with intelligent ellipsis (e.g. 1, 2, 3, '...', 10)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      if (start > 2) pages.push('...');

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) pages.push('...');

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const handlePageClick = (page) => {
    if (page === '...' || page === currentPage) return;
    onPageChange(page);
    window.scrollTo({ top: 250, behavior: 'smooth' });
  };

  return (
    <nav className="pagination-container" aria-label="Page navigation">
      <button
        type="button"
        className="pagination-btn pagination-nav-btn"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        aria-label="Previous page"
      >
        ← Prev
      </button>

      <div className="pagination-numbers">
        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                ...
              </span>
            );
          }
          return (
            <button
              key={`page-${p}`}
              type="button"
              className={`pagination-btn pagination-num-btn ${currentPage === p ? 'active' : ''}`}
              onClick={() => handlePageClick(p)}
              aria-current={currentPage === p ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="pagination-btn pagination-nav-btn"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  );
}
