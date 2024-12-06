import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomBar from './components/BottomBar';
import HomePage from './pages/HomePage';
import ShortsPage from './pages/ShortsPage';
import PlaylistPage from './pages/PlaylistPage';
import VideoDetailPage from './pages/VideoDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFound from './pages/NotFound';
import About from './pages/About';
import './assets/styles/App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shorts" element={<ShortsPage />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/video/:id" element={<VideoDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/about" element={<About/>} />
      </Routes>
      <BottomBar />
    </Router>
  );
}

export default App;
