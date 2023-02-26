import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const { mode } = useSelector((state) => state.mode);

  return (
    <div
      className={`layout_container ${mode} ${
        location.pathname === "/ticket" && "ticket_main"
      }`}
    >
      {children}
    </div>
  );
};

export default Layout;
