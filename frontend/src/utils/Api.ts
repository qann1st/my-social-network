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
    .get(`posts?page=${page}&limit=6`)
    .then((res) => res.data)
    .catch((err) => err.data);
};

export const getUser = (id: string | undefined) => {
  return instance
    .get(`users/${id}`)
    .then((res) => res.data)
    .catch((err) => err.data);
};

export const getPostsByUser = (id: string) => {
  return instance
    .get(`users/posts/${id}`)
    .then((res) => res.data)
    .catch((err) => err.data);
};

export const addNewPost = (description: string, image: string) => {
  return image !== ''
    ? instance
        .post(`posts`, { description, image })
        .then((res) => res.data)
        .catch((err) => err.data)
    : instance
        .post(`posts`, { description })
        .then((res) => res.data)
        .catch((err) => err.data);
};

export const addLike = (id: string) => {
  return instance
    .put(`posts/${id}/like`)
    .then((res) => res.data)
    .catch((err) => err.data);
};

export const deleteLike = (id: string) => {
  return instance
    .delete(`posts/${id}/like`)
    .then((res) => res.data)
    .catch((err) => err.data);
};

export const loginUser = (body: object) => {
  return instance
    .post('signin', body)
    .then((res) => res.data)
    .catch((err) => err.data);
};

export const getNowUser = () => {
  return instance
    .get('users/me')
    .then((res) => res.data)
    .catch((err) => err.data);
};

export const logout = () => {
  return instance
    .post('logout')
    .then((res) => res.data)
    .catch((err) => err.data);
};

export const addComment = (id: string, text) => {
  return instance
    .put(`posts/${id}/comment`, { text })
    .then((res) => res.data)
    .catch((err) => err.data);
};

export const register = (body: object) => {
  return instance
    .post('signup', body)
    .then((res) => res.data)
    .catch((err) => err.data);
};
