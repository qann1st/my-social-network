import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/index';
import { handleOpenImagePopup } from '../../store/slices/popupSlice';

interface PostProps {
  post: object;
  owner: object;
}

const Post: React.FC<PostProps> = ({ post, owner }) => {
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        width: '500px',
        padding: '20px 16px',
        borderRadius: '15px',
        backgroundColor: 'rgb(240, 240, 240)',
      }}>
      <Box sx={{ display: 'flex', gap: '15px' }}>
        <Link to={`/profile/${owner._id}`}>
          <img
            style={{ width: '32px', borderRadius: '50%' }}
            src={owner.avatar}
            alt={`Аватар пользователя ${owner.name}`}
          />
        </Link>
        <Box>
          <Typography>{owner.name}</Typography>
          <Typography variant="caption">{post.data}</Typography>
        </Box>
      </Box>
      <Typography sx={{ fontFamily: 'sans-serif', marginBottom: `${!!post.image ? '15px' : ''}` }}>
        {post.description}
      </Typography>
      {!!post.image ? (
        <img
          style={{ width: '100%', display: 'block' }}
          src={post.image}
          alt={`Картинка поста`}
          onClick={() =>
            dispatch(handleOpenImagePopup({ imageLink: post.image ? post.image : '' }))
          }
        />
      ) : (
        ''
      )}
    </Box>
  );
};

export default Post;
