import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Snackbar, Alert } from '@mui/material';

import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthForm } from './components/auth/AuthForm';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { useNotification } from './hooks/useNotification';
import { Box, Typography } from '@mui/material';
import PostPage from './pages/Post';
import MessagesPage from './pages/Messages';
import MatchingPage from './pages/Matching';
import EventsPage from './pages/Events';
import VolunteerPage from './pages/Volunteer';
import MapPage from './pages/Map';
import ProfilePage from './pages/Profile';
import SearchPage from './pages/Search';
import DiscoverPage from './pages/Discover';

const queryClient = new QueryClient();

// Create Material-UI theme (Instagram-like PawPal palette)
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // primary green
    },
    secondary: {
      main: '#E91E63', // accent pink
    },
    background: {
      default: '#FFFFFF',
      paper: '#FAFAFA',
    },
    text: {
      primary: '#262626',
      secondary: '#8E8E8E',
    },
    divider: '#EFEFEF',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#FFFFFF',
          color: '#262626',
          boxShadow: 'none',
          borderBottom: '1px solid #EFEFEF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #EFEFEF',
          boxShadow: 'none',
        },
      },
    },
  },
});

function AppContent() {
  const { notification, closeNotification } = useNotification();

  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<AuthForm />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />

            {/* Placeholder routes for bottom navigation */}
            <Route
              path="/discover"
              element={
                <ProtectedRoute>
                  <DiscoverPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/matching"
              element={
                <ProtectedRoute>
                  <MatchingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <EventsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/volunteer"
              element={
                <ProtectedRoute>
                  <VolunteerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post"
              element={
                <ProtectedRoute>
                  <PostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/map"
              element={
                <ProtectedRoute>
                  <MapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Redirects */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

      {/* Global notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={closeNotification}
          severity={notification.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;