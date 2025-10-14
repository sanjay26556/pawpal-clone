import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Stack, Card, CardContent, Chip, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { Work, Schedule, LocationOn, Phone } from '@mui/icons-material';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  location: string;
  status: 'pending' | 'approved' | 'active';
  createdAt: Date;
}

export default function VolunteerPage() {
  const { user } = useAuth();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    skills: '',
    availability: '',
    location: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const vols = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Volunteer[];
      setVolunteers(vols);
    });
    return () => unsubscribe();
  }, []);

  const submitApplication = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !user) return;
    
    await addDoc(collection(db, 'volunteers'), {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      availability: formData.availability.trim(),
      location: formData.location.trim(),
      status: 'pending',
      userId: user.uid,
      createdAt: new Date()
    });
    
    setFormData({
      name: user?.displayName || '',
      email: user?.email || '',
      phone: '',
      skills: '',
      availability: '',
      location: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'active': return 'primary';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Volunteer Coordination</Typography>
      
      {/* Application Form */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Join Our Volunteer Team</Typography>
          <Stack spacing={2}>
            <TextField 
              label="Full Name" 
              fullWidth 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <TextField 
              label="Email" 
              fullWidth 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <TextField 
              label="Phone Number" 
              fullWidth 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <TextField 
              label="Skills (comma-separated)" 
              fullWidth 
              placeholder="e.g., Animal care, Photography, Social media"
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
            />
            <TextField 
              label="Availability" 
              fullWidth 
              placeholder="e.g., Weekends, Evenings, Flexible"
              value={formData.availability}
              onChange={(e) => setFormData({...formData, availability: e.target.value})}
            />
            <TextField 
              label="Location/Area" 
              fullWidth 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
            <Button 
              variant="contained" 
              onClick={submitApplication}
              disabled={!formData.name.trim() || !formData.email.trim()}
            >
              Submit Application
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Volunteers List */}
      <Typography variant="subtitle1" sx={{ mb: 2 }}>Our Volunteers</Typography>
      {volunteers.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
          No volunteers yet. Be the first to join!
        </Typography>
      ) : (
        volunteers.map((volunteer) => (
          <Card key={volunteer.id} sx={{ mb: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                    {volunteer.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1">{volunteer.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{volunteer.email}</Typography>
                  </Box>
                </Stack>
                <Chip 
                  label={volunteer.status} 
                  size="small" 
                  color={getStatusColor(volunteer.status) as any}
                />
              </Stack>
              
              <Stack spacing={1} sx={{ mt: 1 }}>
                {volunteer.phone && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Phone fontSize="small" color="action" />
                    <Typography variant="body2">{volunteer.phone}</Typography>
                  </Stack>
                )}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Schedule fontSize="small" color="action" />
                  <Typography variant="body2">{volunteer.availability}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2">{volunteer.location}</Typography>
                </Stack>
                {volunteer.skills.length > 0 && (
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    <Work fontSize="small" color="action" />
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {volunteer.skills.map((skill, idx) => (
                        <Chip key={idx} label={skill} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}


