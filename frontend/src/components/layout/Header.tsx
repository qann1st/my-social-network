import React from 'react';
import { AppBar, IconButton, Container, Input, Avatar } from '@mui/material';
import logo from '../../assets/logo.png';
import { Box } from '@mui/system';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar
      sx={{
        top: '0',
        position: 'fixed',
      }}>
      <Container
        sx={{
          maxWidth: 'xl',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box>
          <IconButton sx={{ width: '32px' }}>
            <Link to="/" style={{ height: '32px' }}>
              <img src={logo} alt="Логотип" style={{ width: '32px' }} />
            </Link>
          </IconButton>
        </Box>
        <Input placeholder="Поиск по пользователям" sx={{ margin: 'auto', fontWeight: '200' }} />
        <Box component="nav">
          <Link to="/profile">
            <Avatar />
          </Link>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
