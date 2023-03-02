import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index';

const Comment = ({ comment }: { comment: object }) => {
  const { darkMode } = useAppSelector((state) => state.theme);

  return (
    <Box
      sx={{
        display: 'flex',
        borderTop: '1px solid gray',
        paddingTop: '10px',
        borderBottom: '1px solid gray',
        paddingBottom: '10px',
      }}>
      <Box
        sx={{
          transition: '0.2s ease-in-out',
          '&:hover': {
            opacity: 0.5,
          },
        }}>
        <Link to={`/profile/${comment._id}`}>
          <img
            alt="Аватар пользователя"
            src={comment.avatar}
            style={{
              maxWidth: '42px',
              width: '100%',
              maxHeight: '42px',
              borderRadius: '50%',
              marginRight: '10px',
            }}
          />
        </Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Link style={{ textDecoration: 'none' }} to={`/profile/${comment._id}`}>
          <Typography
            sx={{
              color: darkMode ? 'white' : 'black',
              transition: '0.2s ease-in-out',
              '&:hover': {
                opacity: 0.5,
              },
            }}
            variant="caption">
            {comment.name}
          </Typography>
        </Link>
        <Typography
          sx={{ maxWidth: '450px', width: '100%', overflow: 'visible', wordBreak: 'break-all' }}>
          {comment.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Comment;
