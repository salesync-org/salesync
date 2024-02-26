import React from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div>
      <Button rounded onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <Icon name='chevron_left' />
      </Button>
      <span>{currentPage}</span>
      <Button
        className='flex h-8 w-8 items-center justify-center rounded-full p-0 dark:p-0'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon name='chevron_right' />
      </Button>
    </div>
  );
};

export default Pagination;
