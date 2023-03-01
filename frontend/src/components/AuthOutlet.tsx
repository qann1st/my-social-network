import React from 'react';
import { Navigate, Outlet } from 'react-router';

const AuthOutlet = ({ isAuth }: { isAuth: boolean | null | undefined }) => {
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default AuthOutlet;
