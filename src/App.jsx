import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography, CircularProgress } from '@mui/material';
import Notification from './components/Notification';

const UserList = lazy(() => import('./components/UserList'));
const UserForm = lazy(() => import('./components/UserForm'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
    },
  },
});

const App = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
      <ThemeProvider theme={theme}>
        <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
          User Management Dashboard
        </Typography>

        <Router>
          <Suspense fallback={<CircularProgress sx={{ display: 'block', margin: 'auto' }} />}>
            <Routes>
              <Route path="/" element={<Navigate to="/users" replace />} />
              <Route path="/users" element={<UserList showNotification={showNotification} />} />
              <Route path="/create" element={<UserForm showNotification={showNotification} />} />
              <Route path="/edit/:id" element={<UserForm showNotification={showNotification} />} />
            </Routes>
          </Suspense>

          <Notification
            open={notification.open}
            message={notification.message}
            severity={notification.severity}
            onClose={handleCloseNotification}
          />
        </Router>
      </ThemeProvider>
  );
};

export default App;
