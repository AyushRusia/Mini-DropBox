import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    // Add login logic here

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/login`, { ...formData }, { withCredentials: true });
      if (res && res.data) {
        sessionStorage.setItem('username', res.data?.username);
        sessionStorage.setItem('token', res.data?.token);
        login(formData.username);
        navigate('/dashboard');
      }
    } catch (error) {
      login(null);
    }

  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} >
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Stack spacing={2} mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>

            <Button
              variant="text"
              color="secondary"
              onClick={handleSignupRedirect}
            >
              Don't have an account? Create
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
