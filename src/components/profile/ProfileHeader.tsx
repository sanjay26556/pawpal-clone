import React from 'react';
import { Box, Avatar, Typography, Stack, Button } from '@mui/material';

export const ProfileHeader: React.FC = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
      <Avatar sx={{ width: 72, height: 72 }} />
      <Box>
        <Typography variant="h6">username</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
          <Typography variant="body2"><strong>12</strong> posts</Typography>
          <Typography variant="body2"><strong>340</strong> followers</Typography>
          <Typography variant="body2"><strong>180</strong> following</Typography>
        </Stack>
        <Button variant="contained" size="small" sx={{ mt: 1 }}>Follow</Button>
      </Box>
    </Stack>
  );
};

export default ProfileHeader;


