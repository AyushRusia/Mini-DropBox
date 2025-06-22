import React from 'react';
import { TablePagination, Box } from '@mui/material';

const Pagination = ({ count, page, rowsPerPage, onPageChange }) => {
  return (
    <Box display="flex" justifyContent="flex-end">
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]} // Fixed for now
      />
    </Box>
  );
};

export default Pagination;
