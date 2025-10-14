import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Chip, Stack } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';

const mockShelters = [
  { id: 1, name: 'Hope Animal Rescue', distance: '0.5 mi', phone: '(555) 123-4567', email: 'info@hopeanimalrescue.org', pets: 12 },
  { id: 2, name: 'Paws & Hearts Shelter', distance: '1.2 mi', phone: '(555) 234-5678', email: 'contact@pawsandhearts.org', pets: 8 },
  { id: 3, name: 'Second Chance Pets', distance: '2.1 mi', phone: '(555) 345-6789', email: 'adopt@secondchancepets.org', pets: 15 },
];

export default function MapPage() {
  const [selectedShelter, setSelectedShelter] = useState<typeof mockShelters[0] | null>(null);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Nearby Shelters</Typography>
      
      {/* Map placeholder */}
      <Card sx={{ mb: 2, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.100' }}>
        <Typography color="text.secondary">Interactive map coming soon</Typography>
      </Card>

      {/* Shelter list */}
      <List>
        {mockShelters.map((shelter) => (
          <ListItem 
            key={shelter.id} 
            button 
            onClick={() => setSelectedShelter(shelter)}
            sx={{ 
              border: '1px solid', 
              borderColor: selectedShelter?.id === shelter.id ? 'primary.main' : 'grey.300',
              borderRadius: 1,
              mb: 1
            }}
          >
            <ListItemText
              primary={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle1">{shelter.name}</Typography>
                  <Chip label={shelter.distance} size="small" color="primary" />
                </Stack>
              }
              secondary={
                <Stack spacing={0.5} sx={{ mt: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Phone fontSize="small" color="action" />
                    <Typography variant="body2">{shelter.phone}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Email fontSize="small" color="action" />
                    <Typography variant="body2">{shelter.email}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {shelter.pets} pets available for adoption
                  </Typography>
                </Stack>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
