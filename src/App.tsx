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

export const ColorModeContext = React.createContext<{ mode: 'light' | 'dark'; toggleColorMode: () => void }>({ mode: 'light', toggleColorMode: () => {} });

// Create Material-UI theme (Instagram-like PawPal palette) with light/dark support
const useAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#4CAF50' },
      secondary: { main: '#E91E63' },
      background: {
        default: mode === 'light' ? '#FFFFFF' : '#121212',
        paper: mode === 'light' ? '#FAFAFA' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? '#262626' : '#EDEDED',
        secondary: mode === 'light' ? '#8E8E8E' : '#AAAAAA',
      },
      divider: mode === 'light' ? '#EFEFEF' : '#2A2A2A',
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
            backgroundColor: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
            color: mode === 'light' ? '#262626' : '#EDEDED',
            boxShadow: 'none',
            borderBottom: `1px solid ${mode === 'light' ? '#EFEFEF' : '#2A2A2A'}`,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${mode === 'light' ? '#EFEFEF' : '#2A2A2A'}`,
            boxShadow: 'none',
          },
        },
      },
    },
  });

function AppContent() {
  const { notification, closeNotification } = useNotification();
  const [mode, setMode] = React.useState<'light' | 'dark'>(() => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const colorMode = React.useMemo(() => ({ mode, toggleColorMode: () => setMode((m) => (m === 'light' ? 'dark' : 'light')) }), [mode]);
  const theme = React.useMemo(() => useAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;