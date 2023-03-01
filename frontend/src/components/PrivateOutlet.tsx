import React from 'react';
import { Navigate, Outlet } from 'react-router';

const PrivateOutlet = ({ isAuth }: { isAuth: boolean | null | undefined }) => {
  return isAuth ? <Outlet /> : <Navigate to="signin" />;
};

export default PrivateOutlet;
