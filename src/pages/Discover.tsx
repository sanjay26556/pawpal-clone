import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip, Stack, Button } from '@mui/material';
import { TrendingUp, Explore, People } from '@mui/icons-material';
import { ExploreGrid } from '@/components/discover/ExploreGrid';
import { TrendingTags } from '@/components/discover/TrendingTags';
import { SuggestedUsers } from '@/components/discover/SuggestedUsers';
import { useNavigate } from 'react-router-dom';

export default function DiscoverPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Discover</Typography>
      
      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/search')}>
            <CardContent>
              <Explore color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="subtitle2">Search</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('/matching')}>
            <CardContent>
              <People color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="subtitle2">Pet Matching</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Trending Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <TrendingUp color="primary" />
            <Typography variant="subtitle1">Trending Now</Typography>
          </Stack>
          <TrendingTags />
        </CardContent>
      </Card>

      {/* Suggested Users */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Suggested for You</Typography>
          <SuggestedUsers />
        </CardContent>
      </Card>

      {/* Explore Grid */}
      <Card>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Explore Posts</Typography>
          <ExploreGrid />
        </CardContent>
      </Card>
    </Box>
  );
}
