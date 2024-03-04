import React from 'react';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages = 0, currentPage = 0, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            intent={currentPage === i ? 'primary' : 'normal'}
            rounded='icon'
          >
            {i}
          </Button>
        );
      }
      return pageButtons;
    }

    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pageButtons.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            intent={currentPage === i ? 'primary' : 'normal'}
            rounded='icon'
          >
            {i}
          </Button>
        );
      }
      pageButtons.push(<span key='dots-1'>...</span>);
      pageButtons.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          intent={currentPage === totalPages ? 'primary' : 'normal'}
          rounded
        >
          {totalPages}
        </Button>
      );

      return pageButtons;
    }

    if (currentPage >= totalPages - 3) {
      pageButtons.push(
        <Button
          key={1}
          onClick={() => handlePageChange(1)}
          intent={currentPage === 1 ? 'primary' : 'normal'}
          rounded='icon'
        >
          1
        </Button>
      );
      pageButtons.push(<span key='dots-2'>...</span>);

      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageButtons.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            intent={currentPage === i ? 'primary' : 'normal'}
            rounded='icon'
          >
            {i}
          </Button>
        );
      }

      return pageButtons;
    } else {
      pageButtons.push(
        <Button
          key={1}
          onClick={() => handlePageChange(1)}
          intent={currentPage === 1 ? 'primary' : 'normal'}
          rounded='icon'
        >
          1
        </Button>
      );
      pageButtons.push(<span key='dots-3'>...</span>);

      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageButtons.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            intent={currentPage === i ? 'primary' : 'normal'}
            rounded='icon'
          >
            {i}
          </Button>
        );
      }
      pageButtons.push(<span key='dots-4'>...</span>);

      pageButtons.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          intent={currentPage === totalPages ? 'primary' : 'normal'}
          rounded='icon'
        >
          {totalPages}
        </Button>
      );

      return pageButtons;
    }
  };

  return (
    <div className='flex items-center justify-center [&_*]:text-sm'>
      <Button rounded='icon' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        <Icon name='chevron_left' />
      </Button>
      {renderPageButtons()}
      <Button rounded='icon' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <Icon name='chevron_right' />
      </Button>
    </div>
  );
};

export default Pagination;
