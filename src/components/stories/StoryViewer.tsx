import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { Box, LinearProgress, Stack, Avatar, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

interface StoryMedia {
  id: string;
  mediaUrl: string;
  durationMs?: number;
  userName?: string;
  userAvatarUrl?: string;
}

interface StoryViewerProps {
  open: boolean;
  stories: StoryMedia[];
  startIndex?: number;
  onClose: () => void;
}

export const StoryViewer: FC<StoryViewerProps> = ({ open, stories, startIndex = 0, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);

  const current = stories[index];
  const duration = useMemo(() => current?.durationMs ?? 5000, [current]);

  useEffect(() => {
    if (!open || !current) return;
    setProgress(0);
    const startedAt = Date.now();
    const id = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) {
        window.clearInterval(id);
        setTimeout(() => {
          setIndex((i) => {
            const next = i + 1;
            if (next >= stories.length) {
              onClose();
              return i;
            }
            return next;
          });
        }, 50);
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [open, current, duration, stories.length, onClose]);

  if (!open || !current) return null;

  return (
    <Box sx={{ position: 'fixed', inset: 0, bgcolor: 'black', zIndex: 1300 }}>
      <LinearProgress variant="determinate" value={progress} sx={{ position: 'absolute', top: 8, left: 8, right: 8 }} />
      <Stack direction="row" alignItems="center" spacing={1} sx={{ position: 'absolute', top: 16, left: 16, right: 16, zIndex: 1 }}>
        <Avatar src={current.userAvatarUrl} sx={{ width: 28, height: 28 }} />
        <Typography variant="body2" sx={{ color: 'white', flexGrow: 1 }}>{current.userName || 'Story'}</Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
          <Close fontSize="small" />
        </IconButton>
      </Stack>
      <Box component="img" src={current.mediaUrl} alt="story" sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      {/* Tap zones */}
      <Box sx={{ position: 'absolute', inset: 0, display: 'flex' }}>
        <Box sx={{ flex: 1 }} onClick={() => setIndex((i) => Math.max(0, i - 1))} />
        <Box sx={{ flex: 1 }} onClick={() => setIndex((i) => (i + 1 < stories.length ? i + 1 : (onClose(), i))) } />
      </Box>
    </Box>
  );
};

export default StoryViewer;


