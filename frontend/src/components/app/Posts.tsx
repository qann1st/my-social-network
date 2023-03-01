import React from 'react';
import { getPosts } from '../../utils/Api';
import Post from './Post';
import { Box } from '@mui/system';
import { Pagination } from '@mui/material';

interface PostsProps {
  posts: Array<1>;
  setPosts: any;
  pages: number;
  setCurrentPage: any;
}

const Posts: React.FC<PostsProps> = ({ posts, setPosts, pages, setCurrentPage }) => {
  return (
    <>
      {posts.length === 0 ? (
        'Пока постов нет'
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              maxWidth: '532px',
              width: '100%',
            }}>
            {posts.map((post) => (
              <Post key={post._id} post={post} owner={post.owner} setPosts={setPosts} />
            ))}
          </Box>
          <Pagination
            sx={{ margin: '20px 0' }}
            count={pages}
            onChange={(_, page) => {
              setCurrentPage(page);
            }}
          />
        </>
      )}
    </>
  );
};

export default Posts;
