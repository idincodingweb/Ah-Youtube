import React, { useState } from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../assets/styles/searchbar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Paper component="form" className="search-bar">
      <InputBase
        className="input"
        placeholder="Search YouTube"
        inputProps={{ 'aria-label': 'search youtube' }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton type="button" className="icon-button" aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
