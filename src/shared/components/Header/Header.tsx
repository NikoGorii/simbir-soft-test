import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useState, VFC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header: VFC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (_event: any, newValue: string) => {
    navigate(newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ typography: 'body1', width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Список лиг/соревнований" value="/competitions" />
            <Tab label="Список команд" value="/teams" />
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
};
