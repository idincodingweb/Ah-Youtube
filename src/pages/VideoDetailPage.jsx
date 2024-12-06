import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/VideoDetailPage.css';
import { Typography, Button } from '@mui/material';

function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        setVideo(response.data.items[0]);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) return <div>Loading...</div>;

  return (
    <div className="videoDetailPage">
      <iframe
        title={video.snippet.title}
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allowFullScreen
        className="videoPlayer"
      ></iframe>
      <Typography variant="h5" gutterBottom>
        {video.snippet.title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {video.snippet.channelTitle} • {video.statistics.viewCount} views
      </Typography>
      <Typography variant="body1" className="description">
        {showMore ? video.snippet.description : `${video.snippet.description.substring(0, 100)}...`}
        <Button onClick={() => setShowMore(!showMore)} color="primary">
          {showMore ? 'Show Less' : 'Show More'}
        </Button>
      </Typography>
    </div>
  );
}

export default VideoDetailPage;
