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
import { getNowUser, loginUser, getPosts } from '../utils/Api';
import { useAppDispatch } from '../hooks/index';
import { setUserInfo } from '../store/slices/userSlice';
import Profile from '../pages/Profile';

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
  const [isLoading, setIsLoading] = React.useState(true);

  const { isAuth } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [posts, setPosts] = React.useState([]);
  const [pages, setPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    getPosts(currentPage).then((data) => {
      setPages(data.pages);
      setPosts(data.posts);
    });
    window.scrollTo(0, 0);
  }, [currentPage]);

  React.useEffect(() => {
    setIsLoading(true);
    handleCheck().finally(() => {
      setIsLoading(false);
    });
  }, []);

  function handleLogin(e: any) {
    e.preventDefault();
    loginUser('qann1st@gmail.com', '123123gg').then((data) => {
      handleCheck();
    });
  }

  function handleCheck() {
    return getNowUser().then((data) => {
      dispatch(setUserInfo(data));
    });
  }

  if (isLoading) {
    return <h1>Загрузка</h1>;
  }

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Routes>
          <Route element={<PrivateOutlet isAuth={isAuth} />}>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <MainPage
                    posts={posts}
                    setPosts={setPosts}
                    pages={pages}
                    setCurrentPage={setCurrentPage}
                  />
                }></Route>
              <Route path="/profile/:id" element={<Profile />}></Route>
            </Route>
          </Route>
          <Route element={<AuthOutlet isAuth={isAuth} />}>
            <Route path="/signin" element={<Auth onLogin={handleLogin} />}></Route>
            <Route path="/signup" element={<Register />}></Route>
          </Route>
        </Routes>
      </ThemeProvider>
      <ImagePopup />
    </>
  );
}

export default App;
