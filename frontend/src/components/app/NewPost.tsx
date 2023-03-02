import React, { useRef } from 'react';
import { Box } from '@mui/system';
import { Typography, Input, Button } from '@mui/material';
import { addNewPost } from '../../utils/Api';

interface NewpostProps {
  posts: Array<1>;
  setPosts: any;
}

const NewPost: React.FC<NewpostProps> = ({ posts, setPosts }) => {
  const descriptionRef: any = useRef(null);
  const imageRef: any = useRef(null);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (descriptionRef.current.value.length >= 2) {
      addNewPost(descriptionRef.current.value, imageRef.current.value)
        .then((data) => {
          setPosts([data, ...posts]);
        })
        .finally(() => {
          descriptionRef.current.value = '';
          imageRef.current.value = '';
        });
    }
  }

  return (
    <Box
      sx={{
        maxWidth: '532px',
        width: '100%',
        marginBottom: '15px',
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
      }}>
      <Typography align="center" sx={{ fontFamily: 'sans-serif', paddingBottom: '5px' }}>
        Создайте новый пост
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          gap: '7px',
          flexDirection: 'column',
        }}>
        <Input placeholder="Описание поста" required inputRef={descriptionRef} />
        <Input type="url" inputRef={imageRef} placeholder="Ссылка на картинку" />
        <Button type="submit">Добавить</Button>
      </Box>
    </Box>
  );
};

export default NewPost;
