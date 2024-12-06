import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/styles/ShortsPage.css';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function ShortsPage() {
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=shorts&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        setShorts(response.data.items);
      } catch (error) {
        console.error('Error fetching shorts:', error);
      }
    };

    fetchShorts();
  }, []);

  return (
    <div className="shortsPage">
      <Typography variant="h4" gutterBottom>
        Shorts
      </Typography>
      <Grid container spacing={3}>
        {shorts.map((short) => (
          <Grid item xs={12} sm={6} md={4} key={short.id.videoId}>
            <Link to={`/video/${short.id.videoId}`} className="video-link">
              <Card>
                <img
                  src={short.snippet.thumbnails.high.url}
                  alt={short.snippet.title}
                  className="short-thumbnail"
                />
                <CardContent>
                  <Typography variant="h6">{short.snippet.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {short.snippet.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ShortsPage;
