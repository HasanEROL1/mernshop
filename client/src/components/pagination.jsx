
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className='flex justify-center gap-2 mt-10'>
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className='px-3 py-1 border rounded cursor-pointer disabled:opacity-40'
      >
        ←
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 border rounded cursor-pointer ${currentPage === i + 1 ? "bg-black text-white" : ""}`}
        >{i + 1}</button>
      ))}
      <button
        onClick={() => onPageChange(Math.max(currentPage + 1, 1))}
        disabled={currentPage === totalPages}
        className='px-3 py-1 border rounded cursor-pointer disabled:opacity-40'
      > →</button>
    </div>
  )
}

export default Pagination
