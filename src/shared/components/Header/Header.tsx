import { Tabs } from 'antd';
import { useState, VFC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

export const Header: VFC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (newValue: string) => {
    navigate(newValue);
    setValue(newValue);
  };

  return (
    <Tabs defaultActiveKey={value} onChange={handleChange}>
      <TabPane key="/competitions" tab="Список лиг/соревнований" />
      <TabPane key="/teams" tab="Список команд" />
    </Tabs>
  );
};
