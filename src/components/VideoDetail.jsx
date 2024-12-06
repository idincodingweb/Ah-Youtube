import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/VideoDetail.css';
import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import Loading from './Loading';

function VideoDetail() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${import.meta.env.API_KEY}`
        );
        setVideo(response.data.items[0]);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=10&key=${import.meta.env.API_KEY}`
        );
        setRecommendations(response.data.items);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchVideo();
    fetchRecommendations();
  }, [id]);

  if (!video) return <Loading />;

  return (
    <div className="videoDetail">
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

      {recommendations.length > 0 ? (
        <div>
          <Typography variant="h6" gutterBottom>
            Recommended Videos
          </Typography>
          <Grid container spacing={3}>
            {recommendations.map((rec) => (
              <Grid item xs={12} sm={6} md={4} key={rec.id.videoId}>
                <Card>
                  <img
                    src={rec.snippet.thumbnails.high.url}
                    alt={rec.snippet.title}
                    className="recommendation-thumbnail"
                  />
                  <CardContent>
                    <Typography variant="h6">{rec.snippet.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {rec.snippet.channelTitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No recommendations found.
        </Typography>
      )}
    </div>
  );
}

export default VideoDetail;
