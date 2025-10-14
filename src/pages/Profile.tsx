import React from 'react';
import { Box, Typography, Avatar, Stack, Grid, Card, CardContent, Chip, Button } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileGrid } from '@/components/profile/ProfileGrid';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { StoryHighlights } from '@/components/profile/StoryHighlights';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Profile</Typography>
      
      {/* Profile Header */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{user?.displayName || 'User'}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {user?.email}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                <Typography variant="body2"><strong>12</strong> posts</Typography>
                <Typography variant="body2"><strong>340</strong> followers</Typography>
                <Typography variant="body2"><strong>180</strong> following</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Chip label="Pet Lover" size="small" color="primary" />
                <Chip label="Volunteer" size="small" color="secondary" />
              </Stack>
            </Box>
            <Button variant="outlined" size="small">Edit Profile</Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Story Highlights */}
      <StoryHighlights />

      {/* Profile Tabs */}
      <ProfileTabs />

      {/* Profile Grid */}
      <ProfileGrid />
    </Box>
  );
}
