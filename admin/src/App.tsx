import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsAdminPage } from './pages/ProductsAdminPage';
import { OrdersAdminPage } from './pages/OrdersAdminPage';
import { VendorsAdminPage } from './pages/VendorsAdminPage';
import { RidersAdminPage } from './pages/RidersAdminPage';
import { SaaSSubscriptionsAdminPage } from './pages/SaaSSubscriptionsAdminPage';
import { UsersAdminPage } from './pages/UsersAdminPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { useAdminAuthStore } from './store/useAdminAuthStore';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token } = useAdminAuthStore();

  if (!token && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto bg-slate-950">{children}</main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const { fetchCurrentUser } = useAdminAuthStore();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <DashboardPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedLayout>
              <ProductsAdminPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedLayout>
              <OrdersAdminPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedLayout>
              <UsersAdminPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/vendors"
          element={
            <ProtectedLayout>
              <VendorsAdminPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <ProtectedLayout>
              <SaaSSubscriptionsAdminPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/riders"
          element={
            <ProtectedLayout>
              <RidersAdminPage />
            </ProtectedLayout>
          }
        />
      </Routes>
    </Router>
  );
};
