import React from 'react';
import NotificationButtons from './components/NotificationButtons';
import NotificationList from './components/NotificationList';
import { NotificationProvider } from './context/NotificationContext';

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <div>
        <h1>Notification System</h1>
        <NotificationButtons />
        <NotificationList />
      </div>
    </NotificationProvider>
  );
};

export default App;