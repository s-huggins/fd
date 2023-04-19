import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

interface IPaginationControlProps {
  page: number;
  totalPages: number;
  onNavigate: (page: number) => void;
  loading: boolean;
}

export const PaginationControl: FC<IPaginationControlProps> = ({ page, totalPages, onNavigate, loading }) => {
  const havePrevious: boolean = page > 1;
  const haveNext: boolean = page < totalPages;

  const navigateToPage = (newPage: number) => !loading && onNavigate(newPage);

  return (
    <div className="flex items-center justify-center my-6">
      {havePrevious && (
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="lg"
          className="cursor-pointer px-6"
          onClick={() => navigateToPage(page - 1)}
        />
      )}
      {haveNext && (
        <FontAwesomeIcon
          icon={faChevronRight}
          size="lg"
          className="cursor-pointer px-6"
          onClick={() => navigateToPage(page + 1)}
        />
      )}
    </div>
  );
};
