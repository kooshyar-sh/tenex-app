import React from "react";
import "./Pagination.scss";

export default function Pagination({
  totalItems = 0,
  itemsPerPage = 5,
  currentPage = 1,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const pagesToShow = () => {
    const pages = [];
    const total = totalPages;
    const current = currentPage;
    const delta = 2;

    let left = Math.max(1, current - delta);
    let right = Math.min(total, current + delta);

    if (left > 2) {
      pages.push(1, "...");
    } else {
      for (let i = 1; i < left; i++) pages.push(i);
    }

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < total - 1) {
      pages.push("...", total);
    } else {
      for (let i = right + 1; i <= total; i++) pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination-container">
      <ul className="custom-pagination">
        <li className={`custom-page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="custom-page-link" onClick={() => goToPage(currentPage - 1)}>
            &laquo;
          </button>
        </li>

        {pagesToShow().map((page, i) => (
          <li
            key={i}
            className={`custom-page-item 
              ${page === currentPage ? "active" : ""} 
              ${page === "..." ? "disabled" : ""}
            `}
          >
            {page === "..." ? (
              <span className="custom-page-link">...</span>
            ) : (
              <button className="custom-page-link" onClick={() => goToPage(page)}>
                {page}
              </button>
            )}
          </li>
        ))}

        <li className={`custom-page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="custom-page-link" onClick={() => goToPage(currentPage + 1)}>
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
}
