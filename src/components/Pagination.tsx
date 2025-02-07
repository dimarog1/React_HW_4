import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
        onPageChange(page);
    };

    return (
        <MuiPagination
            count={pageCount}
            page={currentPage}
            onChange={handleChange}
            color="primary"
            sx={{ marginTop: 7, display: 'flex', justifyContent: 'center' }}
        />
    );
};

export default Pagination;