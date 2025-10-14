import React from 'react';
import { Box, Button, Typography } from '@mui/material';

export const PublishPost: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Ready to share?</Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>Publish</Button>
    </Box>
  );
};

export default PublishPost;


