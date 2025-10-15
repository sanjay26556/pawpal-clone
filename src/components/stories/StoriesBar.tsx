import type { FC } from 'react';
import { Box, Avatar, Typography, Stack } from '@mui/material';

export interface StoryItem {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface StoriesBarProps {
  stories?: StoryItem[];
  onStoryPress?: (storyId: string) => void;
}

export const StoriesBar: FC<StoriesBarProps> = ({ stories, onStoryPress }) => {
  const items = stories || Array.from({ length: 8 }).map((_, i) => ({ id: String(i), name: `Story ${i + 1}` }));

  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', pb: 1, mb: 2, gap: 2 }}>
      {items.map((s) => (
        <Stack key={s.id} alignItems="center" spacing={0.5} sx={{ minWidth: 64 }}>
          <Avatar
            src={s.avatarUrl}
            onClick={() => onStoryPress && onStoryPress(s.id)}
            sx={{ width: 56, height: 56, border: '2px solid', borderColor: 'secondary.main', cursor: onStoryPress ? 'pointer' : 'default' }}
          />
          <Typography variant="caption" color="text.secondary" noWrap>
            {s.name}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default StoriesBar;


