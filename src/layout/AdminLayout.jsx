import React from "react";
import Sidebar from "./components/AdminSidebar";

const Layout = ({ children }) => {
  return (
    <div className="page_layout_container">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
