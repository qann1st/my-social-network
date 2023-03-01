import React from 'react';
import { getPosts } from '../../utils/Api';
import Post from './Post';
import { Box } from '@mui/system';
import { Input, Button, Typography, Pagination } from '@mui/material';

const Posts = () => {
  const [posts, setPosts] = React.useState([]);
  const [pages, setPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    getPosts(currentPage).then((data) => {
      setPages(data.pages);
      setPosts(data.posts);
    });
  }, [currentPage]);

  return (
    <>
      <Box
        sx={{
          width: '532px',
          marginBottom: '15px',
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
        }}>
        <Typography
          align="center"
          sx={{ fontFamily: 'sans-serif', borderBottom: '1px solid gray', paddingBottom: '5px' }}>
          Создайте новый пост
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            gap: '7px',
            flexDirection: 'column',
          }}>
          <Input placeholder="Описание поста" required />
          <Input placeholder="Ссылка на картинку" />
          <Button type="submit">Добавить</Button>
        </Box>
      </Box>
      <Pagination
        sx={{ marginBottom: '20px' }}
        count={pages}
        onChange={(_, page) => {
          setCurrentPage(page);
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {posts.map((post) => (
          <Post key={post._id} post={post} owner={post.owner} />
        ))}
      </Box>
    </>
  );
};

export default Posts;
