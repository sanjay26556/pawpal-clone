import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Stack, Card, CardContent, Chip, Avatar } from '@mui/material';
import { CalendarToday, LocationOn, People } from '@mui/icons-material';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: string[];
  createdBy: string;
  createdAt: Date;
}

export default function EventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const evts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as Event[];
      setEvents(evts);
    });
    return () => unsubscribe();
  }, []);

  const createEvent = async () => {
    if (!newEvent.title.trim() || !user) return;
    
    await addDoc(collection(db, 'events'), {
      title: newEvent.title.trim(),
      description: newEvent.description.trim(),
      date: newEvent.date,
      location: newEvent.location.trim(),
      attendees: [],
      createdBy: user.uid,
      createdAt: new Date()
    });
    setNewEvent({ title: '', description: '', date: '', location: '' });
  };

  const rsvpEvent = async (eventId: string) => {
    if (!user) return;
    // TODO: Implement RSVP functionality
    console.log('RSVP to event:', eventId);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Community Events</Typography>
      
      {/* Create Event Form */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Create New Event</Typography>
          <Stack spacing={2}>
            <TextField 
              fullWidth 
              label="Event Title" 
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            />
            <TextField 
              fullWidth 
              label="Description" 
              multiline 
              rows={2}
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            />
            <Stack direction="row" spacing={2}>
              <TextField 
                label="Date & Time" 
                type="datetime-local"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
              <TextField 
                label="Location" 
                fullWidth
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
              />
            </Stack>
            <Button variant="contained" onClick={createEvent} disabled={!newEvent.title.trim()}>
              Create Event
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Events List */}
      {events.length === 0 ? (
        <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
          No events scheduled. Create the first one!
        </Typography>
      ) : (
        events.map((event) => (
          <Card key={event.id} sx={{ mb: 2 }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                <Typography variant="h6">{event.title}</Typography>
                <Chip 
                  label={`${event.attendees.length} attending`} 
                  size="small" 
                  color="primary" 
                />
              </Stack>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {event.description}
              </Typography>
              
              <Stack spacing={1} sx={{ mb: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2">
                    {new Date(event.date).toLocaleString()}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2">{event.location}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <People fontSize="small" color="action" />
                  <Typography variant="body2">
                    Created by {event.createdBy === user?.uid ? 'You' : 'Community Member'}
                  </Typography>
                </Stack>
              </Stack>
              
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => rsvpEvent(event.id)}
                disabled={event.attendees.includes(user?.uid || '')}
              >
                {event.attendees.includes(user?.uid || '') ? 'Attending' : 'RSVP'}
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}


