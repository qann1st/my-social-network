import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { handleOpenImagePopup } from '../../store/slices/popupSlice';
import { addLike, deleteLike } from '../../utils/Api';

interface PostProps {
  post: object;
  owner: object;
  setPosts: any;
}

const Post: React.FC<PostProps> = ({ post, owner, setPosts }) => {
  const { data } = useAppSelector((state) => state.user);
  const { darkMode } = useAppSelector((state) => state.theme);

  const isLiked = post.likes.some((i) => i._id === data._id);

  const dispatch = useAppDispatch();

  function handleLike(e) {
    e.preventDefault();
    addLike(post._id).then((data) =>
      setPosts((state) => state.map((c) => (c._id === post._id ? data : c))),
    );
  }

  function handleDislike(e) {
    e.preventDefault();
    deleteLike(post._id).then((data) =>
      setPosts((state) => state.map((c) => (c._id === post._id ? data : c))),
    );
  }

  return (
    <Box
      sx={{
        maxWidth: '532px',
        width: '100%',
        padding: '20px 16px',
        boxSizing: 'border-box',
        borderRadius: '15px',
        backgroundColor: darkMode ? 'rgb(30, 30, 30)' : 'rgb(220, 220, 220)',
      }}>
      <Box
        sx={{
          display: 'flex',
          gap: '15px',
          marginBottom: '10px',
          transition: 'opacity 0.2s ease-in-out',
          '&:hover': { opacity: 0.5 },
        }}>
        <Link style={{ maxHeight: '32px' }} to={`/profile/${owner._id}`}>
          <img
            style={{ maxWidth: '32px', width: '100%', maxHeight: '32px', borderRadius: '50%' }}
            src={owner.avatar}
            alt={`Аватар пользователя ${owner.name}`}
          />
        </Link>
        <Box>
          <Link style={{ textDecoration: 'none' }} to={`/profile/${owner._id}`}>
            <Typography sx={{ color: darkMode ? 'white' : 'black' }}>{owner.name}</Typography>
          </Link>
          <Typography variant="caption">{post.data}</Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          fontFamily: 'sans-serif',
          paddingLeft: '5px',
          marginBottom: `${!!post.image ? '15px' : ''}`,
        }}>
        {post.description}
      </Typography>
      {!!post.image ? (
        <img
          style={{ maxWidth: '500px', width: '100%', display: 'block' }}
          src={post.image}
          alt={`Картинка поста`}
          onClick={() =>
            dispatch(handleOpenImagePopup({ imageLink: post.image ? post.image : '' }))
          }
        />
      ) : (
        ''
      )}
      <Box
        sx={{
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
        }}>
        {isLiked ? (
          <IconButton
            sx={{
              transition: '0.2s ease-in-out',
              '&:hover': {
                opacity: 0.5,
              },
            }}
            onClick={handleDislike}>
            <Favorite />
          </IconButton>
        ) : (
          <IconButton
            sx={{
              transition: '0.2s ease-in-out',
              '&:hover': {
                opacity: 0.5,
              },
            }}
            onClick={handleLike}>
            <FavoriteBorder />
          </IconButton>
        )}
        {post.likes.length}
      </Box>
    </Box>
  );
};

export default Post;
