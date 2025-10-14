import React from 'react';
import { Box, Avatar, Typography, Stack } from '@mui/material';

export const StoriesBar: React.FC = () => {
  const items = Array.from({ length: 8 }).map((_, i) => ({ id: i, name: `Story ${i + 1}` }));

  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', pb: 1, mb: 2, gap: 2 }}>
      {items.map((s) => (
        <Stack key={s.id} alignItems="center" spacing={0.5} sx={{ minWidth: 64 }}>
          <Avatar sx={{ width: 56, height: 56, border: '2px solid', borderColor: 'secondary.main' }} />
          <Typography variant="caption" color="text.secondary" noWrap>
            {s.name}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default StoriesBar;


