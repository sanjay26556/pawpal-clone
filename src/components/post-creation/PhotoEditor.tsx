import React from 'react';
import { Box, Typography } from '@mui/material';

export const PhotoEditor: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Photo Editor</Typography>
      <Typography color="text.secondary">Filters and cropping coming soon.</Typography>
    </Box>
  );
};

export default PhotoEditor;


