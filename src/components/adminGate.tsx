import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import AdminPage from '../pages/adminpage';

export default function AdminGate() {
  const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!adminUsername || !adminPassword) {
      setError('Admin credentials are not configured in .env');
      return;
    }

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem('adminToken', 'local-admin-authenticated');
      setIsAuthenticated(true);
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    navigate('/'); // go back to homepage
  };

  if (isAuthenticated) {
    return <AdminPage onLogout={handleLogout} />;
  }

  // Login form
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
      <Paper sx={{ p: 4, width: 320 }}>
        <Typography variant="h5" align="center" gutterBottom>Admin Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Login</Button>
        </form>
      </Paper>
    </Box>
  );
}
