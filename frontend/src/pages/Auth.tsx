import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import { setUserInfo } from '../store/slices/userSlice';
import { loginUser } from '../utils/Api';
import { Box } from '@mui/system';
import { Button, Input, Typography } from '@mui/material';

const Auth = ({ onLogin }) => {
  const { darkMode } = useAppSelector((state) => state.theme);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '20px',
          padding: '50px 20px',
          maxWidth: '320px',
          width: '100%',
          borderRadius: '15px',
          backgroundColor: darkMode ? 'rgb(30, 30, 30)' : 'rgb(220, 220, 220)',
        }}
        component="form"
        onSubmit={(e) =>
          onLogin(e, { email: emailRef.current.value, password: passwordRef.current.value })
        }>
        <Typography>Авторизация</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginBottom: '100px',
          }}>
          <Input placeholder="E-mail" type="email" inputRef={emailRef}></Input>
          <Input placeholder="Пароль" type="password" inputRef={passwordRef}></Input>
        </Box>
        <Button type="submit">Авторизоваться</Button>
      </Box>
    </Box>
  );
};

export default Auth;
