import React from 'react';

const Pagination = ({ handlePageChange, currentPage, totalPages }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)} aria-disabled={currentPage === 1}>Previous</a>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)} aria-disabled={currentPage === totalPages}>Next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
