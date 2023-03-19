import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/action/admin/auth";
import { dark, light } from "./redux/action/mode";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from "./components/Routes/PublicRoute";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Layout from "./layout";
import PageLayout from "./layout/ClientLayout";
import AdminLayout from "./layout/AdminLayout";

// ADMIN
import Clients from "./pages/admin/Clients";
import AdminLogin from "./pages/admin/Login";

// CLIENTS
import Dashboard from "./pages/client/Dashboard";
import ClientLogin from "./pages/client/Login";
import Settings from "./pages/client/Settings";
import TicketDetail from "./pages/client/TicketDetail";

import Loader from "./components/Loader";
import Teams from "./pages/admin/Teams";
import AdminRoute from "./components/Routes/AdminRoute";

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

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <ClientLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/admin/login"
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />

          {/* USER ROUTES */}
          <Route
            path="/ticket"
            element={
              <PrivateRoute>
                <TicketDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PageLayout>
                  <Dashboard />
                </PageLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <PageLayout>
                  <Settings />
                </PageLayout>
              </PrivateRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin/clients"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminLayout>
                    <Clients />
                  </AdminLayout>
                </AdminRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/team"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminLayout>
                    <Teams />
                  </AdminLayout>
                </AdminRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
