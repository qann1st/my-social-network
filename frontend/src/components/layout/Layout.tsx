import { Box } from '@mui/system';
import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
