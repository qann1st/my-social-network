import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../hooks/index';
import { setUserInfo } from '../store/slices/userSlice';
import { loginUser } from '../utils/Api';

const Auth = ({ onLogin }: { onLogin: any }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate;

  return <div onClick={onLogin}>dasdsa</div>;
};

export default Auth;
