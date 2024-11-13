import React from "react";
import { useAppSelector } from "../hooks/useRedux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return true ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
