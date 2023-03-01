import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import Post from '../components/app/Post';
import { getPostsByUser, getUser, logout } from '../utils/Api';
import Loader from '../components/Loader';
import { useAppDispatch } from '../hooks/index';
import { removeUser } from '../store/slices/userSlice';

const Profile = () => {
  const [userPosts, setUserPosts] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    getUser(params.id).then((user) => {
      setUser(user);
      if (user === undefined) {
        setError(true);
      }
    });
  }, []);

  React.useEffect(() => {
    getPostsByUser(user.name)
      .then((posts) => {
        setUserPosts(posts);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  function handleLogout() {
    logout().then(() => {
      dispatch(removeUser());
      navigate('/signin');
    });
  }

  if (error) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <h1 style={{ fontSize: '100px', margin: 0 }}>404</h1>
        <p>Пользователь не найден</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ height: '100vh' }}>
        <Loader />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ padding: '60px 0 0', display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            backgroundColor: 'rgb(240, 240, 240)',
            maxWidth: '900px',
            width: '100%',
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              alt="Аватар пользователя"
              src={user?.avatar}
            />
            <Box sx={{ marginLeft: '20px' }}>
              <Typography fontSize={25}>{user?.name}</Typography>
              <Typography variant="caption">{user?.description}</Typography>
            </Box>
          </Box>
          <Button onClick={handleLogout}>Выйти</Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '15px',
          paddingTop: '16px',
        }}>
        {userPosts.map((post) => (
          <Post key={post._id} post={post} setPosts={setUserPosts} owner={post.owner} />
        ))}
      </Box>
    </Box>
  );
};

export default Profile;
