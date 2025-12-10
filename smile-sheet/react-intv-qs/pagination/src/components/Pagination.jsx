export default function Pagination({ goToPrevPage, goToNextPage, handlePageChange, noOfPages, currentPage }) {
  return (
    <div className='pagination-container'>
        <button className='page-number' disabled={currentPage===0} onClick={goToPrevPage}>⬅️</button>
        {[...Array(noOfPages).keys()].map((pageNumber) => (
          <button key={pageNumber} className={'page-number' + ((pageNumber===currentPage) ? ' active' : '')} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
        <button className='page-number' disabled={currentPage===noOfPages-1} onClick={goToNextPage}>➡️</button>
      </div>
  );
}