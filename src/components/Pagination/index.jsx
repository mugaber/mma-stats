import React from 'react'

import { Pagination } from 'react-bootstrap'

const PaginationNav = ({ eventsPerPage, totalEvents, paginate, currentPage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <Pagination>
        <Pagination.First onClick={() => paginate(1)} />

        {pageNumbers.map(number => (
          <Pagination.Item
            key={number}
            active={currentPage === number}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}

        <Pagination.Last onClick={() => paginate(10)} />
      </Pagination>
    </nav>
  )
}

export default PaginationNav
