import React, { useState } from 'react';
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";

const DynamicPagination = ({ totalRecords, recordsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
  
    const renderPaginationItems = () => {
      const items = [];
      items.push(
        <PageItem
          key="first"
          className={currentPage === 1 ? 'disabled' : ''}
          onClick={() => onPageChange(1)}
        >
          First
        </PageItem>
      );
      items.push(
        <PageItem
          key="prev"
          className={currentPage === 1 ? 'disabled' : ''}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </PageItem>
      );
  
      // Determine which page numbers to display
      let startPage, endPage;
      if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
      } else if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
  
      for (let page = startPage; page <= endPage; page++) {
        items.push(
          <PageItem
            key={page}
            className={currentPage === page ? 'active' : ''}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageItem>
        );
      }
  
      items.push(
        <PageItem
          key="next"
          className={currentPage === totalPages ? 'disabled' : ''}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </PageItem>
      );
      items.push(
        <PageItem
          key="last"
          className={currentPage === totalPages ? 'disabled' : ''}
          onClick={() => onPageChange(totalPages)}
        >
          Last
        </PageItem>
      );
      return items;
    };
  
    return (
      <div className="d-flex justify-content-center pt-4">
        <Pagination>{renderPaginationItems()}</Pagination>
      </div>
    );
  };

export default DynamicPagination;