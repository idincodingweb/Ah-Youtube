import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase } from '@mui/material';
import { Search, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import img from '../assets/images/youtube.png';
import '../assets/styles/Navbar.css';

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
       <span className="text-logo"> AhTube </span>
        <div className="grow" />
        {searchOpen && (
          <form onSubmit={handleSearchSubmit} className="search-form">
            <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={handleSearchChange}
              classes={{
                root: 'inputRoot',
                input: 'inputInput',
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </form>
        )}
        <IconButton color="inherit" onClick={handleSearchClick}>
          <Search />
        </IconButton>
        <IconButton color="inherit">
        <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
