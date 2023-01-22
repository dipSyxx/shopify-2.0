import React from 'react'
import ReactPaginate from 'react-paginate'

export const Pagination = ({ currentPage, onChangePage }: any) => {
  return (
    <>
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={6}
        pageCount={4}
        forcePage={currentPage - 1}
        previousLabel="<"
      />
    </>
  )
}
