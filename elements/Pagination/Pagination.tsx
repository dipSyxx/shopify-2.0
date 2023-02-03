import React from 'react'
import ReactPaginate from 'react-paginate'

type PaginationProps = {
  currentPage: number
  onChangePage: (number: number) => void
}

export const Pagination = ({ currentPage, onChangePage }: PaginationProps) => {
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
