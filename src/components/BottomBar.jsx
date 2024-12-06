import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/BottomBar.css';

const BottomBar = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/shorts');
        break;
      case 2:
        navigate('/notfound');
        break;
      case 3:
        navigate('/about');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleNavigation}
      className="bottombar"
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Shorts" icon={<VideoLibraryIcon />} />
      <BottomNavigationAction label="Playlist" icon={<PlaylistPlayIcon />} />
      <BottomNavigationAction label="Profile" icon={<AccountCircle />} />
    </BottomNavigation>
  );
};

export default BottomBar;
