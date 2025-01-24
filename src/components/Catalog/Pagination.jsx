import React from 'react'

function Pagination({ currentPage, paginationLength, onPageChange }) {
  return (
    <div className="pagination" id="pagination" style={{ display: 'flex' }}>
      <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
        {'<<'}
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        {'<'}
      </button>

      {Array.from({ length: paginationLength }, (_, index) => index + 1).map((btn) => (
        <button
          key={`paginationBtn_${btn}`}
          className={currentPage === btn ? 'active' : ''}
          onClick={() => onPageChange(btn)}
        >
          {btn}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === paginationLength}
      >
        {'>'}
      </button>
      <button
        onClick={() => onPageChange(paginationLength)}
        disabled={currentPage === paginationLength}
      >
        {'>>'}
      </button>
    </div>
  )
}

export default Pagination
