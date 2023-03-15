import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Public = ({ children }) => {
  const adminUser = useSelector((state) => state.adminUser);
  const clientUser = useSelector((state) => state.clientUser);

  if (adminUser?.isAuthenticated) {
    return <Navigate to="/admin/clients" replace />;
  }

  if (clientUser?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Public;
