import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';

export const TrendingTags: React.FC = () => {
  const tags = ['adoptdontshop', 'rescuedog', 'rescuecat', 'foster', 'shelterlove'];
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Trending</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {tags.map((t) => (
          <Chip key={t} label={`#${t}`} clickable />
        ))}
      </Stack>
    </Box>
  );
};

export default TrendingTags;


