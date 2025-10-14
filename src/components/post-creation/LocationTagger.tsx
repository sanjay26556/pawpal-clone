import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

export const LocationTagger: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Tag Location</Typography>
      <TextField fullWidth placeholder="Search shelters or locations" sx={{ mt: 2 }} />
    </Box>
  );
};

export default LocationTagger;


