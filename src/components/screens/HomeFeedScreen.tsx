import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Fab,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  FavoriteRounded,
  ChatRounded,
  ShareRounded,
  MoreVert as MoreVertIcon,
  Pets as PetsIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  AddBox as AddBoxIcon,
  Map as MapIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Feed } from '@/components/feed/Feed';

// Mock data for demonstration
const mockPosts = [
  {
    id: 1,
    userAvatar: '',
    userName: 'Sarah Johnson',
    timeAgo: '2 hours ago',
    content: '🐕 Meet Charlie! This sweet golden retriever is looking for his forever home. He loves playing fetch and is great with kids!',
    image: '',
    likes: 24,
    comments: 8,
    shares: 3,
  },
  {
    id: 2,
    userAvatar: '',
    userName: 'Animal Rescue Center',
    timeAgo: '4 hours ago',
    content: '🆘 URGENT: We need foster homes for these adorable kittens. Can you help? Even temporary fostering makes a huge difference!',
    image: '',
    likes: 42,
    comments: 15,
    shares: 12,
  },
  {
    id: 3,
    userAvatar: '',
    userName: 'Mike Wilson',
    timeAgo: '6 hours ago',
    content: '✅ SUCCESS STORY: Luna found her forever home! Thank you to everyone who shared her story. The power of community! 💕',
    image: '',
    likes: 156,
    comments: 28,
    shares: 45,
  },
];

export const HomeFeedScreen = () => {
  const { user } = useAuth();
  const [nav, setNav] = useState(0);
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to PawPal! 🐾
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect with pet lovers, share rescue stories, and help save lives
        </Typography>
      </Box>

      {/* User Welcome Card */}
      <Card sx={{ mb: 4, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
        <CardContent sx={{ color: 'white' }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
              <PetsIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">
                Hello, {user?.displayName || user?.email?.split('@')[0] || 'Friend'}!
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Ready to make a difference in a pet's life today?
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Feed Posts */}
      <Feed />

      {/* Feature Links */}
      <Card sx={{ mt: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Explore More 🚀
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}><Button fullWidth variant="outlined" href="/search">Search</Button></Grid>
            <Grid item xs={6} sm={3}><Button fullWidth variant="outlined" href="/messages">Messages</Button></Grid>
            <Grid item xs={6} sm={3}><Button fullWidth variant="outlined" href="/events">Events</Button></Grid>
            <Grid item xs={6} sm={3}><Button fullWidth variant="outlined" href="/volunteer">Volunteer</Button></Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <Fab
        color="secondary"
        sx={{
          position: 'fixed',
          bottom: 84,
          right: 16,
        }}
        onClick={() => navigate('/post')}
      >
        <AddIcon />
      </Fab>

      {/* Bottom Navigation */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={0}>
        <BottomNavigation
          showLabels={false}
          value={nav}
          onChange={(_, newValue) => {
            setNav(newValue);
            switch (newValue) {
              case 0:
                navigate('/');
                break;
              case 1:
                navigate('/discover');
                break;
              case 2:
                navigate('/post');
                break;
              case 3:
                navigate('/map');
                break;
              case 4:
                navigate('/profile');
                break;
              default:
                break;
            }
          }}
        >
          <BottomNavigationAction icon={<HomeIcon />} />
          <BottomNavigationAction icon={<SearchIcon />} />
          <BottomNavigationAction icon={<AddBoxIcon />} />
          <BottomNavigationAction icon={<MapIcon />} />
          <BottomNavigationAction icon={<PersonIcon />} />
        </BottomNavigation>
      </Paper>
    </Container>
  );
};