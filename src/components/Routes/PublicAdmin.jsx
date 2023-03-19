import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Public = ({ children }) => {
  const adminUser = useSelector((state) => state.adminUser);

  if (
    adminUser?.isAuthenticated &&
    adminUser?.user.email === "admin@admin.com"
  ) {
    return <Navigate to="/admin/clients" replace />;
  }

  return children;
};

export default Public;
