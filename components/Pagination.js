import { useRouter } from 'next/navigation';

function Pagination({ totalStudents, studentsPerPage, currentPage, onPageChange }) {
  const router = useRouter();

  const totalPages = Math.ceil(totalStudents / studentsPerPage);
  
  const handlePageChange = (page) => {
    // Ensure page value stays within valid range
    page = Math.max(1, Math.min(page, totalPages));
    onPageChange(page);
    router.push(`/dashboard/studentlist`);
  };


  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage = currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
