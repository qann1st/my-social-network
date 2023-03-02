import React, { useRef } from 'react';
import { useAppSelector } from '../hooks';
import { Box } from '@mui/system';
import { Typography, Input, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }: { onRegister: any }) => {
  const { darkMode } = useAppSelector((state) => state.theme);
  const nameRef: any = useRef(null);
  const emailRef: any = useRef(null);
  const passwordRef: any = useRef(null);

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
          maxWidth: '400px',
          width: '100%',
          borderRadius: '15px',
          backgroundColor: darkMode ? 'rgb(30, 30, 30)' : 'rgb(220, 220, 220)',
        }}
        component="form"
        onSubmit={(e) =>
          onRegister(e, {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
          })
        }>
        <Typography>Регистрация</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginBottom: '100px',
          }}>
          <Input placeholder="Имя" type="text" inputRef={nameRef}></Input>
          <Input placeholder="E-mail" type="email" inputRef={emailRef}></Input>
          <Input placeholder="Пароль" type="password" inputRef={passwordRef}></Input>
        </Box>
        <Button type="submit">Зарегистрироваться</Button>
        <Box sx={{ transition: 'opacity 0.2s ease-in-out', '&:hover': { opacity: 0.5 } }}>
          <Link
            style={{ textDecoration: 'none', color: darkMode ? 'white' : 'black' }}
            to="/signin">
            Уже зарегестрировны? Авторизоваться
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
