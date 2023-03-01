import React from 'react';
import { useAppDispatch } from '../hooks/index';
import { setUserInfo } from '../store/slices/userSlice';

const Auth = () => {
  const dispatch = useAppDispatch();

  return <div onClick={() => dispatch(setUserInfo({ isAuth: true }))}>dasdsa</div>;
};

export default Auth;
