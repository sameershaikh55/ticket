import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dark, light } from "./redux/action/mode";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Layout from "./layout";
import PageLayout from "./layout/ClientLayout";
import AdminLayout from "./layout/AdminLayout";

// ADMIN
import Clients from "./pages/admin/Clients";

// CLIENTS
import Dashboard from "./pages/client/Dashboard";
import Login from "./pages/client/Login";
import Settings from "./pages/client/Settings";
import TicketDetail from "./pages/client/TicketDetail";

import Loader from "./components/Loader";
import Teams from "./pages/admin/Teams";

const AppRoutes = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode === "DARK") {
      dispatch(dark());
    } else if (mode === "LIGHT") {
      dispatch(light());
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/ticket" element={<TicketDetail />} />
          <Route
            path="/"
            element={
              <PageLayout>
                <Dashboard />
              </PageLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <PageLayout>
                <Settings />
              </PageLayout>
            }
          />
          <Route
            path="/admin/clients"
            element={
              <AdminLayout>
                <Clients />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/team"
            element={
              <AdminLayout>
                <Teams />
              </AdminLayout>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
