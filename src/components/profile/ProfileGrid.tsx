import type { FC } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchUserPosts } from '@/lib/posts';

export const ProfileGrid: FC = () => {
  const { user } = useAuth();
  const { data } = useQuery({ queryKey: ['user-posts', user?.uid], queryFn: () => fetchUserPosts(user!.uid), enabled: Boolean(user?.uid) });
  const posts = data || [];
  if (!user) return null;
  return (
    <Grid container spacing={0.5} sx={{ p: 1 }}>
      {posts.length === 0 ? (
        <Grid item xs={12}>
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>No posts yet.</Typography>
        </Grid>
      ) : (
        posts.map((p) => (
          <Grid item xs={4} key={p.id}>
            <Box component="img" src={p.images[0]} alt="post" sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ProfileGrid;


