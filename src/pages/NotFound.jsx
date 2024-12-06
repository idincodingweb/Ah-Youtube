import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../assets/styles/NotFound.css';

function NotFound() {
  return (
    <Container className="not-found-container">
      <Typography variant="h3" gutterBottom>
        Oops! 404
      </Typography>
      <Typography variant="body1" paragraph>
        Halaman Sedang Dalam Pengembangan
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Kembali ke Beranda
      </Button>
    </Container>
  );
}

export default NotFound;
