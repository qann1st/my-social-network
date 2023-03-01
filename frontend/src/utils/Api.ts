import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:4000/',
  headers: {
    'Access-Control': 'application/json',
  },
});

export const getPosts = (page: number) => {
  return instance
    .get(`posts?page=${page}&limit=8`)
    .then((res) => res.data)
    .catch((err) => err.data);
};
