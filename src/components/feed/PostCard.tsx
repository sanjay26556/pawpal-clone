import React from 'react';
import { Card, CardHeader, CardContent, Avatar, IconButton, Box, Typography, TextField, Stack } from '@mui/material';
import { MoreVert, FavoriteBorder, Favorite, ChatBubbleOutline, Send, BookmarkBorder } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { toggleLike, addComment } from '@/lib/posts';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface PostCardProps {
  header: {
    userAvatar: string;
    username: string;
    location?: string;
    timestamp: string;
  };
  content: {
    images: string[];
  };
  engagement: {
    likeCount: number;
    caption: string;
    hashtags: string[];
    commentCount?: number;
  };
  postId?: string;
  likedByMe?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ header, content, engagement, postId, likedByMe }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState('');
  const firstImage = content.images[0];

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={header.userAvatar}>{header.username.charAt(0)}</Avatar>}
        action={<IconButton><MoreVert /></IconButton>}
        title={header.username}
        subheader={`${header.location ? header.location + ' • ' : ''}${header.timestamp}`}
      />

      <Box sx={{ width: '100%', bgcolor: 'grey.100', aspectRatio: '1 / 1' }}>
        {firstImage ? (
          <Box component="img" src={firstImage} alt="post" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : null}
      </Box>

      <CardContent sx={{ pt: 1 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            size="small"
            onClick={async () => {
              if (!postId || !user?.uid) return;
              // optimistic update
              queryClient.setQueryData<any>(['feed'], (old) => {
                if (!Array.isArray(old)) return old;
                return old.map((p) =>
                  p.id === postId
                    ? { ...p, likes: likedByMe ? p.likes.filter((id: string) => id !== user.uid) : [...p.likes, user.uid] }
                    : p
                );
              });
              await toggleLike(postId, user.uid, Boolean(likedByMe));
            }}
            color={likedByMe ? 'error' : 'default'}
          >
            {likedByMe ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <IconButton size="small"><ChatBubbleOutline /></IconButton>
          <IconButton size="small"><Send /></IconButton>
          <Box flexGrow={1} />
          <IconButton size="small"><BookmarkBorder /></IconButton>
        </Box>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>{engagement.likeCount.toLocaleString()} likes</strong>
        </Typography>

        {engagement.caption && (
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {engagement.caption} {engagement.hashtags.map((t) => `#${t}`).join(' ')}
          </Typography>
        )}

        {postId && (
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <TextField
              size="small"
              placeholder="Add a comment..."
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={async (e) => {
                if (e.key === 'Enter' && commentText.trim() && user?.uid) {
                  const text = commentText.trim();
                  // optimistic update
                  queryClient.setQueryData<any>(['feed'], (old) => {
                    if (!Array.isArray(old)) return old;
                    return old.map((p) =>
                      p.id === postId
                        ? {
                            ...p,
                            comments: [
                              ...p.comments,
                              { id: 'temp-' + Date.now(), userId: user.uid, text, likes: [], replies: [], createdAt: new Date() },
                            ],
                          }
                        : p
                    );
                  });
                  await addComment(postId, user.uid, text);
                  setCommentText('');
                }
              }}
            />
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;


