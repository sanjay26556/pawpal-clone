import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Stack, IconButton, Avatar, Paper } from '@mui/material';
import { ArrowBack, CameraAlt, Image as ImageIcon, Send } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { collection, addDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Message {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: Date;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      })) as Message[];
      setMessages(msgs.reverse());
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    
    await addDoc(collection(db, 'messages'), {
      userId: user.uid,
      username: user.displayName || user.email?.split('@')[0] || 'Anonymous',
      text: newMessage.trim(),
      timestamp: new Date()
    });
    setNewMessage('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
        <ArrowBack sx={{ mr: 1 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Community Chat</Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: 'grey.50' }}>
        {messages.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
            No messages yet. Start the conversation!
          </Typography>
        ) : (
          messages.map((msg) => {
            const isMine = user && msg.userId === user.uid;
            return (
              <Box key={msg.id} sx={{ display: 'flex', mb: 1.5, justifyContent: isMine ? 'flex-end' : 'flex-start' }}>
                {!isMine && (
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', mr: 1 }}>
                    {msg.username.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                <Paper elevation={0} sx={{
                  px: 1.5,
                  py: 1,
                  maxWidth: '75%',
                  bgcolor: isMine ? 'primary.main' : 'grey.200',
                  color: isMine ? 'primary.contrastText' : 'text.primary',
                  borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                }}>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
                    {msg.timestamp.toLocaleTimeString()}
                  </Typography>
                </Paper>
              </Box>
            );
          })
        )}
      </Box>

      {/* Input bar */}
      <Box sx={{ px: 1.5, py: 1, borderTop: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton size="small"><CameraAlt /></IconButton>
          <IconButton size="small"><ImageIcon /></IconButton>
          <TextField
            fullWidth
            size="small"
            placeholder="Message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <IconButton color="primary" disabled={!newMessage.trim()} onClick={sendMessage}>
            <Send />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}


