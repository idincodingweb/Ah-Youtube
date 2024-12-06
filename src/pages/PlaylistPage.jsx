import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Playlist.css';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        setPlaylists(response.data.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="playlist">
      <Typography variant="h4" gutterBottom>
        Your Playlists
      </Typography>
      <Grid container spacing={3}>
        {playlists.map((playlist) => (
          <Grid item xs={12} sm={6} md={4} key={playlist.id}>
            <Card>
              <img
                src={playlist.snippet.thumbnails.high.url}
                alt={playlist.snippet.title}
                className="playlist-thumbnail"
              />
              <CardContent>
                <Typography variant="h6">{playlist.snippet.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {playlist.snippet.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PlaylistPage;
