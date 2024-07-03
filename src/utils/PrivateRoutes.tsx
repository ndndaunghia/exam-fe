import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {
  const { auth, openLoginModal } = useAuth();

  useEffect(() => {
    if (!auth.token) {
      openLoginModal();
    }
  }, [auth.token, openLoginModal]);

  if (!auth.token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;