import React from 'react';
import { Container } from '@mui/material';
import Posts from '../components/app/Posts';
import NewPost from '../components/app/NewPost';
import { getPosts } from '../utils/Api';

interface MainPageProps {
  posts: Array<1>;
  setPosts: any;
  pages: number;
  setCurrentPage: any;
}

const MainPage: React.FC<MainPageProps> = ({ posts, setPosts, pages, setCurrentPage }) => {
  return (
    <Container
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '65px' }}>
      <NewPost posts={posts} setPosts={setPosts} />
      <Posts posts={posts} setPosts={setPosts} pages={pages} setCurrentPage={setCurrentPage} />
    </Container>
  );
};

export default MainPage;
