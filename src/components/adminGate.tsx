import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://3002-firebase-vt-1773146867254.cluster-yylgzpipxrar4v4a72liastuqy.cloudworkstations.dev/auth/login', {
        username,
        password,
      });
      localStorage.setItem('adminToken', res.data.access_token);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
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