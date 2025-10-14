import React, { useEffect } from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFeedPosts, subscribeFeedPosts } from '@/lib/posts';
import { useAuth } from '@/contexts/AuthContext';
import { PostCard } from './PostCard';

export const Feed: React.FC = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({ queryKey: ['feed'], queryFn: () => fetchFeedPosts(25) });
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsub = subscribeFeedPosts(25, (posts) => {
      queryClient.setQueryData(['feed'], posts);
    });
    return () => unsub();
  }, [queryClient]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {(data || []).map((post) => (
        <Grid item xs={12} key={post.id}>
          <PostCard
            header={{
              userAvatar: '',
              username: post.userId,
              location: post.location,
              timestamp: new Date(post.createdAt).toLocaleDateString(),
            }}
            content={{ images: post.images }}
            engagement={{ likeCount: post.likes.length, caption: post.caption, hashtags: post.hashtags, commentCount: post.comments.length }}
            postId={post.id}
            likedByMe={Boolean(user && post.likes.includes(user.uid))}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Feed;


