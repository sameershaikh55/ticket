import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Public = ({ children }) => {
  const clientUser = useSelector((state) => state.clientUser);

  if (
    clientUser?.isAuthenticated &&
    clientUser?.user.email === "user@user.com"
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Public;
