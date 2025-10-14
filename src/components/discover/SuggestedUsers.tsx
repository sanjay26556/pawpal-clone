import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Button } from '@mui/material';

export const SuggestedUsers: React.FC = () => {
  const users = ['Shelter Hope', 'Paws United', 'Rescue Network'];
  return (
    <List>
      {users.map((u) => (
        <ListItem key={u} secondaryAction={<Button variant="outlined" size="small">Follow</Button>}>
          <ListItemAvatar>
            <Avatar>{u.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={u} secondary="Suggested for you" />
        </ListItem>
      ))}
    </List>
  );
};

export default SuggestedUsers;


