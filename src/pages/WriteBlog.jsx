import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
  } from '@mui/material';
  import { useState } from 'react';
  import { API_BASE_URL } from '../config';
  
  export default function WriteBlog() {
    const [formData, setFormData] = useState({
      title: '',
      content: '',
      name: '',
      email: '',
    });
  
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
  
    const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitted(false);
      setError('');
  
      try {
        const res = await fetch(`${API_BASE_URL}/blogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
  
        setSubmitted(true);
        setFormData({ title: '', content: '', name: '', email: '' });
      } catch (err) {
        console.error('Blog submission error:', err);
        setError(err.message || 'Failed to submit blog');
      }
    };
  
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          ✍️ Write a Blog
        </Typography>
  
        {submitted && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Blog submitted successfully!
          </Alert>
        )}
  
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
  
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Blog Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Your Thoughts"
            name="content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            required
            multiline
            minRows={5}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Your Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit Blog
          </Button>
        </Box>
      </Container>
    );
  }
  