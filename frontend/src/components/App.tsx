import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router';
import { useAppSelector } from '../hooks';
import MainPage from '../pages/MainPage';
import Register from '../pages/Register';
import ImagePopup from './app/ImagePopup';
import AuthOutlet from './AuthOutlet';
import Layout from './layout/Layout';
import PrivateOutlet from './PrivateOutlet';
import Auth from '../pages/Auth';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#272727',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#edeef0',
    },
    secondary: {
      main: '#edeef0',
    },
  },
});

function App() {
  const { isAuth } = useAppSelector((state) => state.user);

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Routes>
          <Route element={<PrivateOutlet isAuth={isAuth} />}>
            <Route element={<Layout />}>
              <Route path="/" element={<MainPage />}></Route>
            </Route>
          </Route>
          <Route element={<AuthOutlet isAuth={isAuth} />}>
            <Route path="/signin" element={<Auth />}></Route>
            <Route path="/signup" element={<Register />}></Route>
          </Route>
          <Route path="*" element={<h1>404</h1>}></Route>
        </Routes>
      </ThemeProvider>
      <ImagePopup />
    </>
  );
}

export default App;
