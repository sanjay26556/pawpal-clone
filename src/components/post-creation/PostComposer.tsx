import React from 'react';
import { Box, TextField, Chip, Stack, Typography } from '@mui/material';

export const PostComposer: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Write a caption</Typography>
      <TextField fullWidth multiline minRows={3} placeholder="Write a caption... #rescuedog" sx={{ mt: 2 }} />
      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        <Chip label="#adoptdontshop" clickable />
        <Chip label="#rescuedog" clickable />
      </Stack>
    </Box>
  );
};

export default PostComposer;


