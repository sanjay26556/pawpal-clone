import { useState } from 'react';
import type { FC } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

export const ProfileTabs: FC = () => {
  const [tab, setTab] = useState(0);
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="Posts" />
        <Tab label="Reels" />
        <Tab label="Tagged" />
      </Tabs>
    </Box>
  );
};

export default ProfileTabs;


