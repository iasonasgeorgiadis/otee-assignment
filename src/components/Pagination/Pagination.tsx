import React, { useMemo } from 'react';
import { MaterialIcon } from '../MaterialIcon';
import './Pagination.css';

export interface PaginationProps {
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of results */
  totalResults?: number;
  /** Number of results per page */
  resultsPerPage?: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Viewport variant for responsive behavior */
  viewport?: 'mobile' | 'desktop' | 'tablet' | 'auto';
  /** Maximum number of page buttons to show (excluding prev/next) */
  maxVisiblePages?: number;
  /** Show results text */
  showResults?: boolean;
  /** Custom aria-label for pagination navigation */
  ariaLabel?: string;
  /** Custom class name */
  className?: string;
}

/**
 * Pagination component for navigating through pages of content
 * Responsive design with different layouts for mobile vs desktop/tablet
 *
 * Display behavior:
 * - Mobile: Stacked layout with results text on top, navigation below
 * - Desktop/Tablet: Horizontal layout with results on left, navigation on right
 * - Auto: Automatically adjusts based on viewport width
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage = 10,
  onPageChange,
  viewport = 'auto',
  maxVisiblePages = 5,
  showResults = true,
  ariaLabel = 'Pagination navigation',
  className = '',
}) => {
  // Calculate result range
  const startResult = totalResults ? (currentPage - 1) * resultsPerPage + 1 : 0;
  const endResult = totalResults ? Math.min(currentPage * resultsPerPage, totalResults) : 0;
  const resultsText = totalResults ? `${startResult} - ${endResult} of ${totalResults} results` : '';

  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis')[] = [];

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination with ellipsis
      const halfVisible = Math.floor(maxVisiblePages / 2);

      if (currentPage <= halfVisible + 1) {
        // Near start
        for (let i = 1; i <= maxVisiblePages - 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - halfVisible) {
        // Near end
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Middle
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - halfVisible + 1; i <= currentPage + halfVisible - 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  // Handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Determine viewport class
  const viewportClass = viewport === 'auto'
    ? 'igds-pagination--auto'
    : `igds-pagination--${viewport}`;

  const classNames = [
    'igds-pagination',
    viewportClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {/* Results text */}
      {showResults && resultsText && (
        <div className="igds-pagination__results">
          <span className="igds-pagination__results-text">
            {resultsText}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="igds-pagination__nav" aria-label={ariaLabel}>
        {/* Previous button */}
        <button
          className="igds-pagination__button igds-pagination__button--nav"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
          type="button"
        >
          <MaterialIcon icon="chevron_left" size={16} />
          <span className="igds-pagination__nav-text">Prev</span>
        </button>

        {/* Page numbers */}
        <div className="igds-pagination__pages">
          {pageNumbers.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="igds-pagination__ellipsis"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;
            return (
              <button
                key={page}
                className={[
                  'igds-pagination__button',
                  'igds-pagination__button--page',
                  isActive && 'igds-pagination__button--active'
                ].filter(Boolean).join(' ')}
                onClick={() => handlePageClick(page)}
                aria-label={`Page ${page}`}
                aria-current={isActive ? 'page' : undefined}
                type="button"
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <button
          className="igds-pagination__button igds-pagination__button--nav"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          type="button"
        >
          <span className="igds-pagination__nav-text">Next</span>
          <MaterialIcon icon="chevron_right" size={16} />
        </button>
      </nav>
    </div>
  );
};