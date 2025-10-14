import React from 'react';
import { Box, Avatar, Typography, Stack } from '@mui/material';

export const StoryHighlights: React.FC = () => {
  const items = Array.from({ length: 5 }).map((_, i) => ({ id: i, name: `Highlight ${i + 1}` }));
  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', gap: 2, px: 2, py: 1 }}>
      {items.map((s) => (
        <Stack key={s.id} alignItems="center" spacing={0.5} sx={{ minWidth: 64 }}>
          <Avatar sx={{ width: 56, height: 56 }} />
          <Typography variant="caption" noWrap>{s.name}</Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default StoryHighlights;


