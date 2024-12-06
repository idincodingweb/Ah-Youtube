import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../assets/styles/Home.css';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Loading from './Loading';

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=trending&type=video&pageToken=${pageToken}&key=${import.meta.env._API_KEY}`
      );
      setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
      setPageToken(response.data.nextPageToken);
      if (!response.data.nextPageToken) {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="home">
      <Typography variant="h4" gutterBottom>
        Trending Videos
      </Typography>
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchVideos}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={<p>No more videos</p>}
      >
        <Grid container spacing={3}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
              <Link to={`/video/${video.id.videoId}`} className="video-link">
                <Card className="video-card">
                  <img
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="video-thumbnail"
                  />
                  <CardContent>
                    <Typography variant="h6">{video.snippet.title}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
}

export default HomePage;
