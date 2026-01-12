interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-sm border border-(--color-primary) hover:bg-(--color-bg-orange) transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img 
          src="/icons/arrow-left-pagination.svg" 
          alt="Previous"
          className="w-5 h-5"
        />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-sm border transition-colors ${
            currentPage === page
              ? 'bg-(--color-bg-orange) border-(--color-primary)'
              : 'border-(--color-primary) hover:bg-(--color-bg-orange)'
          }`}
        >
          <span 
            className="text-lg md:text-xl font-medium"
            style={{ 
              color: currentPage === page ? 'var(--color-primary-dark)' : 'var(--color-black)',
              lineHeight: '20px'
            }}
          >
            {page}
          </span>
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-sm border border-(--color-primary) hover:bg-(--color-bg-orange) transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img 
          src="/icons/arrow-right-pagination.svg" 
          alt="Next"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
}