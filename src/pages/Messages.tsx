import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, List, ListItem, ListItemText, Stack, Button, Avatar, Chip } from '@mui/material';
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
    <Box sx={{ p: 2, height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Community Chat</Typography>
      
      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', mb: 2 }}>
        {messages.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
            No messages yet. Start the conversation!
          </Typography>
        ) : (
          messages.map((msg) => (
            <Box key={msg.id} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {msg.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                  <Typography variant="subtitle2">{msg.username}</Typography>
                  <Chip 
                    label={msg.timestamp.toLocaleTimeString()} 
                    size="small" 
                    variant="outlined"
                    sx={{ fontSize: '0.7rem', height: 20 }}
                  />
                </Stack>
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Message input */}
      <Stack direction="row" spacing={1}>
        <TextField 
          fullWidth 
          size="small" 
          placeholder="Type a message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button variant="contained" onClick={sendMessage} disabled={!newMessage.trim()}>
          Send
        </Button>
      </Stack>
    </Box>
  );
}


