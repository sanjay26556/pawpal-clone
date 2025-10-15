import { useEffect } from 'react';
import type { FC } from 'react';
import { Grid, CircularProgress, Box } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFeedPosts, subscribeFeedPosts } from '@/lib/posts';
import { useAuth } from '@/contexts/AuthContext';
import { PostCard } from './PostCard';

export const Feed: FC = () => {
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
      {((data && data.length > 0) ? data : [
        {
          id: 'demo-1',
          userId: 'Sarah Johnson',
          location: 'Downtown Shelter',
          createdAt: new Date().toISOString(),
          images: ['https://images.unsplash.com/photo-1558944351-c6ae88f7f98e?q=80&w=1200&auto=format&fit=crop'],
          likes: [],
          caption: 'Meet Charlie! This sweet golden retriever is looking for his forever home. 🐶',
          hashtags: ['adoption', 'goldenretriever'],
          comments: [],
        },
        {
          id: 'demo-2',
          userId: 'Rescue Center',
          location: 'City Rescue',
          createdAt: new Date().toISOString(),
          images: ['https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1200&auto=format&fit=crop'],
          likes: [],
          caption: 'Foster homes needed for kittens – even a week helps! 🐱',
          hashtags: ['foster', 'kittens'],
          comments: [],
        },
        {
          id: 'demo-3',
          userId: 'Mike Wilson',
          location: 'Neighborhood Park',
          createdAt: new Date().toISOString(),
          images: ['https://images.unsplash.com/photo-1537151625747-768eb6cf92b6?q=80&w=1200&auto=format&fit=crop'],
          likes: [],
          caption: 'Luna found a forever home! Thank you PawPal community 💕',
          hashtags: ['adopted', 'success'],
          comments: [],
        },
        {
          id: 'demo-4',
          userId: 'Pet Lovers Club',
          location: 'Online',
          createdAt: new Date().toISOString(),
          images: ['https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1200&auto=format&fit=crop'],
          likes: [],
          caption: 'Join our weekend walkathon with your pets! 🐾',
          hashtags: ['events', 'walkathon'],
          comments: [],
        },
        {
          id: 'demo-5',
          userId: 'Anna Lee',
          location: 'Foster Home',
          createdAt: new Date().toISOString(),
          images: ['https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1200&auto=format&fit=crop'],
          likes: [],
          caption: 'Bottle-feeding these tiny kittens around the clock 💗',
          hashtags: ['foster', 'kittens'],
          comments: [],
        },
        {
          id: 'demo-6',
          userId: 'Vet Corner',
          location: 'Clinic',
          createdAt: new Date().toISOString(),
          images: ['https://images.unsplash.com/photo-1568572933382-74d440642117?q=80&w=1200&auto=format&fit=crop'],
          likes: [],
          caption: '5 tips to keep your pets cool in summer ☀️',
          hashtags: ['health', 'tips'],
          comments: [],
        },
        {
          id: 'demo-7',
          userId: 'Shelter Updates',
          location: 'City Shelter',
          createdAt: new Date().toISOString(),
          images: ['https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop'],
          likes: [],
          caption: 'New arrivals this week – come say hi!',
          hashtags: ['shelter', 'adopt'],
          comments: [],
        },
        {
          id: 'demo-8',
          userId: 'Jasmine',
          location: 'Dog Park',
          createdAt: new Date().toISOString(),
          images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop'],
          likes: [],
          caption: 'Training day with Bruno. He nailed sit and stay! 🐕‍🦺',
          hashtags: ['training', 'dog'],
          comments: [],
        },
        {
          id: 'demo-9',
          userId: 'Cat Cafe',
          location: 'Midtown',
          createdAt: new Date().toISOString(),
          images: ['https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1200&auto=format&fit=crop'],
          likes: [],
          caption: 'Stop by for cuddles and coffee. Adoptions open!',
          hashtags: ['cats', 'cafe'],
          comments: [],
        },
        {
          id: 'demo-10',
          userId: 'PawPal Team',
          location: 'Everywhere',
          createdAt: new Date().toISOString(),
          images: ['https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=1200&auto=format&fit=crop'],
          likes: [],
          caption: 'Welcome to PawPal! Share your stories and help pets find homes 🐾',
          hashtags: ['welcome', 'community'],
          comments: [],
        },
      ]).map((post) => (
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


