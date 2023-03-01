import React from 'react';
import { useLocation, useParams } from 'react-router';
import { Box } from '@mui/system';
import { useAppSelector } from '../hooks';
import { Typography } from '@mui/material';
import Post from '../components/app/Post';
import { getPostsByUser, getUser } from '../utils/Api';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const [userPosts, setUserPosts] = React.useState([]);
  const params = useParams();
  const [user, setUser] = React.useState([]);
  const [error, setError] = React.useState(false);
  console.log(user);

  React.useEffect(() => {
    getUser(params.id).then((user) => {
      setUser(user);
      if (user === undefined) {
        setError(true);
      }
    });
  }, []);

  React.useEffect(() => {
    getPostsByUser(user.name).then((posts) => {
      setUserPosts(posts);
    });
  }, [user]);

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
          }}>
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
        {userPosts.map(
          (post) => (
            console.log(post),
            (<Post key={post._id} post={post} setPosts={setUserPosts} owner={post.owner} />)
          ),
        )}
      </Box>
    </Box>
  );
};

export default Profile;
