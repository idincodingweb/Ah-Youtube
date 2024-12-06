import React from 'react';
import { Container, Typography, Avatar } from '@mui/material';
import '../assets/styles/About.css';

function About() {
  return (
    <Container className="about-container">
      <Avatar
        alt="Idin Iskandar S.kom"
        src="https://raw.githubusercontent.com/idincodingweb/netflix-clone/refs/heads/main/src/images/FB_IMG_1733158331408.jpg"
        className="profile-avatar"
      />
      <Typography variant="h4" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" paragraph>
        Hello, my name is Idin Iskandar S.kom. I am a passionate web developer with extensive experience in building dynamic and responsive web applications. My expertise includes working with modern web technologies such as React, Next.js, and Vite. I am dedicated to creating user-friendly and efficient web solutions that meet the needs of clients and users alike.
      </Typography>
      <Typography variant="body1" paragraph>
        In my career, I have successfully completed numerous projects, ranging from small business websites to large-scale web applications. I am always eager to learn new technologies and improve my skills to stay up-to-date with the latest trends in web development.
      </Typography>
      <Typography variant="body1" paragraph>
        Thank you for visiting my YouTube clone application. Feel free to explore and enjoy the content!
      </Typography>
    </Container>
  );
}

export default About;
