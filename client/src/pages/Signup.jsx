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
const Signup = () => {
  const navigate = useNavigate();

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
    console.log('Signup:', formData);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/create`, { ...formData }, { withCredentials: true });
      if (res && res.data) {
        navigate('/');
      }
    } catch (error) {
      login(null);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 10 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Signup
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
              Signup
            </Button>

            <Button
              variant="text"
              color="secondary"
              onClick={handleLoginRedirect}
            >
              Already have an account? Login
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
