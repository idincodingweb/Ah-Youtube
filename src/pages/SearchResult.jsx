import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../assets/styles/SearchResultsPage.css';
import { Card, CardContent, Typography, Grid } from '@mui/material';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const query = useQuery().get('query');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        setResults(response.data.items);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="searchResultsPage">
      <Typography variant="h4" gutterBottom>
        Search Results for "{query}"
      </Typography>
      <Grid container spacing={3}>
        {results.map((result) => (
          <Grid item xs={12} sm={6} md={4} key={result.id.videoId}>
            <Card>
              <img
                src={result.snippet.thumbnails.high.url}
                alt={result.snippet.title}
                className="result-thumbnail"
              />
              <CardContent>
                <Typography variant="h6">{result.snippet.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {result.snippet.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default SearchResultsPage;
