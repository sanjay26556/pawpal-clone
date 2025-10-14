import React from 'react';
import { Grid, Box } from '@mui/material';

export const ExploreGrid: React.FC = () => {
  const items = Array.from({ length: 12 });
  return (
    <Grid container spacing={0.5} sx={{ p: 1 }}>
      {items.map((_, i) => (
        <Grid item xs={4} key={i}>
          <Box sx={{ aspectRatio: '1 / 1', bgcolor: 'grey.200' }} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ExploreGrid;


