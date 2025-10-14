import React from 'react';
import { Box, LinearProgress } from '@mui/material';

export const StoryViewer: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', bgcolor: 'black' }}>
      <LinearProgress variant="determinate" value={30} sx={{ position: 'absolute', top: 8, left: 8, right: 8 }} />
    </Box>
  );
};

export default StoryViewer;


