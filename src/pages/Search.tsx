import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Tabs, Tab, Grid, Card, CardContent, Avatar, Chip, Stack, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Person, LocationOn, Tag } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Post } from '@/types';

interface SearchResult {
  type: 'post' | 'user' | 'hashtag' | 'location';
  data: any;
}

export default function SearchPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const searchPosts = async (term: string) => {
    if (!term.trim()) return [];
    
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
    
    const snapshot = await getDocs(postsQuery);
    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date()
    })) as Post[];
    
    // Filter posts by search term
    return posts.filter(post => 
      post.caption.toLowerCase().includes(term.toLowerCase()) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(term.toLowerCase())) ||
      (post.location && post.location.toLowerCase().includes(term.toLowerCase()))
    ).map(post => ({ type: 'post' as const, data: post }));
  };

  const searchUsers = async (term: string) => {
    if (!term.trim()) return [];
    
    // Mock user data - in real app, you'd have a users collection
    const mockUsers = [
      { id: '1', username: 'shelter_hope', displayName: 'Shelter Hope', avatar: '', followers: 1200 },
      { id: '2', username: 'paws_united', displayName: 'Paws United', avatar: '', followers: 800 },
      { id: '3', username: 'rescue_network', displayName: 'Rescue Network', avatar: '', followers: 1500 },
      { id: '4', username: 'pet_lover_sarah', displayName: 'Sarah Johnson', avatar: '', followers: 340 },
    ];
    
    return mockUsers
      .filter(user => 
        user.username.toLowerCase().includes(term.toLowerCase()) ||
        user.displayName.toLowerCase().includes(term.toLowerCase())
      )
      .map(user => ({ type: 'user' as const, data: user }));
  };

  const searchHashtags = async (term: string) => {
    if (!term.trim()) return [];
    
    const hashtags = [
      { tag: 'rescuedog', count: 1250 },
      { tag: 'adoptdontshop', count: 980 },
      { tag: 'foster', count: 750 },
      { tag: 'shelterlove', count: 650 },
      { tag: 'petrescue', count: 580 },
      { tag: 'animalwelfare', count: 420 },
    ];
    
    return hashtags
      .filter(hashtag => hashtag.tag.toLowerCase().includes(term.toLowerCase()))
      .map(hashtag => ({ type: 'hashtag' as const, data: hashtag }));
  };

  const searchLocations = async (term: string) => {
    if (!term.trim()) return [];
    
    const locations = [
      { name: 'Los Angeles, CA', count: 45 },
      { name: 'New York, NY', count: 38 },
      { name: 'Chicago, IL', count: 32 },
      { name: 'Houston, TX', count: 28 },
      { name: 'Phoenix, AZ', count: 25 },
    ];
    
    return locations
      .filter(location => location.name.toLowerCase().includes(term.toLowerCase()))
      .map(location => ({ type: 'location' as const, data: location }));
  };

  const performSearch = async () => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const [posts, users, hashtags, locations] = await Promise.all([
        searchPosts(searchTerm),
        searchUsers(searchTerm),
        searchHashtags(searchTerm),
        searchLocations(searchTerm)
      ]);
      
      setResults([...posts, ...users, ...hashtags, ...locations]);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const renderPostResult = (post: Post) => (
    <Card key={post.id} sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
            {post.userId.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2">{post.userId}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {post.caption}
            </Typography>
            <Stack direction="row" spacing={1}>
              {post.hashtags.slice(0, 3).map((tag, idx) => (
                <Chip key={idx} label={`#${tag}`} size="small" variant="outlined" />
              ))}
            </Stack>
            {post.location && (
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                <LocationOn fontSize="small" color="action" />
                <Typography variant="caption">{post.location}</Typography>
              </Stack>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  const renderUserResult = (user: any) => (
    <Card key={user.id} sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 50, height: 50, bgcolor: 'primary.main' }}>
            {user.displayName.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1">{user.displayName}</Typography>
            <Typography variant="body2" color="text.secondary">@{user.username}</Typography>
            <Typography variant="caption" color="text.secondary">
              {user.followers.toLocaleString()} followers
            </Typography>
          </Box>
          <Chip label="Follow" size="small" color="primary" />
        </Stack>
      </CardContent>
    </Card>
  );

  const renderHashtagResult = (hashtag: any) => (
    <Card key={hashtag.tag} sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Tag color="primary" />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1">#{hashtag.tag}</Typography>
            <Typography variant="body2" color="text.secondary">
              {hashtag.count.toLocaleString()} posts
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  const renderLocationResult = (location: any) => (
    <Card key={location.name} sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <LocationOn color="primary" />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1">{location.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {location.count} posts from this location
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  const filteredResults = results.filter(result => {
    switch (activeTab) {
      case 0: return result.type === 'post';
      case 1: return result.type === 'user';
      case 2: return result.type === 'hashtag';
      case 3: return result.type === 'location';
      default: return true;
    }
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Search</Typography>
      
      {/* Search Input */}
      <TextField
        fullWidth
        placeholder="Search posts, users, hashtags, locations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Search Tabs */}
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="Posts" />
        <Tab label="Users" />
        <Tab label="Hashtags" />
        <Tab label="Locations" />
      </Tabs>

      {/* Results */}
      {loading ? (
        <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
          Searching...
        </Typography>
      ) : filteredResults.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
          {searchTerm ? 'No results found' : 'Start typing to search'}
        </Typography>
      ) : (
        <Box>
          {filteredResults.map((result, index) => {
            switch (result.type) {
              case 'post':
                return renderPostResult(result.data);
              case 'user':
                return renderUserResult(result.data);
              case 'hashtag':
                return renderHashtagResult(result.data);
              case 'location':
                return renderLocationResult(result.data);
              default:
                return null;
            }
          })}
        </Box>
      )}
    </Box>
  );
}
