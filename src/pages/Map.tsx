import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Chip, Stack, Button } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';

const mockShelters = [
  { id: 1, name: 'Hope Animal Rescue', distance: '0.5 mi', phone: '(555) 123-4567', email: 'info@hopeanimalrescue.org', pets: 12 },
  { id: 2, name: 'Paws & Hearts Shelter', distance: '1.2 mi', phone: '(555) 234-5678', email: 'contact@pawsandhearts.org', pets: 8 },
  { id: 3, name: 'Second Chance Pets', distance: '2.1 mi', phone: '(555) 345-6789', email: 'adopt@secondchancepets.org', pets: 15 },
];

export default function MapPage() {
  const [selectedShelter, setSelectedShelter] = useState<typeof mockShelters[0] | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<Array<{ id: string; name: string; lat: number; lon: number }>>([]);
  const userPos = useRef<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    // @ts-ignore - Leaflet loaded from CDN
    const L = (window as any).L;
    if (!L || !mapRef.current || mapInstance.current) return;
    mapInstance.current = L.map(mapRef.current).setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance.current);

    // Try to center on user and load nearby hospitals
    locateMe();
  }, []);

  const locateMe = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoError(null);
        const { latitude, longitude } = pos.coords;
        // @ts-ignore
        const L = (window as any).L;
        if (!mapInstance.current || !L) return;
        mapInstance.current.setView([latitude, longitude], 14);
        L.marker([latitude, longitude]).addTo(mapInstance.current).bindPopup('You are here').openPopup();
        // Fetch nearby hospitals via Overpass API
        const overpass = `https://overpass-api.de/api/interpreter?data=[out:json];node[amenity=hospital](around:4000,${latitude},${longitude});out;`;
        fetch(overpass)
          .then((r) => r.json())
          .then((json) => {
            if (!json.elements) return;
            const items: Array<{ id: string; name: string; lat: number; lon: number }> = [];
            json.elements.forEach((el: any) => {
              if (!el.lat || !el.lon) return;
              const name = el.tags?.name || 'Hospital';
              L.marker([el.lat, el.lon]).addTo(mapInstance.current).bindPopup(name);
              items.push({ id: String(el.id), name, lat: el.lat, lon: el.lon });
            });
            setHospitals(items);
          })
          .catch((e) => setGeoError(String(e)));
      },
      (err) => setGeoError(err.message),
      { enableHighAccuracy: true }
    );
  };

  const distanceKm = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
    const R = 6371; // km
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLon = (b.lon - a.lon) * Math.PI / 180;
    const lat1 = a.lat * Math.PI / 180;
    const lat2 = b.lat * Math.PI / 180;
    const x = Math.sin(dLat/2) ** 2 + Math.sin(dLon/2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    const d = 2 * R * Math.asin(Math.sqrt(x));
    return d;
  };

  const sortedHospitals = useMemo(() => {
    if (!userPos.current) return hospitals;
    return [...hospitals].sort((h1, h2) => distanceKm(userPos.current!, { lat: h1.lat, lon: h1.lon }) - distanceKm(userPos.current!, { lat: h2.lat, lon: h2.lon }));
  }, [hospitals]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Nearby Shelters</Typography>
      
      {/* Interactive map */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ p: 0 }}>
          <Box ref={mapRef} sx={{ height: 300, width: '100%' }} />
        </CardContent>
      </Card>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={locateMe}>Locate Me</Button>
        {geoError && <Typography color="error">{geoError}</Typography>}
      </Stack>

      {/* Hospitals list (real, near user) */}
      <List>
        {sortedHospitals.map((h) => {
          const dist = userPos.current ? distanceKm(userPos.current, { lat: h.lat, lon: h.lon }) : null;
          return (
            <ListItem
              key={h.id}
              button
              onClick={() => {
                // @ts-ignore
                const L = (window as any).L;
                if (!mapInstance.current || !L) return;
                mapInstance.current.setView([h.lat, h.lon], 16);
                L.marker([h.lat, h.lon]).addTo(mapInstance.current).bindPopup(h.name).openPopup();
              }}
              sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: 1, mb: 1 }}
            >
              <ListItemText
                primary={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="subtitle1">{h.name}</Typography>
                    {dist !== null && <Chip label={`${dist.toFixed(1)} km`} size="small" color="primary" />}
                  </Stack>
                }
                secondary={<Typography variant="body2" color="text.secondary">Tap to view on map</Typography>}
              />
            </ListItem>
          );
        })}
        {sortedHospitals.length === 0 && (
          <Typography color="text.secondary" sx={{ mt: 1 }}>No nearby hospitals found yet.</Typography>
        )}
      </List>
    </Box>
  );
}
