import React from 'react';
import { Box, Typography, TextField, Grid } from '@mui/material';

export default function MatchingPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Pet Matching</Typography>
      <TextField fullWidth placeholder="Filter by breed, age, type" sx={{ mb: 2 }} />
      <Grid container spacing={1}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} item xs={6} sm={4}>
            <Box sx={{ aspectRatio: '1/1', bgcolor: 'grey.200', borderRadius: 1 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


