import React, { useState } from 'react';
import { Box, Typography, Avatar, Stack, Grid, Card, CardContent, Chip, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { storage } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileGrid } from '@/components/profile/ProfileGrid';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { StoryHighlights } from '@/components/profile/StoryHighlights';

export default function ProfilePage() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || user?.email?.split('@')[0] || '');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      let photoURL = user.photoURL || undefined;
      if (photoFile) {
        const path = `avatars/${user.uid}/${Date.now()}-${photoFile.name}`;
        const r = ref(storage, path);
        await uploadBytes(r, photoFile);
        photoURL = await getDownloadURL(r);
      }
      await updateProfile(user, { displayName: displayName || undefined, photoURL });
      // Ensure the latest profile data is reflected in context
      await auth.currentUser?.reload();
      // sync local state with updated values
      setDisplayName(auth.currentUser?.displayName || displayName);
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Profile</Typography>
      
      {/* Profile Header */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={user?.photoURL || undefined} sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
              {!user?.photoURL ? (user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U') : null}
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
            <Button variant="outlined" size="small" onClick={() => setOpen(true)}>Edit Profile</Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Story Highlights */}
      <StoryHighlights />

      {/* Profile Tabs */}
      <ProfileTabs />

      {/* Profile Grid */}
      <ProfileGrid />

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Username" value={displayName} onChange={(e) => setDisplayName(e.target.value)} fullWidth />
            <Button variant="outlined" component="label">
              Upload Profile Picture
              <input hidden accept="image/*" type="file" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
            </Button>
            {photoFile && <Typography variant="caption">Selected: {photoFile.name}</Typography>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={onSave} disabled={saving} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
