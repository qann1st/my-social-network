import React from 'react';
import { Container } from '@mui/material';
import Posts from '../components/app/Posts';

const MainPage = () => {
  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '65px' }}>
      <Posts />
    </Container>
  );
};

export default MainPage;
