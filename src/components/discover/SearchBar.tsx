import React from 'react';
import { Box, TextField } from '@mui/material';

export const SearchBar: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <TextField fullWidth placeholder="Search users, hashtags, locations" />
    </Box>
  );
};

export default SearchBar;


