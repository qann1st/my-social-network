import React from 'react';
import { AppBar, IconButton, Container, Input } from '@mui/material';
import logo from '../../assets/logo.png';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

const Header = () => {
  const { data } = useAppSelector((state) => state.user);

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
        <Link to={`profile/${data._id}`} style={{ height: '32px' }}>
          <img
            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
            alt="Аватар пользователя"
            src={data?.avatar}
          />
        </Link>
      </Container>
    </AppBar>
  );
};

export default Header;
