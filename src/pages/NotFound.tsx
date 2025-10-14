import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { Home, Pets } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ textAlign: 'center', p: 4 }}>
          <CardContent>
            <Pets sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 700, mb: 2 }}>
              404
            </Typography>
            <Typography variant="h5" gutterBottom>
              Oops! Page not found
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              The page you're looking for doesn't exist or has been moved.
            </Typography>
            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              startIcon={<Home />}
              sx={{ mt: 2 }}
            >
              Go Home
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}