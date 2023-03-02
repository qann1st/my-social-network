import React from 'react';
import { AppBar, IconButton, Container, Input } from '@mui/material';
import logo from '../../assets/logo.png';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { useAppDispatch } from '../../hooks/index';
import { DarkMode, LightMode } from '@mui/icons-material';
import { setTheme } from '../../store/slices/themeSlice';

const Header = () => {
  const { data }: any = useAppSelector((state) => state.user);
  const { darkMode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

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
          <IconButton>
            <Link to="/" style={{ height: '32px' }}>
              <img src={logo} alt="Логотип" style={{ width: '32px' }} />
            </Link>
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to={`profile/${data._id}`} style={{ height: '32px', marginRight: '10px' }}>
            <img
              style={{ maxWidth: '32px', width: '100%', maxHeight: '32px', borderRadius: '50%' }}
              alt="Аватар пользователя"
              src={data?.avatar}
            />
          </Link>
          <IconButton onClick={() => dispatch(setTheme())}>
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
