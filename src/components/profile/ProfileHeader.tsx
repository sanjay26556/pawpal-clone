import type { FC } from 'react';
import { Box, Avatar, Typography, Stack, Button } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';

export const ProfileHeader: FC = () => {
  const { user } = useAuth();
  const username = user?.displayName || user?.email?.split('@')[0] || 'User';
  const initial = username.charAt(0).toUpperCase();

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2 }}>
      <Avatar sx={{ width: 72, height: 72, bgcolor: 'primary.main' }}>{initial}</Avatar>
      <Box>
        <Typography variant="h6">{username}</Typography>
        <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
          <Typography variant="body2"><strong>12</strong> posts</Typography>
          <Typography variant="body2"><strong>340</strong> followers</Typography>
          <Typography variant="body2"><strong>180</strong> following</Typography>
        </Stack>
        <Button variant="outlined" size="small" sx={{ mt: 1 }}>Edit Profile</Button>
      </Box>
    </Stack>
  );
};

export default ProfileHeader;


