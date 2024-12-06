import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Shorts.css';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function Shorts() {
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
    <div className="shorts">
      <Typography variant="h4" gutterBottom>
        Shorts
      </Typography>
      <Grid container spacing={3}>
        {shorts.map((short) => (
          <Grid item xs={12} sm={6} md={4} key={short.id.videoId}>
            <Card className="short-card">
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
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Shorts;
