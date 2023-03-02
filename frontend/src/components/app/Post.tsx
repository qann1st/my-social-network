import { Favorite, FavoriteBorder, Send } from '@mui/icons-material';
import { Button, IconButton, Input, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { handleOpenImagePopup } from '../../store/slices/popupSlice';
import { addComment, addLike, deleteLike } from '../../utils/Api';
import Comment from './Comment';

interface PostProps {
  post: object;
  owner: object;
  setPosts: any;
}

const Post: React.FC<PostProps> = ({ post, owner, setPosts }) => {
  const { data } = useAppSelector((state) => state.user);
  const { darkMode } = useAppSelector((state) => state.theme);
  const commentRef = useRef(null);
  const isLiked = post.likes.some((i) => i._id === data._id);
  const [comments, setComments] = React.useState([]);
  const [amount, setAmount] = React.useState(3);
  const part = comments.slice(0, amount);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setComments(post.comments);
  }, []);

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

  function handleAddComment(e) {
    e.preventDefault();
    addComment(post._id, commentRef.current.value).then((data) =>
      setComments([data.comments[data.comments.length - 1], ...comments]),
    );
    commentRef.current.value = '';
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
        }}>
        <Box sx={{ transition: 'opacity 0.2s ease-in-out', '&:hover': { opacity: 0.5 } }}>
          <Link style={{ height: '0' }} to={`/profile/${owner._id}`}>
            <img
              style={{ maxWidth: '46px', width: '100%', maxHeight: '46px', borderRadius: '50%' }}
              src={owner.avatar}
              alt={`Аватар пользователя ${owner.name}`}
            />
          </Link>
        </Box>
        <Box>
          <Box sx={{ transition: 'opacity 0.2s ease-in-out', '&:hover': { opacity: 0.5 } }}>
            <Link style={{ textDecoration: 'none' }} to={`/profile/${owner._id}`}>
              <Typography sx={{ color: darkMode ? 'white' : 'black' }}>{owner.name}</Typography>
            </Link>
          </Box>
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
      <Box
        sx={{
          borderTop: '1px solid gray',
          paddingTop: '10px',
          marginTop: '10px',
        }}>
        <Typography variant="caption">Количество комментариев: {comments.length}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', margin: '10px 0' }}>
          {part.map((comment, i) => (
            <Comment key={i} comment={comment} />
          ))}
          {amount >= comments.length ? null : (
            <Button onClick={() => setAmount(amount + 3)}>Показать ещё</Button>
          )}
        </Box>
      </Box>
      <Box component="form" onSubmit={handleAddComment} sx={{ display: 'flex' }}>
        <Input sx={{ width: '100%' }} placeholder="Написать комментарий..." inputRef={commentRef} />
        <IconButton type="submit">
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Post;
