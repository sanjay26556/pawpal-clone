import React, { useMemo, useRef, useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Stack, Typography, TextField, Chip, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CameraView } from '@/components/post-creation/CameraView';
import { PhotoEditor } from '@/components/post-creation/PhotoEditor';
import { PostComposer } from '@/components/post-creation/PostComposer';
import { LocationTagger } from '@/components/post-creation/LocationTagger';
import { PublishPost } from '@/components/post-creation/PublishPost';
import { uploadImages } from '@/lib/storage';
import { createPost } from '@/lib/posts';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';

const steps = ['Select', 'Edit', 'Caption', 'Location', 'Publish'];

export default function PostPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      if (!user?.uid || files.length === 0) throw new Error('Missing files or user');
      const urls = await uploadImages(user.uid, files);
      const id = await createPost({ userId: user.uid, images: urls, caption, hashtags, location });
      return id;
    },
    onSuccess: () => navigate('/'),
  });

  const handleNext = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Create new post</Typography>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Box sx={{ minHeight: 280 }}>
        {activeStep === 0 && (
          <Box>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
            <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>Select photos</Button>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {previews.map((src, idx) => (
                <Grid item xs={4} key={idx}>
                  <Box component="img" src={src} alt="preview" sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 1 }} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {activeStep === 1 && <PhotoEditor />}
        {activeStep === 2 && (
          <Box>
            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {hashtags.map((h) => <Chip key={h} label={`#${h}`} />)}
            </Stack>
          </Box>
        )}
        {activeStep === 3 && <LocationTagger />}
        {activeStep === 4 && (
          <Box>
            <PublishPost />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={isLoading}
              onClick={() => mutateAsync()}
            >
              {isLoading ? 'Publishing...' : 'Publish'}
            </Button>
          </Box>
        )}
      </Box>

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>Next</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>Finish</Button>
        )}
      </Stack>
    </Box>
  );
}


